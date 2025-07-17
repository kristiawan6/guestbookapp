import { NextRequest, NextResponse } from "next/server";
import { updateUser, deleteUser } from "@/lib/services/userService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { userSchema } from "@/lib/validations";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const validation = userSchema.partial().safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const user = await updateUser(params.id, validation.data);
    return apiResponse("success", "User updated successfully", user, null, null, 200);
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, null, null, 400);
    }
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "SuperAdmin") {
      return apiResponse("error", "Forbidden", null, null, null, 403);
    }

    await deleteUser(params.id);
    return apiResponse("success", "User deleted successfully", null, null, null, 204);
  } catch (err) {
    return apiResponse("error", "Unauthorized", null, null, null, 401);
  }
}