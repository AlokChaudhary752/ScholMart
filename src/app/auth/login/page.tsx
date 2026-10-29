"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuthStore, DEMO_USERS } from "@/lib/auth";

const Uniform3DScene = dynamic(
  () => import("@/components/3d/Uniform3DScene").then((m) => m.Uniform3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("admin@scholmart.com");
  const [password, setPassword] = useState("Password@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const success = await login(email);
      if (success) {
        router.push("/dashboard");
      }
    } catch {
      setError("Invalid credentials. Please verify or use a demo account.");
    }
  };

  const handleQuickDemo = (demoKey: keyof typeof DEMO_USERS) => {
    const u = DEMO_USERS[demoKey];
    setEmail(u.email);
    setPassword("Password@123");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background">
      {/* Left Column: Visual Showcase & Brand Story (Hidden on small mobile) */}
      <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-primary-900 via-primary-600 to-slate-950 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle glow orb */}
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center font-display font-black text-white text-lg shadow-lg">
              SM
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              ScholMart
            </span>
          </Link>
          <Badge variant="accent" className="bg-accent/20 text-accent-foreground border-accent/40">
            Institutional B2B Portal
          </Badge>
        </div>

        {/* 3D Uniform Canvas in Left Split Screen */}
        <div className="relative z-10 my-auto h-[380px] w-full flex items-center justify-center">
          <Uniform3DScene
            color="#0B192C"
            accentColor="#FF6500"
            activeItem="blazer"
            className="w-full h-full"
          />
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 space-y-4 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>AES-256 Encrypted Session &bull; ISO 9001:2015 Manufacturing</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md">
            &ldquo;ScholMart eliminated all uniform sizing discrepancies across our 3,200 students. The automated portal and billing system saved our admin team over 140 hours.&rdquo;
          </p>
          <p className="text-[11px] text-accent font-semibold">
            — Dr. Sunita Varma, Principal (Delhi Public School)
          </p>
        </div>
      </div>

      {/* Right Column: Modern Glassmorphic Form */}
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-12 md:p-16">
        {/* Mobile Logo for small screens */}
        <div className="flex lg:hidden items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center font-display font-bold text-white text-base">
              SM
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              ScholMart
            </span>
          </Link>
          <Link href="/auth/signup" className="text-xs font-semibold text-accent">
            Need an account?
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Secure Partner Access
            </span>
            <h1 className="text-3xl font-extrabold font-display tracking-tight text-foreground mt-1">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to manage uniform orders, sizing lists, production schedules, and GST invoices.
            </p>
          </div>

          {/* Quick Demo Switcher Pills */}
          <div className="p-3.5 rounded-2xl border border-border bg-muted/40 space-y-2">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
              ⚡ Instant 1-Click Demo Profiles:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo("admin")}
                className="px-2.5 py-1.5 rounded-lg border border-border bg-card hover:border-accent text-left font-medium text-foreground transition-all flex items-center gap-1.5"
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
                Supplier Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("schoolRep")}
                className="px-2.5 py-1.5 rounded-lg border border-border bg-card hover:border-accent text-left font-medium text-foreground transition-all flex items-center gap-1.5"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                DPS Principal
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("production")}
                className="px-2.5 py-1.5 rounded-lg border border-border bg-card hover:border-accent text-left font-medium text-foreground transition-all flex items-center gap-1.5"
              >
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Production Head
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("accountant")}
                className="px-2.5 py-1.5 rounded-lg border border-border bg-card hover:border-accent text-left font-medium text-foreground transition-all flex items-center gap-1.5"
              >
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Accountant
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                Official Email or Mobile Number
              </label>
              <Input
                type="text"
                required
                placeholder="name@school.edu.in or +91 98..."
                icon={<Mail className="h-4 w-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-accent hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-xs text-muted-foreground">Remember this device</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full gap-2 shadow-lg shadow-accent/25"
              isLoading={isLoading}
            >
              Sign In to ERP <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/auth/signup"
              className="text-accent hover:underline font-semibold"
            >
              Onboard Your School / Register as Supplier
            </Link>
          </div>
        </div>

        {/* Security watermark */}
        <div className="text-center text-[11px] text-muted-foreground/60">
          Protected by ScholMart Enterprise Identity &bull; 256-Bit SSL
        </div>
      </div>
    </div>
  );
}
