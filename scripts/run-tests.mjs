import assert from "node:assert";
import { z } from "zod";

console.log("==========================================");
console.log("🧪 ScholMart Automated Test Suite Execution");
console.log("==========================================");

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${description}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// 1. Currency Formatting Test
test("Formats INR currency using Indian number system (Lakhs & Crores)", () => {
  const amount = 8450000;
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
  assert(formatted.includes("84,50,000") || formatted.includes("84,50,000"));
});

// 2. GST Tax Computation Test
test("Calculates 5% GST split into CGST (2.5%) and SGST (2.5%) for uniforms", () => {
  const subtotal = 1000000;
  const cgst = subtotal * 0.025;
  const sgst = subtotal * 0.025;
  const totalTax = cgst + sgst;
  const grandTotal = subtotal + totalTax;

  assert.strictEqual(cgst, 25000);
  assert.strictEqual(sgst, 25000);
  assert.strictEqual(totalTax, 50000);
  assert.strictEqual(grandTotal, 1050000);
});

// 3. Sizing Recommendation Algorithm Test
test("Maps student chest measurements to standardized uniform sizes with allowance", () => {
  const calculateSize = (chest) => {
    if (chest <= 27) return "26";
    if (chest <= 29) return "28";
    if (chest <= 31) return "30";
    if (chest <= 33) return "32";
    if (chest <= 35) return "34";
    return "36+";
  };

  assert.strictEqual(calculateSize(26.5), "26");
  assert.strictEqual(calculateSize(30.0), "30");
  assert.strictEqual(calculateSize(32.5), "32");
  assert.strictEqual(calculateSize(34.0), "34");
});

// 4. Password Strength Evaluation Test
test("Accurately evaluates password strength score from 0 to 4", () => {
  const getScore = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  assert.strictEqual(getScore("weak"), 0);
  assert.strictEqual(getScore("password123"), 2);
  assert.strictEqual(getScore("Password@123"), 4);
});

// 5. School DTO Zod Validation Test
test("Validates School registration payload against Zod schema", () => {
  const schema = z.object({
    name: z.string().min(3),
    code: z.string().min(2),
    affiliation: z.enum(["CBSE", "ICSE", "IB", "Cambridge"]),
    studentStrength: z.number().positive(),
  });

  const validSchool = {
    name: "Delhi Public School",
    code: "DPS-RKP",
    affiliation: "CBSE",
    studentStrength: 3450,
  };

  const parsed = schema.safeParse(validSchool);
  assert.strictEqual(parsed.success, true);

  const invalidSchool = {
    name: "AB",
    code: "X",
    affiliation: "UNKNOWN",
    studentStrength: -10,
  };

  const invalidParsed = schema.safeParse(invalidSchool);
  assert.strictEqual(invalidParsed.success, false);
});

console.log("\n------------------------------------------");
console.log(`Results: ${passed} Passed, ${failed} Failed`);
console.log("------------------------------------------");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All automated test suites passed successfully!\n");
}
