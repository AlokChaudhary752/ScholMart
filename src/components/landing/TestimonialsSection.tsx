"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, School } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TESTIMONIALS = [
  {
    quote:
      "ScholMart transformed our annual admission uniform rush. For 3,200 students across 3 wings, we had zero sizing mismatches and deliveries arrived 14 days before classes commenced. Truly best-in-class.",
    author: "Dr. Sunita Varma",
    title: "Principal",
    school: "Delhi Public School, Sector 45",
    rating: 5,
  },
  {
    quote:
      "The fabric durability is unmatched. Our parents frequently praise that blazers and trousers easily survive two full academic sessions without pilling or color loss. Their B2B dashboard makes purchase orders painless.",
    author: "Capt. Rajesh Nair (Retd.)",
    title: "Director of Administration",
    school: "The Heritage Academy, Gurugram",
    rating: 5,
  },
  {
    quote:
      "Computerized embroidery of our intricate heraldic crest is flawless on every single blazer and sweater. The student-wise barcoded packaging saved our staff hundreds of distribution hours.",
    author: "Fr. Thomas Mathew",
    title: "Headmaster",
    school: "St. Xavier's Senior School, Jaipur",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="accent" className="font-semibold px-3 py-1 text-xs">
            Institutional Feedback
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
            Endorsed by School Leaders &amp; Administrators
          </h2>
        </div>

        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-border shadow-xl relative overflow-hidden">
          <Quote className="absolute top-6 right-8 h-20 w-20 text-muted/30 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="pt-4 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-bold font-display text-base text-foreground">
                  {t.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.title} &bull;{" "}
                  <span className="text-accent font-semibold">{t.school}</span>
                </p>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-xs font-mono text-muted-foreground px-2">
                  {current + 1} / {TESTIMONIALS.length}
                </span>
                <button
                  onClick={next}
                  className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
