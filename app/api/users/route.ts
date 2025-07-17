import { NextRequest, NextResponse } from "next/server";
import { createUser, getUsers } from "@/lib/services/userService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { userSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, null, null, 403);
    }

    const users = await getUsers();
    return apiResponse("success", "Users retrieved successfully", users, null, null, 200);
  } catch (err) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, null, null, 403);
    }

    const body = await req.json();
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const user = await createUser(validation.data);
    return apiResponse("success", "User created successfully", user, null, null, 201);
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, null, null, 400);
    }
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}