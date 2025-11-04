import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomepageContent from '@/lib/models/HomepageContent';
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

    let content = await HomepageContent.findOne();

    if (!content) {
      return NextResponse.json({ message: 'No homepage content found' });
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error fetching homepage content:', error);
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
    const existingContent = await HomepageContent.findOne();
    
    const updateData: any = {};
    
    // Handle text fields
    const heroTitle = formData.get('heroTitle') as string;
    if (heroTitle) updateData.heroTitle = heroTitle;
    
    const heroTitleAccent = formData.get('heroTitleAccent') as string;
    if (heroTitleAccent) updateData.heroTitleAccent = heroTitleAccent;
    
    const heroSubtitle = formData.get('heroSubtitle') as string;
    if (heroSubtitle) updateData.heroSubtitle = heroSubtitle;
    
    const heroBadge = formData.get('heroBadge') as string;
    if (heroBadge) updateData.heroBadge = heroBadge;
    
    const heroPrimaryCTA = formData.get('heroPrimaryCTA') as string;
    if (heroPrimaryCTA) updateData.heroPrimaryCTA = heroPrimaryCTA;
    
    const heroSecondaryCTA = formData.get('heroSecondaryCTA') as string;
    if (heroSecondaryCTA) updateData.heroSecondaryCTA = heroSecondaryCTA;
    
    // Handle hero image upload
    const heroImageFile = formData.get('heroImage') as File;
    if (heroImageFile && heroImageFile.size > 0) {
      // Delete old image if exists
      if (existingContent?.heroImage && existingContent.heroImage.startsWith('http')) {
        await deleteImage(existingContent.heroImage, 'abbottabad-rent-a-car/homepage');
      }
      // Upload new image
      const imageUrl = await uploadImage(heroImageFile, 'abbottabad-rent-a-car/homepage');
      updateData.heroImage = imageUrl;
    }
    
    // Handle JSON data fields
    const stats = formData.get('stats') as string;
    if (stats) updateData.stats = JSON.parse(stats);
    
    const offers = formData.get('offers') as string;
    if (offers) updateData.offers = JSON.parse(offers);
    
    const brands = formData.get('brands') as string;
    if (brands) updateData.brands = JSON.parse(brands);
    
    const testimonials = formData.get('testimonials') as string;
    if (testimonials) updateData.testimonials = JSON.parse(testimonials);
    
    const benefits = formData.get('benefits') as string;
    if (benefits) updateData.benefits = JSON.parse(benefits);
    
    const faqs = formData.get('faqs') as string;
    if (faqs) updateData.faqs = JSON.parse(faqs);
    
    // Handle other text fields
    const fields = [
      'categoriesSectionTitle', 'categoriesSectionSubtitle', 'categoriesSectionBadge',
      'offersSectionTitle', 'offersSectionSubtitle', 'offersSectionBadge',
      'brandsSectionTitle', 'brandsSectionSubtitle',
      'featuredSectionTitle', 'featuredSectionSubtitle', 'featuredSectionBadge',
      'testimonialsSectionTitle', 'testimonialsSectionSubtitle', 'testimonialsSectionBadge',
      'benefitsSectionTitle', 'benefitsSectionSubtitle', 'benefitsSectionBadge',
      'faqSectionTitle', 'faqSectionSubtitle', 'faqSectionBadge',
      'ctaTitle', 'ctaSubtitle', 'ctaBadge', 'ctaPrimaryButton', 'ctaSecondaryButton',
      'ctaPhone', 'ctaEmail', 'ctaAddress'
    ];
    
    for (const field of fields) {
      const value = formData.get(field) as string;
      if (value !== null) updateData[field] = value;
    }
    
    // Update or create the single document
    const content = await HomepageContent.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );

    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error updating homepage content:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

