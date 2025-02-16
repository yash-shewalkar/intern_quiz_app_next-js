import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";


export async function middleware(req: NextRequest) {


  const role = (await getCookie("teacherId", { req })) as string;
  console.log("middleware is running", role);
  
  // Prevent infinite redirects



  if(!role){
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to these routes (excluding API and static files)
export const config = {
  matcher: ["/", "/dashboard", "/create-quiz", "/edit/", "/logout"],
};

  