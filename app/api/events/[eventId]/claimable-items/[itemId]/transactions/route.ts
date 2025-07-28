import { NextRequest } from "next/server";
import {
  getClaimTransactions,
  recordClaimTransaction,
} from "@/lib/services/claimService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string; itemId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { itemId } = await params;
    const transactions = await getClaimTransactions(itemId);
    return apiResponse(
      "success",
      "Transactions retrieved successfully",
      transactions,
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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string; itemId: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    const decoded = await jwtVerify(token, secret);
    const adminId = decoded.payload.userId as string;
    const { itemId } = await params;
    const { guestId } = await req.json();
    const transaction = await recordClaimTransaction(itemId, guestId, adminId);
    return apiResponse(
      "success",
      "Transaction recorded successfully",
      transaction,
      null,
      null,
      201
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}