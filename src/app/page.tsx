import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Preloader } from "@/components/landing/Preloader";
import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeSchools } from "@/components/landing/MarqueeSchools";
import { StatsSection } from "@/components/landing/StatsSection";
import { InteractiveShowcase3D } from "@/components/landing/InteractiveShowcase3D";
import { ProcessTimeline } from "@/components/landing/ProcessTimeline";
import { EmbroideryCustomizer } from "@/components/landing/EmbroideryCustomizer";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { SampleRequestForm } from "@/components/landing/SampleRequestForm";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ScholMart",
    url: "https://scholmart.com",
    logo: "https://scholmart.com/logo.png",
    description:
      "India's premier institutional uniform manufacturing and B2B SaaS supplier platform.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Textile Cluster Phase IV, Okhla",
      addressLocality: "New Delhi",
      postalCode: "110020",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-11-4892-5500",
      contactType: "sales",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent/20 selection:text-accent">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Preloader with brand logo and progress percentage */}
      <Preloader />

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section with 3D Uniform Canvas */}
        <HeroSection />

        {/* Infinite Marquee of Premier Partner Schools */}
        <MarqueeSchools />

        {/* Why Choose Us: Animated Stats & Certifications */}
        <StatsSection />

        {/* Interactive 3D / 360-Degree Uniform Configurator */}
        <section id="catalog" className="py-20 px-4 sm:px-8 bg-background">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="accent" className="font-semibold px-3 py-1 text-xs">
                Real-Time 3D Engine
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
                360&deg; Uniform Fabric &amp; Style Explorer
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rotate, customize colors, toggle school heraldry, and inspect durable poly-viscose weaves in interactive Three.js 3D.
              </p>
            </div>

            <InteractiveShowcase3D />
          </div>
        </section>

        {/* 5-Stage Institutional Production Process Timeline */}
        <ProcessTimeline />

        {/* Computerized Embroidery Studio Preview */}
        <EmbroideryCustomizer />

        {/* Testimonials Slider */}
        <TestimonialsSection />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Instant Cost Estimator & Free Sample Box Request */}
        <SampleRequestForm />
      </main>

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
}
