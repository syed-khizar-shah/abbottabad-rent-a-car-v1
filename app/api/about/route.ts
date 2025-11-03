import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AboutContent from '@/lib/models/AboutContent';
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
    
    const formData = await request.formData();
    const existingContent = await AboutContent.findOne();
    
    const updateData: any = {};
    
    // Handle text fields
    const textFields = [
      'heroBadge', 'heroTitle', 'heroSubtitle', 'storyTitle', 'storyButtonText',
      'valuesTitle', 'valuesSubtitle', 'timelineTitle', 'timelineSubtitle',
      'teamTitle', 'teamSubtitle', 'certificationsTitle', 'certificationsSubtitle',
      'ctaTitle', 'ctaSubtitle', 'ctaPrimaryButton', 'ctaSecondaryButton'
    ];
    
    for (const field of textFields) {
      const value = formData.get(field) as string;
      if (value !== null) updateData[field] = value;
    }
    
    // Handle hero image upload
    const heroImageFile = formData.get('heroImage') as File;
    if (heroImageFile && heroImageFile.size > 0) {
      if (existingContent?.heroImage && existingContent.heroImage.startsWith('http')) {
        await deleteImage(existingContent.heroImage, 'abbottabad-rent-a-car/about');
      }
      const imageUrl = await uploadImage(heroImageFile, 'abbottabad-rent-a-car/about');
      updateData.heroImage = imageUrl;
    }
    
    // Handle story image upload
    const storyImageFile = formData.get('storyImage') as File;
    if (storyImageFile && storyImageFile.size > 0) {
      if (existingContent?.storyImage && existingContent.storyImage.startsWith('http')) {
        await deleteImage(existingContent.storyImage, 'abbottabad-rent-a-car/about');
      }
      const imageUrl = await uploadImage(storyImageFile, 'abbottabad-rent-a-car/about');
      updateData.storyImage = imageUrl;
    }
    
    // Handle JSON arrays
    const stats = formData.get('stats') as string;
    if (stats) updateData.stats = JSON.parse(stats);
    
    const storyParagraphs = formData.get('storyParagraphs') as string;
    if (storyParagraphs) updateData.storyParagraphs = JSON.parse(storyParagraphs);
    
    const values = formData.get('values') as string;
    if (values) updateData.values = JSON.parse(values);
    
    const milestones = formData.get('milestones') as string;
    if (milestones) updateData.milestones = JSON.parse(milestones);
    
    const certifications = formData.get('certifications') as string;
    if (certifications) updateData.certifications = JSON.parse(certifications);
    
    // Handle team members (with image uploads)
    const teamData = formData.get('team') as string;
    if (teamData) {
      const team = JSON.parse(teamData);
      // Process team member images if uploaded
      for (let i = 0; i < team.length; i++) {
        const teamImageFile = formData.get(`teamImage_${i}`) as File;
        if (teamImageFile && teamImageFile.size > 0) {
          const existingMember = existingContent?.team?.[i];
          if (existingMember?.image && existingMember.image.startsWith('http')) {
            await deleteImage(existingMember.image, 'abbottabad-rent-a-car/about');
          }
          const imageUrl = await uploadImage(teamImageFile, 'abbottabad-rent-a-car/about');
          team[i].image = imageUrl;
        }
      }
      updateData.team = team;
    }
    
    // Update or create the single document
    const content = await AboutContent.findOneAndUpdate(
      {},
      updateData,
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

