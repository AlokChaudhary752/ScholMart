import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background via-background/95 to-primary-900/10">
      <div className="max-w-3xl text-center space-y-6">
        <Badge variant="accent" className="px-4 py-1.5 text-sm gap-1.5 shadow-sm">
          <Sparkles className="h-4 w-4" /> ScholMart Next-Gen B2B Platform
        </Badge>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display gradient-text">
          Institutional School Uniforms &amp; Manufacturing ERP
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Streamlining bulk uniform production, computerized embroidery, 3D custom fitting, and automated school billing across India.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/auth/signup">
            <Button variant="accent" size="lg" className="gap-2">
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="glass" size="lg">
              Partner Login
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Explore Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
