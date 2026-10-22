"use client";

import React, { useState } from "react";
import {
  Factory,
  Search,
  CheckCircle2,
  AlertTriangle,
  Scissors,
  Cpu,
  Layers,
  Sparkles,
  ClipboardCheck,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  INITIAL_PRODUCTION_BATCHES,
  ProductionOrderRecord,
} from "@/lib/mockData";

export default function ProductionLinePage() {
  const [batches, setBatches] = useState<ProductionOrderRecord[]>(
    INITIAL_PRODUCTION_BATCHES
  );
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [qcModalBatch, setQcModalBatch] =
    useState<ProductionOrderRecord | null>(null);

  const [qcChecks, setQcChecks] = useState({
    buttonPull: true,
    seamStrength: true,
    crestAlignment: true,
    threadTrimming: true,
  });

  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.batchCode.toLowerCase().includes(search.toLowerCase()) ||
      b.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      b.garmentName.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === "ALL" || b.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handlePassQc = () => {
    if (!qcModalBatch) return;
    setBatches(
      batches.map((b) => {
        if (b.id !== qcModalBatch.id) return b;
        return {
          ...b,
          stage: "PACKED",
          qcPassed: b.qcPassed + 50,
          piecesPacked: b.piecesPacked + 50,
        };
      })
    );
    alert(
      `Batch ${qcModalBatch.batchCode} verified under 4-eye audit. Ready for barcode label packaging.`
    );
    setQcModalBatch(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Production Line &amp; Tailor Operations
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Stage-wise workflow: CAD laser cutting, high-speed stitching, German embroidery, and 4-eye QC audit
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent" className="px-3 py-1.5 text-xs font-semibold">
            Capacity: 2,400 Units/Day
          </Badge>
        </div>
      </div>

      {/* Production Stage Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
        {[
          { label: "1. CAD Cutting", count: "2,500 pcs", active: true },
          { label: "2. Stitching", count: "2,020 pcs", active: true },
          { label: "3. Embroidery", count: "1,670 pcs", active: true },
          { label: "4. Finishing", count: "1,200 pcs", active: true },
          { label: "5. QC Audit", count: "1,168 pcs", active: true },
          { label: "6. Barcode Packed", count: "1,180 pcs", active: false },
        ].map((s) => (
          <div
            key={s.label}
            className="p-3 rounded-xl glass-card border border-border text-center space-y-1"
          >
            <span className="text-[10px] font-bold text-muted-foreground block truncate">
              {s.label}
            </span>
            <p className="text-sm font-bold text-foreground font-mono">
              {s.count}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search batch code, order number, or garment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "CUTTING", "STITCHING", "EMBROIDERY", "QC_AUDIT", "PACKED"].map(
            (stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  stageFilter === stage
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {stage.replace("_", " ")}
              </button>
            )
          )}
        </div>
      </div>

      {/* Batches Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => {
          const cutPercent = Math.round(
            (batch.piecesCut / batch.totalPieces) * 100
          );
          const stitchPercent = Math.round(
            (batch.piecesStitched / batch.totalPieces) * 100
          );
          const embPercent = Math.round(
            (batch.piecesEmbroidered / batch.totalPieces) * 100
          );
          const packPercent = Math.round(
            (batch.piecesPacked / batch.totalPieces) * 100
          );

          return (
            <div
              key={batch.id}
              className="glass-card p-6 rounded-2xl border border-border hover:border-accent/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-accent text-xs">
                    {batch.batchCode}
                  </span>
                  <Badge variant="accent" className="text-[10px]">
                    {batch.stage.replace("_", " ")}
                  </Badge>
                </div>

                <div className="mt-2">
                  <h3 className="font-bold text-sm text-foreground group-hover:text-accent transition-colors leading-snug">
                    {batch.garmentName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                    {batch.schoolName} &bull; {batch.orderNumber}
                  </p>
                </div>

                {/* Assigned Master Line */}
                <div className="mt-3 p-2.5 rounded-xl bg-muted/40 text-[11px] space-y-0.5">
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase">
                    Assigned Master Tailor / Line:
                  </span>
                  <p className="font-bold text-foreground">
                    {batch.assignedTailor}
                  </p>
                </div>

                {/* Production Stage Progress Bars */}
                <div className="mt-4 space-y-2 text-xs border-t border-border pt-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Laser Cutting</span>
                      <span className="font-mono font-bold text-foreground">
                        {batch.piecesCut} / {batch.totalPieces} ({cutPercent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${cutPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Line Stitching</span>
                      <span className="font-mono font-bold text-foreground">
                        {batch.piecesStitched} / {batch.totalPieces} ({stitchPercent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${stitchPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">HD Embroidery</span>
                      <span className="font-mono font-bold text-foreground">
                        {batch.piecesEmbroidered} / {batch.totalPieces} ({embPercent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${embPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">QC Passed &amp; Packed</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {batch.piecesPacked} / {batch.totalPieces} ({packPercent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${packPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom QC Actions */}
              <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                <span className="text-[11px] text-muted-foreground font-mono">
                  Rejection: <strong className="text-rose-500">{batch.qcRejected} pcs</strong>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 gap-1.5"
                  onClick={() => setQcModalBatch(batch)}
                >
                  <ClipboardCheck className="h-3.5 w-3.5 text-accent" /> 4-Eye QC Audit
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4-Eye QC Checklist Audit Modal */}
      {qcModalBatch && (
        <Modal
          isOpen={!!qcModalBatch}
          onClose={() => setQcModalBatch(null)}
          title={`4-Eye Quality Audit: ${qcModalBatch.batchCode}`}
          description={`Verifying garment integrity for ${qcModalBatch.schoolName}.`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-muted/40 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Garment:</span>
                <span className="font-bold text-foreground">
                  {qcModalBatch.garmentName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Batch Target:</span>
                <span className="font-mono font-bold text-foreground">
                  {qcModalBatch.totalPieces.toLocaleString()} pieces
                </span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border cursor-pointer hover:bg-muted/30">
                <input
                  type="checkbox"
                  checked={qcChecks.buttonPull}
                  onChange={(e) =>
                    setQcChecks({ ...qcChecks, buttonPull: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <div>
                  <p className="font-bold text-foreground">
                    Button Pull-Force Test (70N standard load)
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Passes 15kg tensile pull without thread detachment.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border cursor-pointer hover:bg-muted/30">
                <input
                  type="checkbox"
                  checked={qcChecks.seamStrength}
                  onChange={(e) =>
                    setQcChecks({ ...qcChecks, seamStrength: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <div>
                  <p className="font-bold text-foreground">
                    Double-Lock French Seams &amp; Tension
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Zero puckering or skipped stitches across armholes and crotch.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border cursor-pointer hover:bg-muted/30">
                <input
                  type="checkbox"
                  checked={qcChecks.crestAlignment}
                  onChange={(e) =>
                    setQcChecks({
                      ...qcChecks,
                      crestAlignment: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <div>
                  <p className="font-bold text-foreground">
                    School Crest Alignment &amp; Madeira Stitch Density
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Measured &plusmn;1mm from breast pocket center.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border cursor-pointer hover:bg-muted/30">
                <input
                  type="checkbox"
                  checked={qcChecks.threadTrimming}
                  onChange={(e) =>
                    setQcChecks({
                      ...qcChecks,
                      threadTrimming: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <div>
                  <p className="font-bold text-foreground">
                    Thread Trimming &amp; Hot-Press Ironing
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Zero loose threads; pre-shrunk steam pressed.
                  </p>
                </div>
              </label>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setQcModalBatch(null)}>
                Cancel
              </Button>
              <Button variant="accent" onClick={handlePassQc}>
                Sign-Off QC &amp; Release to Packing
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
