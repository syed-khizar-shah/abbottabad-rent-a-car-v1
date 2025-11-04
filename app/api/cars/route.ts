import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/lib/models/Car";
import Category from "@/lib/models/Category";
import { uploadImage } from "@/lib/cloudinary";
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
    const featured = searchParams.get("featured");

    let query: any = { isAvailable: true };

    if (category && category !== "all") {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    const cars = await Car.find(query)
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    return NextResponse.json(cars);
  } catch (error: any) {
    console.error("Error fetching cars:", error);
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

    const categoryId = formData.get("category") as string;
    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const pricingStr = formData.get("pricing") as string;
    const specsStr = formData.get("specs") as string;
    const featuresStr = formData.get("features") as string;

    // Handle image upload
    const imageFile = formData.get("image") as File;
    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(imageFile, "abbottabad-rent-a-car/cars");

    const carData: any = {
      name: formData.get("name") as string,
      category: category._id,
      categoryName: category.name,
      price: parseFloat(formData.get("price") as string),
      pricing: pricingStr ? JSON.parse(pricingStr) : {},
      specs: specsStr ? JSON.parse(specsStr) : {},
      features: featuresStr ? JSON.parse(featuresStr) : [],
      image: imageUrl,
      rating: parseFloat(formData.get("rating") as string) || 4.5,
      reviews: parseInt(formData.get("reviews") as string) || 0,
      isFeatured: formData.get("isFeatured") === "true",
      isAvailable: formData.get("isAvailable") !== "false",
    };

    const car = await Car.create(carData);

    return NextResponse.json(car);
  } catch (error: any) {
    console.error("Error creating car:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
