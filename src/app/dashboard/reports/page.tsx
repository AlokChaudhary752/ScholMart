"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  TrendingUp,
  Percent,
  CheckCircle2,
  Users,
  DollarSign,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyINR } from "@/lib/utils";

const SCHOOL_PROFITABILITY = [
  {
    school: "Delhi Public School (DPS)",
    revenue: 4410000,
    cogs: 2820000,
    grossProfit: 1590000,
    marginPercent: 36.1,
    onTimeRate: 100,
  },
  {
    school: "The Heritage School",
    revenue: 1681000,
    cogs: 1050000,
    grossProfit: 631000,
    marginPercent: 37.5,
    onTimeRate: 98.5,
  },
  {
    school: "St. Xavier's Senior High School",
    revenue: 2184000,
    cogs: 1390000,
    grossProfit: 794000,
    marginPercent: 36.4,
    onTimeRate: 100,
  },
  {
    school: "GD Goenka Signature School",
    revenue: 2246000,
    cogs: 1460000,
    grossProfit: 786000,
    marginPercent: 35.0,
    onTimeRate: 96.0,
  },
  {
    school: "Vibgyor Roots & Rise",
    revenue: 1189000,
    cogs: 740000,
    grossProfit: 449000,
    marginPercent: 37.8,
    onTimeRate: 100,
  },
];

const TAILOR_PRODUCTIVITY = [
  {
    name: "Master Akhtar (Line 1)",
    role: "Embossed Blazer Master",
    piecesFinished: 1200,
    pieceRateWage: 180000,
    qcRejectionRate: 0.6,
  },
  {
    name: "Iqbal & Co. (Line 2)",
    role: "Oxford Shirt Unit",
    piecesFinished: 2400,
    pieceRateWage: 144000,
    qcRejectionRate: 0.4,
  },
  {
    name: "Master Surendra",
    role: "CAD Laser Cutter",
    piecesFinished: 4800,
    pieceRateWage: 120000,
    qcRejectionRate: 0.1,
  },
];

export default function ReportsAnalyticsPage() {
  const [period, setPeriod] = useState("Q3-2026");

  const totalRevenue = SCHOOL_PROFITABILITY.reduce((a, b) => a + b.revenue, 0);
  const totalGrossProfit = SCHOOL_PROFITABILITY.reduce(
    (a, b) => a + b.grossProfit,
    0
  );
  const avgMargin = (
    (totalGrossProfit / totalRevenue) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Financial &amp; Manufacturing Reports
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Audit-ready GSTR-1 summaries, school-wise gross margins, and tailor productivity ledger
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() =>
              alert("Exported full institutional audit dataset to Excel (.xlsx)")
            }
          >
            <FileSpreadsheet className="h-4 w-4" /> Export Excel
          </Button>
          <Button
            variant="accent"
            size="sm"
            className="gap-1.5 shadow-sm"
            onClick={() =>
              alert("Generated GSTR-1 & Profitability Statement PDF")
            }
          >
            <Download className="h-4 w-4" /> Download Report PDF
          </Button>
        </div>
      </div>

      {/* KPI Top Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            Institutional Turnover ({period})
          </span>
          <p className="text-2xl font-black font-display text-foreground">
            {formatCurrencyINR(totalRevenue)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            100% tax-invoiced sales across contracted schools
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            Gross Margin Profit
          </span>
          <p className="text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
            {formatCurrencyINR(totalGrossProfit)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Average margin: <strong className="text-foreground">{avgMargin}%</strong>
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            GST Collected &amp; Remitted
          </span>
          <p className="text-2xl font-black font-display text-accent">
            {formatCurrencyINR(totalRevenue * 0.05)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            HSN 6203 / 6204 (5.0% uniform rate)
          </p>
        </div>
      </div>

      {/* School-wise Margin & Profitability Table */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden space-y-3 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold font-display text-base text-foreground">
              Institutional Sales, Cost &amp; Profit Margin Analysis
            </h3>
            <p className="text-xs text-muted-foreground">
              School-level cost of materials, direct labor piece rates, and net margin
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {period}
          </Badge>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">School / Institution</th>
                <th className="p-3.5 text-right">Invoiced Revenue</th>
                <th className="p-3.5 text-right">Direct COGS</th>
                <th className="p-3.5 text-right">Gross Profit</th>
                <th className="p-3.5 text-right">Margin %</th>
                <th className="p-3.5 text-right">On-Time SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {SCHOOL_PROFITABILITY.map((row) => (
                <tr key={row.school} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-bold text-foreground">
                    {row.school}
                  </td>
                  <td className="p-3.5 text-right font-mono font-semibold">
                    {formatCurrencyINR(row.revenue)}
                  </td>
                  <td className="p-3.5 text-right font-mono text-muted-foreground">
                    {formatCurrencyINR(row.cogs)}
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrencyINR(row.grossProfit)}
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-foreground">
                    {row.marginPercent}%
                  </td>
                  <td className="p-3.5 text-right">
                    <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {row.onTimeRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GSTR-1 & Tailor Productivity 2-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GSTR-1 Summary */}
        <div className="lg:col-span-6 glass-card p-6 rounded-2xl border border-border space-y-4">
          <div>
            <h3 className="font-bold font-display text-base text-foreground">
              GST Filing Breakdown (GSTR-1 Ready)
            </h3>
            <p className="text-xs text-muted-foreground">
              Taxable values categorized by intrastate and interstate sales
            </p>
          </div>

          <div className="space-y-2 text-xs border border-border rounded-xl p-4 bg-muted/20">
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Gross Taxable Turnover:</span>
              <span className="font-mono font-bold text-foreground">
                {formatCurrencyINR(totalRevenue)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Central GST (CGST @ 2.5%):</span>
              <span className="font-mono text-foreground">
                {formatCurrencyINR(totalRevenue * 0.025 * 0.6)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">State GST (SGST @ 2.5%):</span>
              <span className="font-mono text-foreground">
                {formatCurrencyINR(totalRevenue * 0.025 * 0.6)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-muted-foreground">Integrated GST (IGST @ 5.0%):</span>
              <span className="font-mono text-foreground">
                {formatCurrencyINR(totalRevenue * 0.05 * 0.4)}
              </span>
            </div>
            <div className="flex justify-between py-1 pt-2 font-bold text-accent text-sm">
              <span>Total Tax Payable:</span>
              <span className="font-mono">
                {formatCurrencyINR(totalRevenue * 0.05)}
              </span>
            </div>
          </div>
        </div>

        {/* Tailor Productivity Ledger */}
        <div className="lg:col-span-6 glass-card p-6 rounded-2xl border border-border space-y-4">
          <div>
            <h3 className="font-bold font-display text-base text-foreground">
              Master Tailor &amp; Worker Productivity
            </h3>
            <p className="text-xs text-muted-foreground">
              Finished garment count, piece-rate wages disbursed, and QC rejection rate
            </p>
          </div>

          <div className="space-y-3">
            {TAILOR_PRODUCTIVITY.map((t) => (
              <div
                key={t.name}
                className="p-3 rounded-xl bg-card border border-border flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-foreground">
                    {t.piecesFinished.toLocaleString()} pcs &bull;{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {formatCurrencyINR(t.pieceRateWage)}
                    </span>
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Rejection: <strong className="text-foreground">{t.qcRejectionRate}%</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
