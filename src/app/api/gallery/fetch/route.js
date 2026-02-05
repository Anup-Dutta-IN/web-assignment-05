import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Gallery from "@/models/gallery";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // AUTH CHECK
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // FETCH USER IMAGES (latest first)
    const images = await Gallery.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
