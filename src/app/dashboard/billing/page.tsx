"use client";

import React, { useState } from "react";
import {
  Receipt,
  Search,
  Plus,
  Download,
  Eye,
  Send,
  Building,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Sparkles,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  INITIAL_INVOICES,
  InvoiceRecord,
  INITIAL_SCHOOLS,
} from "@/lib/mockData";
import { formatCurrencyINR, formatDate } from "@/lib/utils";

export default function BillingInvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(INITIAL_INVOICES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(
    null
  );
  const [isNewInvoiceModal, setIsNewInvoiceModal] = useState(false);

  const [newInv, setNewInv] = useState({
    schoolId: INITIAL_SCHOOLS[0].id,
    orderNumber: "ORD-2026-086",
    subtotal: 1040000,
    dueDate: "2026-11-20",
  });

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      inv.orderNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInvoiced = invoices.reduce((acc, i) => acc + i.grandTotal, 0);
  const totalReceived = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalOutstanding = invoices.reduce((acc, i) => acc + i.balanceDue, 0);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const sch = INITIAL_SCHOOLS.find((s) => s.id === newInv.schoolId)!;
    const cgst = newInv.subtotal * 0.025;
    const sgst = newInv.subtotal * 0.025;
    const grand = newInv.subtotal + cgst + sgst;

    const created: InvoiceRecord = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-0${invoices.length + 184}`,
      orderNumber: newInv.orderNumber,
      schoolName: sch.name,
      schoolGstin: sch.gstin,
      subtotal: Number(newInv.subtotal),
      cgst,
      sgst,
      igst: 0,
      grandTotal: grand,
      paidAmount: 0,
      balanceDue: grand,
      dueDate: newInv.dueDate,
      createdDate: new Date().toISOString().split("T")[0],
      status: "PENDING",
    };

    setInvoices([created, ...invoices]);
    setIsNewInvoiceModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Tax Invoices &amp; GST Billing
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            GST-compliant institutional invoices (HSN 6203 / 6204), auto CGST/SGST splits, and E-Way integration
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="accent"
            size="sm"
            className="gap-1.5 shadow-sm"
            onClick={() => setIsNewInvoiceModal(true)}
          >
            <Plus className="h-4 w-4" /> Generate Tax Invoice
          </Button>
        </div>
      </div>

      {/* Financial Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            Total B2B Invoiced
          </span>
          <p className="text-2xl font-black font-display text-foreground">
            {formatCurrencyINR(totalInvoiced)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Current Academic Season (Q3)
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            Total Remittances Cleared
          </span>
          <p className="text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
            {formatCurrencyINR(totalReceived)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Via NEFT, RTGS &amp; Razorpay Gateway
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            Institutional Receivables
          </span>
          <p className="text-2xl font-black font-display text-amber-500">
            {formatCurrencyINR(totalOutstanding)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Under 30–45 day institutional credit terms
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search invoice number, school, or PO number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "PAID", "PENDING", "PARTIAL", "OVERDUE"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                statusFilter === st
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">School &amp; GSTIN</th>
                <th className="p-4">Order Ref</th>
                <th className="p-4">Taxable Value</th>
                <th className="p-4">GST (5%)</th>
                <th className="p-4">Grand Total</th>
                <th className="p-4">Balance Due</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-accent">
                    {inv.invoiceNumber}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-foreground">{inv.schoolName}</p>
                    <p className="text-[11px] font-mono text-muted-foreground">
                      {inv.schoolGstin}
                    </p>
                  </td>
                  <td className="p-4 font-mono font-medium text-foreground">
                    {inv.orderNumber}
                  </td>
                  <td className="p-4 font-mono">
                    {formatCurrencyINR(inv.subtotal)}
                  </td>
                  <td className="p-4 font-mono text-muted-foreground">
                    {formatCurrencyINR(inv.cgst + inv.sgst + inv.igst)}
                  </td>
                  <td className="p-4 font-mono font-bold text-foreground">
                    {formatCurrencyINR(inv.grandTotal)}
                  </td>
                  <td className="p-4 font-mono font-bold text-rose-500">
                    {formatCurrencyINR(inv.balanceDue)}
                  </td>
                  <td className="p-4 text-muted-foreground">{inv.dueDate}</td>
                  <td className="p-4">
                    <Badge
                      variant={
                        inv.status === "PAID"
                          ? "default"
                          : inv.status === "PARTIAL"
                          ? "accent"
                          : inv.status === "PENDING"
                          ? "warning"
                          : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedInvoice(inv)}
                        className="text-xs h-8 gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" /> View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          alert(`Transmitted invoice ${inv.invoiceNumber} via WhatsApp & Email`)
                        }
                        className="text-xs h-8"
                        title="Transmit via WhatsApp/Email"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Invoice Branded Modal / PDF Preview */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`TAX INVOICE: ${selectedInvoice.invoiceNumber}`}
          description="Official GST Tax Invoice & E-Way Ready Document"
          className="max-w-2xl"
        >
          <div className="space-y-6 text-xs bg-card p-4 rounded-xl border border-border">
            {/* Invoice Top Header */}
            <div className="flex justify-between items-start border-b border-border pb-4">
              <div>
                <span className="font-display font-black text-xl text-foreground flex items-center gap-1">
                  ScholMart
                  <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
                </span>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  ScholMart Technologies Pvt. Ltd. &bull; GSTIN: 07AABCS1234F1Z0
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Okhla Industrial Area, Phase IV, New Delhi - 110020
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-accent text-sm">
                  {selectedInvoice.invoiceNumber}
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Date: {selectedInvoice.createdDate}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Due: {selectedInvoice.dueDate}
                </p>
              </div>
            </div>

            {/* Bill To */}
            <div className="p-3 rounded-xl bg-muted/40 space-y-1">
              <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                Bill To (Institutional Purchaser):
              </span>
              <p className="font-bold text-sm text-foreground">
                {selectedInvoice.schoolName}
              </p>
              <p className="text-muted-foreground">
                GSTIN / UIN:{" "}
                <span className="font-mono font-bold text-foreground">
                  {selectedInvoice.schoolGstin}
                </span>
              </p>
              <p className="text-muted-foreground">
                Reference PO: {selectedInvoice.orderNumber}
              </p>
            </div>

            {/* Tax Breakdown Table */}
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-muted/60 font-semibold border-b border-border">
                  <tr>
                    <th className="p-2.5">HSN Code &amp; Description</th>
                    <th className="p-2.5 text-right">Taxable Amount</th>
                    <th className="p-2.5 text-right">Tax Rate</th>
                    <th className="p-2.5 text-right">Total (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr>
                    <td className="p-2.5">
                      <p className="font-bold">HSN 6203 / 6204: School Uniforms</p>
                      <p className="text-muted-foreground text-[10px]">
                        Tailored blazers, shirts, and trousers
                      </p>
                    </td>
                    <td className="p-2.5 text-right font-mono">
                      {formatCurrencyINR(selectedInvoice.subtotal)}
                    </td>
                    <td className="p-2.5 text-right font-mono">5.0% GST</td>
                    <td className="p-2.5 text-right font-mono font-bold">
                      {formatCurrencyINR(selectedInvoice.grandTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Remittance Totals & Bank Coordinates */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl border border-border text-[11px] space-y-1">
                <span className="font-bold text-foreground block">Bank Coordinates (RTGS / NEFT):</span>
                <p className="text-muted-foreground">Bank: HDFC Bank Ltd.</p>
                <p className="text-muted-foreground font-mono">A/C: 50200088194412</p>
                <p className="text-muted-foreground font-mono">IFSC: HDFC0001234</p>
              </div>

              <div className="space-y-1.5 text-right text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxable Value:</span>
                  <span className="font-mono">{formatCurrencyINR(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CGST (2.5%) + SGST (2.5%):</span>
                  <span className="font-mono">
                    {formatCurrencyINR(selectedInvoice.cgst + selectedInvoice.sgst + selectedInvoice.igst)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-1 font-bold">
                  <span>Grand Total:</span>
                  <span className="text-accent font-mono text-sm">
                    {formatCurrencyINR(selectedInvoice.grandTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-rose-500 font-semibold">
                  <span>Balance Due:</span>
                  <span className="font-mono">{formatCurrencyINR(selectedInvoice.balanceDue)}</span>
                </div>
              </div>
            </div>

            {/* Print & Close */}
            <div className="pt-3 flex justify-end gap-2 border-t border-border">
              <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                Close
              </Button>
              <Button
                variant="accent"
                className="gap-1.5"
                onClick={() => {
                  alert(`Printing signed GST tax invoice ${selectedInvoice.invoiceNumber}`);
                }}
              >
                <Printer className="h-4 w-4" /> Print / Download Tax PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Generate Tax Invoice Modal */}
      <Modal
        isOpen={isNewInvoiceModal}
        onClose={() => setIsNewInvoiceModal(false)}
        title="Generate Tax Invoice"
        description="Issue formal institutional GST tax invoice against confirmed order."
      >
        <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Select School *
            </label>
            <select
              className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
              value={newInv.schoolId}
              onChange={(e) =>
                setNewInv({ ...newInv, schoolId: e.target.value })
              }
            >
              {INITIAL_SCHOOLS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.gstin})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              PO / Order Reference *
            </label>
            <Input
              required
              placeholder="e.g. ORD-2026-086"
              value={newInv.orderNumber}
              onChange={(e) =>
                setNewInv({ ...newInv, orderNumber: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Taxable Value (INR) *
              </label>
              <Input
                type="number"
                required
                value={newInv.subtotal}
                onChange={(e) =>
                  setNewInv({ ...newInv, subtotal: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Credit Due Date *
              </label>
              <Input
                type="date"
                required
                value={newInv.dueDate}
                onChange={(e) =>
                  setNewInv({ ...newInv, dueDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-between">
            <span className="text-muted-foreground">Total with 5% GST:</span>
            <span className="font-mono font-bold text-base text-accent">
              {formatCurrencyINR(newInv.subtotal * 1.05)}
            </span>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsNewInvoiceModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Issue Tax Invoice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
