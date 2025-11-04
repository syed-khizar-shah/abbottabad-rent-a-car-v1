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

// GET /api/blogs - Get all blogs (public) or with filters (admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published'); // For admin
    const limit = parseInt(searchParams.get('limit') || '0');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Build query
    const query: any = {};
    
    // For public, only show published blogs
    const admin = await verifyAdmin(request);
    if (!admin) {
      query.published = true;
    } else if (published !== null) {
      query.published = published === 'true';
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    // Get blogs with sorting
    let blogsQuery = Blog.find(query).sort({ createdAt: -1 });

    if (skip > 0) {
      blogsQuery = blogsQuery.skip(skip);
    }

    if (limit > 0) {
      blogsQuery = blogsQuery.limit(limit);
    }

    const blogs = await blogsQuery;

    // Get counts for categories
    const categoryCounts = await Blog.aggregate([
      { $match: admin ? {} : { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Get total count
    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      blogs,
      total,
      categoryCounts: categoryCounts.map((c) => ({
        id: c._id,
        name: c._id,
        count: c.count,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    await connectDB();

    const formData = await request.formData();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
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

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !category || !author || !date || !readTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 400 }
      );
    }

    // Upload featured image if provided
    let featuredImageUrl = '';
    if (featuredImageFile && featuredImageFile.size > 0) {
      featuredImageUrl = await uploadImage(featuredImageFile, 'abbottabad-rent-a-car/blogs');
    }

    // Parse keywords and tags
    const keywordsArray = keywords ? keywords.split(',').map((k) => k.trim()).filter(Boolean) : [];
    const tagsArray = tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    // Create blog
    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      featuredImage: featuredImageUrl || '/placeholder.svg',
      category,
      author,
      authorBio: authorBio || '',
      date,
      readTime,
      featured,
      published,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      keywords: keywordsArray,
      tags: tagsArray,
    });

    await blog.save();

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog', message: error.message },
      { status: 500 }
    );
  }
}

