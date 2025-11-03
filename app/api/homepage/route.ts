import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomepageContent from '@/lib/models/HomepageContent';

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
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

