import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/admin";
import UserData from "@/models/admindata";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      username,
      name,
      password,
      profileImage,
      shortMessage,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = body;

    if (!username || !name || !password) {
      return NextResponse.json(
        { message: "Username, Name and Password are required" },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { message: "Password must be at least 4 characters" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      username,
      name,
      password,
      profileImage,
      shortMessage,
      socialLinks: {
        facebook,
        twitter,
        instagram,
        linkedin,
      },
    });

    await UserData.create({
      userId: newUser._id,
      username: newUser.username,
      name: newUser.name,
      profileImage: newUser.profileImage || "",
      shortMessage: shortMessage || "",
      socialLinks: {
        facebook: facebook || "",
        twitter: twitter || "",
        instagram: instagram || "",
        linkedin: linkedin || "",
      },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
