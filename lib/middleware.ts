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

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}