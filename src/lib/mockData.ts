export interface SchoolData {
  id: string;
  name: string;
  code: string;
  logo: string;
  affiliation: "CBSE" | "ICSE" | "IB" | "Cambridge";
  city: string;
  state: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  studentStrength: number;
  creditLimit: number;
  creditDays: number;
  outstandingBalance: number;
  activeOrdersCount: number;
  academicSession: string;
  gstin: string;
  status: "Active" | "Contract Renewal Due" | "Archived";
  address: string;
}

export interface CatalogItemData {
  id: string;
  sku: string;
  name: string;
  category: "Shirt" | "Trouser" | "Skirt" | "Blazer" | "Sweater" | "Tie" | "Sports Kit" | "Belt";
  gender: "Boys" | "Girls" | "Unisex";
  season: "Regular" | "Winter" | "Sports" | "House";
  fabric: string;
  colorName: string;
  colorHex: string;
  basePrice: number;
  bulkPrice500: number;
  bulkPrice1000: number;
  availableSizes: string[];
  stockQuantity: number;
  embroideryPlacement: string;
  schoolsSupplied: string[];
}

export const INITIAL_SCHOOLS: SchoolData[] = [
  {
    id: "sch-1",
    name: "Delhi Public School (DPS)",
    code: "DPS-RKP",
    logo: "DPS",
    affiliation: "CBSE",
    city: "New Delhi",
    state: "Delhi",
    contactPerson: "Dr. Sunita Varma (Principal)",
    contactEmail: "principal@dpsrkp.edu.in",
    contactPhone: "+91 98110 44550",
    studentStrength: 3450,
    creditLimit: 2500000,
    creditDays: 30,
    outstandingBalance: 420000,
    activeOrdersCount: 3,
    academicSession: "2025-2026",
    gstin: "07AAAAA0000A1Z5",
    status: "Active",
    address: "Sector XII, R.K. Puram, New Delhi - 110022",
  },
  {
    id: "sch-2",
    name: "The Heritage School",
    code: "THS-GGN",
    logo: "THS",
    affiliation: "IB",
    city: "Gurugram",
    state: "Haryana",
    contactPerson: "Capt. Rajesh Nair (Director Admin)",
    contactEmail: "admin@theheritageschool.in",
    contactPhone: "+91 98220 99881",
    studentStrength: 2800,
    creditLimit: 3000000,
    creditDays: 45,
    outstandingBalance: 890000,
    activeOrdersCount: 2,
    academicSession: "2025-2026",
    gstin: "06BBBBB1111B2Z6",
    status: "Active",
    address: "Sector 62, Golf Course Ext. Rd, Gurugram - 122011",
  },
  {
    id: "sch-3",
    name: "St. Xavier's Senior High School",
    code: "STX-JPR",
    logo: "STX",
    affiliation: "ICSE",
    city: "Jaipur",
    state: "Rajasthan",
    contactPerson: "Fr. Thomas Mathew (Headmaster)",
    contactEmail: "headmaster@stxaviersjaipur.org",
    contactPhone: "+91 98330 77665",
    studentStrength: 2150,
    creditLimit: 1800000,
    creditDays: 30,
    outstandingBalance: 150000,
    activeOrdersCount: 4,
    academicSession: "2025-2026",
    gstin: "08CCCCC2222C3Z7",
    status: "Active",
    address: "Bhagwan Das Road, C-Scheme, Jaipur - 302001",
  },
  {
    id: "sch-4",
    name: "Vibgyor Roots & Rise",
    code: "VIB-BLR",
    logo: "VRR",
    affiliation: "Cambridge",
    city: "Bengaluru",
    state: "Karnataka",
    contactPerson: "Anita Deshmukh (Procurement Lead)",
    contactEmail: "procurement@vibgyorhigh.com",
    contactPhone: "+91 98440 33441",
    studentStrength: 1950,
    creditLimit: 2000000,
    creditDays: 30,
    outstandingBalance: 0,
    activeOrdersCount: 2,
    academicSession: "2025-2026",
    gstin: "29DDDDD3333D4Z8",
    status: "Active",
    address: "Marathahalli Whitefield Road, Bengaluru - 560037",
  },
  {
    id: "sch-5",
    name: "GD Goenka Signature School",
    code: "GDG-DEL",
    logo: "GDG",
    affiliation: "CBSE",
    city: "Gurugram",
    state: "Haryana",
    contactPerson: "R.K. Goel (Vice Chairman)",
    contactEmail: "rkgoel@gdgoenka.com",
    contactPhone: "+91 98550 11992",
    studentStrength: 2600,
    creditLimit: 2200000,
    creditDays: 45,
    outstandingBalance: 650000,
    activeOrdersCount: 1,
    academicSession: "2025-2026",
    gstin: "06EEEEE4444E5Z9",
    status: "Contract Renewal Due",
    address: "Sohna Road, Sector 48, Gurugram - 122001",
  },
];

