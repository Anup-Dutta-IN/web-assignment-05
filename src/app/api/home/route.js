import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminData from "@/models/admindata";

export async function GET() {
  try {
    await dbConnect();

    const users = await AdminData.find({})
      .select("username name profileImage shortMessage socialLinks")
      .lean();

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
