"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Award,
  ShieldCheck,
  Building,
  Layers,
  Truck,
  CheckCheck,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] pt-32 pb-20 px-4 sm:px-8 flex items-center justify-center overflow-hidden">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full text-center space-y-8 z-10">
        {/* Top Trust Pill */}
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent" className="px-3.5 py-1 text-xs gap-1.5 shadow-sm font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> India&apos;s #1 Institutional Uniform ERP
          </Badge>
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
            ISO 9001:2015 Certified
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.08] text-foreground">
          School Uniforms Engineered for{" "}
          <span className="gradient-text">Excellence &amp; Scale</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Supplying premium institutional uniforms in bulk to premier schools across India. Complete end-to-end supply chain: digital student sizing, computerized logo embroidery, automated production lines, and on-time campus delivery.
        </p>

        {/* Quick Value Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-muted/60 dark:bg-muted/30 px-3.5 py-1.5 rounded-full border border-border/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <span>Anti-Pilling Cotton Blend</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-muted/60 dark:bg-muted/30 px-3.5 py-1.5 rounded-full border border-border/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <span>Double-Stitched Seams</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-muted/60 dark:bg-muted/30 px-3.5 py-1.5 rounded-full border border-border/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
            <span>Free Student Exchange</span>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/auth/signup">
            <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/25 px-8">
              Onboard Your School <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="#catalog">
            <Button variant="glass" size="lg" className="gap-2 px-6">
              <Layers className="h-4 w-4 text-accent" /> Explore Uniform Catalog
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="border-border px-6">
              Supplier Demo
            </Button>
          </Link>
        </div>

        {/* Key Features Quick Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left max-w-3xl mx-auto">
          <div className="glass-panel p-4 rounded-2xl border border-border/70 shadow-sm">
            <Building className="h-5 w-5 text-accent mb-2" />
            <p className="text-xl font-bold font-display text-foreground">150+</p>
            <p className="text-xs text-muted-foreground">Premier Schools</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-border/70 shadow-sm">
            <CheckCheck className="h-5 w-5 text-emerald-500 mb-2" />
            <p className="text-xl font-bold font-display text-foreground">1.2M+</p>
            <p className="text-xs text-muted-foreground">Uniforms Delivered</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-border/70 shadow-sm">
            <Layers className="h-5 w-5 text-blue-500 mb-2" />
            <p className="text-xl font-bold font-display text-foreground">320 GSM</p>
            <p className="text-xs text-muted-foreground">Durable Fabrics</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-border/70 shadow-sm">
            <Truck className="h-5 w-5 text-accent mb-2" />
            <p className="text-xl font-bold font-display text-foreground">99.8%</p>
            <p className="text-xs text-muted-foreground">On-Time Dispatch</p>
          </div>
        </div>

        {/* Trust Stats Row */}
        <div className="pt-6 border-t border-border/80 flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" />
            <span>
              <strong className="text-foreground">150+</strong> Partnered Institutions Across India
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>
              <strong className="text-foreground">Zero-Disruption</strong> Academic Session Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
