import { NextResponse } from "next/server";
import { z } from "zod";
import { INITIAL_ORDERS } from "@/lib/mockData";

const createOrderSchema = z.object({
  schoolId: z.string(),
  schoolName: z.string(),
  itemsSummary: z.string(),
  totalQuantity: z.number().positive(),
  subtotal: z.number().positive(),
  targetDelivery: z.string(),
  notes: z.string().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let result = INITIAL_ORDERS;

  if (status && status !== "ALL") {
    result = result.filter((o) => o.status === status);
  }

  return NextResponse.json({
    success: true,
    total: result.length,
    data: result,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createOrderSchema.parse(body);

    const gstTotal = validated.subtotal * 0.05;
    const grandTotal = validated.subtotal + gstTotal;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-2026-0${INITIAL_ORDERS.length + 85}`,
      ...validated,
      gstTotal,
      grandTotal,
      status: "CONFIRMED" as const,
      createdDate: new Date().toISOString().split("T")[0],
      notes: validated.notes || "",
    };

    return NextResponse.json(
      {
        success: true,
        message: "Order successfully generated",
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
