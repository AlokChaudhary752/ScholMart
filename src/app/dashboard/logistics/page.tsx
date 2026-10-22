"use client";

import React, { useState } from "react";
import {
  Truck,
  Search,
  Plus,
  Phone,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  FileCheck,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  INITIAL_SHIPMENTS,
  DeliveryShipment,
  INITIAL_SCHOOLS,
} from "@/lib/mockData";

export default function LogisticsDeliveryPage() {
  const [shipments, setShipments] =
    useState<DeliveryShipment[]>(INITIAL_SHIPMENTS);
  const [search, setSearch] = useState("");
  const [selectedPod, setSelectedPod] = useState<DeliveryShipment | null>(null);
  const [isScheduleModal, setIsScheduleModal] = useState(false);

  const [newShipment, setNewShipment] = useState({
    schoolName: INITIAL_SCHOOLS[0].name,
    orderNumber: "ORD-2026-085",
    vehicleNumber: "DL-1L-4412 (Tata 407)",
    driverName: "Ram Chander",
    driverPhone: "+91 98110 33221",
    destinationCity: "Gurugram, Haryana",
    totalCartons: 32,
    etaDate: "2026-11-06",
  });

  const filteredShipments = shipments.filter((s) => {
    return (
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      s.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.driverName.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleScheduleShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const created: DeliveryShipment = {
      id: `shp-${Date.now()}`,
      trackingNumber: `SM-EXP-2026-0${shipments.length + 882}`,
      schoolName: newShipment.schoolName,
      orderNumber: newShipment.orderNumber,
      vehicleNumber: newShipment.vehicleNumber,
      driverName: newShipment.driverName,
      driverPhone: newShipment.driverPhone,
      destinationCity: newShipment.destinationCity,
      status: "SCHEDULED",
      dispatchedDate: new Date().toISOString().split("T")[0],
      etaDate: newShipment.etaDate,
      totalCartons: Number(newShipment.totalCartons),
    };

    setShipments([created, ...shipments]);
    setIsScheduleModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Delivery Fleet &amp; Campus Logistics
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Class-wise carton packing, dedicated institutional transport vehicles, and Proof of Delivery (POD)
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          className="gap-2 shadow-sm"
          onClick={() => setIsScheduleModal(true)}
        >
          <Plus className="h-4 w-4" /> Schedule Fleet Dispatch
        </Button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            Fleet En Route
          </span>
          <p className="text-2xl font-black font-display text-accent">
            1 Vehicle
          </p>
          <p className="text-[11px] text-muted-foreground">
            DL-1L-8842 destined for DPS R.K. Puram
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            Delivered This Session
          </span>
          <p className="text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
            63 Cartons
          </p>
          <p className="text-[11px] text-muted-foreground">
            100% on-time institutional handoff with digital sign-off
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-border space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">
            On-Time Handoff Rate
          </span>
          <p className="text-2xl font-black font-display text-foreground">
            99.4%
          </p>
          <p className="text-[11px] text-muted-foreground">
            Target SLA zero academic day loss
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tracking number, school, vehicle or driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
      </div>

      {/* Shipments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShipments.map((shp) => (
          <div
            key={shp.id}
            className="glass-card p-6 rounded-2xl border border-border hover:border-accent/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-accent text-xs">
                  {shp.trackingNumber}
                </span>
                <Badge
                  variant={
                    shp.status === "DELIVERED"
                      ? "default"
                      : shp.status === "IN_TRANSIT"
                      ? "accent"
                      : "secondary"
                  }
                  className="text-[10px]"
                >
                  {shp.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="mt-2">
                <h3 className="font-bold text-sm text-foreground group-hover:text-accent transition-colors leading-snug">
                  {shp.schoolName}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-accent" /> {shp.destinationCity}
                </p>
              </div>

              {/* Vehicle & Driver details */}
              <div className="mt-4 p-3 rounded-xl bg-muted/40 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span className="font-bold text-foreground font-mono">
                    {shp.vehicleNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Driver:</span>
                  <span className="font-semibold text-foreground">
                    {shp.driverName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Driver Phone:</span>
                  <span className="font-mono text-accent">
                    {shp.driverPhone}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border/60">
                  <span className="text-muted-foreground">Cartons:</span>
                  <span className="font-mono font-bold text-foreground">
                    {shp.totalCartons} Boxed Kits
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">
                ETA: {shp.etaDate}
              </span>
              {shp.status === "DELIVERED" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPod(shp)}
                  className="text-xs h-8 gap-1 text-emerald-600 dark:text-emerald-400"
                >
                  <FileCheck className="h-3.5 w-3.5" /> View POD
                </Button>
              ) : (
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() =>
                    alert(`Tracking live GPS beacon for truck ${shp.vehicleNumber}`)
                  }
                  className="text-xs h-8"
                >
                  Live GPS
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Proof of Delivery (POD) Modal */}
      {selectedPod && (
        <Modal
          isOpen={!!selectedPod}
          onClose={() => setSelectedPod(null)}
          title={`Proof of Delivery: ${selectedPod.trackingNumber}`}
          description={`Verified gate handoff to ${selectedPod.schoolName}.`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-muted/40 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivered To:</span>
                <span className="font-bold text-foreground">
                  {selectedPod.schoolName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consignment:</span>
                <span className="font-mono font-bold text-foreground">
                  {selectedPod.totalCartons} Tamper-Evident Uniform Boxes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Received &amp; Signed By:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedPod.proofSignedBy}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Timestamp:</span>
                <span className="font-mono text-muted-foreground">
                  {selectedPod.etaDate} at 11:45 AM
                </span>
              </div>
            </div>

            {/* Simulated Digital Signature */}
            <div className="border border-border rounded-xl p-4 text-center space-y-2 bg-card">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                Digital Recipient Signature on Device:
              </span>
              <div className="h-20 w-48 mx-auto border-b border-border flex items-center justify-center font-serif italic text-2xl text-foreground select-none">
                K.P. Sharma
              </div>
              <span className="text-[10px] text-muted-foreground">
                Stores Officer, DPS Sector XII
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedPod(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule Dispatch Modal */}
      <Modal
        isOpen={isScheduleModal}
        onClose={() => setIsScheduleModal(false)}
        title="Schedule Institutional Dispatch"
        description="Assign vehicle transport and generate gate pass."
      >
        <form onSubmit={handleScheduleShipment} className="space-y-4 text-xs">
          <div>
            <label className="text-muted-foreground block mb-1 font-semibold">
              School Destination *
            </label>
            <select
              className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground text-xs"
              value={newShipment.schoolName}
              onChange={(e) =>
                setNewShipment({ ...newShipment, schoolName: e.target.value })
              }
            >
              {INITIAL_SCHOOLS.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Vehicle Number &amp; Model *
              </label>
              <Input
                required
                placeholder="DL-1L-4412 (Tata 407)"
                value={newShipment.vehicleNumber}
                onChange={(e) =>
                  setNewShipment({
                    ...newShipment,
                    vehicleNumber: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Driver Name &amp; Phone *
              </label>
              <Input
                required
                placeholder="Ram Chander (+91 98110 33221)"
                value={newShipment.driverName}
                onChange={(e) =>
                  setNewShipment({ ...newShipment, driverName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Total Cartons *
              </label>
              <Input
                type="number"
                required
                value={newShipment.totalCartons}
                onChange={(e) =>
                  setNewShipment({
                    ...newShipment,
                    totalCartons: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">
                Target ETA Date *
              </label>
              <Input
                type="date"
                required
                value={newShipment.etaDate}
                onChange={(e) =>
                  setNewShipment({ ...newShipment, etaDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsScheduleModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Issue Dispatch Gate Pass
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
