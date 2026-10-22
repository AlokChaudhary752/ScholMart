"use client";

import React, { useState } from "react";
import {
  Settings,
  Building,
  CreditCard,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  FileText,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ERPSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    businessName: "ScholMart Technologies Private Limited",
    brandName: "ScholMart Uniforms",
    gstin: "07AABCS1234F1Z0",
    pan: "AABCS1234F",
    address: "Textile Cluster Phase IV, Okhla Industrial Area, New Delhi - 110020",
    bankName: "HDFC Bank Ltd.",
    accountNo: "50200088194412",
    ifsc: "HDFC0001234",
    branch: "Okhla Phase 3 Branch, New Delhi",
    invoicePrefix: "INV-2026-",
    orderPrefix: "ORD-2026-",
    batchPrefix: "BATCH-",
    autoSendWhatsapp: true,
    enable2fa: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            ERP Settings &amp; Configuration
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure legal entity details, banking coordinates, invoice numbering schemes, and automated notifications
          </p>
        </div>

        {saved && (
          <Badge variant="accent" className="gap-1 animate-in fade-in">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Settings Saved!
          </Badge>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Business Profile */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Building className="h-4 w-4 text-accent" />
            <h3 className="font-bold text-sm font-display text-foreground">
              Corporate Business &amp; Tax Registration
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Registered Legal Entity Name
              </label>
              <Input
                value={settings.businessName}
                onChange={(e) =>
                  setSettings({ ...settings, businessName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Trade / Brand Name
              </label>
              <Input
                value={settings.brandName}
                onChange={(e) =>
                  setSettings({ ...settings, brandName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                GST Identification Number (GSTIN)
              </label>
              <Input
                value={settings.gstin}
                onChange={(e) =>
                  setSettings({ ...settings, gstin: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Permanent Account Number (PAN)
              </label>
              <Input
                value={settings.pan}
                onChange={(e) =>
                  setSettings({ ...settings, pan: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Corporate Factory &amp; Office Address
            </label>
            <Input
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
            />
          </div>
        </div>

        {/* Banking Coordinates */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <CreditCard className="h-4 w-4 text-accent" />
            <h3 className="font-bold text-sm font-display text-foreground">
              Banking Coordinates for Tax Invoices (RTGS / NEFT)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Bank Name
              </label>
              <Input
                value={settings.bankName}
                onChange={(e) =>
                  setSettings({ ...settings, bankName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Current Account Number
              </label>
              <Input
                value={settings.accountNo}
                onChange={(e) =>
                  setSettings({ ...settings, accountNo: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                IFSC Code
              </label>
              <Input
                value={settings.ifsc}
                onChange={(e) =>
                  setSettings({ ...settings, ifsc: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Branch Location
              </label>
              <Input
                value={settings.branch}
                onChange={(e) =>
                  setSettings({ ...settings, branch: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Document Numbering Formats */}
        <div className="glass-card p-6 rounded-2xl border border-border space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <FileText className="h-4 w-4 text-accent" />
            <h3 className="font-bold text-sm font-display text-foreground">
              Document Numbering Formats
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Tax Invoice Prefix
              </label>
              <Input
                value={settings.invoicePrefix}
                onChange={(e) =>
                  setSettings({ ...settings, invoicePrefix: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Purchase Order Prefix
              </label>
              <Input
                value={settings.orderPrefix}
                onChange={(e) =>
                  setSettings({ ...settings, orderPrefix: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Production Batch Prefix
              </label>
              <Input
                value={settings.batchPrefix}
                onChange={(e) =>
                  setSettings({ ...settings, batchPrefix: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/25">
            <Save className="h-4 w-4" /> Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
