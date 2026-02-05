import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Gallery from "@/models/gallery";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, imageUrl } = body;

    // AUTH CHECK
    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // IMAGE REQUIRED
    if (!imageUrl || !imageUrl.trim()) {
      return NextResponse.json(
        { message: "Image URL is required" },
        { status: 400 }
      );
    }

    // VALIDATE URL
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { message: "Invalid image URL" },
        { status: 400 }
      );
    }

    // ONLY SAVE REQUIRED FIELDS
    const post = await Gallery.create({
      userId,
      imageUrl,
    });

    return NextResponse.json(
      { message: "Image uploaded successfully", post },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
