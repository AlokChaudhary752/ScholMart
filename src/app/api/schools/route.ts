import { NextResponse } from "next/server";
import { z } from "zod";
import { INITIAL_SCHOOLS } from "@/lib/mockData";

const createSchoolSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  code: z.string().min(2, "Code must be at least 2 characters"),
  affiliation: z.enum(["CBSE", "ICSE", "IB", "Cambridge"]),
  city: z.string().min(2),
  state: z.string().min(2),
  contactPerson: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(10),
  studentStrength: z.number().positive(),
  creditLimit: z.number().nonnegative(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const affiliation = searchParams.get("affiliation");

  let result = INITIAL_SCHOOLS;

  if (q) {
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    );
  }

  if (affiliation && affiliation !== "ALL") {
    result = result.filter((s) => s.affiliation === affiliation);
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
    const validated = createSchoolSchema.parse(body);

    const newSchool = {
      id: `sch-${Date.now()}`,
      ...validated,
      logo: validated.name.substring(0, 3).toUpperCase(),
      creditDays: 30,
      outstandingBalance: 0,
      activeOrdersCount: 0,
      academicSession: "2025-2026",
      gstin: "07XXXXX9999X1Z1",
      status: "Active" as const,
      address: `${validated.city}, ${validated.state}`,
    };

    return NextResponse.json(
      {
        success: true,
        message: "School successfully registered in ERP",
        data: newSchool,
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
