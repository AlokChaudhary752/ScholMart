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
