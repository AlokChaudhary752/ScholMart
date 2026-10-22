import { PrismaClient, UserRole, Gender, Season, ItemCategory, OrderStatus, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting ScholMart ERP database seeding...");

  // 1. Create Default Users
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@scholmart.com" },
    update: {},
    create: {
      email: "admin@scholmart.com",
      phone: "+919811054321",
      fullName: "Vikram Malhotra",
      passwordHash: "$2b$10$epOzJ9G6s5vL0f3v0s0Z8uK.D4qF9e1G3H5i7J9k1L3m5N7o9P1Q", // hashed demo password
      role: UserRole.SUPPLIER_ADMIN,
    },
  });

  // 2. Create Premier Schools
  const dps = await prisma.school.upsert({
    where: { code: "DPS-RKP" },
    update: {},
    create: {
      name: "Delhi Public School (DPS)",
      code: "DPS-RKP",
      affiliation: "CBSE",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110022",
      addressLine1: "Sector XII, R.K. Puram",
      contactPerson: "Dr. Sunita Varma (Principal)",
      contactEmail: "principal@dpsrkp.edu.in",
      contactPhone: "+919811044550",
      studentStrength: 3450,
      creditLimit: 2500000,
      creditDays: 30,
      gstin: "07AAAAA0000A1Z5",
      academicSession: "2025-2026",
    },
  });

  const heritage = await prisma.school.upsert({
    where: { code: "THS-GGN" },
    update: {},
    create: {
      name: "The Heritage School",
      code: "THS-GGN",
      affiliation: "IB",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122011",
      addressLine1: "Sector 62, Golf Course Ext. Rd",
      contactPerson: "Capt. Rajesh Nair (Director Admin)",
      contactEmail: "admin@theheritageschool.in",
      contactPhone: "+919822099881",
      studentStrength: 2800,
      creditLimit: 3000000,
      creditDays: 45,
      gstin: "06BBBBB1111B2Z6",
      academicSession: "2025-2026",
    },
  });

  const xaviers = await prisma.school.upsert({
    where: { code: "STX-JPR" },
    update: {},
    create: {
      name: "St. Xavier's Senior High School",
      code: "STX-JPR",
      affiliation: "ICSE",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      addressLine1: "Bhagwan Das Road, C-Scheme",
      contactPerson: "Fr. Thomas Mathew (Headmaster)",
      contactEmail: "headmaster@stxaviersjaipur.org",
      contactPhone: "+919833077665",
      studentStrength: 2150,
      creditLimit: 1800000,
      creditDays: 30,
      gstin: "08CCCCC2222C3Z7",
      academicSession: "2025-2026",
    },
  });

  // 3. Create Uniform Catalog Items
  const shirt = await prisma.uniformItem.upsert({
    where: { sku: "SHIRT-OXF-BOY" },
    update: {},
    create: {
      sku: "SHIRT-OXF-BOY",
      name: "Executive Oxford Cotton Shirt (Half/Full Sleeve)",
      category: ItemCategory.SHIRT,
      gender: Gender.BOYS,
      fabricDetails: "65% Egyptian Cotton, 35% Polyester (Anti-Wrinkle)",
      colorName: "Sky Blue",
      colorHex: "#D0E8FF",
      basePrice: 480,
      gstRate: 5.0,
      availableSizes: ["28", "30", "32", "34", "36", "38", "40", "42"],
      embroiderySpec: "Left Chest Pocket Monogram",
    },
  });

  const blazer = await prisma.uniformItem.upsert({
    where: { sku: "BLAZER-WL-NVY" },
    update: {},
    create: {
      sku: "BLAZER-WL-NVY",
      name: "Classic Wool-Blend Tailored School Blazer",
      category: ItemCategory.BLAZER,
      gender: Gender.UNISEX,
      fabricDetails: "70% Australian Wool, 30% Poly Viscose (380 GSM)",
      colorName: "Navy Blue",
      colorHex: "#0B192C",
      basePrice: 1650,
      gstRate: 5.0,
      availableSizes: ["28", "30", "32", "34", "36", "38", "40", "42"],
      embroiderySpec: "Left Breast Pocket (Gold Wire Crest) + Brass Buttons",
    },
  });

  // 4. Create Sample Orders
  const sampleOrder = await prisma.order.upsert({
    where: { orderNumber: "ORD-2026-084" },
    update: {},
    create: {
      orderNumber: "ORD-2026-084",
      schoolId: dps.id,
      userId: adminUser.id,
      status: OrderStatus.IN_PRODUCTION,
      academicSession: "2025-2026",
      totalQuantity: 3600,
      subtotal: 2840000,
      gstTotal: 142000,
      grandTotal: 2982000,
      targetDelivery: new Date("2026-11-15"),
      notes: "Requires DPS gold-crested buttons on all size 32-40 blazers.",
    },
  });

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
