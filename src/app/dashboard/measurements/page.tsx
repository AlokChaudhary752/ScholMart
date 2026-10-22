"use client";

import React, { useState } from "react";
import {
  Ruler,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BarChart,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  INITIAL_MEASUREMENTS,
  StudentMeasurement,
  INITIAL_SCHOOLS,
} from "@/lib/mockData";

const SIZE_FORECAST = [
  { size: "28", percent: 8, demandPieces: 450 },
  { size: "30", percent: 18, demandPieces: 1020 },
  { size: "32", percent: 32, demandPieces: 1820 },
  { size: "34", percent: 24, demandPieces: 1360 },
  { size: "36", percent: 12, demandPieces: 680 },
  { size: "38", percent: 4, demandPieces: 230 },
  { size: "40", percent: 2, demandPieces: 110 },
];

export default function SizingMeasurementsPage() {
  const [measurements, setMeasurements] = useState<StudentMeasurement[]>(
    INITIAL_MEASUREMENTS
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newMeasure, setNewMeasure] = useState({
    admissionNo: "",
    studentName: "",
    schoolName: INITIAL_SCHOOLS[0].name,
    classGrade: "Grade 8-A",
    chestInches: 32.0,
    waistInches: 28.0,
    shoulderInches: 15.0,
  });

  // Size recommendation algorithm
  const calculateSize = (chest: number) => {
    if (chest <= 27) return "26";
    if (chest <= 29) return "28";
    if (chest <= 31) return "30";
    if (chest <= 33) return "32";
    if (chest <= 35) return "34";
    if (chest <= 37) return "36";
    if (chest <= 39) return "38";
    return "40+";
  };

  const filteredMeasurements = measurements.filter((m) => {
    const matchesSearch =
      m.studentName.toLowerCase().includes(search.toLowerCase()) ||
      m.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      m.schoolName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || m.fitStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    const recSize = calculateSize(Number(newMeasure.chestInches));
    const created: StudentMeasurement = {
      id: `m-${Date.now()}`,
      admissionNo: newMeasure.admissionNo.toUpperCase(),
      studentName: newMeasure.studentName,
      schoolName: newMeasure.schoolName,
      classGrade: newMeasure.classGrade,
      chestInches: Number(newMeasure.chestInches),
      waistInches: Number(newMeasure.waistInches),
      shoulderInches: Number(newMeasure.shoulderInches),
      recommendedSize: recSize,
      fitStatus: "Perfect Fit",
      academicYear: "2025-2026",
    };

    setMeasurements([created, ...measurements]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Student Sizing &amp; Fit Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Contactless anthropometric data, automated size recommendations, and institutional alteration requests
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          className="gap-2 shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Record Measurement
        </Button>
      </div>

      {/* Sizing Distribution Forecast Curve Banner */}
      <div className="p-6 rounded-2xl glass-card border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" /> Institutional Size Distribution &amp; Fabric Demand Forecast
            </h3>
            <p className="text-xs text-muted-foreground">
              Predictive sizing curve derived from 45,000+ North Indian student body measurements
            </p>
          </div>
          <Badge variant="accent" className="text-xs">
            99.4% Accuracy
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 pt-2">
          {SIZE_FORECAST.map((sf) => (
            <div
              key={sf.size}
              className="p-3 rounded-xl bg-card border border-border text-center space-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                Size {sf.size}&quot;
              </span>
              <p className="text-xl font-black font-display text-foreground">
                {sf.percent}%
              </p>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${sf.percent * 2.5}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground block">
                {sf.demandPieces} pcs
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search student by name, admission no, or school..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "Perfect Fit", "Exchange Requested", "Alteration Done"].map(
            (st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  statusFilter === st
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>
      </div>

      {/* Measurements Table */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Admission #</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">School &amp; Grade</th>
                <th className="p-4">Chest (in)</th>
                <th className="p-4">Waist (in)</th>
                <th className="p-4">Shoulder (in)</th>
                <th className="p-4">Recommended Size</th>
                <th className="p-4">Fit Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredMeasurements.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-accent">
                    {m.admissionNo}
                  </td>
                  <td className="p-4 font-bold text-foreground">
                    {m.studentName}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-foreground">{m.schoolName}</p>
                    <p className="text-[11px] text-muted-foreground">{m.classGrade}</p>
                  </td>
                  <td className="p-4 font-mono font-semibold">{m.chestInches}&quot;</td>
                  <td className="p-4 font-mono font-semibold">{m.waistInches}&quot;</td>
                  <td className="p-4 font-mono font-semibold">{m.shoulderInches}&quot;</td>
                  <td className="p-4">
                    <span className="font-mono font-bold px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-xs shadow-sm">
                      Size {m.recommendedSize}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        m.fitStatus === "Perfect Fit"
                          ? "default"
                          : m.fitStatus === "Exchange Requested"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {m.fitStatus}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        alert(
                          `Size history and alteration ticket for ${m.studentName}`
                        )
                      }
                      className="text-xs h-8"
                    >
                      Ticket
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Measurement Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Record Student Anthropometric Data"
        description="Input body measurements to calculate optimal garment size standard."
      >
        <form onSubmit={handleAddMeasurement} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Admission Number *
              </label>
              <Input
                required
                placeholder="e.g. DPS-2025-992"
                value={newMeasure.admissionNo}
                onChange={(e) =>
                  setNewMeasure({ ...newMeasure, admissionNo: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Student Full Name *
              </label>
              <Input
                required
                placeholder="e.g. Siddharth Verma"
                value={newMeasure.studentName}
                onChange={(e) =>
                  setNewMeasure({ ...newMeasure, studentName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                School *
              </label>
              <select
                className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
                value={newMeasure.schoolName}
                onChange={(e) =>
                  setNewMeasure({ ...newMeasure, schoolName: e.target.value })
                }
              >
                {INITIAL_SCHOOLS.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Class &amp; Section *
              </label>
              <Input
                required
                placeholder="e.g. Grade 8-C"
                value={newMeasure.classGrade}
                onChange={(e) =>
                  setNewMeasure({ ...newMeasure, classGrade: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Chest (Inches) *
              </label>
              <Input
                type="number"
                step="0.5"
                required
                value={newMeasure.chestInches}
                onChange={(e) =>
                  setNewMeasure({
                    ...newMeasure,
                    chestInches: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Waist (Inches) *
              </label>
              <Input
                type="number"
                step="0.5"
                required
                value={newMeasure.waistInches}
                onChange={(e) =>
                  setNewMeasure({
                    ...newMeasure,
                    waistInches: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Shoulder (Inches) *
              </label>
              <Input
                type="number"
                step="0.5"
                required
                value={newMeasure.shoulderInches}
                onChange={(e) =>
                  setNewMeasure({
                    ...newMeasure,
                    shoulderInches: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Auto calculated size feedback */}
          <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-between">
            <span className="text-muted-foreground">
              Automated Recommended Size:
            </span>
            <span className="font-mono font-bold text-base text-accent">
              Size {calculateSize(newMeasure.chestInches)}
            </span>
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
              Save Measurement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
