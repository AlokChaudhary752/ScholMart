"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  ShieldCheck,
  Shield,
  Key,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  UserCheck,
  Clock,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { UserRole } from "@/lib/auth";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: "Active" | "Suspended";
  lastLogin: string;
  permissions: {
    schools: boolean;
    catalog: boolean;
    orders: boolean;
    production: boolean;
    billing: boolean;
    reports: boolean;
  };
}

const INITIAL_USERS: UserProfile[] = [
  {
    id: "u-1",
    fullName: "Vikram Malhotra",
    email: "admin@scholmart.com",
    phone: "+91 98110 54321",
    role: "SUPPLIER_ADMIN",
    department: "Executive Management",
    status: "Active",
    lastLogin: "Today at 2:45 PM",
    permissions: {
      schools: true,
      catalog: true,
      orders: true,
      production: true,
      billing: true,
      reports: true,
    },
  },
  {
    id: "u-2",
    fullName: "Dr. Sunita Varma",
    email: "principal@dps.edu.in",
    phone: "+91 98220 12345",
    role: "SCHOOL_REPRESENTATIVE",
    department: "Delhi Public School (DPS)",
    status: "Active",
    lastLogin: "Today at 11:20 AM",
    permissions: {
      schools: true,
      catalog: true,
      orders: true,
      production: false,
      billing: true,
      reports: false,
    },
  },
  {
    id: "u-3",
    fullName: "Harish Sharma",
    email: "production@scholmart.com",
    phone: "+91 98330 67890",
    role: "PRODUCTION_HEAD",
    department: "Factory Unit 1 & 2",
    status: "Active",
    lastLogin: "Yesterday at 4:30 PM",
    permissions: {
      schools: false,
      catalog: true,
      orders: true,
      production: true,
      billing: false,
      reports: true,
    },
  },
  {
    id: "u-4",
    fullName: "Pooja Singhania",
    email: "accounts@scholmart.com",
    phone: "+91 98440 11223",
    role: "ACCOUNTANT",
    department: "Finance & Taxation",
    status: "Active",
    lastLogin: "Oct 21 at 6:10 PM",
    permissions: {
      schools: true,
      catalog: false,
      orders: true,
      production: false,
      billing: true,
      reports: true,
    },
  },
];

const AUDIT_LOGS = [
  { id: "a1", action: "User Role Updated", user: "Vikram Malhotra", detail: "Granted GSTR-1 export permissions to Pooja Singhania", time: "30m ago" },
  { id: "a2", action: "New PO Created", user: "Harish Sharma", detail: "Issued Raymond fabric PO #PO-RAY-041", time: "2h ago" },
  { id: "a3", action: "Invoice Transmitted", user: "Pooja Singhania", detail: "Sent INV-2026-0182 via WhatsApp to DPS Finance", time: "4h ago" },
];

export default function UsersRBACPage() {
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "MANAGER" as UserRole,
    department: "",
  });

  const filtered = users.filter((u) => {
    return (
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const created: UserProfile = {
      id: `u-${Date.now()}`,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      department: newUser.department || "General Operations",
      status: "Active",
      lastLogin: "Never logged in",
      permissions: {
        schools: true,
        catalog: true,
        orders: true,
        production: false,
        billing: false,
        reports: false,
      },
    };

    setUsers([...users, created]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            User Accounts &amp; Granular RBAC
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Role-based access control, departmental assignments, and platform audit security logs
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          className="gap-2 shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Add User Account
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, department, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department / Affiliation</th>
                <th className="p-4">Module Permissions</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Activity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 text-primary dark:text-primary-foreground font-bold flex items-center justify-center text-xs">
                        {u.fullName.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{u.fullName}</p>
                        <p className="text-[11px] text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="accent" className="text-[10px]">
                      {u.role.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="p-4 font-semibold text-foreground">
                    {u.department}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {Object.entries(u.permissions).map(([mod, granted]) => (
                        <span
                          key={mod}
                          className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded ${
                            granted
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                              : "bg-muted text-muted-foreground/60 line-through"
                          }`}
                        >
                          {mod.substring(0, 3)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="default" className="text-[10px]">
                      {u.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{u.lastLogin}</td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        alert(`Configuring permissions for ${u.fullName}`)
                      }
                      className="text-xs h-8"
                    >
                      Permissions
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Audit Log */}
      <div className="glass-card p-6 rounded-2xl border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-accent" />
            <h3 className="font-bold font-display text-base text-foreground">
              Security &amp; User Action Audit Trail
            </h3>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">
            Immutable Audit Log
          </span>
        </div>

        <div className="space-y-2.5">
          {AUDIT_LOGS.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-card border border-border flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-bold text-foreground">
                  {log.action} &bull;{" "}
                  <span className="text-accent font-medium">{log.user}</span>
                </p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  {log.detail}
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create Team Member Account"
        description="Assign role, departmental affiliation, and module permissions."
      >
        <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              Full Name *
            </label>
            <Input
              required
              placeholder="e.g. Ramesh Chandra"
              value={newUser.fullName}
              onChange={(e) =>
                setNewUser({ ...newUser, fullName: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Official Email *
              </label>
              <Input
                type="email"
                required
                placeholder="ramesh@scholmart.com"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Phone Number *
              </label>
              <Input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                System Role *
              </label>
              <select
                className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value as any })
                }
              >
                <option value="MANAGER">Operations Manager</option>
                <option value="ACCOUNTANT">Accountant</option>
                <option value="PRODUCTION_HEAD">Production Head</option>
                <option value="STORE_KEEPER">Store Keeper</option>
                <option value="SALES_EXECUTIVE">Sales Executive</option>
                <option value="SCHOOL_REPRESENTATIVE">School Representative</option>
              </select>
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Department / Wing *
              </label>
              <Input
                required
                placeholder="e.g. Central Warehouse A"
                value={newUser.department}
                onChange={(e) =>
                  setNewUser({ ...newUser, department: e.target.value })
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
              Provision Account
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
