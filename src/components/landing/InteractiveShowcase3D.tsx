"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Uniform3DScene } from "@/components/3d/Uniform3DScene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCw, Check, Sparkles, Shield, Palette } from "lucide-react";

const PALETTES = [
  { name: "Navy Blue (Standard)", hex: "#0B192C", accent: "#FF6500" },
  { name: "Royal Maroon (Heritage)", hex: "#4A0E17", accent: "#FFB020" },
  { name: "Emerald Green (St. Xaviers)", hex: "#0E3B24", accent: "#E5A93C" },
  { name: "Charcoal Slate (Modern)", hex: "#222831", accent: "#00ADB5" },
];

const GARMENT_TYPES = [
  { id: "full", label: "Full Uniform Set" },
  { id: "blazer", label: "Embroidered Blazer" },
  { id: "shirt", label: "Oxford Cotton Shirt" },
] as const;

const SIZES = ["28", "30", "32", "34", "36", "38", "40", "42"];

export function InteractiveShowcase3D() {
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0]);
  const [activeGarment, setActiveGarment] = useState<"full" | "blazer" | "shirt">("full");
  const [selectedSize, setSelectedSize] = useState("32");
  const [hasEmbroidery, setHasEmbroidery] = useState(true);

  return (
    <div className="w-full rounded-3xl glass-card overflow-hidden border border-border shadow-xl grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
      {/* 3D Viewer Canvas Column */}
      <div className="lg:col-span-7 relative h-[420px] lg:h-full bg-gradient-to-b from-primary-50/40 via-background to-secondary/30 dark:from-primary-900/20 dark:to-background flex items-center justify-center p-4">
        {/* Floating Controls Overlay */}
        <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-2">
          <Badge variant="accent" className="gap-1 shadow-sm">
            <Sparkles className="h-3 w-3" /> 3D Real-time Configurator
          </Badge>
          <Badge variant="outline" className="gap-1 bg-background/80 backdrop-blur-md">
            <RotateCw className="h-3 w-3 text-muted-foreground animate-spin-slow" /> Drag to Rotate 360°
          </Badge>
        </div>

        {/* 3D Scene */}
        <Uniform3DScene
          color={selectedPalette.hex}
          accentColor={selectedPalette.accent}
          activeItem={activeGarment}
          className="w-full h-full"
        />

        {/* Live specs pill */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
          <div className="glass-panel px-4 py-2 rounded-xl text-xs font-medium text-foreground backdrop-blur-md border border-border/60 pointer-events-auto shadow-sm">
            Current Fabric: <span className="font-bold text-accent">{selectedPalette.name.split(" ")[0]} 320 GSM Blend</span>
          </div>
          <div className="glass-panel px-3 py-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 backdrop-blur-md border border-border/60 pointer-events-auto flex items-center gap-1.5 shadow-sm">
            <Shield className="h-3.5 w-3.5" /> ISO 9001 Certified Stitching
          </div>
        </div>
      </div>

      {/* Configuration Customizer Column */}
      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-card/60">
        <div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Interactive B2B Customizer
            </span>
            <h3 className="text-2xl font-bold font-display text-foreground">
              Configure Your School&apos;s Uniform
            </h3>
            <p className="text-sm text-muted-foreground">
              Instant 3D rendering with custom school colorways, anti-fade fabrics, and computerized gold-thread crest embroidery.
            </p>
          </div>

          {/* Garment Selector */}
          <div className="mt-6 space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              1. Garment Component
            </label>
            <div className="grid grid-cols-3 gap-2">
              {GARMENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveGarment(type.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    activeGarment === type.id
                      ? "border-accent bg-accent/10 text-accent font-semibold shadow-sm"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* School Theme Colorway */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-accent" /> 2. School Color Palette
              </label>
              <span className="text-xs font-medium text-foreground">
                {selectedPalette.name}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {PALETTES.map((pal) => (
                <button
                  key={pal.name}
                  onClick={() => setSelectedPalette(pal)}
                  className={`h-11 rounded-xl flex items-center justify-center transition-all border-2 ${
                    selectedPalette.name === pal.name
                      ? "border-accent scale-105 shadow-md"
                      : "border-transparent hover:scale-102 opacity-85 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: pal.hex }}
                  title={pal.name}
                >
                  {selectedPalette.name === pal.name && (
                    <Check className="h-4 w-4 text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizing & Fit Slabs */}
          <div className="mt-6 space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              3. Size Standard (Inches)
            </label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-9 w-10 rounded-lg text-xs font-medium border transition-all ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground font-bold border-primary shadow-sm"
                      : "border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Computerized Embroidery Toggle */}
          <div className="mt-6 p-3.5 rounded-xl border border-border bg-muted/30 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                School Crest Embroidery
              </p>
              <p className="text-xs text-muted-foreground">
                12,000+ stitch HD German Madeira thread monogram
              </p>
            </div>
            <button
              onClick={() => setHasEmbroidery(!hasEmbroidery)}
              className={`h-6 w-11 rounded-full p-1 transition-colors ${
                hasEmbroidery ? "bg-accent" : "bg-muted"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition-transform ${
                  hasEmbroidery ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="accent"
            size="lg"
            className="w-full gap-2 shadow-lg shadow-accent/25"
            onClick={() => {
              const el = document.getElementById("sample-enquiry-form");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Request Free Fabric Swatch &amp; Sample Box
          </Button>
          <p className="text-center text-[11px] text-muted-foreground mt-2">
            Free sample delivered to institutional decision makers within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
