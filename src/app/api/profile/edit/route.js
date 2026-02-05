import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/admin";
import UserData from "@/models/admindata";

export async function PUT(req) {
  try {
    await dbConnect();

    const {
      userId,
      username,
      profileImage,
      password,
      name,
      shortMessage,
      socialLinks,
    } = await req.json();

    if (!userId || !username) {
      return NextResponse.json(
        { message: "User ID and username are required" },
        { status: 400 }
      );
    }

    // Check username uniqueness
    const existingUser = await User.findOne({
      username,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 409 }
      );
    }

    /* -------------------------
       Prepare User update data
    -------------------------- */
    const updateData = {
      username,
      profileImage: profileImage || "",
    };

    if (name !== undefined) {
      updateData.name = name;
    }

    if (shortMessage !== undefined) {
      if (shortMessage.length > 160) {
        return NextResponse.json(
          { message: "Short message must be 160 characters or less" },
          { status: 400 }
        );
      }
      updateData.shortMessage = shortMessage;
    }

    if (socialLinks !== undefined) {
      updateData.socialLinks = {
        facebook: socialLinks.facebook || "",
        twitter: socialLinks.twitter || "",
        instagram: socialLinks.instagram || "",
        linkedin: socialLinks.linkedin || "",
      };
    }

    // ⚠️ NOT SECURE – use bcrypt in production
    if (password) {
      if (password.length < 4) {
        return NextResponse.json(
          { message: "Password must be at least 4 characters" },
          { status: 400 }
        );
      }
      updateData.password = password;
    }

    /* -------------------------
       Update main User model
    -------------------------- */
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    /* --------------------------------
       Sync ALL fields to UserData
    --------------------------------- */
    await UserData.findOneAndUpdate(
      { userId },
      {
        userId,
        username: updatedUser.username,
        name: updatedUser.name || "",
        profileImage: updatedUser.profileImage || "",
        shortMessage: updatedUser.shortMessage || "",
        socialLinks: {
          facebook: updatedUser.socialLinks?.facebook || "",
          twitter: updatedUser.socialLinks?.twitter || "",
          instagram: updatedUser.socialLinks?.instagram || "",
          linkedin: updatedUser.socialLinks?.linkedin || "",
        },
      },
      { upsert: true, new: true }
    );

    /* -------------------------
       Final Response
    -------------------------- */
    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          _id: updatedUser._id,
          username: updatedUser.username,
          name: updatedUser.name,
          profileImage: updatedUser.profileImage,
          shortMessage: updatedUser.shortMessage || "",
          socialLinks: {
            facebook: updatedUser.socialLinks?.facebook || "",
            twitter: updatedUser.socialLinks?.twitter || "",
            instagram: updatedUser.socialLinks?.instagram || "",
            linkedin: updatedUser.socialLinks?.linkedin || "",
          },
          role: updatedUser.role,
          createdAt: updatedUser.createdAt,
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
