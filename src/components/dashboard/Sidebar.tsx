"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth";
import {
  LayoutDashboard,
  School,
  BookOpen,
  ShoppingBag,
  Ruler,
  Boxes,
  Factory,
  Receipt,
  CreditCard,
  Truck,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Bell,
  ShieldCheck,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

const NAVIGATION: NavSection[] = [
  {
    section: "CORE",
    items: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { title: "Schools", href: "/dashboard/schools", icon: School, badge: "5" },
      { title: "Uniform Catalog", href: "/dashboard/catalog", icon: BookOpen },
    ],
  },
  {
    section: "OPERATIONS",
    items: [
      { title: "Orders Pipeline", href: "/dashboard/orders", icon: ShoppingBag, badge: "28" },
      { title: "Sizing & Camps", href: "/dashboard/measurements", icon: Ruler },
      { title: "Raw Inventory", href: "/dashboard/inventory", icon: Boxes },
      { title: "Production Line", href: "/dashboard/production", icon: Factory },
    ],
  },
  {
    section: "FINANCE & SUPPLY",
    items: [
      { title: "Billing & GST", href: "/dashboard/billing", icon: Receipt },
      { title: "Payments & Ledger", href: "/dashboard/payments", icon: CreditCard },
      { title: "Delivery Logistics", href: "/dashboard/logistics", icon: Truck },
      { title: "Reports & Profit", href: "/dashboard/reports", icon: BarChart3 },
    ],
  },
  {
    section: "ENTERPRISE",
    items: [
      { title: "CRM School Leads", href: "/dashboard/crm", icon: Users },
      { title: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: "3" },
      { title: "Users & Roles", href: "/dashboard/users", icon: ShieldCheck },
      { title: "ERP Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-card border-r border-border flex flex-col justify-between transition-all duration-300 z-30 select-none",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top Branding */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-primary flex-shrink-0 flex items-center justify-center font-display font-black text-white text-base shadow-sm">
              SM
            </div>
            {!isCollapsed && (
              <div className="leading-tight">
                <span className="font-display font-bold text-base text-foreground tracking-tight flex items-center gap-1">
                  ScholMart
                  <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
                </span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block -mt-0.5">
                  ERP Suite
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-7 w-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {NAVIGATION.map((sec) => (
            <div key={sec.section} className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  {sec.section}
                </p>
              )}
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative",
                      isActive
                        ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate flex-1">{item.title}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* User profile & Logout footer */}
      <div className="p-3 border-t border-border bg-muted/20">
        <div
          className={cn(
            "flex items-center gap-2.5 p-2 rounded-xl transition-colors",
            !isCollapsed && "hover:bg-muted"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-primary/20 text-primary dark:text-primary-foreground flex-shrink-0 flex items-center justify-center font-bold text-xs">
            {user?.fullName?.substring(0, 2) || "AD"}
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">
                {user?.fullName || "Vikram Malhotra"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate uppercase font-semibold">
                {user?.role?.replace("_", " ") || "SUPPLIER ADMIN"}
              </p>
            </div>
          )}

          {!isCollapsed && (
            <button
              onClick={logout}
              className="text-muted-foreground hover:text-destructive p-1 rounded-lg hover:bg-card transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
