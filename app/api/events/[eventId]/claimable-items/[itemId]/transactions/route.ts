import { NextRequest, NextResponse } from "next/server";
import {
  recordClaimTransaction,
  getClaimTransactions,
} from "@/lib/services/claimService";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);
    const transactions = await getClaimTransactions(params.itemId);
    return NextResponse.json(transactions);
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const body = await req.json();
    const transaction = await recordClaimTransaction(
      params.itemId,
      body.guestId,
      payload.userId as string
    );
    return NextResponse.json(transaction, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}