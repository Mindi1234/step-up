import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();
    if (!email || !newPassword) return NextResponse.json({ message: "Email & password required" }, { status: 400 });

    

    return NextResponse.json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
