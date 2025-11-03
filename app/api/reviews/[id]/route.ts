import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/lib/models/Review";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
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

    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(review);
  } catch (error: any) {
    console.error("Error fetching review:", error);
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

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const updateData: any = {};

    const name = formData.get("name") as string;
    if (name) updateData.name = name;

    const location = formData.get("location") as string;
    if (location !== null) updateData.location = location;

    const rating = formData.get("rating") as string;
    if (rating !== null) updateData.rating = parseInt(rating);

    const date = formData.get("date") as string;
    if (date !== null) updateData.date = date;

    const vehicle = formData.get("vehicle") as string;
    if (vehicle !== null) updateData.vehicle = vehicle;

    const reviewText = formData.get("review") as string;
    if (reviewText !== null) updateData.review = reviewText;

    const helpful = formData.get("helpful") as string;
    if (helpful !== null) updateData.helpful = parseInt(helpful);

    const verified = formData.get("verified") as string;
    if (verified !== null) updateData.verified = verified === "true";

    const category = formData.get("category") as string;
    if (category !== null) updateData.category = category;

    const isActive = formData.get("isActive") as string;
    if (isActive !== null) updateData.isActive = isActive === "true";

    // Handle image upload
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (review.image && review.image.startsWith("http")) {
        await deleteImage(review.image, "abbottabad-rent-a-car/reviews");
      }
      // Upload new image
      const imageUrl = await uploadImage(imageFile, "abbottabad-rent-a-car/reviews");
      updateData.image = imageUrl;
    }

    const updatedReview = await Review.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updatedReview);
  } catch (error: any) {
    console.error("Error updating review:", error);
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

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (review.image && review.image.startsWith("http")) {
      await deleteImage(review.image, "abbottabad-rent-a-car/reviews");
    }

    await Review.findByIdAndDelete(id);

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