export const INITIAL_CATALOG: CatalogItemData[] = [
  {
    id: "cat-1",
    sku: "SHIRT-OXF-BOY",
    name: "Executive Oxford Cotton Shirt (Half/Full Sleeve)",
    category: "Shirt",
    gender: "Boys",
    season: "Regular",
    fabric: "65% Egyptian Cotton, 35% Polyester (Anti-Wrinkle)",
    colorName: "Sky Blue",
    colorHex: "#D0E8FF",
    basePrice: 480,
    bulkPrice500: 420,
    bulkPrice1000: 385,
    availableSizes: ["28", "30", "32", "34", "36", "38", "40", "42"],
    stockQuantity: 1450,
    embroideryPlacement: "Left Chest Pocket (School Monogram)",
    schoolsSupplied: ["DPS-RKP", "THS-GGN", "GDG-DEL"],
  },
  {
    id: "cat-2",
    sku: "BLAZER-WL-NVY",
    name: "Classic Wool-Blend Tailored School Blazer",
    category: "Blazer",
    gender: "Unisex",
    season: "Winter",
    fabric: "70% Australian Wool, 30% Poly Viscose (380 GSM)",
    colorName: "Navy Blue",
    colorHex: "#0B192C",
    basePrice: 1650,
    bulkPrice500: 1480,
    bulkPrice1000: 1390,
    availableSizes: ["28", "30", "32", "34", "36", "38", "40", "42"],
    stockQuantity: 420,
    embroideryPlacement: "Left Breast Pocket (Gold Wire Crest) + Brass Buttons",
    schoolsSupplied: ["DPS-RKP", "STX-JPR", "THS-GGN"],
  },
  {
    id: "cat-3",
    sku: "TROUSER-PV-CHRC",
    name: "Heavy-Duty Pleated School Trousers",
    category: "Trouser",
    gender: "Boys",
    season: "Regular",
    fabric: "Poly-Viscose Twill with Stain-Resistant Teflon Coating",
    colorName: "Charcoal Grey",
    colorHex: "#374151",
    basePrice: 590,
    bulkPrice500: 520,
    bulkPrice1000: 480,
    availableSizes: ["28", "30", "32", "34", "36", "38", "40"],
    stockQuantity: 980,
    embroideryPlacement: "None (Internal Name Tag Label)",
    schoolsSupplied: ["DPS-RKP", "STX-JPR", "GDG-DEL"],
  },
  {
    id: "cat-4",
    sku: "SKIRT-PLTD-MRN",
    name: "Permanent Knife-Pleated School Skirt",
    category: "Skirt",
    gender: "Girls",
    season: "Regular",
    fabric: "Wrinkle-Proof Poly-Viscose Blend with Elasticated Waist",
    colorName: "Royal Maroon",
    colorHex: "#4A0E17",
    basePrice: 560,
    bulkPrice500: 495,
    bulkPrice1000: 460,
    availableSizes: ["24", "26", "28", "30", "32", "34", "36"],
    stockQuantity: 740,
    embroideryPlacement: "Left Hem Monogram",
    schoolsSupplied: ["STX-JPR", "VIB-BLR"],
  },
  {
    id: "cat-5",
    sku: "SWTR-VNCK-GRN",
    name: "V-Neck Fine-Gauge Acrylic Winter Sweater",
    category: "Sweater",
    gender: "Unisex",
    season: "Winter",
    fabric: "100% Cashmilon Anti-Pilling Soft Acrylic Yarn",
    colorName: "Bottle Green",
    colorHex: "#0E3B24",
    basePrice: 680,
    bulkPrice500: 610,
    bulkPrice1000: 570,
    availableSizes: ["28", "30", "32", "34", "36", "38", "40", "42"],
    stockQuantity: 620,
    embroideryPlacement: "Left Chest Embroidered Logo",
    schoolsSupplied: ["VIB-BLR", "THS-GGN"],
  },
  {
    id: "cat-6",
    sku: "SPT-KIT-DRY",
    name: "House Sports Track T-Shirt & Shorts Kit",
    category: "Sports Kit",
    gender: "Unisex",
    season: "Sports",
    fabric: "Micro-Polyester Dry-Fit Breathable Honeycomb Mesh",
    colorName: "Ruby Red / Royal Blue / Emerald / Sun Yellow",
    colorHex: "#FF6500",
    basePrice: 520,
    bulkPrice500: 460,
    bulkPrice1000: 420,
    availableSizes: ["26", "28", "30", "32", "34", "36", "38", "40"],
    stockQuantity: 1850,
    embroideryPlacement: "Sublimated House Crest on Chest & Back School Name",
    schoolsSupplied: ["DPS-RKP", "THS-GGN", "STX-JPR", "VIB-BLR", "GDG-DEL"],
  },
];

