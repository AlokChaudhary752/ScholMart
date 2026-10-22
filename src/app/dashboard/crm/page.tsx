"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

interface CRMLead {
  id: string;
  schoolName: string;
  city: string;
  contactPerson: string;
  phone: string;
  email: string;
  estimatedStudents: number;
  stage: "CONTACTED" | "DEMO_DONE" | "SAMPLE_SENT" | "WON" | "LOST";
  nextFollowUp: string;
  notes: string;
}

const INITIAL_LEADS: CRMLead[] = [
  {
    id: "lead-1",
    schoolName: "Modern School Barakhamba",
    city: "New Delhi",
    contactPerson: "Dr. A.K. Sengupta (Chairman)",
    phone: "+91 98110 99882",
    email: "chair@modernschool.net",
    estimatedStudents: 2800,
    stage: "SAMPLE_SENT",
    nextFollowUp: "2026-10-25",
    notes: "Sample kit with custom bottle green blazers and ties delivered to school board.",
  },
  {
    id: "lead-2",
    schoolName: "Mayo College Girls School",
    city: "Ajmer, Rajasthan",
    contactPerson: "Meenakshi Joshi (Admin Lead)",
    phone: "+91 98220 77661",
    email: "admin@mcgs.ac.in",
    estimatedStudents: 1400,
    stage: "DEMO_DONE",
    nextFollowUp: "2026-10-27",
    notes: "Completed virtual 3D customizer walkthrough. Awaiting tender document release.",
  },
  {
    id: "lead-3",
    schoolName: "Step by Step School",
    city: "Noida, UP",
    contactPerson: "Vivek Roy (Purchase Committee)",
    phone: "+91 98330 44552",
    email: "procurement@stepbystep.school",
    estimatedStudents: 2200,
    stage: "WON",
    nextFollowUp: "2026-11-01",
    notes: "MOU signed for 3-year institutional supply! Contract value ~₹32 Lakhs.",
  },
];

export default function CRMLeadsPage() {
  const [leads, setLeads] = useState<CRMLead[]>(INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newLead, setNewLead] = useState({
    schoolName: "",
    city: "",
    contactPerson: "",
    phone: "",
    email: "",
    estimatedStudents: 1500,
    notes: "",
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CRMLead = {
      id: `lead-${Date.now()}`,
      schoolName: newLead.schoolName,
      city: newLead.city,
      contactPerson: newLead.contactPerson,
      phone: newLead.phone,
      email: newLead.email,
      estimatedStudents: Number(newLead.estimatedStudents),
      stage: "CONTACTED",
      nextFollowUp: new Date(Date.now() + 86400000 * 3)
        .toISOString()
        .split("T")[0],
      notes: newLead.notes || "Initial institutional inquiry logged.",
    };

    setLeads([created, ...leads]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            School Acquisition &amp; CRM Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Track prospective school tenders, sample box dispatches, board meetings, and MOU closures
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          className="gap-2 shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Add Prospective School
        </Button>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="glass-card p-6 rounded-2xl border border-border hover:border-accent/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                  {lead.city}
                </span>
                <Badge
                  variant={
                    lead.stage === "WON"
                      ? "default"
                      : lead.stage === "SAMPLE_SENT"
                      ? "accent"
                      : "secondary"
                  }
                  className="text-[10px]"
                >
                  {lead.stage.replace("_", " ")}
                </Badge>
              </div>

              <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors mt-2">
                {lead.schoolName}
              </h3>

              <div className="mt-3 p-3 rounded-xl bg-muted/40 text-xs space-y-1">
                <p className="font-semibold text-foreground">
                  {lead.contactPerson}
                </p>
                <p className="text-muted-foreground font-mono">{lead.phone}</p>
                <p className="text-muted-foreground">{lead.email}</p>
              </div>

              <p className="text-xs text-muted-foreground mt-3 italic leading-relaxed">
                &ldquo;{lead.notes}&rdquo;
              </p>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
              <span className="font-mono text-muted-foreground">
                Est. {lead.estimatedStudents.toLocaleString()} students
              </span>
              <span className="text-[11px] font-semibold text-accent flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Follow-up: {lead.nextFollowUp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Prospective School Lead"
        description="Log new institutional contact, student strength, and sample requirements."
      >
        <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              School Name *
            </label>
            <Input
              required
              placeholder="e.g. Modern School Barakhamba"
              value={newLead.schoolName}
              onChange={(e) =>
                setNewLead({ ...newLead, schoolName: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                City *
              </label>
              <Input
                required
                placeholder="New Delhi"
                value={newLead.city}
                onChange={(e) =>
                  setNewLead({ ...newLead, city: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Estimated Students *
              </label>
              <Input
                type="number"
                required
                value={newLead.estimatedStudents}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    estimatedStudents: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Key Contact Person *
              </label>
              <Input
                required
                placeholder="Dr. Sengupta (Chairman)"
                value={newLead.contactPerson}
                onChange={(e) =>
                  setNewLead({ ...newLead, contactPerson: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Phone Number *
              </label>
              <Input
                required
                placeholder="+91 98110 99882"
                value={newLead.phone}
                onChange={(e) =>
                  setNewLead({ ...newLead, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Email *
            </label>
            <Input
              type="email"
              required
              placeholder="chair@modernschool.net"
              value={newLead.email}
              onChange={(e) =>
                setNewLead({ ...newLead, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Notes &amp; Sample Swatches
            </label>
            <Input
              placeholder="Required fabric sample box by next Tuesday..."
              value={newLead.notes}
              onChange={(e) =>
                setNewLead({ ...newLead, notes: e.target.value })
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
              Save Lead to Pipeline
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
