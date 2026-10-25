"use client";

import React from "react";
import { School, Shirt, Clock, ShieldCheck, Sparkles } from "lucide-react";

const STATS = [
  {
    icon: School,
    value: "150+",
    label: "Partnered Institutions",
    desc: "Top CBSE, ICSE, Cambridge & IB schools across 18 states",
  },
  {
    icon: Shirt,
    value: "1,200,000+",
    label: "Uniforms Supplied",
    desc: "Zero-defect computerized stitching and fabric quality guarantee",
  },
  {
    icon: Clock,
    value: "99.4%",
    label: "On-Time Dispatch Rate",
    desc: "Before every new academic session commencement date",
  },
  {
    icon: ShieldCheck,
    value: "18+ Years",
    label: "Manufacturing Legacy",
    desc: "Direct mill-to-school pricing with no middleman margins",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-accent flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
            Why India&apos;s Elite Institutions Partner With ScholMart
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eliminating sizing chaos, delayed deliveries, and substandard fabrics with an integrated B2B manufacturing ERP.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-card p-6 rounded-2xl border border-border/80 flex flex-col justify-between hover:border-accent/40 hover:-translate-y-1 transition-all group"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black font-display text-foreground tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed border-t border-border/60 pt-3">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