export const KPI_STATS = {
  totalSchools: 154,
  activeOrders: 28,
  monthlyRevenueINR: 8450000,
  pendingPaymentsINR: 2110000,
  lowStockItemsCount: 6,
  deliveriesDueThisWeek: 9,
};

export const REVENUE_TREND_DATA = [
  { month: "May", revenue: 4200000, productionPieces: 9200 },
  { month: "Jun", revenue: 8450000, productionPieces: 18400 },
  { month: "Jul", revenue: 7900000, productionPieces: 16800 },
  { month: "Aug", revenue: 3100000, productionPieces: 6500 },
  { month: "Sep", revenue: 2800000, productionPieces: 5900 },
  { month: "Oct", revenue: 5400000, productionPieces: 11200 },
  { month: "Nov", revenue: 6800000, productionPieces: 14600 },
];

export const SCHOOL_SALES_SHARE = [
  { name: "Delhi Public School", value: 34, color: "#0B192C" },
  { name: "The Heritage School", value: 24, color: "#FF6500" },
  { name: "St. Xavier's High School", value: 18, color: "#3B82F6" },
  { name: "GD Goenka Signature", value: 14, color: "#10B981" },
  { name: "Vibgyor Roots & Rise", value: 10, color: "#F59E0B" },
];

export const RECENT_ACTIVITIES = [
  {
    id: "act-1",
    action: "Order Confirmed",
    detail: "DPS R.K. Puram confirmed Winter Uniform PO #ORD-2026-084 for 1,200 blazers.",
    time: "25 minutes ago",
    type: "order",
  },
  {
    id: "act-2",
    action: "QC Audit Passed",
    detail: "Batch #QC-588 (450 Boys Oxford Shirts) cleared 4-eye audit at Unit 2.",
    time: "2 hours ago",
    type: "production",
  },
  {
    id: "act-3",
    action: "Payment Received",
    detail: "₹4,20,000 received from St. Xavier's High School via NEFT/RTGS.",
    time: "4 hours ago",
    type: "payment",
  },
  {
    id: "act-4",
    action: "Dispatch Scheduled",
    detail: "Truck DL-1L-8842 scheduled for The Heritage School (640 Student Kits).",
    time: "Yesterday at 4:30 PM",
    type: "delivery",
  },
];

export const AI_SUPPLY_INSIGHTS = [
  {
    id: "ins-1",
    severity: "warning",
    school: "GD Goenka Signature",
    insight:
      "GD Goenka has not placed their annual winter cardigan order yet. Their previous year order was booked by October 15. Recommend reaching out to R.K. Goel.",
  },
  {
    id: "ins-2",
    severity: "alert",
    school: "Main Warehouse A",
    insight:
      "Navy suiting fabric raw stock is down to 320 meters (reorder threshold 500m). Loom lead time is 12 days; recommend creating PO for Raymond Mill today.",
  },
  {
    id: "ins-3",
    severity: "positive",
    school: "The Heritage School",
    insight:
      "Digital student sizing camp achieved 99.4% contactless match rate with only 3 exchange requests reported.",
  },
];

// ==========================================
// PHASE 5: ORDERS, SIZING, INVENTORY & PRODUCTION
// ==========================================

export type OrderPipelineStatus =
  | "DRAFT"
  | "QUOTATION_SENT"
  | "CONFIRMED"
  | "IN_PRODUCTION"
  | "QUALITY_CHECK"
  | "READY"
  | "DISPATCHED"
  | "DELIVERED";

