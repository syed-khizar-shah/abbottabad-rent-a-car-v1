import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LocationContent from '@/lib/models/LocationContent';
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

export async function GET() {
  try {
    await connectDB();

    let content = await LocationContent.findOne();

    if (!content) {
      return NextResponse.json({ message: 'Location content not found' }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error fetching location content:', error);
    // Check if it's a MongoDB connection error
    if (error.name === 'MongooseServerSelectionError' || error.message?.includes('MongoDB Atlas')) {
      return NextResponse.json(
        { 
          message: 'Database connection error. Please check MongoDB Atlas IP whitelist settings.',
          error: 'MongoDB connection failed'
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { message: 'Server error', error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const formData = await request.formData();

    let content = await LocationContent.findOne();

    const updateData: any = {};

    // Handle text fields
    const fields = [
      'heroTitle', 'heroSubtitle', 'businessName', 'address', 'city',
      'postalCode', 'country', 'phone', 'email', 'mapEmbedUrl',
      'ctaTitle', 'ctaSubtitle'
    ];

    fields.forEach(field => {
      const value = formData.get(field) as string;
      if (value !== null) {
        updateData[field] = value;
      }
    });

    // Handle JSON fields
    const jsonFields = ['businessHours', 'landmarks'];
    jsonFields.forEach(field => {
      const value = formData.get(field) as string;
      if (value) {
        try {
          updateData[field] = JSON.parse(value);
        } catch (e) {
          console.error(`Error parsing ${field}:`, e);
        }
      }
    });

    // Handle coordinates
    const lat = formData.get('coordinates.lat') as string;
    const lng = formData.get('coordinates.lng') as string;
    if (lat && lng) {
      updateData.coordinates = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    }

    // Handle hero image upload
    const heroImageFile = formData.get('heroImage') as File;
    if (heroImageFile && heroImageFile.size > 0) {
      if (content?.heroImage) {
        await deleteImage(content.heroImage, 'abbottabad-rent-a-car/location');
      }
      const imageUrl = await uploadImage(heroImageFile, 'abbottabad-rent-a-car/location');
      updateData.heroImage = imageUrl;
    }

    if (!content) {
      content = await LocationContent.create(updateData);
    } else {
      content = await LocationContent.findOneAndUpdate({}, updateData, { new: true });
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error updating location content:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

