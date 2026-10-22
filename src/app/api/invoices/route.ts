import { NextResponse } from "next/server";
import { INITIAL_INVOICES } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let result = INITIAL_INVOICES;

  if (status && status !== "ALL") {
    result = result.filter((i) => i.status === status);
  }

  return NextResponse.json({
    success: true,
    total: result.length,
    data: result,
  });
}
