import { NextRequest, NextResponse } from "next/server";

export async function securityMiddleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-xss-protection", "1; mode=block");
  requestHeaders.set("x-frame-options", "SAMEORIGIN");
  requestHeaders.set("x-content-type-options", "nosniff");
  requestHeaders.set(
    "strict-transport-security",
    "max-age=31536000; includeSubDomains; preload"
  );

  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      return response;
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}