export interface OrderRecord {
  id: string;
  orderNumber: string;
  schoolId: string;
  schoolName: string;
  itemsSummary: string;
  totalQuantity: number;
  subtotal: number;
  gstTotal: number;
  grandTotal: number;
  status: OrderPipelineStatus;
  targetDelivery: string;
  createdDate: string;
  notes: string;
}

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "ord-1",
    orderNumber: "ORD-2026-084",
    schoolId: "sch-1",
    schoolName: "Delhi Public School (DPS)",
    itemsSummary: "1,200 Wool Blazers + 2,400 Oxford Shirts",
    totalQuantity: 3600,
    subtotal: 2840000,
    gstTotal: 142000,
    grandTotal: 2982000,
    status: "IN_PRODUCTION",
    targetDelivery: "2026-11-15",
    createdDate: "2026-10-18",
    notes: "Requires DPS gold-crested buttons on all size 32-40 blazers.",
  },
  {
    id: "ord-2",
    orderNumber: "ORD-2026-085",
    schoolId: "sch-2",
    schoolName: "The Heritage School",
    itemsSummary: "850 Pleated Skirts + 850 Sky Blue Shirts",
    totalQuantity: 1700,
    subtotal: 820000,
    gstTotal: 41000,
    grandTotal: 861000,
    status: "QUALITY_CHECK",
    targetDelivery: "2026-11-05",
    createdDate: "2026-10-12",
    notes: "Pre-sorted in class-wise eco bags for Grade 6 to 10.",
  },
  {
    id: "ord-3",
    orderNumber: "ORD-2026-086",
    schoolId: "sch-3",
    schoolName: "St. Xavier's Senior High School",
    itemsSummary: "1,500 Charcoal Trousers + 600 House Sports Kits",
    totalQuantity: 2100,
    subtotal: 1040000,
    gstTotal: 52000,
    grandTotal: 1092000,
    status: "CONFIRMED",
    targetDelivery: "2026-11-20",
    createdDate: "2026-10-20",
    notes: "House kit colors split evenly: 375 Red, 375 Blue, 375 Green, 375 Yellow.",
  },
  {
    id: "ord-4",
    orderNumber: "ORD-2026-087",
    schoolId: "sch-4",
    schoolName: "Vibgyor Roots & Rise",
    itemsSummary: "950 V-Neck Cardigans",
    totalQuantity: 950,
    subtotal: 580000,
    gstTotal: 29000,
    grandTotal: 609000,
    status: "READY",
    targetDelivery: "2026-10-28",
    createdDate: "2026-10-05",
    notes: "Packed in carton boxes with tamper-evident seal for Whitefield campus.",
  },
  {
    id: "ord-5",
    orderNumber: "ORD-2026-088",
    schoolId: "sch-5",
    schoolName: "GD Goenka Signature School",
    itemsSummary: "600 Winter Blazers + 1,200 Regular Trousers",
    totalQuantity: 1800,
    subtotal: 1520000,
    gstTotal: 76000,
    grandTotal: 1596000,
    status: "QUOTATION_SENT",
    targetDelivery: "2026-11-30",
    createdDate: "2026-10-21",
    notes: "Quotation sent to R.K. Goel; waiting for formal board purchase approval.",
  },
  {
    id: "ord-6",
    orderNumber: "ORD-2026-083",
    schoolId: "sch-1",
    schoolName: "Delhi Public School (DPS)",
    itemsSummary: "3,400 Sports House T-Shirts",
    totalQuantity: 3400,
    subtotal: 1428000,
    gstTotal: 71400,
    grandTotal: 1499400,
    status: "DISPATCHED",
    targetDelivery: "2026-10-24",
    createdDate: "2026-09-28",
    notes: "Vehicle DL-1L-8842 dispatched with live GPS tracking.",
  },
];

export interface StudentMeasurement {
  id: string;
  admissionNo: string;
  studentName: string;
  schoolName: string;
  classGrade: string;
  chestInches: number;
  waistInches: number;
  shoulderInches: number;
  recommendedSize: string;
  fitStatus: "Perfect Fit" | "Exchange Requested" | "Alteration Done";
  academicYear: string;
}

