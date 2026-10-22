"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 8;
        return Math.min(100, prev + increment);
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-6 max-w-xs text-center">
        {/* Animated Brand Emblem */}
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30 border border-primary-500/30">
            <span className="text-2xl font-black font-display text-white tracking-wider">
              SM
            </span>
          </div>
          <div className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-accent flex items-center justify-center shadow-md shadow-accent/50 animate-bounce">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold font-display tracking-tight text-foreground">
            ScholMart
          </h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            Institutional Uniform ERP
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-48 space-y-2">
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
            <span>Loading 3D Studio</span>
            <span className="font-semibold text-accent">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
