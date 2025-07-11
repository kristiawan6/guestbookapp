import { NextRequest, NextResponse } from "next/server";
import { exportGuests } from "@/lib/services/guestService";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  await req.json().catch(() => ({})); // Await the request body to be parsed
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);
    const buffer = await exportGuests(params.eventId);
    const headers = new Headers();
    headers.append(
      "Content-Disposition",
      `attachment; filename="guests.xlsx"`
    );
    headers.append(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    return new Response(buffer, { headers });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}