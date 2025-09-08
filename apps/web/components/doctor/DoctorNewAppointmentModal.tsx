"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
// Remplacement: pas de Textarea dans @repo/ui, on utilise un <textarea> natif
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";

interface DoctorNewAvailabilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (payload: {
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    duration: string; // minutes
  }) => void | Promise<void>;
  loading?: boolean;
}

export function DoctorNewAppointmentModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: DoctorNewAvailabilityModalProps) {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState<string>("09:00");
  const [duration, setDuration] = useState<string>("30");

  const isPastDate = (d: string) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const chosen = new Date(d);
    chosen.setHours(0,0,0,0);
    return chosen < today;
  };

  const isTimeInRange = (t: string) => t >= "08:00" && t <= "18:00";

  const canConfirm = date && !isPastDate(date) && time && isTimeInRange(time) && duration;

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Nouvelle disponibilité</h2>
                <p className="text-sm text-muted-foreground">Rendez votre calendrier disponible</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Date et heure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" /> Date
                </label>
                <Input
                  type="date"
                  value={date}
                  min={new Date().toISOString().slice(0,10)}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" /> Heure
                </label>
                <Input
                  type="time"
                  value={time}
                  min="08:00"
                  max="18:00"
                  onChange={(e) => setTime(e.target.value)}
                  className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Durée (minutes)</label>
                <Input
                  type="number"
                  min={5}
                  step={5}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-end gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button
              onClick={() => onConfirm({ date, time, duration })}
              disabled={!canConfirm || loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Création..." : "Créer la disponibilité"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}


