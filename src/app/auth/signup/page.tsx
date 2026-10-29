"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useAuthStore, UserRole } from "@/lib/auth";

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
  User,
  Building,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    orgName: "",
    phone: "",
    email: "",
    password: "",
    role: "SCHOOL_REPRESENTATIVE" as UserRole,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setError("Please agree to the Terms of Service to continue.");
      return;
    }
    setError("");
    setOtpModalOpen(true);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    // Auto advance focus
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsVerifying(false);
    setOtpModalOpen(false);

    await login(formData.email, formData.role);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background">
      {/* Left Column: 3D Visual & Benefits */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-primary-900 via-primary-600 to-slate-950 text-white p-12 flex-col justify-between relative overflow-hidden">
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
            Institutional Sign-up
          </Badge>
        </div>

        {/* 3D Scene */}
        <div className="relative z-10 my-auto h-[360px] w-full flex items-center justify-center">
          <Uniform3DScene
            color="#4A0E17"
            accentColor="#FFB020"
            activeItem="full"
            className="w-full h-full"
          />
        </div>

        {/* Institutional Onboarding Perks */}
        <div className="relative z-10 space-y-3 border-t border-white/10 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-accent">
            Institutional Onboarding Includes:
          </p>
          <div className="space-y-2 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Complimentary On-Campus Digital Sizing Camp</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Direct Mill Pricing &amp; High-Density Crest Embroidery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Dedicated Account Manager &amp; 30-Day Credit Line</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto">
        <div className="max-w-lg w-full mx-auto my-auto space-y-7">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Start Supplying or Procuring
            </span>
            <h1 className="text-3xl font-extrabold font-display tracking-tight text-foreground mt-1">
              Create Partner Account
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Join 150+ institutions using ScholMart to manage student sizing, orders, and uniform manufacturing.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground block">
                Select Your Account Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "SCHOOL_REPRESENTATIVE", label: "School Principal / Rep" },
                  { id: "SUPPLIER_ADMIN", label: "Uniform Supplier" },
                  { id: "PRODUCTION_HEAD", label: "Production Staff" },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, role: r.id as UserRole })
                    }
                    className={`p-3 rounded-xl border text-xs font-medium transition-all text-center ${
                      formData.role === r.id
                        ? "border-accent bg-accent/10 font-bold text-accent shadow-sm"
                        : "border-border hover:bg-muted text-foreground"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Full Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Vikram Malhotra"
                  icon={<User className="h-4 w-4" />}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  School / Organization Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Delhi Public School"
                  icon={<Building className="h-4 w-4" />}
                  value={formData.orgName}
                  onChange={(e) =>
                    setFormData({ ...formData, orgName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Official Email *
                </label>
                <Input
                  required
                  type="email"
                  placeholder="name@school.edu.in"
                  icon={<Mail className="h-4 w-4" />}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Contact Mobile Number *
                </label>
                <Input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  icon={<Phone className="h-4 w-4" />}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password with strength meter */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Password *
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 8 chars, 1 uppercase, 1 symbol"
                  icon={<Lock className="h-4 w-4" />}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Strength Meter Bar */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-colors ${
                          strength >= step
                            ? strength <= 2
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Strength:{" "}
                    <span className="font-semibold text-foreground">
                      {strength <= 1
                        ? "Weak"
                        : strength <= 3
                        ? "Moderate"
                        : "Strong (Secure)"}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-xs text-muted-foreground leading-normal">
                I agree to the ScholMart Institutional Terms of Service and Privacy Policy. I confirm I am an authorized representative.
              </span>
            </label>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full gap-2 shadow-lg shadow-accent/25"
            >
              Verify OTP &amp; Create Account <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
            Already have an active institutional account?{" "}
            <Link
              href="/auth/login"
              className="text-accent hover:underline font-semibold"
            >
              Partner Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Modal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        title="Verify Official Email"
        description={`We sent a 4-digit verification code to ${formData.email || "your email"}.`}
      >
        <div className="space-y-6 pt-2">
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={otpCode[idx]}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="h-14 w-12 text-center text-2xl font-bold font-mono rounded-xl border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none"
              />
            ))}
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Didn&apos;t receive code?{" "}
            <button
              type="button"
              onClick={() => alert("Resent verification code: 4829")}
              className="text-accent font-semibold hover:underline"
            >
              Resend OTP
            </button>
          </div>

          <Button
            onClick={handleVerifyOtp}
            variant="accent"
            size="lg"
            className="w-full gap-2 shadow-md"
            isLoading={isVerifying}
          >
            Confirm &amp; Launch Dashboard <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}
