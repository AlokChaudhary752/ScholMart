"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Plus,
  Filter,
  Layers,
  Sparkles,
  Tag,
  Palette,
  Shield,
  CheckCircle2,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { INITIAL_CATALOG, CatalogItemData } from "@/lib/mockData";
import { formatCurrencyINR } from "@/lib/utils";

export default function UniformCatalogPage() {
  const [items, setItems] = useState<CatalogItemData[]>(INITIAL_CATALOG);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [seasonFilter, setSeasonFilter] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    sku: "",
    name: "",
    category: "Shirt" as const,
    gender: "Unisex" as const,
    season: "Regular" as const,
    fabric: "",
    colorName: "Navy Blue",
    colorHex: "#0B192C",
    basePrice: 550,
    bulkPrice500: 490,
    bulkPrice1000: 450,
    embroideryPlacement: "Left Chest Pocket Monogram",
  });

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.fabric.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || item.category === categoryFilter;
    const matchesSeason =
      seasonFilter === "ALL" || item.season === seasonFilter;
    return matchesSearch && matchesCategory && matchesSeason;
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CatalogItemData = {
      id: `cat-${Date.now()}`,
      sku: newItem.sku.toUpperCase(),
      name: newItem.name,
      category: newItem.category,
      gender: newItem.gender,
      season: newItem.season,
      fabric: newItem.fabric || "Premium Poly-Viscose Blend",
      colorName: newItem.colorName,
      colorHex: newItem.colorHex,
      basePrice: Number(newItem.basePrice),
      bulkPrice500: Number(newItem.bulkPrice500),
      bulkPrice1000: Number(newItem.bulkPrice1000),
      availableSizes: ["28", "30", "32", "34", "36", "38", "40"],
      stockQuantity: 500,
      embroideryPlacement: newItem.embroideryPlacement,
      schoolsSupplied: ["DPS-RKP", "STX-JPR"],
    };

    setItems([created, ...items]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Uniform Policies &amp; Garment Catalog
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Standardized school specifications, fabric blends, size ranges, bulk volume tiers, and crest positions
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          className="gap-2 shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Add Uniform SKU
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by garment title, SKU code, or fabric..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "Shirt", "Blazer", "Trouser", "Skirt", "Sweater", "Sports Kit"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  categoryFilter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Catalog Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-card p-6 rounded-2xl border border-border hover:border-accent/40 transition-all flex flex-col justify-between space-y-5 group"
          >
            <div>
              {/* Top Row: Color swatch, Category & Season */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full border border-border/80 shadow-sm"
                    style={{ backgroundColor: item.colorHex }}
                    title={item.colorName}
                  />
                  <span className="text-[11px] font-bold text-muted-foreground">
                    {item.colorName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px]">
                    {item.season}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {item.gender}
                  </Badge>
                </div>
              </div>

              {/* Title & SKU */}
              <div className="mt-3">
                <span className="text-[10px] font-mono font-bold text-accent">
                  {item.sku}
                </span>
                <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors leading-snug mt-0.5">
                  {item.name}
                </h3>
              </div>

              {/* Fabric Specs */}
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {item.fabric}
              </p>

              {/* Embroidery Specification */}
              <div className="mt-3 p-2.5 rounded-xl bg-muted/40 text-[11px] space-y-1">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-accent" /> Crest Specification:
                </span>
                <p className="text-muted-foreground leading-tight">
                  {item.embroideryPlacement}
                </p>
              </div>

              {/* Sizing Available */}
              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Sizes in Production:
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.availableSizes.map((sz) => (
                    <span
                      key={sz}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-foreground font-semibold"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bulk Pricing Tier Slabs */}
              <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-card border border-border/70">
                  <span className="text-[10px] text-muted-foreground block">Base Rate</span>
                  <span className="font-bold text-foreground">
                    {formatCurrencyINR(item.basePrice)}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-card border border-border/70">
                  <span className="text-[10px] text-muted-foreground block">500+ pcs</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrencyINR(item.bulkPrice500)}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-card border border-border/70">
                  <span className="text-[10px] text-muted-foreground block">1,000+ pcs</span>
                  <span className="font-bold text-accent">
                    {formatCurrencyINR(item.bulkPrice1000)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-mono">
                Stock: <strong className="text-foreground">{item.stockQuantity.toLocaleString()} pcs</strong>
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => alert(`Configuring specifications for ${item.sku}`)}
              >
                Edit Specs
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New SKU Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Uniform SKU to Catalog"
        description="Specify garment taxonomy, fabric blend, and tiered bulk pricing slabs."
      >
        <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                SKU Identifier *
              </label>
              <Input
                required
                placeholder="e.g. BLAZER-DPS-NVY"
                value={newItem.sku}
                onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Category *
              </label>
              <select
                className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value as any })
                }
              >
                <option value="Shirt">Shirt</option>
                <option value="Trouser">Trouser</option>
                <option value="Skirt">Skirt</option>
                <option value="Blazer">Blazer</option>
                <option value="Sweater">Sweater</option>
                <option value="Sports Kit">Sports Kit</option>
                <option value="Tie">Tie &amp; Belt</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Garment Title *
            </label>
            <Input
              required
              placeholder="e.g. Senior Boys Wool-Viscose Winter Blazer"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Season *
              </label>
              <select
                className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
                value={newItem.season}
                onChange={(e) =>
                  setNewItem({ ...newItem, season: e.target.value as any })
                }
              >
                <option value="Regular">Regular (Year-round)</option>
                <option value="Winter">Winter</option>
                <option value="Sports">Sports</option>
                <option value="House">House</option>
              </select>
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Gender Classification *
              </label>
              <select
                className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
                value={newItem.gender}
                onChange={(e) =>
                  setNewItem({ ...newItem, gender: e.target.value as any })
                }
              >
                <option value="Unisex">Unisex</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Fabric Composition &amp; GSM *
            </label>
            <Input
              required
              placeholder="e.g. 70% Wool, 30% Poly-Viscose (380 GSM Anti-Wrinkle)"
              value={newItem.fabric}
              onChange={(e) => setNewItem({ ...newItem, fabric: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Base Rate (INR) *
              </label>
              <Input
                type="number"
                required
                value={newItem.basePrice}
                onChange={(e) =>
                  setNewItem({ ...newItem, basePrice: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                500+ Slab *
              </label>
              <Input
                type="number"
                required
                value={newItem.bulkPrice500}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    bulkPrice500: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                1,000+ Slab *
              </label>
              <Input
                type="number"
                required
                value={newItem.bulkPrice1000}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    bulkPrice1000: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Embroidery Monogram Placement
            </label>
            <Input
              placeholder="e.g. Left Chest Pocket (Gold Wire Crest)"
              value={newItem.embroideryPlacement}
              onChange={(e) =>
                setNewItem({ ...newItem, embroideryPlacement: e.target.value })
              }
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Save Catalog SKU
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
