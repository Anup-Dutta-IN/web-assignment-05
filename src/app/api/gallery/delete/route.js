import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Gallery from "@/models/gallery";

export async function DELETE(req) {
  try {
    await dbConnect();

    const { imageId, userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!imageId) {
      return NextResponse.json(
        { message: "Image ID is required" },
        { status: 400 }
      );
    }

    // Ensure image belongs to the same user
    const deletedImage = await Gallery.findOneAndDelete({
      _id: imageId,
      userId: userId,
    });

    if (!deletedImage) {
      return NextResponse.json(
        { message: "Image not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
