import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { securityMiddleware } from "./lib/middleware";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  await securityMiddleware(req, res);

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const { pathname } = req.nextUrl;

    const adminRoles = ["SuperAdmin", "AdminEvents"];
    if (
      pathname.startsWith("/admin") &&
      !adminRoles.includes(payload.role as string)
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return res;
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};