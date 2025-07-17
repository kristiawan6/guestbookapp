import { cookies } from "next/headers";
import { apiResponse } from "@/lib/api-response";

export async function POST() {
  try {
    (await cookies()).set("token", "", { expires: new Date(0) });
    return apiResponse("success", "Logged out successfully", null, null, null, 200);
  } catch {
    return apiResponse("error", "An error occurred during logout", null, null, null, 500);
  }
}