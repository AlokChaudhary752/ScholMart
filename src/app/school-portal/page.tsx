"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Truck,
  FileSpreadsheet,
  Download,
  Upload,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Package,
  Layers,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/utils";

export default function SchoolPortalPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "guidelines" | "roster" | "reorder" | "ledger">("overview");
  const [reorderSubmitted, setReorderSubmitted] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Active School Profile
  const school = {
    name: "Delhi Public School (DPS), R.K. Puram",
    code: "DPS-RKP",
    affiliation: "CBSE Affiliated • Senior Secondary",
    studentCount: 3450,
    academicSession: "2026 - 2027",
    accountManager: "Rajiv Malhotra (Sr. Institutional Key Account Lead)",
    managerPhone: "+91 98110 54321",
    managerEmail: "rajiv.m@scholmart.in",
    creditLimit: 2500000,
    outstanding: 420000,
  };

  const consignments = [
    {
      id: "CON-2026-904",
      orderRef: "ORD-2026-0891",
      title: "Class 9 & 10 Winter Blazers & Woolen Ties",
      quantity: 850,
      status: "Out for Delivery",
      eta: "Today, 3:30 PM",
      vehicle: "DL 1L AA 4821 (Tata Ace XL)",
      driver: "Mukesh Kumar (+91 98711 22334)",
    },
    {
      id: "CON-2026-882",
      orderRef: "ORD-2026-0810",
      title: "Class 1 to 5 Summer Poplin Shirts & Pinafores",
      quantity: 1400,
      status: "Stitching / Final QC",
      eta: "March 28, 2026",
      vehicle: "Scheduled Logistics Fleet",
      driver: "Assigned upon dispatch",
    },
  ];

  const uniformSpecs = [
    {
      item: "Senior Boys & Girls Winter Blazer",
      code: "DPS-BLZ-W",
      fabric: "70% Wool Poly Blend (280 GSM) Mill Dyed",
      colorCode: "#0B192C (Deep Midnight Navy)",
      embroidery: "Crest left chest pocket, Gold Rayon thread, 8,200 stitches",
      buttons: "Embossed Antique Brass Crest Buttons",
    },
    {
      item: "Regular School Poplin Shirt (Unisex)",
      code: "DPS-SHT-U",
      fabric: "100% Super Combed Compact Cotton Poplin (115 GSM)",
      colorCode: "#FFFFFF (Optical Bleached White)",
      embroidery: "Tone-on-tone DPS monogram on collar leaf",
      buttons: "Cross-stitched heat-resistant pearl white buttons",
    },
    {
      item: "Senior Boys Trousers / Girls Pleated Skirt",
      code: "DPS-BTM-01",
      fabric: "Terry Wool Suiting Fabric with Teflon stain-guard finish",
      colorCode: "#334155 (Charcoal Melange)",
      embroidery: "Inner woven size & name loop tag",
      buttons: "Heavy-duty YKK zipper + double waist hook",
    },
    {
      item: "Institutional House Striped Silk Ties",
      code: "DPS-TIE-H",
      fabric: "100% Micro-polyester Jacquard Weave",
      colorCode: "Navy base with Emerald & Crimson House diagonal stripes",
      embroidery: "Woven school motto label on tail",
      buttons: "N/A",
    },
  ];

  const invoices = [
    {
      invNo: "INV-2026-0341",
      date: "2026-03-10",
      description: "Batch 1 Winter Blazers & Ties (850 Units)",
      amount: 1420000,
      gst: 71000,
      total: 1491000,
      status: "PARTIALLY_PAID",
      dueBalance: 420000,
    },
    {
      invNo: "INV-2025-1102",
      date: "2025-11-20",
      description: "Sports Tracksuits & House T-Shirts (1,200 Units)",
      amount: 860000,
      gst: 43000,
      total: 903000,
      status: "PAID",
      dueBalance: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top School Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-amber-500 flex items-center justify-center text-white font-bold shadow-lg shadow-accent/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base sm:text-lg text-white">
                  {school.name}
                </span>
                <Badge variant="outline" className="border-accent/30 text-accent text-[10px] hidden sm:inline-flex">
                  Official Institutional Portal
                </Badge>
              </div>
              <div className="text-xs text-slate-400">{school.affiliation}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition hidden sm:inline-flex"
            >
              Parent Uniform Store &rarr;
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/90 text-xs font-semibold text-white transition shadow-sm"
            >
              Enterprise ERP
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        
        {/* Account Manager Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold">
              RM
            </div>
            <div>
              <div className="text-xs text-slate-400">Assigned ScholMart Account Director</div>
              <div className="text-sm font-bold text-white">{school.accountManager}</div>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-accent" /> {school.managerPhone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-accent" /> {school.managerEmail}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
            <div>
              <div className="text-xs text-slate-400">Approved Credit Line</div>
              <div className="text-base font-bold text-white">{formatINR(school.creditLimit)}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Current Outstanding</div>
              <div className="text-base font-bold text-amber-400">{formatINR(school.outstanding)}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Consignments & Tracking", icon: Truck },
            { id: "guidelines", label: "Authorized Uniform Specs", icon: Layers },
            { id: "roster", label: "Student Sizing Rosters", icon: FileSpreadsheet },
            { id: "reorder", label: "Session Re-Order Configurator", icon: Sparkles },
            { id: "ledger", label: "Financial Ledger & Invoices", icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & SHIPMENTS */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-white">Campus Deliveries & Live Consignments</h2>
              <p className="text-xs text-slate-400">Real-time status of wholesale uniform consignments dispatched to DPS campus stores.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consignments.map((con) => (
                <Card key={con.id} className="bg-slate-900 border-slate-800">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent">{con.id}</span>
                      <Badge
                        variant="secondary"
                        className={
                          con.status === "Out for Delivery"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }
                      >
                        {con.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm font-bold text-white mt-1">{con.title}</CardTitle>
                    <CardDescription className="text-xs text-slate-400">
                      Batch Quantity: <strong className="text-slate-200">{con.quantity} Units</strong> • Linked to {con.orderRef}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 text-xs space-y-3">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Estimated Delivery:</span>
                        <span className="font-bold text-emerald-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {con.eta}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Vehicle / Route:</span>
                        <span className="font-mono text-slate-200">{con.vehicle}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Driver Contact:</span>
                        <span className="text-slate-200 font-medium">{con.driver}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: UNIFORM GUIDELINES & SPECS */}
        {activeTab === "guidelines" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-white">Board-Approved School Uniform Specifications</h2>
              <p className="text-xs text-slate-400">Standardized institutional garment specifications, yarn counts, and computerized embroidery guidelines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uniformSpecs.map((spec) => (
                <div key={spec.code} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent font-bold">{spec.code}</span>
                    <Badge variant="outline" className="border-slate-700 text-[10px] text-slate-300">
                      Standard Quality Audited
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-white">{spec.item}</h3>
                  <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <div><strong className="text-slate-300">Fabric:</strong> {spec.fabric}</div>
                    <div><strong className="text-slate-300">Color Spec:</strong> {spec.colorCode}</div>
                    <div><strong className="text-slate-300">Embroidery:</strong> {spec.embroidery}</div>
                    <div><strong className="text-slate-300">Trims & Fasteners:</strong> {spec.buttons}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT SIZING ROSTER */}
        {activeTab === "roster" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-white">Student Anthropometric Sizing Roster Management</h2>
              <p className="text-xs text-slate-400">Distribute standardized Excel rosters to class teachers, then upload to auto-calculate garment cutting slabs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Download card */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Download Sizing Template (.xlsx)</h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Pre-formatted spreadsheet with validation formulas for Chest, Waist, Shoulder, Sleeve, and Trouser Inseam in inches and centimeters.
                  </p>
                </div>
                <div className="pt-6">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Downloading DPS_RKP_Student_Sizing_Roster_Template.xlsx");
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                  >
                    <Download className="w-4 h-4 text-accent" />
                    <span>Download Blank Roster (.xlsx)</span>
                  </a>
                </div>
              </div>

              {/* Upload Card */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Upload Completed Roster</h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Upload teacher filled spreadsheets. ScholMart AI will map chest and height records to standardized S/M/L/XL cutting patterns.
                  </p>
                </div>
                <div className="pt-6">
                  {uploadSuccess ? (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Roster Uploaded: 340 students mapped to size slabs!</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setUploadSuccess(true)}
                      className="bg-accent hover:bg-accent/90 text-white text-xs font-semibold px-4 h-9"
                    >
                      <Upload className="w-4 h-4 mr-1.5" />
                      <span>Select Roster File to Ingest</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REORDER CONFIGURATOR */}
        {activeTab === "reorder" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-white">Annual Academic Session Re-Order Configurator</h2>
              <p className="text-xs text-slate-400">Generate a scheduled replenishment order for Academic Year 2026-2027.</p>
            </div>

            {reorderSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Replenishment Requisition Submitted!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your Account Director <strong>Rajiv Malhotra</strong> has received the requisition and will confirm fabric mill dyeing schedules within 24 hours.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setReorderSubmitted(false)}
                    variant="outline"
                    className="text-xs border-emerald-500/30 text-emerald-300"
                  >
                    Create Another Requisition
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400">Required Target Delivery Date</label>
                      <input
                        type="date"
                        defaultValue="2026-04-10"
                        className="w-full mt-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400">Expected Fresh Intake (Class 1 & 11)</label>
                      <input
                        type="number"
                        defaultValue={650}
                        className="w-full mt-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400">Delivery Warehouse Campus</label>
                      <input
                        type="text"
                        defaultValue="Sector XII Main Store, R.K. Puram"
                        className="w-full mt-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Uniform Items Required</h4>
                    <div className="space-y-2">
                      {[
                        { title: "Senior Blazers (Navy Wool Blend)", qty: 650 },
                        { title: "Poplin Summer White Shirts (Full + Half Sleeve)", qty: 2600 },
                        { title: "Charcoal Melange Skirts & Trousers", qty: 1300 },
                        { title: "House Striped Silk Jacquard Ties", qty: 650 },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                          <span className="font-semibold text-slate-200">{item.title}</span>
                          <span className="font-bold text-accent">{item.qty} Pcs</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      onClick={() => setReorderSubmitted(true)}
                      className="bg-accent hover:bg-accent/90 text-white text-xs font-semibold px-5 h-10 shadow-lg shadow-accent/20"
                    >
                      Submit Annual Bulk Requisition &rarr;
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* TAB 5: FINANCIAL LEDGER */}
        {activeTab === "ledger" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-heading font-bold text-white">GST Invoices & School Financial Ledger</h2>
              <p className="text-xs text-slate-400">View tax invoices, NEFT reconciliation, and outstanding credit aging status.</p>
            </div>

            <div className="border border-slate-800 rounded-2xl bg-slate-900 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Description</th>
                    <th className="p-3.5 text-right">Taxable Amount</th>
                    <th className="p-3.5 text-right">Total (Inc. 5% GST)</th>
                    <th className="p-3.5 text-right">Due Balance</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {invoices.map((inv) => (
                    <tr key={inv.invNo} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-mono text-accent font-bold">{inv.invNo}</td>
                      <td className="p-3.5 text-slate-400">{inv.date}</td>
                      <td className="p-3.5 font-medium">{inv.description}</td>
                      <td className="p-3.5 text-right">{formatINR(inv.amount)}</td>
                      <td className="p-3.5 text-right font-bold text-white">{formatINR(inv.total)}</td>
                      <td className="p-3.5 text-right font-bold text-amber-400">{formatINR(inv.dueBalance)}</td>
                      <td className="p-3.5 text-center">
                        <Badge
                          variant="secondary"
                          className={
                            inv.status === "PAID"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => alert(`Downloading PDF for ${inv.invNo}`)}
                          className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white transition"
                          title="Download Invoice PDF"
                        >
                          <Download className="w-3.5 h-3.5 text-accent" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-4 text-center text-xs text-slate-500">
        DPS Institutional ERP Portal &copy; 2026 Powered by ScholMart SaaS Enterprise.
      </footer>
    </div>
  );
}
