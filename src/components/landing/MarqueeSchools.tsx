"use client";

import React from "react";

const SCHOOLS = [
  { name: "Delhi Public School (DPS)", city: "R.K. Puram & Greater Noida", code: "CBSE" },
  { name: "The Heritage School", city: "Gurugram & Rohini", code: "IB / CBSE" },
  { name: "St. Xavier's Senior High School", city: "Mumbai & Jaipur", code: "ICSE" },
  { name: "Vibgyor Roots & Rise", city: "Bengaluru & Pune", code: "Cambridge" },
  { name: "GD Goenka Signature School", city: "New Delhi", code: "CBSE" },
  { name: "Ryan International School", city: "Chandigarh & Mumbai", code: "ICSE" },
  { name: "Bishop Cotton School", city: "Shimla & Bengaluru", code: "ICSE" },
  { name: "Army Public School (APS)", city: "Dhaula Kuan", code: "CBSE" },
];

export function MarqueeSchools() {
  return (
    <section id="schools" className="py-14 border-y border-border/80 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">
          Trusted Institutional Partners
        </p>
        <h2 className="text-2xl font-bold font-display text-foreground mt-1">
          Supplying Uniforms to 150+ Leading Schools Across India
        </h2>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full flex overflow-x-hidden">
        <div className="flex gap-6 animate-marquee whitespace-nowrap py-2">
          {[...SCHOOLS, ...SCHOOLS].map((school, index) => (
            <div
              key={`${school.name}-${index}`}
              className="inline-flex items-center gap-3.5 glass-card px-5 py-3 rounded-2xl border border-border shadow-sm hover:border-accent/40 transition-colors"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary dark:text-primary-foreground font-black text-sm flex items-center justify-center font-display">
                {school.name.substring(0, 2)}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-foreground leading-tight">
                  {school.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-muted-foreground">{school.city}</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-muted rounded text-foreground">
                    {school.code}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
