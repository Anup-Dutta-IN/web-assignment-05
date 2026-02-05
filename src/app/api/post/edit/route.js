import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";

export async function PUT(req) {
  try {
    await dbConnect();

    const { postId, userId, message, imageUrl } = await req.json();

    if (!postId || !userId || !message?.trim()) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    const updated = await Post.findOneAndUpdate(
      { _id: postId, userId },
      {
        message: message.trim(),
        imageUrl: imageUrl?.trim() || "",
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Post not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post updated successfully", post: updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
