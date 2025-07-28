import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T | null;
  errors: ZodIssue[] | null;
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
  errors: ZodIssue[] | null,
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