import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactContent from '@/lib/models/ContactContent';
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

    let content = await ContactContent.findOne();

    if (!content) {
      return NextResponse.json({ message: 'Contact content not found' }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error fetching contact content:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
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

    let content = await ContactContent.findOne();

    const updateData: any = {};

    // Handle text fields
    const fields = [
      'heroTitle', 'heroTitleAccent', 'heroSubtitle', 'formTitle', 'formSubtitle',
      'whatsappNumber', 'phoneNumber', 'email', 'address', 'mapEmbedUrl'
    ];

    fields.forEach(field => {
      const value = formData.get(field) as string;
      if (value !== null) {
        updateData[field] = value;
      }
    });

    // Handle JSON fields
    const jsonFields = ['contactMethods', 'services', 'whyChooseUs'];
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

    // Handle map coordinates
    const lat = formData.get('mapCoordinates.lat') as string;
    const lng = formData.get('mapCoordinates.lng') as string;
    if (lat && lng) {
      updateData.mapCoordinates = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    }

    // Handle hero image upload
    const heroImageFile = formData.get('heroImage') as File;
    if (heroImageFile && heroImageFile.size > 0) {
      if (content?.heroImage) {
        await deleteImage(content.heroImage, 'abbottabad-rent-a-car/contact');
      }
      const imageUrl = await uploadImage(heroImageFile, 'abbottabad-rent-a-car/contact');
      updateData.heroImage = imageUrl;
    }

    if (!content) {
      content = await ContactContent.create(updateData);
    } else {
      content = await ContactContent.findOneAndUpdate({}, updateData, { new: true });
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error updating contact content:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

