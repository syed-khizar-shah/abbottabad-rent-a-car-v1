import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/lib/models/Car';
import Category from '@/lib/models/Category';

export async function GET() {
  try {
    await connectDB();

    const [totalCars, totalCategories, featuredCars, availableCars] = await Promise.all([
      Car.countDocuments(),
      Category.countDocuments(),
      Car.countDocuments({ isFeatured: true }),
      Car.countDocuments({ isAvailable: true }),
    ]);

    return NextResponse.json({
      totalCars,
      totalCategories,
      featuredCars,
      availableCars,
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

