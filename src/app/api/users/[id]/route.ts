import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/DB";
import User from "@/models/User";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const user = await User.findById(params.id).select("name email profileImg");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
