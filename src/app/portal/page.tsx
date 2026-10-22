"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ShoppingBag,
  Search,
  CheckCircle2,
  Sparkles,
  Ruler,
  ShieldCheck,
  CreditCard,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  School,
  Truck,
  Heart,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { INITIAL_SCHOOLS, INITIAL_CATALOG, CatalogItemData } from "@/lib/mockData";
import { formatCurrencyINR } from "@/lib/utils";

interface CartItem {
  item: CatalogItemData;
  size: string;
  quantity: number;
}

export default function ParentStudentPortalPage() {
  const [selectedSchool, setSelectedSchool] = useState(INITIAL_SCHOOLS[0]);
  const [grade, setGrade] = useState("Grade 7");
  const [gender, setGender] = useState<"All" | "Boys" | "Girls">("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    { item: INITIAL_CATALOG[0], size: "32", quantity: 2 },
    { item: INITIAL_CATALOG[1], size: "34", quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isSizingModal, setIsSizingModal] = useState(false);

  // Sizing assistant
  const [childChest, setChildChest] = useState(31.5);
  const [childHeight, setChildHeight] = useState(145);

  const calculateRecommendedSize = (chest: number) => {
    if (chest <= 27) return "26";
    if (chest <= 29) return "28";
    if (chest <= 31) return "30";
    if (chest <= 33) return "32";
    if (chest <= 35) return "34";
    if (chest <= 37) return "36";
    return "38+";
  };

  const filteredItems = INITIAL_CATALOG.filter((item) => {
    const matchesGender =
      gender === "All" || item.gender === gender || item.gender === "Unisex";
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesGender && matchesSearch;
  });

  const cartSubtotal = cart.reduce(
    (acc, c) => acc + c.item.basePrice * c.quantity,
    0
  );
  const cartGst = cartSubtotal * 0.05;
  const cartTotal = cartSubtotal + cartGst;

  const addToCart = (item: CatalogItemData, size = "32") => {
    const existing = cart.find(
      (c) => c.item.id === item.id && c.size === size
    );
    if (existing) {
      setCart(
        cart.map((c) =>
          c.item.id === item.id && c.size === size
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([...cart, { item, size, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/20 selection:text-accent">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-accent" />
        <span>
          Official Institutional Store &bull; Direct School-Approved Fabrics &amp; Gold Crest Monograms
        </span>
      </div>

      {/* Navigation */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center font-display font-black text-white text-base shadow-sm">
              SM
            </div>
            <div>
              <span className="font-display font-bold text-base text-foreground">
                ScholMart Portal
              </span>
              <span className="text-[10px] text-muted-foreground block -mt-1 font-semibold uppercase">
                Parent &amp; Student Store
              </span>
            </div>
          </Link>

          {/* School Selector Dropdown */}
          <div className="hidden sm:flex items-center gap-1.5 pl-4 border-l border-border">
            <School className="h-4 w-4 text-accent" />
            <select
              value={selectedSchool.id}
              onChange={(e) => {
                const s = INITIAL_SCHOOLS.find((sch) => sch.id === e.target.value);
                if (s) setSelectedSchool(s);
              }}
              className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
            >
              {INITIAL_SCHOOLS.map((s) => (
                <option key={s.id} value={s.id} className="bg-card">
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSizingModal(true)}
            className="text-xs gap-1.5 hidden md:flex"
          >
            <Ruler className="h-3.5 w-3.5 text-accent" /> Sizing Guide
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsCartOpen(true)}
            className="text-xs gap-2 shadow-sm relative"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Bag</span>
            <span className="h-5 w-5 rounded-full bg-white text-accent font-black text-[10px] flex items-center justify-center">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* School Showcase Card */}
        <div className="glass-card p-6 rounded-3xl border border-border shadow-md bg-gradient-to-r from-primary-900/10 via-background to-accent/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary text-white font-black font-display text-xl flex items-center justify-center shadow-md">
              {selectedSchool.logo}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="accent" className="text-[10px]">
                  Official Academic Store
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  {selectedSchool.affiliation} Board
                </span>
              </div>
              <h1 className="text-2xl font-extrabold font-display text-foreground">
                {selectedSchool.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                Approved uniform checklist for academic session {selectedSchool.academicSession}
              </p>
            </div>
          </div>

          {/* Quick Fit Assurance Badge */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
            <div className="space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Free Campus Size Exchanges
              </span>
              <p className="text-[11px]">
                Immediate 72-hour exchange available at the school store.
              </p>
            </div>
          </div>
        </div>

        {/* Student Grade & Gender Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-border">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-muted-foreground uppercase mr-1">
              Filter By:
            </span>
            {(["All", "Boys", "Girls"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  gender === g
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g}
              </button>
            ))}

            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border bg-background text-foreground"
            >
              {[
                "Grade 1-2",
                "Grade 3-5",
                "Grade 6-8",
                "Grade 9-10",
                "Grade 11-12",
              ].map((gr) => (
                <option key={gr} value={gr}>
                  {gr}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search garments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-8 pr-3 rounded-xl border border-input bg-background text-xs focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-border"
                    style={{ backgroundColor: item.colorHex }}
                    title={item.colorName}
                  />
                  <div className="flex gap-1.5">
                    <Badge variant="outline" className="text-[10px]">
                      {item.season}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {item.gender}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item.fabric}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-muted/40 text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Embroidery:</span>{" "}
                  {item.embroideryPlacement}
                </div>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-lg font-black font-display text-foreground">
                    {formatCurrencyINR(item.basePrice)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    incl. of all taxes (5% GST)
                  </span>
                </div>
              </div>

              {/* Add to Bag Button */}
              <div className="p-4 pt-0">
                <Button
                  variant="accent"
                  className="w-full text-xs gap-1.5 shadow-sm"
                  onClick={() => addToCart(item, "32")}
                >
                  <Plus className="h-4 w-4" /> Add to Student Kit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <Modal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          title="Student Uniform Kit Bag"
          description={`Selected items for ${selectedSchool.name} (${grade}).`}
        >
          <div className="space-y-4 text-xs">
            {cart.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground italic">
                Your uniform kit bag is empty.
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((c, idx) => (
                  <div
                    key={`${c.item.id}-${c.size}`}
                    className="p-3 rounded-xl bg-card border border-border flex items-center justify-between gap-3"
                  >
                    <div className="truncate flex-1">
                      <p className="font-bold text-foreground truncate">
                        {c.item.name}
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        Size {c.size}&quot; &bull; {formatCurrencyINR(c.item.basePrice)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(idx, -1)}
                        className="h-6 w-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono font-bold text-foreground px-1">
                        {c.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(idx, 1)}
                        className="h-6 w-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="font-mono font-bold text-foreground">
                      {formatCurrencyINR(c.item.basePrice * c.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Totals */}
            <div className="pt-3 border-t border-border space-y-1.5">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span className="font-mono">{formatCurrencyINR(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (5%):</span>
                <span className="font-mono">{formatCurrencyINR(cartGst)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-foreground pt-1 border-t border-border">
                <span>Total Amount:</span>
                <span className="text-accent font-mono">
                  {formatCurrencyINR(cartTotal)}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </Button>
              <Button
                variant="accent"
                disabled={cart.length === 0}
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutModal(true);
                }}
                className="gap-1.5"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Checkout & Razorpay UPI Modal */}
      {isCheckoutModal && (
        <Modal
          isOpen={isCheckoutModal}
          onClose={() => {
            setIsCheckoutModal(false);
            setOrderConfirmed(false);
          }}
          title={orderConfirmed ? "Order Confirmed!" : "Secure Parent Checkout"}
          description={
            orderConfirmed
              ? "Official school uniform kit booked."
              : `Total: ${formatCurrencyINR(cartTotal)} • Razorpay / UPI Gateway`
          }
        >
          {orderConfirmed ? (
            <div className="space-y-4 text-center py-4 text-xs">
              <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold font-display text-foreground">
                Kit Order Placed: #SCH-PRT-88419
              </h3>
              <p className="text-muted-foreground">
                Your uniform kit will be ready for pickup at{" "}
                <strong className="text-foreground">{selectedSchool.name}</strong> uniform counter on campus within 48 hours.
              </p>

              {/* Barcode pickup slip */}
              <div className="p-4 rounded-xl border border-dashed border-border bg-muted/30 text-center space-y-2">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  Campus Pickup Gate Pass Barcode:
                </span>
                <div className="h-12 w-48 mx-auto bg-foreground/10 flex items-center justify-center font-mono font-bold tracking-widest text-sm text-foreground">
                  ||||| | |||| ||| |||| |
                </div>
                <span className="text-[11px] font-mono text-accent">
                  PASS: DPS-2026-K771
                </span>
              </div>

              <Button
                variant="accent"
                className="w-full"
                onClick={() => {
                  setIsCheckoutModal(false);
                  setOrderConfirmed(false);
                  setCart([]);
                }}
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1 font-semibold">
                  Student Name *
                </label>
                <Input required placeholder="e.g. Aarav Sharma" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">
                    Admission # / Roll No *
                  </label>
                  <Input required placeholder="e.g. DPS-412" />
                </div>
                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">
                    Class &amp; Section *
                  </label>
                  <Input required placeholder="e.g. Grade 7-B" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">
                    Parent Mobile Number *
                  </label>
                  <Input required type="tel" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">
                    Parent Email *
                  </label>
                  <Input required type="email" placeholder="parent@gmail.com" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40 space-y-2">
                <span className="font-semibold text-foreground block">
                  Select Instant Payment Mode:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {["UPI (GPay/PhonePe)", "Debit/Credit Card", "NetBanking"].map(
                    (mode, i) => (
                      <button
                        key={mode}
                        type="button"
                        className={`p-2 rounded-lg border text-center font-medium ${
                          i === 0
                            ? "border-accent bg-accent/10 text-accent font-bold"
                            : "border-border hover:bg-card text-foreground"
                        }`}
                      >
                        {mode}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCheckoutModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="accent" className="w-full">
                  Pay {formatCurrencyINR(cartTotal)} &amp; Book Kit
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* Sizing Assistant Modal */}
      {isSizingModal && (
        <Modal
          isOpen={isSizingModal}
          onClose={() => setIsSizingModal(false)}
          title="Digital Sizing Assistant"
          description="Enter your child's measurements to find their perfect school uniform fit."
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Chest Measurement (Inches) *
              </label>
              <Input
                type="number"
                step="0.5"
                value={childChest}
                onChange={(e) => setChildChest(Number(e.target.value))}
              />
              <span className="text-[11px] text-muted-foreground">
                Measure around the fullest part of the chest under the arms.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-center space-y-1">
              <span className="text-xs text-muted-foreground">
                Recommended Standard Size:
              </span>
              <p className="text-2xl font-black font-display text-accent">
                Size {calculateRecommendedSize(childChest)}&quot;
              </p>
              <p className="text-[11px] text-muted-foreground">
                Includes 1.5&quot; movement &amp; growth allowance for the academic session.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="accent" onClick={() => setIsSizingModal(false)}>
                Apply Size &amp; Shop
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
