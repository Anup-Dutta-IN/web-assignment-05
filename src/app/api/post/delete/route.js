import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";

export async function DELETE(req) {
  try {
    await dbConnect();

    const { postId, userId } = await req.json();

    if (!userId || !postId) {
      return NextResponse.json(
        { message: "Missing data" },
        { status: 400 }
      );
    }

    const deleted = await Post.findOneAndDelete({
      _id: postId,
      userId,
    });

    if (!deleted) {
      return NextResponse.json(
        { message: "Post not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
