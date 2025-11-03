import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FAQ from "@/lib/models/FAQ";
import jwt from "jsonwebtoken";

// Helper function to verify admin
async function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
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

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const activeOnly = searchParams.get("activeOnly") !== "false"; // Default to true

    let query: any = {};

    if (activeOnly) {
      query.isActive = true;
    }

    if (category) {
      query.category = category;
    }

    const faqs = await FAQ.find(query).sort({ category: 1, order: 1, createdAt: 1 });

    // Get category counts
    const categoryCounts = await FAQ.aggregate([
      ...(activeOnly ? [{ $match: { isActive: true } }] : []),
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const categories = categoryCounts.map((cat) => ({
      id: cat._id,
      name: cat._id
        .split("-")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      count: cat.count,
    }));

    return NextResponse.json({
      faqs,
      categories,
    });
  } catch (error: any) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    const faqData = {
      category: body.category,
      question: body.question,
      answer: body.answer,
      order: body.order || 0,
      isActive: body.isActive !== false,
    };

    const faq = await FAQ.create(faqData);

    return NextResponse.json(faq);
  } catch (error: any) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

