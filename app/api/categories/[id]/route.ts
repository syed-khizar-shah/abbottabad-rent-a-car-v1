import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    
    const updateData: any = {};

    // Handle text fields
    const name = formData.get('name') as string;
    if (name) {
      updateData.name = name;
      // Regenerate slug if name changes
      updateData.slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    const description = formData.get('description') as string;
    if (description !== null) updateData.description = description;

    const icon = formData.get('icon') as string;
    if (icon !== null) updateData.icon = icon;

    const priceFrom = formData.get('priceFrom') as string;
    if (priceFrom !== null) updateData.priceFrom = parseFloat(priceFrom);

    const order = formData.get('order') as string;
    if (order !== null) updateData.order = parseInt(order);

    // Handle features
    const featuresStr = formData.get('features') as string;
    if (featuresStr) {
      updateData.features = JSON.parse(featuresStr);
    }

    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (category.image) {
        await deleteImage(category.image, 'abbottabad-rent-a-car/categories');
      }
      // Upload new image
      const imageUrl = await uploadImage(imageFile, 'abbottabad-rent-a-car/categories');
      updateData.image = imageUrl;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (category.image) {
      await deleteImage(category.image, 'abbottabad-rent-a-car/categories');
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

