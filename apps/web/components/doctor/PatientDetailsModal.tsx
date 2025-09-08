"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Mail, Phone, Calendar as CalendarIcon, User, X, Stethoscope } from "lucide-react";

export interface DoctorPatientDetails {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  lastVisit: string;
  specialty: string;
}

interface PatientDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: DoctorPatientDetails | null;
}

export function PatientDetailsModal({ open, onOpenChange, patient }: PatientDetailsModalProps) {
  if (!open || !patient) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Détails du patient</h2>
                <p className="text-sm text-muted-foreground">{patient.name}</p>
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
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Âge</span>
                <span className="text-sm font-medium">{patient.age} ans</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Stethoscope className="h-4 w-4" /> Spécialité</span>
                <span className="text-sm font-medium">{patient.specialty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span>
                <span className="text-sm font-medium">{patient.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4" /> Téléphone</span>
                <span className="text-sm font-medium">{patient.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Dernière visite</span>
                <span className="text-sm font-medium">{patient.lastVisit}</span>
              </div>
            </div>
          </div>

          {/* Footer supprimé pour éviter la redondance avec la croix */}
        </div>
      </div>
    </>
  );
}


