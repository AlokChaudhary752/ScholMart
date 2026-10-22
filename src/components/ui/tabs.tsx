"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center justify-start rounded-xl bg-muted/60 p-1 text-muted-foreground",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-2 select-none",
              isActive
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "hover:text-foreground/80 hover:bg-card/40"
            )}
          >
            {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
