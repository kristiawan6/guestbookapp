import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      include: { events: { include: { event: true } } },
    });

    if (!user) {
      return apiResponse("error", "User not found", null, [], null, 404);
    }

    return apiResponse(
      "success",
      "User retrieved successfully",
      user,
      null,
      null,
      200
    );
  } catch (err: any) {
    return apiResponse("error", err.message || "Unauthorized", null, [], null, 401);
  }
}