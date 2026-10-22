"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Plus,
  Upload,
  Calendar,
  Clock,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  Copy,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  INITIAL_ORDERS,
  OrderRecord,
  OrderPipelineStatus,
  INITIAL_SCHOOLS,
} from "@/lib/mockData";
import { formatCurrencyINR, formatDate } from "@/lib/utils";

const STAGES: { id: OrderPipelineStatus; label: string; color: string }[] = [
  { id: "DRAFT", label: "Draft & Sizing", color: "border-slate-400 text-slate-500" },
  { id: "QUOTATION_SENT", label: "Quotation Sent", color: "border-amber-400 text-amber-500" },
  { id: "CONFIRMED", label: "Confirmed PO", color: "border-blue-500 text-blue-500" },
  { id: "IN_PRODUCTION", label: "In Production", color: "border-accent text-accent" },
  { id: "QUALITY_CHECK", label: "4-Eye QC Audit", color: "border-purple-500 text-purple-500" },
  { id: "READY", label: "Ready / Packed", color: "border-teal-500 text-teal-500" },
  { id: "DISPATCHED", label: "Dispatched", color: "border-indigo-500 text-indigo-500" },
  { id: "DELIVERED", label: "Delivered", color: "border-emerald-500 text-emerald-500" },
];

export default function OrdersPipelinePage() {
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [isNewOrderModal, setIsNewOrderModal] = useState(false);
  const [isCsvModal, setIsCsvModal] = useState(false);

  // New order form
  const [newOrder, setNewOrder] = useState({
    schoolId: INITIAL_SCHOOLS[0].id,
    itemsSummary: "1,000 Oxford Shirts + 1,000 Regular Trousers",
    totalQuantity: 2000,
    subtotal: 1050000,
    targetDelivery: "2026-11-25",
    notes: "Requires institutional logo embroidery on left pocket.",
  });

  const filteredOrders = orders.filter((o) => {
    return (
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      o.itemsSummary.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const sch = INITIAL_SCHOOLS.find((s) => s.id === newOrder.schoolId)!;
    const gst = newOrder.subtotal * 0.05;
    const created: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-2026-0${orders.length + 84}`,
      schoolId: sch.id,
      schoolName: sch.name,
      itemsSummary: newOrder.itemsSummary,
      totalQuantity: Number(newOrder.totalQuantity),
      subtotal: Number(newOrder.subtotal),
      gstTotal: gst,
      grandTotal: Number(newOrder.subtotal) + gst,
      status: "CONFIRMED",
      targetDelivery: newOrder.targetDelivery,
      createdDate: new Date().toISOString().split("T")[0],
      notes: newOrder.notes,
    };

    setOrders([created, ...orders]);
    setIsNewOrderModal(false);
  };

  const advanceStage = (orderId: string) => {
    setOrders(
      orders.map((o) => {
        if (o.id !== orderId) return o;
        const stageIndex = STAGES.findIndex((s) => s.id === o.status);
        if (stageIndex < STAGES.length - 1) {
          return { ...o, status: STAGES[stageIndex + 1].id };
        }
        return o;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Bulk Institutional Orders Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Track student orders from quotation through computerized cutting, stitching, and school dispatch
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setIsCsvModal(true)}
          >
            <Upload className="h-4 w-4" /> Import Student CSV
          </Button>
          <Button
            variant="accent"
            size="sm"
            className="gap-1.5 shadow-sm"
            onClick={() => setIsNewOrderModal(true)}
          >
            <Plus className="h-4 w-4" /> Create Order
          </Button>
        </div>
      </div>

      {/* Filter and View Mode Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, school, or items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border">
          <button
            onClick={() => setViewMode("kanban")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "kanban"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Kanban Pipeline
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "table"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Table View
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === "kanban" ? (
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 min-h-[580px]">
          {STAGES.map((stage) => {
            const stageOrders = filteredOrders.filter(
              (o) => o.status === stage.id
            );
            return (
              <div
                key={stage.id}
                className="w-72 flex-shrink-0 flex flex-col rounded-2xl glass-card border border-border p-3.5 space-y-3 bg-muted/20"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-foreground font-display">
                      {stage.label}
                    </span>
                  </div>
                  <span className="h-5 w-5 rounded-full bg-muted text-foreground text-[10px] font-mono font-bold flex items-center justify-center">
                    {stageOrders.length}
                  </span>
                </div>

                {/* Orders Cards Stack */}
                <div className="space-y-3 overflow-y-auto max-h-[520px] pr-1">
                  {stageOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-card border border-border hover:border-accent/40 shadow-sm transition-all space-y-2.5 text-xs group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-accent">
                          {ord.orderNumber}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {ord.targetDelivery}
                        </span>
                      </div>

                      <p className="font-bold text-foreground leading-tight">
                        {ord.schoolName}
                      </p>

                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        {ord.itemsSummary}
                      </p>

                      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-foreground font-mono">
                          {ord.totalQuantity.toLocaleString()} pcs
                        </span>
                        <span className="font-bold text-foreground">
                          {formatCurrencyINR(ord.grandTotal)}
                        </span>
                      </div>

                      {stage.id !== "DELIVERED" && (
                        <button
                          onClick={() => advanceStage(ord.id)}
                          className="w-full mt-1 py-1 px-2 rounded-lg bg-muted hover:bg-accent hover:text-white text-[10px] font-semibold transition-colors flex items-center justify-center gap-1 text-muted-foreground"
                        >
                          Advance Stage <ChevronRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}

                  {stageOrders.length === 0 && (
                    <div className="py-8 text-center text-xs text-muted-foreground/60 italic border border-dashed border-border rounded-xl">
                      No orders in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="glass-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Order Code</th>
                  <th className="p-4">School</th>
                  <th className="p-4">Items Breakdown</th>
                  <th className="p-4">Total Qty</th>
                  <th className="p-4">Invoice Amount</th>
                  <th className="p-4">Target Delivery</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-accent">
                      {ord.orderNumber}
                    </td>
                    <td className="p-4 font-bold text-foreground">
                      {ord.schoolName}
                    </td>
                    <td className="p-4 text-muted-foreground max-w-xs truncate">
                      {ord.itemsSummary}
                    </td>
                    <td className="p-4 font-mono font-semibold text-foreground">
                      {ord.totalQuantity.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono font-bold text-foreground">
                      {formatCurrencyINR(ord.grandTotal)}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {ord.targetDelivery}
                    </td>
                    <td className="p-4">
                      <Badge variant="accent" className="text-[10px]">
                        {ord.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => advanceStage(ord.id)}
                        className="text-xs h-8"
                      >
                        Advance
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Order Modal */}
      <Modal
        isOpen={isNewOrderModal}
        onClose={() => setIsNewOrderModal(false)}
        title="Create Bulk Institutional PO"
        description="Configure uniform batch quantities, target delivery dates, and commercial terms."
      >
        <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Select Contracted School *
            </label>
            <select
              className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
              value={newOrder.schoolId}
              onChange={(e) =>
                setNewOrder({ ...newOrder, schoolId: e.target.value })
              }
            >
              {INITIAL_SCHOOLS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Uniform Items Breakdown *
            </label>
            <Input
              required
              placeholder="e.g. 1,000 Wool Blazers + 2,000 Oxford Shirts"
              value={newOrder.itemsSummary}
              onChange={(e) =>
                setNewOrder({ ...newOrder, itemsSummary: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Total Pieces *
              </label>
              <Input
                type="number"
                required
                value={newOrder.totalQuantity}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    totalQuantity: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Subtotal Amount (INR) *
              </label>
              <Input
                type="number"
                required
                value={newOrder.subtotal}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    subtotal: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Guaranteed School Delivery Date *
            </label>
            <Input
              type="date"
              required
              value={newOrder.targetDelivery}
              onChange={(e) =>
                setNewOrder({ ...newOrder, targetDelivery: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Embroidery &amp; Packaging Notes
            </label>
            <Input
              placeholder="Class-wise sorted packaging, brass buttons, etc."
              value={newOrder.notes}
              onChange={(e) =>
                setNewOrder({ ...newOrder, notes: e.target.value })
              }
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsNewOrderModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Confirm Bulk PO
            </Button>
          </div>
        </form>
      </Modal>

      {/* Bulk CSV Upload Modal */}
      <Modal
        isOpen={isCsvModal}
        onClose={() => setIsCsvModal(false)}
        title="Import Student Sizing List (CSV / Excel)"
        description="Upload school student roster to auto-calculate size-wise cutting quantities."
      >
        <div className="space-y-4 text-xs">
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center space-y-3 bg-muted/20">
            <div className="h-12 w-12 rounded-full bg-accent/15 text-accent mx-auto flex items-center justify-center">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-foreground">
                Drag and drop student roster (.csv, .xlsx)
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Columns required: Admission No, Student Name, Grade, Gender, Recommended Size
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => alert("CSV file selected: DPS_Student_Roster_Grade6-10.csv (680 rows)")}>
              Browse Spreadsheet
            </Button>
          </div>

          <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Sample template available for download</span>
            </div>
            <a
              href="#template"
              className="text-accent font-semibold hover:underline"
            >
              Download Template
            </a>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCsvModal(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                alert("Successfully imported 680 student records and calculated size breakdowns!");
                setIsCsvModal(false);
              }}
            >
              Process &amp; Auto-Generate Order
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
