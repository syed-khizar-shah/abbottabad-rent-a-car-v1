import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/lib/models/Car';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const car = await Car.findById(id).populate('category', 'name slug');

    if (!car) {
      return NextResponse.json(
        { message: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error: any) {
    console.error('Error fetching car:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

