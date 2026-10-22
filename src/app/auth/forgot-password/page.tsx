"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsLoading(false);
    setIsSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background via-background/95 to-primary-900/10">
      <div className="max-w-md w-full glass-card p-8 rounded-3xl border border-border shadow-2xl space-y-6">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
        </Link>

        {isSent ? (
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold font-display text-foreground">
              Recovery Link Dispatched
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If an account exists for <strong className="text-foreground">{email}</strong>, we have dispatched a secure 15-minute tokenized password reset link and SMS OTP.
            </p>
            <Link href="/auth/login" className="block pt-2">
              <Button variant="accent" className="w-full">
                Return to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">
                Reset Account Password
              </h1>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Enter your registered institutional email or phone number. We will send you an OTP and password recovery token.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  Official Email or Phone Number
                </label>
                <Input
                  type="text"
                  required
                  placeholder="name@school.edu.in"
                  icon={<Mail className="h-4 w-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full gap-2 shadow-lg shadow-accent/25"
                isLoading={isLoading}
              >
                <Send className="h-4 w-4" /> Send Recovery Link
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
