import { NextRequest, NextResponse } from "next/server";
import {
  deleteBroadcastTemplate,
  updateBroadcastTemplate,
} from "@/lib/services/broadcastTemplateService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function PUT(
  req: NextRequest,
  { params }: { params: { templateId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const body = await req.json();
    const template = await updateBroadcastTemplate(params.templateId, body);
    return apiResponse(
      "success",
      "Broadcast template updated successfully",
      template,
      null,
      null,
      200
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { templateId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    await deleteBroadcastTemplate(params.templateId);
    return apiResponse(
      "success",
      "Broadcast template deleted successfully",
      null,
      null,
      null,
      200
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}