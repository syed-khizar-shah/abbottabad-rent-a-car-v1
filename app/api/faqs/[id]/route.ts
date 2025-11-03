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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const faq = await FAQ.findById(id);

    if (!faq) {
      return NextResponse.json(
        { message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(faq);
  } catch (error: any) {
    console.error("Error fetching FAQ:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const faq = await FAQ.findById(id);
    if (!faq) {
      return NextResponse.json(
        { message: "FAQ not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    const updateData: any = {};

    if (body.category !== undefined) updateData.category = body.category;
    if (body.question !== undefined) updateData.question = body.question;
    if (body.answer !== undefined) updateData.answer = body.answer;
    if (body.order !== undefined) updateData.order = body.order;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    const updatedFAQ = await FAQ.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updatedFAQ);
  } catch (error: any) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const faq = await FAQ.findById(id);
    if (!faq) {
      return NextResponse.json(
        { message: "FAQ not found" },
        { status: 404 }
      );
    }

    await FAQ.findByIdAndDelete(id);

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

