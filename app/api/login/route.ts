import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Check if the user exists in the database
    const user = await prisma.teacher.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return a success message (Replace with session-based auth later)
    return NextResponse.json({
      success: true,
      message: "Login successful",
      userId: user.id, // Return user ID for session tracking
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error:error+  " Something went wrong" },
      { status: 500 }
    );
  }
}