export const INITIAL_MEASUREMENTS: StudentMeasurement[] = [
  {
    id: "m-1",
    admissionNo: "DPS-2025-412",
    studentName: "Aarav Sharma",
    schoolName: "Delhi Public School (DPS)",
    classGrade: "Grade 7-B",
    chestInches: 31.5,
    waistInches: 27.0,
    shoulderInches: 14.5,
    recommendedSize: "32",
    fitStatus: "Perfect Fit",
    academicYear: "2025-2026",
  },
  {
    id: "m-2",
    admissionNo: "DPS-2025-413",
    studentName: "Ananya Iyer",
    schoolName: "Delhi Public School (DPS)",
    classGrade: "Grade 7-B",
    chestInches: 29.5,
    waistInches: 25.5,
    shoulderInches: 13.5,
    recommendedSize: "30",
    fitStatus: "Perfect Fit",
    academicYear: "2025-2026",
  },
  {
    id: "m-3",
    admissionNo: "THS-2025-881",
    studentName: "Kabir Malhotra",
    schoolName: "The Heritage School",
    classGrade: "Grade 9-A",
    chestInches: 34.0,
    waistInches: 30.0,
    shoulderInches: 15.5,
    recommendedSize: "36",
    fitStatus: "Exchange Requested",
    academicYear: "2025-2026",
  },
  {
    id: "m-4",
    admissionNo: "STX-2025-104",
    studentName: "Rohan Deshmukh",
    schoolName: "St. Xavier's Senior High School",
    classGrade: "Grade 11-Science",
    chestInches: 38.0,
    waistInches: 32.5,
    shoulderInches: 17.0,
    recommendedSize: "40",
    fitStatus: "Perfect Fit",
    academicYear: "2025-2026",
  },
  {
    id: "m-5",
    admissionNo: "VIB-2025-092",
    studentName: "Diya Pillai",
    schoolName: "Vibgyor Roots & Rise",
    classGrade: "Grade 5-Rose",
    chestInches: 27.0,
    waistInches: 24.0,
    shoulderInches: 12.5,
    recommendedSize: "28",
    fitStatus: "Alteration Done",
    academicYear: "2025-2026",
  },
];

export interface RawMaterialStock {
  id: string;
  sku: string;
  name: string;
  type: "Fabric" | "Thread" | "Buttons" | "Zippers" | "Labels";
  warehouse: string;
  currentStock: number;
  unit: "Meters" | "Reels" | "Gross" | "Thousands";
  reorderLevel: number;
  supplier: string;
  status: "Optimal" | "Low Stock" | "Critical";
  unitCost: number;
}

export const INITIAL_RAW_INVENTORY: RawMaterialStock[] = [
  {
    id: "inv-1",
    sku: "FAB-RAY-NVY",
    name: "Navy Suiting Wool-Viscose Twill Fabric (380 GSM)",
    type: "Fabric",
    warehouse: "Main Warehouse A (Okhla)",
    currentStock: 320,
    unit: "Meters",
    reorderLevel: 500,
    supplier: "Raymond Mills Ltd.",
    status: "Low Stock",
    unitCost: 380,
  },
  {
    id: "inv-2",
    sku: "FAB-OXF-WHT",
    name: "Egyptian Cotton Oxford Shirting Fabric (Anti-Wrinkle)",
    type: "Fabric",
    warehouse: "Main Warehouse A (Okhla)",
    currentStock: 2400,
    unit: "Meters",
    reorderLevel: 800,
    supplier: "Arvind Mills Ltd.",
    status: "Optimal",
    unitCost: 145,
  },
  {
    id: "inv-3",
    sku: "THRD-MAD-GLD",
    name: "Madeira Metallic Gold Embroidery Thread (5,000m Reels)",
    type: "Thread",
    warehouse: "Unit 2 Embroidery Hub",
    currentStock: 48,
    unit: "Reels",
    reorderLevel: 25,
    supplier: "Madeira India",
    status: "Optimal",
    unitCost: 420,
  },
  {
    id: "inv-4",
    sku: "BTN-BRS-DPS",
    name: "DPS Institutional 24L Embossed Brass Blazer Buttons",
    type: "Buttons",
    warehouse: "Main Warehouse A (Okhla)",
    currentStock: 120,
    unit: "Gross",
    reorderLevel: 80,
    supplier: "Metal Trims India",
    status: "Optimal",
    unitCost: 180,
  },
  {
    id: "inv-5",
    sku: "ZIP-YKK-NVY",
    name: "YKK 7-inch Concealed Nylon Zippers (Navy & Charcoal)",
    type: "Zippers",
    warehouse: "Main Warehouse A (Okhla)",
    currentStock: 350,
    unit: "Thousands",
    reorderLevel: 500,
    supplier: "YKK Fastening India",
    status: "Low Stock",
    unitCost: 4.5,
  },
];

