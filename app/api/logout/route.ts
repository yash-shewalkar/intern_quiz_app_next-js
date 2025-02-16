import { NextResponse } from "next/server";
import { deleteCookie } from "cookies-next";

export async function POST(req: Request) {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

    // Delete the cookie by setting Max-Age to 0
    deleteCookie("teacherId" ,{ res: response });
    response.headers.set("Set-Cookie", "teacherId=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict");

    return response;
  } catch (error) {
    return NextResponse.json({ error: error+ "Logout failed" }, { status: 500 });
  }
}
