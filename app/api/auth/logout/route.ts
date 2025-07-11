import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).set("token", "", { expires: new Date(0) });
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during logout" },
      { status: 500 }
    );
  }
}