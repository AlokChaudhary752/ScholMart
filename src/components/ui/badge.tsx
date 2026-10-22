import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "accent" | "success" | "warning" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-primary text-primary-foreground border-transparent",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    accent: "bg-accent/15 text-accent border-accent/20 font-semibold",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-medium",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 font-medium",
    destructive: "bg-destructive/15 text-destructive border-destructive/20 font-medium",
    outline: "text-foreground border-border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
