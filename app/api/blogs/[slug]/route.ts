import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import jwt from 'jsonwebtoken';

// Helper function to verify admin
async function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    return decoded;
  } catch {
    return null;
  }
}

// GET /api/blogs/[slug] - Get a single blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if admin, if not, only show published blogs
    const admin = await verifyAdmin(request);
    if (!admin && !blog.published) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment views
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    // Get related posts (same category, excluding current)
    const relatedPosts = await Blog.find({
      category: blog.category,
      published: true,
      _id: { $ne: blog._id },
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title slug category featuredImage createdAt');

    return NextResponse.json({
      blog,
      relatedPosts,
    });
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog', message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[slug] - Update a blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    await connectDB();
    const { slug } = await params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const title = formData.get('title') as string;
    const newSlug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;
    const authorBio = formData.get('authorBio') as string;
    const date = formData.get('date') as string;
    const readTime = formData.get('readTime') as string;
    const featured = formData.get('featured') === 'true';
    const published = formData.get('published') !== 'false';
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const keywords = formData.get('keywords') as string;
    const tags = formData.get('tags') as string;
    const featuredImageFile = formData.get('featuredImage') as File | null;

    // Check if new slug conflicts with another blog
    if (newSlug && newSlug !== slug) {
      const existingBlog = await Blog.findOne({ slug: newSlug });
      if (existingBlog) {
        return NextResponse.json(
          { error: 'A blog with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update fields
    if (title) blog.title = title;
    if (newSlug) blog.slug = newSlug;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (author) blog.author = author;
    if (authorBio !== null) blog.authorBio = authorBio || '';
    if (date) blog.date = date;
    if (readTime) blog.readTime = readTime;
    blog.featured = featured;
    blog.published = published;
    if (metaTitle) blog.metaTitle = metaTitle;
    if (metaDescription) blog.metaDescription = metaDescription;

    // Parse keywords and tags
    if (keywords !== null) {
      blog.keywords = keywords ? keywords.split(',').map((k) => k.trim()).filter(Boolean) : [];
    }
    if (tags !== null) {
      blog.tags = tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
    }

    // Handle featured image upload
    if (featuredImageFile && featuredImageFile.size > 0) {
      // Delete old image if exists
      if (blog.featuredImage && blog.featuredImage.includes('cloudinary.com')) {
        await deleteImage(blog.featuredImage, 'abbottabad-rent-a-car/blogs').catch(() => {
          // Ignore deletion errors
        });
      }

      // Upload new image
      blog.featuredImage = await uploadImage(featuredImageFile, 'abbottabad-rent-a-car/blogs');
    }

    await blog.save();

    return NextResponse.json({ blog });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[slug] - Delete a blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    await connectDB();
    const { slug } = await params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Delete featured image from Cloudinary
    if (blog.featuredImage && blog.featuredImage.includes('cloudinary.com')) {
      await deleteImage(blog.featuredImage, 'blog').catch(() => {
        // Ignore deletion errors
      });
    }

    await Blog.deleteOne({ _id: blog._id });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog', message: error.message },
      { status: 500 }
    );
  }
}

