import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";

export async function GET() {
  try {
    await dbConnect();

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
