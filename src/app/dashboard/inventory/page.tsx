"use client";

import React, { useState } from "react";
import {
  Boxes,
  Search,
  Plus,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Warehouse,
  CheckCircle2,
  FileText,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { INITIAL_RAW_INVENTORY, RawMaterialStock } from "@/lib/mockData";
import { formatCurrencyINR } from "@/lib/utils";

export default function RawInventoryPage() {
  const [inventory, setInventory] = useState<RawMaterialStock[]>(
    INITIAL_RAW_INVENTORY
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [isPoModalOpen, setIsPoModalOpen] = useState(false);
  const [selectedItemForPo, setSelectedItemForPo] =
    useState<RawMaterialStock | null>(null);

  const [poQuantity, setPoQuantity] = useState(500);

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "ALL" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalInventoryValuation = inventory.reduce(
    (acc, curr) => acc + curr.currentStock * curr.unitCost,
    0
  );

  const handleIssuePo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForPo) return;
    alert(
      `Issued PO for ${poQuantity} ${selectedItemForPo.unit} of ${selectedItemForPo.name} to ${selectedItemForPo.supplier}`
    );
    setIsPoModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Raw Materials &amp; Fabrics Inventory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Loom fabric meters, Madeira embroidery reels, brass buttons, and automated supplier replenishment
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-card border border-border text-xs">
            <span className="text-muted-foreground">Total Valuation: </span>
            <strong className="text-foreground font-mono font-bold">
              {formatCurrencyINR(totalInventoryValuation)}
            </strong>
          </div>
          <Button
            variant="accent"
            size="sm"
            className="gap-2 shadow-sm"
            onClick={() => {
              setSelectedItemForPo(inventory[0]);
              setIsPoModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Issue Mill PO
          </Button>
        </div>
      </div>

      {/* Stock Alerts & Multi-warehouse Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-border space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-semibold">
              <Warehouse className="h-4 w-4 text-accent" /> Main Warehouse A (Okhla)
            </span>
            <Badge variant="default" className="text-[10px]">
              Active
            </Badge>
          </div>
          <p className="text-2xl font-black font-display text-foreground">
            4,820 <span className="text-xs font-normal text-muted-foreground">Meters / Units</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            Central cutting &amp; fabric roll storage
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-semibold">
              <Warehouse className="h-4 w-4 text-accent" /> Unit 2 Embroidery Hub
            </span>
            <Badge variant="default" className="text-[10px]">
              Active
            </Badge>
          </div>
          <p className="text-2xl font-black font-display text-foreground">
            180 <span className="text-xs font-normal text-muted-foreground">Reels / Trims</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            German multi-head embroidery unit
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-rose-600">
              <AlertTriangle className="h-4 w-4" /> Low Stock Action Alert
            </span>
            <Badge variant="destructive" className="text-[10px]">
              2 Items Low
            </Badge>
          </div>
          <p className="text-sm font-bold text-foreground">
            Navy Wool Suiting &amp; YKK Zippers
          </p>
          <p className="text-[11px] text-muted-foreground">
            Reorder threshold reached for upcoming DPS winter batch.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search raw material SKU, fabric name, or mill supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "Fabric", "Thread", "Buttons", "Zippers"].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                typeFilter === type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">SKU</th>
                <th className="p-4">Raw Material Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Location</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4">Reorder Min</th>
                <th className="p-4">Mill Supplier</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-accent">
                    {item.sku}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Cost: {formatCurrencyINR(item.unitCost)} / {item.unit}
                    </p>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className="text-[10px]">
                      {item.type}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {item.warehouse}
                  </td>
                  <td className="p-4 font-mono font-bold text-foreground">
                    {item.currentStock.toLocaleString()} {item.unit}
                  </td>
                  <td className="p-4 font-mono text-muted-foreground">
                    {item.reorderLevel.toLocaleString()} {item.unit}
                  </td>
                  <td className="p-4 font-semibold text-foreground">
                    {item.supplier}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        item.status === "Optimal"
                          ? "default"
                          : item.status === "Low Stock"
                          ? "warning"
                          : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedItemForPo(item);
                        setIsPoModalOpen(true);
                      }}
                      className="text-xs h-8 gap-1"
                    >
                      <Plus className="h-3 w-3" /> Reorder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Mill PO Modal */}
      {selectedItemForPo && (
        <Modal
          isOpen={isPoModalOpen}
          onClose={() => setIsPoModalOpen(false)}
          title={`Generate Purchase Order: ${selectedItemForPo.name}`}
          description={`Direct procurement dispatch to ${selectedItemForPo.supplier}.`}
        >
          <form onSubmit={handleIssuePo} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-muted/40 space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mill Supplier:</span>
                <span className="font-bold text-foreground">
                  {selectedItemForPo.supplier}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit Cost:</span>
                <span className="font-mono font-semibold text-foreground">
                  {formatCurrencyINR(selectedItemForPo.unitCost)} per{" "}
                  {selectedItemForPo.unit}
                </span>
              </div>
            </div>

            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Procurement Quantity ({selectedItemForPo.unit}) *
              </label>
              <Input
                type="number"
                required
                value={poQuantity}
                onChange={(e) => setPoQuantity(Number(e.target.value))}
              />
            </div>

            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-between">
              <span className="text-muted-foreground">Estimated PO Total:</span>
              <span className="font-mono font-bold text-base text-accent">
                {formatCurrencyINR(poQuantity * selectedItemForPo.unitCost)}
              </span>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPoModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="accent">
                Authorize &amp; Transmit PO
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
