import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/lib/models/Car';
import Category from '@/lib/models/Category';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json(
        { message: 'Car not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    
    const updateData: any = {};

    // Handle category
    const categoryId = formData.get('category') as string;
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return NextResponse.json(
          { message: 'Category not found' },
          { status: 404 }
        );
      }
      updateData.category = category._id;
      updateData.categoryName = category.name;
    }

    // Handle pricing
    const pricingStr = formData.get('pricing') as string;
    if (pricingStr) {
      updateData.pricing = JSON.parse(pricingStr);
    }

    // Handle specs
    const specsStr = formData.get('specs') as string;
    if (specsStr) {
      updateData.specs = JSON.parse(specsStr);
    }

    // Handle features
    const featuresStr = formData.get('features') as string;
    if (featuresStr) {
      updateData.features = JSON.parse(featuresStr);
    }

    // Handle other fields
    const name = formData.get('name') as string;
    if (name) updateData.name = name;

    const price = formData.get('price') as string;
    if (price) updateData.price = parseFloat(price);

    const rating = formData.get('rating') as string;
    if (rating) updateData.rating = parseFloat(rating);

    const reviews = formData.get('reviews') as string;
    if (reviews) updateData.reviews = parseInt(reviews);

    const isFeatured = formData.get('isFeatured') as string;
    if (isFeatured !== null) {
      updateData.isFeatured = isFeatured === 'true';
    }

    const isAvailable = formData.get('isAvailable') as string;
    if (isAvailable !== null) {
      updateData.isAvailable = isAvailable === 'true';
    }

    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (car.image) {
        await deleteImage(car.image);
      }
      // Upload new image
      const imageUrl = await uploadImage(imageFile);
      updateData.image = imageUrl;
    }

    const updatedCar = await Car.findByIdAndUpdate(id, updateData, { new: true }).populate('category', 'name slug');

    return NextResponse.json(updatedCar);
  } catch (error: any) {
    console.error('Error updating car:', error);
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
    await connectDB();
    const { id } = await params;

    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json(
        { message: 'Car not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (car.image) {
      await deleteImage(car.image);
    }

    await Car.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Car deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting car:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

