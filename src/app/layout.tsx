import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ScholMart | Premium School Uniforms & B2B Manufacturing ERP",
  description:
    "ScholMart is India's leading bulk school uniform manufacturer and B2B SaaS supplier platform. Manage schools, catalogs, custom embroidery, bulk sizing, production tracking and GST invoicing.",
  keywords: [
    "school uniforms",
    "uniform manufacturer",
    "bulk school uniforms India",
    "uniform B2B portal",
    "school blazer embroidery",
    "school uniform ERP",
  ],
  authors: [{ name: "ScholMart Technologies" }],
  openGraph: {
    title: "ScholMart | School Uniform Manufacturing & Supply ERP",
    description:
      "Enterprise uniform supply chain platform for schools, bulk sizing, computerized embroidery, and real-time order tracking.",
    type: "website",
    locale: "en_IN",
    siteName: "ScholMart",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B192C" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/20 selection:text-accent">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
