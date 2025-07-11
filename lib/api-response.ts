import { NextResponse } from "next/server";

type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T | null;
  errors: any[] | null;
  meta: {
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  } | null;
};

export function apiResponse<T>(
  status: "success" | "error",
  message: string,
  data: T | null,
  errors: any[] | null,
  meta: {
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  } | null,
  statusCode: number
): NextResponse {
  const response: ApiResponse<T> = {
    status,
    message,
    data,
    errors,
    meta,
  };
  return NextResponse.json(response, { status: statusCode });
}