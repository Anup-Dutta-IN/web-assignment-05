import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/admin";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await User.findById(id).select("-password"); // Exclude password from response

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User fetched successfully",
        user: {
          _id: user._id,
          username: user.username,
          name: user.name,
          profileImage: user.profileImage || "",
          shortMessage: user.shortMessage || "",
          socialLinks: {
            facebook: user.socialLinks?.facebook || "",
            twitter: user.socialLinks?.twitter || "",
            instagram: user.socialLinks?.instagram || "",
            linkedin: user.socialLinks?.linkedin || "",
          },
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}