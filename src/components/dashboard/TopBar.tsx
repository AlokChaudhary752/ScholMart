"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuthStore, DEMO_USERS, UserRole } from "@/lib/auth";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, login } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  // Generate dynamic breadcrumb
  const pathParts = pathname.split("/").filter(Boolean);
  const currentTitle =
    pathParts.length > 1
      ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1)
      : "Overview";

  const notifications = [
    {
      id: "n1",
      title: "New Bulk Order PO #ORD-2026-084",
      desc: "Delhi Public School confirmed 1,200 blazer sets.",
      time: "20m ago",
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      id: "n2",
      title: "Low Stock Alert: Navy Fabric",
      desc: "Only 320m remaining in Warehouse A. Reorder triggered.",
      time: "1h ago",
      icon: AlertTriangle,
      color: "text-amber-500",
    },
    {
      id: "n3",
      title: "GST E-Way Bill Generated",
      desc: "Dispatch vehicle DL-1L-8842 cleared for Heritage School.",
      time: "3h ago",
      icon: Info,
      color: "text-blue-500",
    },
  ];

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumbs & Page title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <span>ERP</span>
          <span>/</span>
          <span className="text-foreground font-bold">{currentTitle}</span>
        </div>
      </div>

      {/* Center: Quick Global Search Input */}
      <div className="hidden md:flex items-center relative max-w-sm w-full mx-4">
        <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search schools, SKU, order ID, invoices... (Cmd+K)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-9 pr-4 rounded-xl border border-input bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
          className="h-8 px-2.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 hover:bg-muted transition-colors"
          title="Switch Language"
        >
          <Globe className="h-3.5 w-3.5" />
          <span>{lang === "EN" ? "ENG" : "हिन्दी"}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 rounded-lg border border-border text-muted-foreground hover:text-foreground flex items-center justify-center hover:bg-muted transition-colors"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notification Bell with Dropdown Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-8 w-8 rounded-lg border border-border text-muted-foreground hover:text-foreground flex items-center justify-center hover:bg-muted transition-colors relative"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-accent text-white text-[9px] font-black rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-card border border-border shadow-2xl p-4 space-y-3 z-50 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-xs font-bold text-foreground">Notifications</span>
                <span className="text-[10px] text-accent font-semibold cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className="p-2 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-2.5 cursor-pointer"
                    >
                      <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${n.color}`} />
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">
                          {n.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-tight">
                          {n.desc}
                        </p>
                        <span className="text-[10px] text-muted-foreground/80 mt-1 block font-mono">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Quick Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="h-8 px-2.5 rounded-lg border border-accent/40 bg-accent/10 text-accent text-xs font-bold flex items-center gap-1.5 hover:bg-accent/20 transition-colors"
          >
            <span>{user?.role?.replace("_", " ") || "ADMIN"}</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card border border-border shadow-2xl p-2 z-50 animate-in fade-in-50 space-y-1">
              <p className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase">
                Switch Perspective:
              </p>
              {Object.entries(DEMO_USERS).map(([key, u]) => (
                <button
                  key={key}
                  onClick={() => {
                    login(u.email, u.role as UserRole);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium flex items-center justify-between hover:bg-muted ${
                    user?.email === u.email
                      ? "bg-accent/15 text-accent font-bold"
                      : "text-foreground"
                  }`}
                >
                  <span className="truncate">{u.fullName}</span>
                  <span className="text-[10px] opacity-70">
                    {u.role.split("_")[0]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
