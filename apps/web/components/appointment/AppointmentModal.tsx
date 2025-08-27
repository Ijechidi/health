"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Calendar } from "@repo/ui/components/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { format } from "date-fns";
import { Clock, User, Calendar as CalendarIcon, X } from "lucide-react";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medecins: Array<{ id: string; titre: string }>;
  disponibilites: Array<{ id: string; medecinId: string; date: string; heure: string }>;
  selectedMedecin: string;
  onMedecinChange: (value: string) => void;
  selectedDate: string;
  selectedDateObj: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedSlotId: string;
  onSlotSelect: (slotId: string) => void;
  motif: string;
  onMotifChange: (value: string) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function AppointmentModal({
  open,
  onOpenChange,
  medecins,
  disponibilites,
  selectedMedecin,
  onMedecinChange,
  selectedDate,
  selectedDateObj,
  onDateSelect,
  selectedSlotId,
  onSlotSelect,
  motif,
  onMotifChange,
  onConfirm,
  loading = false
}: AppointmentModalProps) {
  const filteredSlots = disponibilites
    .filter(d => !selectedMedecin || d.medecinId === selectedMedecin)
    .filter(d => !selectedDate || d.date === selectedDate);

  const canConfirm = selectedMedecin && selectedDate && selectedSlotId && motif.trim();

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
              <div className="p-2 bg-primary/10 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Nouveau rendez-vous</h2>
                <p className="text-sm text-muted-foreground">Planifiez votre consultation</p>
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
            {/* Sélection du médecin */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="h-4 w-4 text-muted-foreground" />
                Médecin
              </label>
              <Select value={selectedMedecin} onValueChange={onMedecinChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir un médecin" />
                </SelectTrigger>
                <SelectContent>
                  {medecins.map(m => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.titre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sélection de la date */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                Date
              </label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDateObj}
                  onSelect={(date) => {
                    onDateSelect(date);
                    onSlotSelect("");
                  }}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>
              {selectedDateObj && (
                <p className="text-sm text-center text-muted-foreground bg-muted/50 rounded-md p-2">
                  Date sélectionnée: {format(selectedDateObj, "PPP")}
                </p>
              )}
            </div>

            {/* Sélection du créneau */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Créneaux disponibles
              </label>
              {filteredSlots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredSlots.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => onSlotSelect(slot.id)}
                      className={`border rounded-lg px-4 py-3 text-left transition-all hover:shadow-md ${
                        selectedSlotId === slot.id 
                          ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{slot.heure}</div>
                      <div className="text-xs opacity-80">
                        {new Date(slot.date).toLocaleDateString('fr-FR', { 
                          weekday: 'short', 
                          day: '2-digit', 
                          month: 'short' 
                        })}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Aucune disponibilité pour cette date</p>
                  {selectedMedecin && (
                    <p className="text-xs mt-1">Essayez de sélectionner un autre médecin</p>
                  )}
                </div>
              )}
            </div>

            {/* Motif de consultation */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Motif de consultation
              </label>
              <Input 
                placeholder="Ex: Consultation de suivi, symptômes..." 
                value={motif} 
                onChange={(e) => onMotifChange(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t bg-muted/30">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button 
              onClick={onConfirm} 
              disabled={!canConfirm || loading}
              className="flex-1"
            >
              {loading ? "Confirmation..." : "Confirmer le RDV"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
