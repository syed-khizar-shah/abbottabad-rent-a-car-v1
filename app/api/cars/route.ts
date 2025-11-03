import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/lib/models/Car';
import Category from '@/lib/models/Category';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let query: any = { isAvailable: true };

    if (category && category !== 'all') {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    const cars = await Car.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    return NextResponse.json(cars);
  } catch (error: any) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

