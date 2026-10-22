"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FAQS = [
  {
    q: "What is the Minimum Order Quantity (MOQ) for bulk institutional pricing?",
    a: "Our bulk institutional tier begins at 200 sets per item category. For larger school networks (1,000+ sets), we provide customized volume tier discounts (up to 28% off retail) and dedicated on-campus sizing camps.",
  },
  {
    q: "How does ScholMart handle student size exchanges after distribution?",
    a: "We maintain an immediate 5-8% buffer inventory in our local regional hub for every contracted school. If any student needs a size replacement, exchanges are completed within 72 hours via our automated campus exchange portal.",
  },
  {
    q: "Can our school logo and custom house colors be exact-matched?",
    a: "Yes. We offer spectrophotometer lab-dip shade matching for your specific Pantone/Hex colors across poly-viscose, oxford cotton, and sports dry-fit fabrics. Embroidery digitizing is mapped to 0.1mm stitch precision.",
  },
  {
    q: "Are ScholMart invoices GST-compliant and eligible for input credit?",
    a: "All invoices are 100% GST compliant (HSN 6203 / 6204 / 6109) with automated E-Way bills generated through our ERP. We support 30 to 60 day institutional credit cycles against approved purchase orders.",
  },
  {
    q: "Do you offer a Parent Portal where parents can order directly?",
    a: "Yes! Schools can opt for either direct bulk institutional procurement OR provide parents with a custom branded ScholMart school store link with direct UPI/card checkout and door-step courier delivery.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-8 bg-muted/20 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="accent" className="font-semibold px-3 py-1 text-xs">
            Frequently Answered Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
            Everything School Boards &amp; Directors Ask
          </h2>
          <p className="text-sm text-muted-foreground">
            Have a custom requirement or tender specification? We are here to help.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="glass-card rounded-2xl border border-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold font-display text-sm sm:text-base text-foreground">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
