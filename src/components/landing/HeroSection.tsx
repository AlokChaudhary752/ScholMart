"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Uniform3DScene } from "@/components/3d/Uniform3DScene";
import { ArrowRight, Sparkles, CheckCircle2, Award, ShieldCheck, Box } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 px-4 sm:px-8 flex items-center overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 space-y-7 text-left z-10">
          <div className="inline-flex items-center gap-2">
            <Badge variant="accent" className="px-3.5 py-1 text-xs gap-1.5 shadow-sm font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> India&apos;s #1 Institutional Uniform ERP
            </Badge>
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
              ISO 9001:2015 Certified
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.08] text-foreground">
            School Uniforms Engineered for{" "}
            <span className="gradient-text">Excellence &amp; Scale</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Supplying premium institutional uniforms in bulk to premier schools across India. Complete end-to-end supply chain: digital student sizing, computerized logo embroidery, automated production lines, and on-time campus delivery.
          </p>

          {/* Quick value badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Anti-Pilling Cotton Blend</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Double-Stitched Seams</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Free Student Exchange</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link href="/auth/signup">
              <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/25">
                Onboard Your School <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="#customizer">
              <Button variant="glass" size="lg" className="gap-2">
                <Box className="h-4 w-4 text-accent" /> Explore 3D Customizer
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="border-border">
                Supplier Demo
              </Button>
            </Link>
          </div>

          {/* Trust stats row */}
          <div className="pt-6 border-t border-border/80 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              <span>
                <strong className="text-foreground">150+</strong> Partnered Institutions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>
                <strong className="text-foreground">1.2M+</strong> Uniforms Delivered
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero 3D Uniform Canvas */}
        <div className="lg:col-span-5 relative h-[480px] sm:h-[580px] w-full flex items-center justify-center">
          <div className="w-full h-full rounded-3xl relative overflow-hidden">
            <Uniform3DScene
              color="#0B192C"
              accentColor="#FF6500"
              activeItem="full"
              className="w-full h-full"
            />
          </div>

          {/* Floating UI Callout Cards */}
          <div className="absolute top-10 right-4 glass-panel p-3 rounded-2xl border border-border/80 shadow-md backdrop-blur-md max-w-[190px] animate-float">
            <p className="text-[11px] font-bold text-accent uppercase tracking-wider">
              CAD Monogram
            </p>
            <p className="text-xs font-semibold text-foreground mt-0.5">
              12k-Stitch Gold Thread Crest
            </p>
          </div>

          <div
            className="absolute bottom-8 left-4 glass-panel p-3.5 rounded-2xl border border-border/80 shadow-md backdrop-blur-md max-w-[210px] animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs">
                99%
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Zero-Disruption</p>
                <p className="text-[10px] text-muted-foreground">Academic session dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
