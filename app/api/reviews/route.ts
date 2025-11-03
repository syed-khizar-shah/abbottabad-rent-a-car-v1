import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/lib/models/Review";
import jwt from "jsonwebtoken";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

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

    if (category && category !== "all") {
      query.category = category;
    }

    const reviews = await Review.find(query).sort({ date: -1, createdAt: -1 });

    // Calculate stats
    const totalReviews = reviews.length;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    
    const breakdown = [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((r) => r.rating === stars).length;
      return {
        stars,
        count,
        percentage: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0,
      };
    });

    // Get category counts
    const categoryCounts = await Review.aggregate([
      ...(activeOnly ? [{ $match: { isActive: true } }] : []),
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const categories = [
      { id: "all", name: "All Reviews", count: totalReviews },
      ...categoryCounts.map((cat) => ({
        id: cat._id || "general",
        name: cat._id
          ? cat._id
              .split("-")
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          : "General",
        count: cat.count,
      })),
    ];

    return NextResponse.json({
      reviews,
      stats: {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
        breakdown,
      },
      categories,
    });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
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

    const formData = await request.formData();

    // Handle image upload
    const imageFile = formData.get("image") as File;
    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "abbottabad-rent-a-car/reviews");
    }

    const reviewData: any = {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      rating: parseInt(formData.get("rating") as string),
      date: formData.get("date") as string,
      vehicle: formData.get("vehicle") as string,
      review: formData.get("review") as string,
      helpful: parseInt(formData.get("helpful") as string) || 0,
      verified: formData.get("verified") === "true",
      category: formData.get("category") as string || "general",
      isActive: formData.get("isActive") !== "false",
    };

    if (imageUrl) {
      reviewData.image = imageUrl;
    }

    const review = await Review.create(reviewData);

    return NextResponse.json(review);
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

