import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Check if username already exists
    const existingUser = await prisma.teacher.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await prisma.teacher.create({
      data: { username, password: hashedPassword },
    });

    return NextResponse.json({ message: "User registered successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error+ " Something went wrong" }, { status: 500 });
  }
}
