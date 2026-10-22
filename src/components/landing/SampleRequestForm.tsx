"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Send, Calculator, Building, Mail, Phone, User } from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

export function SampleRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [students, setStudents] = useState<number>(1200);
  const [formData, setFormData] = useState({
    schoolName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    gradeRange: "K-12",
  });

  // Dynamic estimate calculation
  // Base average uniform set cost ~₹1,450, discount tiers based on quantity
  const unitRate = students > 2000 ? 1250 : students > 1000 ? 1350 : 1450;
  const estimatedAnnualValue = students * unitRate * 2; // 2 sets per student

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="sample-enquiry-form" className="py-20 px-4 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Instant Cost Estimator & Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="accent" className="font-semibold px-3 py-1 text-xs">
              Direct Institutional Pricing
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
              Request Your Free Sample Box &amp; Bulk Quotation
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              We send our curated institutional sample box containing premium fabric swatches, stitched blazers, shirts, and sample crest embroidery directly to your school address within 48 hours.
            </p>

            {/* Live Pricing Estimator Widget */}
            <div className="p-6 rounded-2xl glass-card border border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Calculator className="h-4 w-4 text-accent" /> Institutional Cost Calculator
                </span>
                <span className="text-xs font-mono font-bold text-accent">
                  {students.toLocaleString("en-IN")} Students
                </span>
              </div>

              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
              />

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-border">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Est. Bulk Rate per Set</span>
                  <span className="text-base font-bold font-display text-foreground">
                    {formatCurrencyINR(unitRate)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Est. Annual Procurement</span>
                  <span className="text-base font-bold font-display text-accent">
                    {formatCurrencyINR(estimatedAnnualValue)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Zero charge for initial fabric sample kit and sizing camp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>30-Day institutional credit cycle upon MOU signing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border border-border shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-foreground">
                    Sample Box Dispatched!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you. Our Institutional Key Account Manager will contact{" "}
                    <strong className="text-foreground">{formData.contactPerson || "you"}</strong>{" "}
                    within 2 hours to confirm your school shipping address.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold font-display text-foreground mb-4">
                    School &amp; Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        School / Institution Name *
                      </label>
                      <Input
                        required
                        placeholder="e.g. St. Xavier's World School"
                        value={formData.schoolName}
                        onChange={(e) =>
                          setFormData({ ...formData, schoolName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        City &amp; State *
                      </label>
                      <Input
                        required
                        placeholder="e.g. Jaipur, Rajasthan"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Contact Person &amp; Designation *
                      </label>
                      <Input
                        required
                        placeholder="e.g. Rajiv Sharma (Principal)"
                        value={formData.contactPerson}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contactPerson: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Official Mobile / WhatsApp *
                      </label>
                      <Input
                        required
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Institutional Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="e.g. principal@school.edu.in"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full gap-2 shadow-lg shadow-accent/25"
                    >
                      <Send className="h-4 w-4" /> Send Free Sample Box &amp; Formal Quote
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground mt-2">
                      No obligation. Courier charges fully covered by ScholMart.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