export interface ProductionOrderRecord {
  id: string;
  batchCode: string;
  orderNumber: string;
  schoolName: string;
  garmentName: string;
  totalPieces: number;
  stage: "CUTTING" | "STITCHING" | "EMBROIDERY" | "FINISHING" | "QC_AUDIT" | "PACKED";
  assignedTailor: string;
  piecesCut: number;
  piecesStitched: number;
  piecesEmbroidered: number;
  piecesPacked: number;
  qcRejected: number;
  qcPassed: number;
  targetDate: string;
}

export const INITIAL_PRODUCTION_BATCHES: ProductionOrderRecord[] = [
  {
    id: "prod-1",
    batchCode: "BATCH-BLZ-092",
    orderNumber: "ORD-2026-084",
    schoolName: "Delhi Public School (DPS)",
    garmentName: "Boys Wool-Blend Winter Blazer (Navy)",
    totalPieces: 1200,
    stage: "EMBROIDERY",
    assignedTailor: "Unit 2 Embroidery Line (Master Akhtar)",
    piecesCut: 1200,
    piecesStitched: 1050,
    piecesEmbroidered: 720,
    piecesPacked: 400,
    qcRejected: 8,
    qcPassed: 392,
    targetDate: "2026-11-10",
  },
  {
    id: "prod-2",
    batchCode: "BATCH-SHR-104",
    orderNumber: "ORD-2026-085",
    schoolName: "The Heritage School",
    garmentName: "Sky Blue Oxford Cotton Shirt",
    totalPieces: 850,
    stage: "QC_AUDIT",
    assignedTailor: "Stitching Line A (Iqbal & Co.)",
    piecesCut: 850,
    piecesStitched: 850,
    piecesEmbroidered: 850,
    piecesPacked: 780,
    qcRejected: 4,
    qcPassed: 776,
    targetDate: "2026-11-04",
  },
  {
    id: "prod-3",
    batchCode: "BATCH-SPT-331",
    orderNumber: "ORD-2026-086",
    schoolName: "St. Xavier's Senior High School",
    garmentName: "Dry-Fit House Sports Track Kit",
    totalPieces: 600,
    stage: "CUTTING",
    assignedTailor: "Laser Cut Unit (Master Surendra)",
    piecesCut: 450,
    piecesStitched: 120,
    piecesEmbroidered: 100,
    piecesPacked: 0,
    qcRejected: 0,
    qcPassed: 0,
    targetDate: "2026-11-18",
  },
];

// ==========================================
// PHASE 6: BILLING, PAYMENTS, DELIVERY & REPORTS
// ==========================================

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  schoolName: string;
  schoolGstin: string;
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  grandTotal: number;
  paidAmount: number;
  balanceDue: number;
  dueDate: string;
  createdDate: string;
  status: "PAID" | "PENDING" | "PARTIAL" | "OVERDUE";
}

export const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: "inv-01",
    invoiceNumber: "INV-2026-0182",
    orderNumber: "ORD-2026-084",
    schoolName: "Delhi Public School (DPS)",
    schoolGstin: "07AAAAA0000A1Z5",
    subtotal: 2840000,
    cgst: 71000,
    sgst: 71000,
    igst: 0,
    grandTotal: 2982000,
    paidAmount: 2562000,
    balanceDue: 420000,
    dueDate: "2026-11-20",
    createdDate: "2026-10-18",
    status: "PARTIAL",
  },
  {
    id: "inv-02",
    invoiceNumber: "INV-2026-0183",
    orderNumber: "ORD-2026-085",
    schoolName: "The Heritage School",
    schoolGstin: "06BBBBB1111B2Z6",
    subtotal: 820000,
    cgst: 0,
    sgst: 0,
    igst: 41000,
    grandTotal: 861000,
    paidAmount: 0,
    balanceDue: 861000,
    dueDate: "2026-11-12",
    createdDate: "2026-10-12",
    status: "PENDING",
  },
  {
    id: "inv-03",
    invoiceNumber: "INV-2026-0180",
    orderNumber: "ORD-2026-082",
    schoolName: "St. Xavier's Senior High School",
    schoolGstin: "08CCCCC2222C3Z7",
    subtotal: 1040000,
    cgst: 0,
    sgst: 0,
    igst: 52000,
    grandTotal: 1092000,
    paidAmount: 1092000,
    balanceDue: 0,
    dueDate: "2026-10-15",
    createdDate: "2026-09-15",
    status: "PAID",
  },
  {
    id: "inv-04",
    invoiceNumber: "INV-2026-0179",
    orderNumber: "ORD-2026-079",
    schoolName: "GD Goenka Signature School",
    schoolGstin: "06EEEEE4444E5Z9",
    subtotal: 619000,
    cgst: 0,
    sgst: 0,
    igst: 31000,
    grandTotal: 650000,
    paidAmount: 0,
    balanceDue: 650000,
    dueDate: "2026-10-01",
    createdDate: "2026-08-30",
    status: "OVERDUE",
  },
];

