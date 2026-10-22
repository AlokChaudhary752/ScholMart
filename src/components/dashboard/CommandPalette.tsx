"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  School,
  ShoppingBag,
  Receipt,
  Boxes,
  Ruler,
  Factory,
  Truck,
  Users,
  Settings,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";
import { INITIAL_SCHOOLS, INITIAL_ORDERS } from "@/lib/mockData";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Schools" | "Orders" | "Actions";
  href: string;
  icon: React.ElementType;
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigationItems: CommandItem[] = [
    { id: "nav-overview", title: "Overview Dashboard", category: "Navigation", href: "/dashboard", icon: Sparkles },
    { id: "nav-schools", title: "Contracted Schools", category: "Navigation", href: "/dashboard/schools", icon: School },
    { id: "nav-catalog", title: "Uniform Catalog & Policies", category: "Navigation", href: "/dashboard/catalog", icon: Boxes },
    { id: "nav-orders", title: "Orders Pipeline Kanban", category: "Navigation", href: "/dashboard/orders", icon: ShoppingBag },
    { id: "nav-measurements", title: "Sizing & Measurements", category: "Navigation", href: "/dashboard/measurements", icon: Ruler },
    { id: "nav-inventory", title: "Raw Materials & Fabrics", category: "Navigation", href: "/dashboard/inventory", icon: Boxes },
    { id: "nav-production", title: "Production Line & QC Audit", category: "Navigation", href: "/dashboard/production", icon: Factory },
    { id: "nav-billing", title: "Tax Invoices & GST Billing", category: "Navigation", href: "/dashboard/billing", icon: Receipt },
    { id: "nav-payments", title: "Payments & Ledger Aging", category: "Navigation", href: "/dashboard/payments", icon: Receipt },
    { id: "nav-logistics", title: "Fleet Delivery & Dispatch", category: "Navigation", href: "/dashboard/logistics", icon: Truck },
    { id: "nav-crm", title: "CRM School Leads Pipeline", category: "Navigation", href: "/dashboard/crm", icon: Users },
    { id: "nav-notifications", title: "Notifications & System Alerts", category: "Navigation", href: "/dashboard/notifications", icon: Sparkles },
    { id: "nav-users", title: "Users & RBAC Permissions Matrix", category: "Navigation", href: "/dashboard/users", icon: Users },
    { id: "nav-settings", title: "ERP Settings & Profile", category: "Navigation", href: "/dashboard/settings", icon: Settings },
    { id: "nav-school-portal", title: "School Institutional Portal (DPS)", category: "Navigation", href: "/school-portal", icon: School },
    { id: "nav-parent-portal", title: "Parent Uniform Store", category: "Navigation", href: "/portal", icon: ShoppingBag },
    { id: "nav-api-docs", title: "Developer REST API Explorer & OpenAPI", category: "Navigation", href: "/docs", icon: Command },
  ];

  const schoolItems: CommandItem[] = INITIAL_SCHOOLS.map((s) => ({
    id: `sch-${s.id}`,
    title: `${s.name} (${s.code}) - ${s.city}`,
    category: "Schools",
    href: "/dashboard/schools",
    icon: School,
  }));

  const orderItems: CommandItem[] = INITIAL_ORDERS.map((o) => ({
    id: `ord-${o.id}`,
    title: `${o.orderNumber} - ${o.schoolName} (${o.totalQuantity.toLocaleString()} pcs)`,
    category: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  }));

  const allItems = [...navigationItems, ...schoolItems, ...orderItems];

  const filtered = allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        router.push(filtered[selectedIndex].href);
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Box */}
      <div className="relative z-50 w-full max-w-xl rounded-2xl glass-card border border-border shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border bg-card">
          <Search className="h-4 w-4 text-muted-foreground mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command, search school, order, or jump to page..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full h-12 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] font-mono font-bold text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedIndex === idx;
            return (
              <div
                key={item.id}
                onClick={() => {
                  router.push(item.href);
                  onClose();
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                  isSelected
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.title}</span>
                </div>
                <span
                  className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.category}
                </span>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-muted-foreground italic">
              No matching commands or entities found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 border-t border-border bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[10px] font-semibold text-accent">
            ScholMart Command Core
          </span>
        </div>
      </div>
    </div>
  );
}
