"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-display font-black text-lg shadow-md shadow-primary/20">
                SM
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-tight text-foreground flex items-center gap-1">
                  ScholMart
                  <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block -mt-1 font-medium">
                  Institutional Uniform ERP
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              ScholMart is India&apos;s leading institutional uniform manufacturing platform, delivering high-durability school blazers, oxford shirts, sports kits, and computerized monograms to 150+ premier institutions.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>ISO 9001:2015 &amp; OEKO-TEX Standard 100 Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm font-display text-foreground mb-4 uppercase tracking-wider">
              Uniform Solutions
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="#customizer" className="hover:text-foreground transition-colors">
                  Formal Oxford Shirts &amp; Skirts
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-foreground transition-colors">
                  Woolen &amp; Cashmere Blend Blazers
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-foreground transition-colors">
                  House Sports Kits &amp; Tracksuits
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-foreground transition-colors">
                  Winter Cardigans &amp; Hoodies
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-foreground transition-colors">
                  Computerized Crest Embroidery
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional ERP */}
          <div>
            <h4 className="font-bold text-sm font-display text-foreground mb-4 uppercase tracking-wider">
              Platform &amp; Supply
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  B2B Supplier ERP Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-foreground transition-colors">
                  School Representative Portal
                </Link>
              </li>
              <li>
                <a href="#process" className="hover:text-foreground transition-colors">
                  5-Stage Quality Pipeline
                </a>
              </li>
              <li>
                <a href="#sample-enquiry-form" className="hover:text-foreground transition-colors">
                  Bulk Sizing Camp Booking
                </a>
              </li>
              <li>
                <a href="#sample-enquiry-form" className="hover:text-foreground transition-colors">
                  Request Sample Box
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm font-display text-foreground mb-4 uppercase tracking-wider">
              Corporate Office
            </h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Textile Cluster Phase IV, Okhla Industrial Area, New Delhi - 110020</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span>+91 11 4892 5500 / +91 98110 54321</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span>institutional@scholmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>
            &copy; {new Date().getFullYear()} ScholMart Technologies Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#privacy" className="hover:text-foreground">Privacy Policy</a>
            <a href="#terms" className="hover:text-foreground">Terms of Bulk Supply</a>
            <a href="#gst" className="hover:text-foreground">GST Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