export interface PaymentReceipt {
  id: string;
  receiptNumber: string;
  schoolName: string;
  invoiceNumber: string;
  amount: number;
  mode: "NEFT / RTGS" | "CHEQUE" | "UPI" | "RAZORPAY_GATEWAY";
  referenceNumber: string;
  paymentDate: string;
}

export const INITIAL_PAYMENTS: PaymentReceipt[] = [
  {
    id: "pay-1",
    receiptNumber: "RCT-2026-094",
    schoolName: "Delhi Public School (DPS)",
    invoiceNumber: "INV-2026-0182",
    amount: 2562000,
    mode: "NEFT / RTGS",
    referenceNumber: "HDFCN26284910381",
    paymentDate: "2026-10-19",
  },
  {
    id: "pay-2",
    receiptNumber: "RCT-2026-093",
    schoolName: "St. Xavier's Senior High School",
    invoiceNumber: "INV-2026-0180",
    amount: 1092000,
    mode: "CHEQUE",
    referenceNumber: "CHQ-004819 (SBI Bank)",
    paymentDate: "2026-10-14",
  },
  {
    id: "pay-3",
    receiptNumber: "RCT-2026-092",
    schoolName: "Vibgyor Roots & Rise",
    invoiceNumber: "INV-2026-0176",
    amount: 580000,
    mode: "RAZORPAY_GATEWAY",
    referenceNumber: "pay_KxL48201aB4c9",
    paymentDate: "2026-10-08",
  },
];

export interface DeliveryShipment {
  id: string;
  trackingNumber: string;
  schoolName: string;
  orderNumber: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  destinationCity: string;
  status: "SCHEDULED" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED";
  dispatchedDate: string;
  etaDate: string;
  totalCartons: number;
  proofSignedBy?: string;
}

export const INITIAL_SHIPMENTS: DeliveryShipment[] = [
  {
    id: "shp-1",
    trackingNumber: "SM-EXP-2026-881",
    schoolName: "Delhi Public School (DPS)",
    orderNumber: "ORD-2026-083",
    vehicleNumber: "DL-1L-8842 (Ashok Leyland 16ft)",
    driverName: "Suraj Pal Singh",
    driverPhone: "+91 98101 22334",
    destinationCity: "R.K. Puram, New Delhi",
    status: "IN_TRANSIT",
    dispatchedDate: "2026-10-22",
    etaDate: "2026-10-23",
    totalCartons: 42,
  },
  {
    id: "shp-2",
    trackingNumber: "SM-EXP-2026-880",
    schoolName: "The Heritage School",
    orderNumber: "ORD-2026-081",
    vehicleNumber: "HR-55-9012 (Tata 407)",
    driverName: "Dharmendra Yadav",
    driverPhone: "+91 98202 33445",
    destinationCity: "Sector 62, Gurugram",
    status: "DELIVERED",
    dispatchedDate: "2026-10-18",
    etaDate: "2026-10-19",
    totalCartons: 28,
    proofSignedBy: "K.P. Sharma (Stores Officer, DPS)",
  },
  {
    id: "shp-3",
    trackingNumber: "SM-EXP-2026-879",
    schoolName: "Vibgyor Roots & Rise",
    orderNumber: "ORD-2026-078",
    vehicleNumber: "KA-01-4491 (Eicher Pro)",
    driverName: "M. Venkatesh",
    driverPhone: "+91 98404 55667",
    destinationCity: "Whitefield, Bengaluru",
    status: "DELIVERED",
    dispatchedDate: "2026-10-10",
    etaDate: "2026-10-12",
    totalCartons: 35,
    proofSignedBy: "Anita Deshmukh (Admin Lead)",
  },
];


