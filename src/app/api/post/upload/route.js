import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";

export async function POST(req) {
  try {
    await dbConnect();

    const { userId, message, imageUrl } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 280) {
      return NextResponse.json(
        { message: "Message cannot exceed 280 characters" },
        { status: 400 }
      );
    }

    const post = await Post.create({
      userId,      // ⭐ SAVE USER ID
      message,
      imageUrl,
    });

    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
