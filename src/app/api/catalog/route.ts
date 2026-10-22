import { NextResponse } from "next/server";
import { INITIAL_CATALOG } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const season = searchParams.get("season");

  let result = INITIAL_CATALOG;

  if (category && category !== "ALL") {
    result = result.filter((i) => i.category === category);
  }

  if (season && season !== "ALL") {
    result = result.filter((i) => i.season === season);
  }

  return NextResponse.json({
    success: true,
    total: result.length,
    data: result,
  });
}
