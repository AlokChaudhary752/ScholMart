"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Trash2,
  Check,
  ShoppingBag,
  Boxes,
  CreditCard,
  Factory,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SystemNotification {
  id: string;
  category: "ORDERS" | "INVENTORY" | "PAYMENTS" | "PRODUCTION";
  priority: "HIGH" | "MEDIUM" | "INFO";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  linkUrl: string;
}

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: "notif-1",
    category: "ORDERS",
    priority: "HIGH",
    title: "New Bulk Purchase Order Confirmed",
    message: "Delhi Public School confirmed PO #ORD-2026-084 for 1,200 wool blazers and 2,400 oxford shirts.",
    timestamp: "20 minutes ago",
    isRead: false,
    linkUrl: "/dashboard/orders",
  },
  {
    id: "notif-2",
    category: "INVENTORY",
    priority: "HIGH",
    title: "Raw Material Reorder Trigger: Navy Wool Twill",
    message: "Stock has fallen to 320 meters in Warehouse A (minimum safety buffer 500m). Loom lead time 12 days.",
    timestamp: "1 hour ago",
    isRead: false,
    linkUrl: "/dashboard/inventory",
  },
  {
    id: "notif-3",
    category: "PAYMENTS",
    priority: "MEDIUM",
    title: "Bank Remittance Reconciled (₹25,62,000)",
    message: "NEFT credit from Delhi Public School received for Invoice INV-2026-0182. Balance due updated to ₹4,20,000.",
    timestamp: "3 hours ago",
    isRead: false,
    linkUrl: "/dashboard/payments",
  },
  {
    id: "notif-4",
    category: "PRODUCTION",
    priority: "INFO",
    title: "4-Eye Quality Audit Passed: Batch #SHR-104",
    message: "850 Oxford shirts for The Heritage School cleared seam pull tests and Madeira monogram alignment. Released to packing.",
    timestamp: "Yesterday at 5:15 PM",
    isRead: true,
    linkUrl: "/dashboard/production",
  },
  {
    id: "notif-5",
    category: "PAYMENTS",
    priority: "HIGH",
    title: "Institutional Credit Overdue: GD Goenka",
    message: "Invoice INV-2026-0179 for ₹6,50,000 is 21 days past due date. Automated WhatsApp reminder queued.",
    timestamp: "2 days ago",
    isRead: true,
    linkUrl: "/dashboard/billing",
  },
];

export default function NotificationsCenterPage() {
  const [notifications, setNotifications] =
    useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [tab, setTab] = useState<"ALL" | "ORDERS" | "INVENTORY" | "PAYMENTS" | "PRODUCTION">("ALL");

  const filtered = notifications.filter(
    (n) => tab === "ALL" || n.category === tab
  );

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markSingleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Notifications &amp; Activity Center
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Operational alerts across orders, loom raw inventory, QC pass/fails, and payment milestones
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            className="text-xs gap-1.5"
          >
            <Check className="h-4 w-4" /> Mark All as Read
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        {(["ALL", "ORDERS", "INVENTORY", "PAYMENTS", "PRODUCTION"] as const).map(
          (t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                tab === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {t.replace("_", " ")}
            </button>
          )
        )}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl glass-card border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              !n.isRead
                ? "border-accent/40 bg-accent/5 shadow-sm"
                : "border-border opacity-85"
            }`}
          >
            <div className="flex items-start gap-3.5 flex-1">
              <div
                className={`h-9 w-9 rounded-xl flex-shrink-0 flex items-center justify-center ${
                  n.category === "ORDERS"
                    ? "bg-accent/15 text-accent"
                    : n.category === "INVENTORY"
                    ? "bg-rose-500/15 text-rose-500"
                    : n.category === "PAYMENTS"
                    ? "bg-emerald-500/15 text-emerald-500"
                    : "bg-blue-500/15 text-blue-500"
                }`}
              >
                {n.category === "ORDERS" && <ShoppingBag className="h-4 w-4" />}
                {n.category === "INVENTORY" && <Boxes className="h-4 w-4" />}
                {n.category === "PAYMENTS" && <CreditCard className="h-4 w-4" />}
                {n.category === "PRODUCTION" && <Factory className="h-4 w-4" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-foreground">
                    {n.title}
                  </span>
                  {!n.isRead && (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  )}
                  <Badge
                    variant={
                      n.priority === "HIGH"
                        ? "destructive"
                        : n.priority === "MEDIUM"
                        ? "warning"
                        : "secondary"
                    }
                    className="text-[9px] py-0 px-1.5"
                  >
                    {n.priority}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {n.message}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground/80 pt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{n.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Link href={n.linkUrl}>
                <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
                  View <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              {!n.isRead && (
                <button
                  onClick={() => markSingleRead(n.id)}
                  className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted"
                  title="Mark as read"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={() => deleteNotification(n.id)}
                className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-muted"
                title="Dismiss notification"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-muted-foreground italic glass-card rounded-2xl border border-border">
            No notifications found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
