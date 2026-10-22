"use client";

import React, { useState } from "react";
import {
  School,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Building,
  Phone,
  Mail,
  Users,
  CreditCard,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { INITIAL_SCHOOLS, SchoolData } from "@/lib/mockData";
import { formatCurrencyINR } from "@/lib/utils";

export default function SchoolsManagementPage() {
  const [schools, setSchools] = useState<SchoolData[]>(INITIAL_SCHOOLS);
  const [search, setSearch] = useState("");
  const [filterAffiliation, setFilterAffiliation] = useState("ALL");
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New School Form State
  const [newSchool, setNewSchool] = useState({
    name: "",
    code: "",
    affiliation: "CBSE" as const,
    city: "",
    state: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    studentStrength: 1500,
    creditLimit: 1500000,
    creditDays: 30,
    gstin: "",
    address: "",
  });

  const filteredSchools = schools.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase());
    const matchesAffiliation =
      filterAffiliation === "ALL" || s.affiliation === filterAffiliation;
    return matchesSearch && matchesAffiliation;
  });

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    const created: SchoolData = {
      id: `sch-${Date.now()}`,
      name: newSchool.name,
      code: newSchool.code.toUpperCase(),
      logo: newSchool.name.substring(0, 3).toUpperCase(),
      affiliation: newSchool.affiliation,
      city: newSchool.city,
      state: newSchool.state,
      contactPerson: newSchool.contactPerson,
      contactEmail: newSchool.contactEmail,
      contactPhone: newSchool.contactPhone,
      studentStrength: Number(newSchool.studentStrength),
      creditLimit: Number(newSchool.creditLimit),
      creditDays: Number(newSchool.creditDays),
      outstandingBalance: 0,
      activeOrdersCount: 0,
      academicSession: "2025-2026",
      gstin: newSchool.gstin || "07XXXXX9999X1Z1",
      status: "Active",
      address: newSchool.address || `${newSchool.city}, ${newSchool.state}`,
    };

    setSchools([created, ...schools]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Contracted Schools &amp; Institutions
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage institutional profiles, authorized coordinators, credit limits, and branch networks
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          className="gap-2 shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Onboard New School
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search school by name, code or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {["ALL", "CBSE", "ICSE", "IB", "Cambridge"].map((aff) => (
            <button
              key={aff}
              onClick={() => setFilterAffiliation(aff)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                filterAffiliation === aff
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {aff}
            </button>
          ))}
        </div>
      </div>

      {/* Schools Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchools.map((sch) => {
          const isNearCreditLimit =
            sch.outstandingBalance > sch.creditLimit * 0.8;
          return (
            <div
              key={sch.id}
              className="glass-card p-5 rounded-2xl border border-border hover:border-accent/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Top header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary dark:text-primary-foreground font-black text-sm flex items-center justify-center font-display shadow-sm">
                      {sch.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-foreground group-hover:text-accent transition-colors leading-snug">
                        {sch.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {sch.code}
                        </span>
                        <span className="text-muted-foreground">&bull;</span>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          {sch.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={
                      sch.affiliation === "CBSE"
                        ? "default"
                        : sch.affiliation === "IB"
                        ? "accent"
                        : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {sch.affiliation}
                  </Badge>
                </div>

                {/* Info rows */}
                <div className="mt-4 space-y-2 text-xs border-t border-border/60 pt-3">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-accent" /> Student Strength:
                    </span>
                    <span className="font-bold text-foreground font-mono">
                      {sch.studentStrength.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="h-3.5 w-3.5 text-accent" /> Credit Limit:
                    </span>
                    <span className="font-medium text-foreground">
                      {formatCurrencyINR(sch.creditLimit)} ({sch.creditDays}d)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Outstanding Ledger:</span>
                    <span
                      className={`font-bold font-mono ${
                        isNearCreditLimit ? "text-rose-500" : "text-foreground"
                      }`}
                    >
                      {formatCurrencyINR(sch.outstandingBalance)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Active Production Orders:</span>
                    <Badge variant="accent" className="text-[10px]">
                      {sch.activeOrdersCount} in progress
                    </Badge>
                  </div>
                </div>

                {/* Coordinator */}
                <div className="mt-3 p-2.5 rounded-xl bg-muted/30 text-[11px] space-y-0.5">
                  <p className="font-semibold text-foreground truncate">
                    {sch.contactPerson}
                  </p>
                  <p className="text-muted-foreground truncate">{sch.contactPhone}</p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 border-t border-border/80 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setSelectedSchool(sch)}
                >
                  View Profile &amp; Policies
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  className="w-full text-xs gap-1"
                  onClick={() => alert(`Creating new order for ${sch.name}`)}
                >
                  <Plus className="h-3.5 w-3.5" /> New Order
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* School Profile Drawer Modal */}
      {selectedSchool && (
        <Modal
          isOpen={!!selectedSchool}
          onClose={() => setSelectedSchool(null)}
          title={selectedSchool.name}
          description={`Institutional Code: ${selectedSchool.code} • ${selectedSchool.affiliation} Board`}
        >
          <div className="space-y-5 text-xs">
            <div className="p-3.5 rounded-xl bg-muted/40 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registered Address:</span>
                <span className="font-medium text-foreground text-right max-w-[240px]">
                  {selectedSchool.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST Identification:</span>
                <span className="font-mono font-bold text-foreground">
                  {selectedSchool.gstin}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Academic Cycle:</span>
                <span className="font-semibold text-accent">
                  {selectedSchool.academicSession}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">Contract Financial Terms</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block text-[11px]">Credit Limit</span>
                  <span className="text-sm font-bold text-foreground">
                    {formatCurrencyINR(selectedSchool.creditLimit)}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border">
                  <span className="text-muted-foreground block text-[11px]">Current Outstanding</span>
                  <span className="text-sm font-bold text-rose-500 font-mono">
                    {formatCurrencyINR(selectedSchool.outstandingBalance)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">Coordinator Contacts</h4>
              <div className="p-3 rounded-xl border border-border space-y-1">
                <p className="font-bold text-foreground">{selectedSchool.contactPerson}</p>
                <p className="text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-accent" /> {selectedSchool.contactEmail}
                </p>
                <p className="text-muted-foreground flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-accent" /> {selectedSchool.contactPhone}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedSchool(null)}>
                Close
              </Button>
              <Button
                variant="accent"
                onClick={() => {
                  alert(`Exporting official account statement for ${selectedSchool.name}`);
                }}
              >
                Export Ledger Statement (PDF)
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New School Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Onboard New Institution"
        description="Enter school credentials, academic affiliation, and commercial credit limits."
      >
        <form onSubmit={handleCreateSchool} className="space-y-4 text-xs">
          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Institution Name *
            </label>
            <Input
              required
              placeholder="e.g. Army Public School Dhaula Kuan"
              value={newSchool.name}
              onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                School Code *
              </label>
              <Input
                required
                placeholder="e.g. APS-DK"
                value={newSchool.code}
                onChange={(e) => setNewSchool({ ...newSchool, code: e.target.value })}
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Affiliation Board *
              </label>
              <select
                className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
                value={newSchool.affiliation}
                onChange={(e) =>
                  setNewSchool({
                    ...newSchool,
                    affiliation: e.target.value as any,
                  })
                }
              >
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="IB">IB World</option>
                <option value="Cambridge">Cambridge IGCSE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                City *
              </label>
              <Input
                required
                placeholder="New Delhi"
                value={newSchool.city}
                onChange={(e) => setNewSchool({ ...newSchool, city: e.target.value })}
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                State *
              </label>
              <Input
                required
                placeholder="Delhi"
                value={newSchool.state}
                onChange={(e) => setNewSchool({ ...newSchool, state: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Contact Person *
              </label>
              <Input
                required
                placeholder="Col. S. Sharma (Principal)"
                value={newSchool.contactPerson}
                onChange={(e) =>
                  setNewSchool({ ...newSchool, contactPerson: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Contact Phone *
              </label>
              <Input
                required
                placeholder="+91 98111 22334"
                value={newSchool.contactPhone}
                onChange={(e) =>
                  setNewSchool({ ...newSchool, contactPhone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Student Strength *
              </label>
              <Input
                type="number"
                required
                value={newSchool.studentStrength}
                onChange={(e) =>
                  setNewSchool({
                    ...newSchool,
                    studentStrength: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Credit Limit (INR) *
              </label>
              <Input
                type="number"
                required
                value={newSchool.creditLimit}
                onChange={(e) =>
                  setNewSchool({
                    ...newSchool,
                    creditLimit: Number(e.target.value),
                  })
                }
              />
            </div>
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
              Save Institution
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
