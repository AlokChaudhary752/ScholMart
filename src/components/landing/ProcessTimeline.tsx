"use client";

import React, { useState } from "react";
import { Ruler, Scissors, Cpu, CheckSquare, Truck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STAGES = [
  {
    step: "01",
    icon: Ruler,
    title: "Digital Sizing & Fit Prediction",
    desc: "Our on-campus sizing camps utilize contactless anthropometric measurement protocols or parent portal submissions with zero confusion.",
    tag: "Accuracy 99.6%",
  },
  {
    step: "02",
    icon: Scissors,
    title: "CAD Pattern Making & Crest Embroidery",
    desc: "Digitized laser pattern cutting ensures zero fabric wastage, while German 12-head embroidery machines weave high-definition school crests.",
    tag: "12,000+ Stitches",
  },
  {
    step: "03",
    icon: Cpu,
    title: "Heavy-Duty Production Lines",
    desc: "Dedicated stitching lines with reinforced French seams, durable interlining collars, and Japanese YKK zippers designed for rough daily school wear.",
    tag: "Anti-Pill & Colorfast",
  },
  {
    step: "04",
    icon: CheckSquare,
    title: "4-Eye Quality Audit & Rejection Gate",
    desc: "Every single garment undergoes shrinkage tests, button pull tests (70N load), and thread trimming before barcoded packaging.",
    tag: "Zero-Defect Standard",
  },
  {
    step: "05",
    icon: Truck,
    title: "Class-Wise Barcoded Campus Delivery",
    desc: "Pre-sorted by student name, roll number, and section in tamper-evident biodegradeable kits delivered directly to school premises.",
    tag: "Delivered Before Session",
  },
];

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 px-4 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <Badge variant="accent" className="font-semibold px-3 py-1 text-xs">
            Systematic Execution
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
            From Sizing Camp to Classroom Desk
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A battle-tested 5-phase production pipeline engineered to handle 10,000+ students per institution with guaranteed delivery dates.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STAGES.map((st, idx) => {
            const Icon = st.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={st.step}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xl scale-102"
                    : "glass-card hover:border-accent/40 text-card-foreground"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xl font-black font-display ${
                        isSelected ? "text-accent" : "text-muted-foreground/50"
                      }`}
                    >
                      {st.step}
                    </span>
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? "bg-white/10 text-white"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-base leading-snug font-display mb-2">
                    {st.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {st.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-current/10">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-accent text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {st.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
