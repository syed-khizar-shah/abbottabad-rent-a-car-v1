import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import { uploadImage } from '@/lib/cloudinary';
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

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({ order: 1, createdAt: -1 });

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const formData = await request.formData();
    
    const featuresStr = formData.get('features') as string;

    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { message: 'Image is required' },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(imageFile, 'abbottabad-rent-a-car/categories');

    // Generate slug from name
    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const categoryData: any = {
      name,
      slug,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string || 'Car',
      features: featuresStr ? JSON.parse(featuresStr) : [],
      priceFrom: parseFloat(formData.get('priceFrom') as string),
      order: parseInt(formData.get('order') as string) || 0,
      image: imageUrl,
    };

    const category = await Category.create(categoryData);

    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

