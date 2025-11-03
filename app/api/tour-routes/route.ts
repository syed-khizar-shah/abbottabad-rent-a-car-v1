import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TourRoutesContent from '@/lib/models/TourRoutes';
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
    
    let content = await TourRoutesContent.findOne();
    
    // If no content exists, return empty structure
    if (!content) {
      return NextResponse.json({
        heroTitle: 'Tour Routes & Destinations',
        heroSubtitle: 'Explore Pakistan\'s most beautiful destinations with Abbottabad Rent A Car',
        heroBadge: 'Travel Destinations',
        heroImage: '/scenic-mountain-road-pakistan.jpg',
        heroPrimaryCTA: 'Call for Rates',
        heroSecondaryCTA: 'WhatsApp Us',
        heroPhone: '+923001234567',
        heroWhatsApp: '923001234567',
        popularDestinationsTitle: 'Popular Destinations',
        popularDestinations: [],
        routes: [],
        ctaTitle: 'Ready to Start Your Journey?',
        ctaSubtitle: 'Contact us today to get customized rates for your destination. We offer competitive pricing and flexible packages for all routes.',
        ctaPrimaryButton: 'Call Now',
        ctaSecondaryButton: 'View All Services',
        ctaPhone: '+923001234567',
      });
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error fetching tour routes:', error);
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
    
    const data = await request.json();
    
    // Update or create the single document
    const content = await TourRoutesContent.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error updating tour routes:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

