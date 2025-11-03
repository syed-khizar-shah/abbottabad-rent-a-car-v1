import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AboutContent from '@/lib/models/AboutContent';
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
    
    let content = await AboutContent.findOne();
    
    // If no content exists, return empty structure
    if (!content) {
      return NextResponse.json({
        heroBadge: 'Our Story',
        heroTitle: 'Redefining Luxury Travel',
        heroSubtitle: 'For over 15 years, we\'ve been the trusted choice for discerning clients seeking the finest automotive experiences',
        heroImage: '/professional-luxury-car-rental-service-team.jpg',
        stats: [],
        storyTitle: 'A Legacy of Excellence',
        storyParagraphs: [],
        storyImage: '/luxury-car-showroom-elegant-interior.jpg',
        storyButtonText: 'Explore Our Fleet',
        valuesTitle: 'Our Core Values',
        valuesSubtitle: 'The principles that guide everything we do',
        values: [],
        timelineTitle: 'Our Journey',
        timelineSubtitle: 'Key milestones in our story of growth and excellence',
        milestones: [],
        teamTitle: 'Meet Our Team',
        teamSubtitle: 'Dedicated professionals committed to your exceptional experience',
        team: [],
        certificationsTitle: 'Certifications & Standards',
        certificationsSubtitle: 'Committed to the highest industry standards',
        certifications: [],
        ctaTitle: 'Experience the Difference',
        ctaSubtitle: 'Join thousands of satisfied clients who trust us for their luxury automotive needs',
        ctaPrimaryButton: 'Get in Touch',
        ctaSecondaryButton: 'View Fleet',
      });
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error fetching about content:', error);
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
    const content = await AboutContent.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error updating about content:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

