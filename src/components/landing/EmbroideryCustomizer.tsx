"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Check, Layers } from "lucide-react";

const CREST_PRESETS = [
  { id: "shield", name: "Institutional Shield", motto: "Excellence in Action" },
  { id: "laurel", name: "Laurel & Torch", motto: "Knowledge is Power" },
  { id: "eagle", name: "Royal Crest Monogram", motto: "Soar to Greatness" },
];

const PLACEMENTS = [
  { id: "pocket", name: "Left Breast Pocket (Blazer/Shirt)" },
  { id: "tie", name: "Center Tie Blade Monogram" },
  { id: "collar", name: "Twin Collar Point Tips" },
  { id: "sleeve", name: "Sports Kit Left Sleeve" },
];

const THREADS = [
  { name: "Gold Metallic", hex: "#D4AF37", glow: "rgba(212, 175, 55, 0.4)" },
  { name: "Silver Luster", hex: "#E0E0E0", glow: "rgba(224, 224, 224, 0.4)" },
  { name: "Royal Maroon", hex: "#800020", glow: "rgba(128, 0, 32, 0.4)" },
  { name: "Deep Navy", hex: "#0B192C", glow: "rgba(11, 25, 44, 0.4)" },
];

export function EmbroideryCustomizer() {
  const [selectedCrest, setSelectedCrest] = useState(CREST_PRESETS[0]);
  const [selectedPlacement, setSelectedPlacement] = useState(PLACEMENTS[0]);
  const [selectedThread, setSelectedThread] = useState(THREADS[0]);
  const [schoolName, setSchoolName] = useState("Delhi Public School");

  return (
    <section id="customizer" className="py-20 px-4 sm:px-8 bg-muted/20 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="accent" className="font-semibold px-3 py-1 text-xs">
            Precision Embroidery Studio
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
            Custom Computerized School Monograms
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Preview your institution&apos;s crest embroidered with German Madeira high-tensile threads, tested for 500+ commercial machine washes without fading or fraying.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Embroidery Crest Canvas Preview */}
          <div className="lg:col-span-6 glass-card p-8 rounded-3xl border border-border shadow-xl flex flex-col items-center justify-center min-h-[440px] relative overflow-hidden bg-gradient-to-b from-primary-900 via-primary-900/95 to-slate-950 text-white">
            {/* Fabric Weave Texture Overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 10px",
              }}
            />

            {/* Crest Emblem Simulation */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div
                className="h-36 w-36 rounded-full border-4 flex flex-col items-center justify-center p-3 relative shadow-2xl transition-all duration-300"
                style={{
                  borderColor: selectedThread.hex,
                  boxShadow: `0 0 30px ${selectedThread.glow}`,
                }}
              >
                <Shield
                  className="h-14 w-14 mb-1 transition-colors"
                  style={{ color: selectedThread.hex }}
                />
                <span
                  className="text-[10px] font-mono uppercase tracking-widest font-bold"
                  style={{ color: selectedThread.hex }}
                >
                  EST. 1998
                </span>
              </div>

              <div className="space-y-1">
                <p
                  className="text-lg font-black font-display tracking-wide uppercase"
                  style={{ color: selectedThread.hex }}
                >
                  {schoolName || "Institutional Crest"}
                </p>
                <p className="text-xs text-slate-300 italic">
                  &ldquo;{selectedCrest.motto}&rdquo;
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20">
                  {selectedPlacement.name.split(" (")[0]}
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-accent/20 text-accent font-semibold border border-accent/30">
                  12,800 Stitches
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                School Name on Crest
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter School Name..."
                className="w-full h-11 px-4 rounded-xl border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Crest Templates */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                Crest Template Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CREST_PRESETS.map((cr) => (
                  <button
                    key={cr.id}
                    onClick={() => setSelectedCrest(cr)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedCrest.id === cr.id
                        ? "border-accent bg-accent/10 font-bold text-accent shadow-sm"
                        : "border-border hover:bg-muted text-foreground"
                    }`}
                  >
                    {cr.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Embroidery Thread Choice */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                Thread Material &amp; Luster
              </label>
              <div className="grid grid-cols-4 gap-3">
                {THREADS.map((th) => (
                  <button
                    key={th.name}
                    onClick={() => setSelectedThread(th)}
                    className={`h-11 rounded-xl border-2 flex items-center justify-center transition-all ${
                      selectedThread.name === th.name
                        ? "border-accent scale-105 shadow-md"
                        : "border-transparent opacity-85 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: th.hex }}
                    title={th.name}
                  >
                    {selectedThread.name === th.name && (
                      <Check className="h-4 w-4 text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Placement Location */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                Uniform Placement
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PLACEMENTS.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => setSelectedPlacement(pl)}
                    className={`px-3 py-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedPlacement.id === pl.id
                        ? "border-accent bg-accent/10 font-semibold text-accent shadow-sm"
                        : "border-border hover:bg-muted text-foreground"
                    }`}
                  >
                    {pl.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
