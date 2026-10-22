"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Search,
  Plus,
  Send,
  Download,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Link as LinkIcon,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  INITIAL_PAYMENTS,
  PaymentReceipt,
  INITIAL_SCHOOLS,
} from "@/lib/mockData";
import { formatCurrencyINR } from "@/lib/utils";

export default function PaymentsLedgerPage() {
  const [payments, setPayments] = useState<PaymentReceipt[]>(INITIAL_PAYMENTS);
  const [search, setSearch] = useState("");
  const [isRecordModal, setIsRecordModal] = useState(false);
  const [isRazorpayModal, setIsRazorpayModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const [newPay, setNewPay] = useState({
    schoolName: INITIAL_SCHOOLS[0].name,
    invoiceNumber: "INV-2026-0182",
    amount: 420000,
    mode: "NEFT / RTGS" as const,
    referenceNumber: "",
  });

  const filteredPayments = payments.filter((p) => {
    return (
      p.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      p.referenceNumber.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const created: PaymentReceipt = {
      id: `pay-${Date.now()}`,
      receiptNumber: `RCT-2026-0${payments.length + 95}`,
      schoolName: newPay.schoolName,
      invoiceNumber: newPay.invoiceNumber,
      amount: Number(newPay.amount),
      mode: newPay.mode,
      referenceNumber: newPay.referenceNumber || `UTR-${Date.now()}`,
      paymentDate: new Date().toISOString().split("T")[0],
    };

    setPayments([created, ...payments]);
    setIsRecordModal(false);
  };

  const handleGenerateRazorpayLink = () => {
    const link = `https://rzp.io/i/scholmart_${Date.now().toString().slice(-6)}`;
    setGeneratedLink(link);
    setIsRazorpayModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Payments &amp; Institutional Ledger
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            NEFT/RTGS reconciliation, Razorpay instant payment links, and accounts receivable aging
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleGenerateRazorpayLink}
          >
            <LinkIcon className="h-4 w-4" /> Razorpay Link
          </Button>
          <Button
            variant="accent"
            size="sm"
            className="gap-1.5 shadow-sm"
            onClick={() => setIsRecordModal(true)}
          >
            <Plus className="h-4 w-4" /> Record Remittance
          </Button>
        </div>
      </div>

      {/* Aging Analysis Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="glass-card p-4 rounded-xl border border-border space-y-1">
          <span className="text-muted-foreground font-semibold">Total Outstanding</span>
          <p className="text-xl font-black font-display text-foreground">
            ₹21,10,000
          </p>
          <span className="text-[10px] text-muted-foreground block">Across 5 institutions</span>
        </div>

        <div className="glass-card p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Current (0–30 Days)</span>
          <p className="text-xl font-black font-display text-emerald-600 dark:text-emerald-400">
            ₹10,40,000
          </p>
          <span className="text-[10px] text-muted-foreground block">Within normal credit cycle</span>
        </div>

        <div className="glass-card p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1">
          <span className="text-amber-600 font-bold">Due (31–60 Days)</span>
          <p className="text-xl font-black font-display text-amber-600">
            ₹4,20,000
          </p>
          <span className="text-[10px] text-muted-foreground block">Automated reminder sent</span>
        </div>

        <div className="glass-card p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-1">
          <span className="text-rose-600 font-bold">Overdue (60+ Days)</span>
          <p className="text-xl font-black font-display text-rose-600">
            ₹6,50,000
          </p>
          <span className="text-[10px] text-muted-foreground block">GD Goenka renewal hold</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by receipt #, school, or bank UTR..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
      </div>

      {/* Receipts Table */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Receipt #</th>
                <th className="p-4">School</th>
                <th className="p-4">Invoice Settled</th>
                <th className="p-4">Remitted Amount</th>
                <th className="p-4">Payment Mode</th>
                <th className="p-4">Bank UTR / Cheque Ref</th>
                <th className="p-4">Received Date</th>
                <th className="p-4 text-right">Receipt Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-accent">
                    {p.receiptNumber}
                  </td>
                  <td className="p-4 font-bold text-foreground">
                    {p.schoolName}
                  </td>
                  <td className="p-4 font-mono text-muted-foreground">
                    {p.invoiceNumber}
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrencyINR(p.amount)}
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-[10px]">
                      {p.mode}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono text-muted-foreground">
                    {p.referenceNumber}
                  </td>
                  <td className="p-4 text-muted-foreground">{p.paymentDate}</td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        alert(`Downloading official Money Receipt voucher ${p.receiptNumber}`)
                      }
                      className="text-xs h-8 gap-1"
                    >
                      <Download className="h-3.5 w-3.5" /> PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      <Modal
        isOpen={isRecordModal}
        onClose={() => setIsRecordModal(false)}
        title="Record Institutional Remittance"
        description="Reconcile bank NEFT transfer, cheque clearance, or UPI payment."
      >
        <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              School Name *
            </label>
            <select
              className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
              value={newPay.schoolName}
              onChange={(e) =>
                setNewPay({ ...newPay, schoolName: e.target.value })
              }
            >
              {INITIAL_SCHOOLS.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Invoice Number *
              </label>
              <Input
                required
                placeholder="INV-2026-0182"
                value={newPay.invoiceNumber}
                onChange={(e) =>
                  setNewPay({ ...newPay, invoiceNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Amount Received (INR) *
              </label>
              <Input
                type="number"
                required
                value={newPay.amount}
                onChange={(e) =>
                  setNewPay({ ...newPay, amount: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Remittance Mode *
              </label>
              <select
                className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
                value={newPay.mode}
                onChange={(e) =>
                  setNewPay({ ...newPay, mode: e.target.value as any })
                }
              >
                <option value="NEFT / RTGS">NEFT / RTGS</option>
                <option value="CHEQUE">Bank Cheque</option>
                <option value="UPI">UPI Transfer</option>
                <option value="RAZORPAY_GATEWAY">Razorpay Link</option>
              </select>
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Bank UTR / Cheque Ref # *
              </label>
              <Input
                required
                placeholder="e.g. HDFC2026194819"
                value={newPay.referenceNumber}
                onChange={(e) =>
                  setNewPay({ ...newPay, referenceNumber: e.target.value })
                }
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRecordModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Record &amp; Issue Receipt
            </Button>
          </div>
        </form>
      </Modal>

      {/* Razorpay Payment Link Modal */}
      <Modal
        isOpen={isRazorpayModal}
        onClose={() => setIsRazorpayModal(false)}
        title="Institutional Razorpay Payment Link"
        description="Share direct payment URL with school finance department or parent coordinators."
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              Direct Payment Link (UPI / Cards / NetBanking):
            </span>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={generatedLink}
                className="w-full h-9 px-3 rounded-lg border border-input bg-background font-mono text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert("Copied payment link to clipboard!");
                }}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Automated WhatsApp payment reminder configured</span>
            </div>
            <Button
              size="sm"
              variant="accent"
              onClick={() => {
                alert(`Sent payment link to school billing coordinator via WhatsApp!`);
                setIsRazorpayModal(false);
              }}
            >
              Send via WhatsApp
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
