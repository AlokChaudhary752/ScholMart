"use client";

import React from "react";
import Link from "next/link";
import {
  School,
  ShoppingBag,
  TrendingUp,
  Receipt,
  AlertTriangle,
  Truck,
  ArrowUpRight,
  Plus,
  Sparkles,
  Download,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  KPI_STATS,
  REVENUE_TREND_DATA,
  SCHOOL_SALES_SHARE,
  RECENT_ACTIVITIES,
  AI_SUPPLY_INSIGHTS,
} from "@/lib/mockData";
import { formatCurrencyINR } from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function DashboardOverviewPage() {
  const kpis = [
    {
      title: "Partnered Institutions",
      value: KPI_STATS.totalSchools.toString(),
      change: "+12 new this session",
      icon: School,
      href: "/dashboard/schools",
      color: "text-blue-500",
    },
    {
      title: "Active Orders Pipeline",
      value: KPI_STATS.activeOrders.toString(),
      change: "18,400 units in production",
      icon: ShoppingBag,
      href: "/dashboard/orders",
      color: "text-accent",
    },
    {
      title: "Monthly Invoiced Revenue",
      value: formatCurrencyINR(KPI_STATS.monthlyRevenueINR),
      change: "+24.8% vs last month",
      icon: TrendingUp,
      href: "/dashboard/billing",
      color: "text-emerald-500",
    },
    {
      title: "Pending Ledger Balances",
      value: formatCurrencyINR(KPI_STATS.pendingPaymentsINR),
      change: "30-day institutional credit",
      icon: Receipt,
      href: "/dashboard/payments",
      color: "text-amber-500",
    },
    {
      title: "Low Stock Fabric Alerts",
      value: `${KPI_STATS.lowStockItemsCount} SKUs`,
      change: "Action required today",
      icon: AlertTriangle,
      href: "/dashboard/inventory",
      color: "text-rose-500",
    },
    {
      title: "Dispatches Due This Week",
      value: `${KPI_STATS.deliveriesDueThisWeek} Batches`,
      change: "99.4% on-time target",
      icon: Truck,
      href: "/dashboard/logistics",
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Manufacturing &amp; Supply Overview
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Academic Session 2025–2026 &bull; Real-time inventory, batch cutting &amp; institutional logistics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/orders">
            <Button variant="accent" size="sm" className="gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" /> Create Bulk Order
            </Button>
          </Link>
          <Link href="/dashboard/reports">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" /> GST Summary
            </Button>
          </Link>
        </div>
      </div>

      {/* AI-Style Smart Supply Insights Banner */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card border border-accent/30 bg-accent/5 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            AI Supply Chain Intelligence &amp; Alerts
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {AI_SUPPLY_INSIGHTS.map((ins) => (
            <div
              key={ins.id}
              className="p-3 rounded-xl bg-card border border-border text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">{ins.school}</span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    ins.severity === "alert"
                      ? "bg-rose-500/15 text-rose-600"
                      : ins.severity === "warning"
                      ? "bg-amber-500/15 text-amber-600"
                      : "bg-emerald-500/15 text-emerald-600"
                  }`}
                >
                  {ins.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{ins.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.title}
              href={kpi.href}
              className="glass-card p-5 rounded-2xl border border-border hover:border-accent/40 transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  {kpi.title}
                </span>
                <div
                  className={`h-9 w-9 rounded-xl bg-muted/60 flex items-center justify-center ${kpi.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-3">
                <p className="text-2xl font-black font-display text-foreground tracking-tight">
                  {kpi.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 font-medium">
                  <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                  <span>{kpi.change}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Revenue & Production Volume Chart */}
        <div className="lg:col-span-8 glass-card p-6 rounded-2xl border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold font-display text-base text-foreground">
                Monthly Procurement Revenue &amp; Production Units
              </h3>
              <p className="text-xs text-muted-foreground">
                Seasonal surge trends leading up to academic session commencement
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              FY 2025–26
            </Badge>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    name === "revenue"
                      ? formatCurrencyINR(Number(value))
                      : `${Number(value).toLocaleString()} pcs`,
                    name === "revenue" ? "Revenue" : "Garments Produced",
                  ]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="revenue" fill="#FF6500" radius={[6, 6, 0, 0]} name="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* School-wise Sales Share Pie Chart */}
        <div className="lg:col-span-4 glass-card p-6 rounded-2xl border border-border space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold font-display text-base text-foreground">
              Institutional Share
            </h3>
            <p className="text-xs text-muted-foreground">
              Volume distribution by key partner network
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SCHOOL_SALES_SHARE}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SCHOOL_SALES_SHARE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}% of Total Orders`, "Share"]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border">
            {SCHOOL_SALES_SHARE.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-foreground truncate">{s.name}</span>
                </div>
                <span className="font-bold text-foreground font-mono">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Operational Activity Log */}
      <div className="glass-card p-6 rounded-2xl border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold font-display text-base text-foreground">
              Real-Time Supply Chain Activity
            </h3>
            <p className="text-xs text-muted-foreground">
              Latest events across CAD cutting, embroidery batches, payments &amp; dispatches
            </p>
          </div>
          <Link href="/dashboard/orders" className="text-xs font-semibold text-accent hover:underline">
            View All Orders &rarr;
          </Link>
        </div>

        <div className="space-y-3 pt-2">
          {RECENT_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="p-3.5 rounded-xl border border-border bg-card/60 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-foreground">{act.action}</p>
                  <p className="text-muted-foreground">{act.detail}</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground whitespace-nowrap">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
