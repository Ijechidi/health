"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
// Label component not available, using HTML label instead
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { User, Building2, Shield, Stethoscope, Heart } from "lucide-react";
import { format } from "date-fns";
import { SPECIALTIES } from "@/lib/specialties";

interface User {
  id: string;
  nom: string;
  prenom?: string;
  email: string;
  type: 'admin' | 'medecin' | 'patient';
}

interface Hospital {
  id: string;
  nom: string;
  adresse: string;
}

interface Specialty {
  id: string;
  nom: string;
  description?: string;
}

interface Assignment {
  id: string;
  utilisateurId: string;
  hopitalId: string;
  role: 'admin' | 'medecin' | 'patient';
  specialiteId?: string;
  dateDebut: string;
  dateFin?: string;
  utilisateur: {
    nom: string;
    prenom?: string;
    email: string;
  };
  hopital: {
    nom: string;
    adresse: string;
  };
  status: 'actif' | 'inactif';
}

interface EditAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment: Assignment | null;
  onSave: (assignmentData: any) => void;
  loading?: boolean;
}

export function EditAssignmentModal({
  open,
  onOpenChange,
  assignment,
  onSave,
  loading = false,
}: EditAssignmentModalProps) {
  const [formData, setFormData] = useState({
    utilisateurId: "",
    hopitalId: "",
    role: "",
    dateDebut: undefined as Date | undefined,
    dateFin: undefined as Date | undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data - en réalité, ces données viendraient de l'API
  const users: User[] = [
    { id: 'u1', nom: 'Ndiaye', prenom: 'Ahmadou', email: 'ahmadou.ndiaye@email.com', type: 'medecin' },
    { id: 'u2', nom: 'Diop', prenom: 'Fatou', email: 'fatou.diop@email.com', type: 'medecin' },
    { id: 'u3', nom: 'Dupont', prenom: 'Marie', email: 'marie.dupont@email.com', type: 'patient' },
    { id: 'u4', nom: 'Admin', prenom: 'Super', email: 'admin@system.com', type: 'admin' },
    { id: 'u5', nom: 'Fall', prenom: 'Moussa', email: 'moussa.fall@email.com', type: 'medecin' },
  ];

  const hospitals: Hospital[] = [
    { id: 'h1', nom: 'Hôpital Principal', adresse: '123 Avenue de la République, Dakar' },
    { id: 'h2', nom: 'Centre Médical Saint-Louis', adresse: '456 Rue de la Santé, Saint-Louis' },
    { id: 'h3', nom: 'Clinique de Thiès', adresse: '789 Boulevard de l\'Indépendance, Thiès' },
  ];

  const specialties = SPECIALTIES;

  // Filtrer les utilisateurs selon le rôle sélectionné
  const filteredUsers = formData.role 
    ? users.filter(user => user.type === formData.role)
    : users;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'medecin': return <Stethoscope className="h-4 w-4" />;
      case 'patient': return <Heart className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.utilisateurId) {
      newErrors.utilisateurId = "L'utilisateur est requis";
    }
    if (!formData.hopitalId) {
      newErrors.hopitalId = "L'hôpital est requis";
    }
    if (!formData.role) {
      newErrors.role = "Le rôle est requis";
    }
    if (!formData.dateDebut) {
      newErrors.dateDebut = "La date de début est requise";
    }
    if (formData.dateFin && formData.dateDebut && formData.dateFin <= formData.dateDebut) {
      newErrors.dateFin = "La date de fin doit être postérieure à la date de début";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignment) return;
    
    if (!validateForm()) {
      return;
    }

    const assignmentData = {
      id: assignment.id,
      ...formData,
      dateDebut: formData.dateDebut?.toISOString().split('T')[0],
      dateFin: formData.dateFin?.toISOString().split('T')[0],
    };

    onSave(assignmentData);
  };

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      role,
      utilisateurId: "", // Reset user selection when role changes
    }));
  };

  const resetForm = () => {
    setFormData({
      utilisateurId: "",
      hopitalId: "",
      role: "",
      dateDebut: undefined,
      dateFin: undefined,
    });
    setErrors({});
  };

  // Charger les données de l'assignation quand le modal s'ouvre
  useEffect(() => {
    if (assignment && open) {
      setFormData({
        utilisateurId: assignment.utilisateurId,
        hopitalId: assignment.hopitalId,
        role: assignment.role,
        dateDebut: assignment.dateDebut ? new Date(assignment.dateDebut) : undefined,
        dateFin: assignment.dateFin ? new Date(assignment.dateFin) : undefined,
      });
    } else if (!open) {
      resetForm();
    }
  }, [assignment, open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Modifier l'assignation
          </SheetTitle>
          <SheetDescription>
            Modifier les détails de l'assignation utilisateur-hôpital
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rôle */}
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-gray-700">Rôle *</label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Administrateur
                    </div>
                  </SelectItem>
                  <SelectItem value="medecin">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Médecin
                    </div>
                  </SelectItem>
                  <SelectItem value="patient">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Patient
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Utilisateur */}
            <div className="space-y-2">
              <label htmlFor="utilisateur" className="text-sm font-medium text-gray-700">Utilisateur *</label>
              <Select 
                value={formData.utilisateurId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, utilisateurId: value }))}
                disabled={!formData.role}
              >
                <SelectTrigger className={errors.utilisateurId ? "border-red-500" : ""}>
                  <SelectValue placeholder={formData.role ? "Sélectionner un utilisateur" : "Sélectionnez d'abord un rôle"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.type)}
                        <span>{user.prenom} {user.nom}</span>
                        <span className="text-gray-500">({user.email})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.utilisateurId && (
                <p className="text-sm text-red-600">{errors.utilisateurId}</p>
              )}
            </div>
          </div>

          {/* Hôpital */}
          <div className="space-y-2">
            <label htmlFor="hopital" className="text-sm font-medium text-gray-700">Hôpital *</label>
            <Select 
              value={formData.hopitalId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, hopitalId: value }))}
            >
              <SelectTrigger className={errors.hopitalId ? "border-red-500" : ""}>
                <SelectValue placeholder="Sélectionner un hôpital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map((hospital) => (
                  <SelectItem key={hospital.id} value={hospital.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{hospital.nom}</div>
                        <div className="text-sm text-gray-500">{hospital.adresse}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.hopitalId && (
              <p className="text-sm text-red-600">{errors.hopitalId}</p>
            )}
          </div>


          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date de début */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date de début *</label>
              <Input
                type="date"
                value={formData.dateDebut ? format(formData.dateDebut, "yyyy-MM-dd") : ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dateDebut: e.target.value ? new Date(e.target.value) : undefined }))}
                className={errors.dateDebut ? "border-red-500" : ""}
              />
              {errors.dateDebut && (
                <p className="text-sm text-red-600">{errors.dateDebut}</p>
              )}
            </div>

            {/* Date de fin */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date de fin (optionnelle)</label>
              <Input
                type="date"
                value={formData.dateFin ? format(formData.dateFin, "yyyy-MM-dd") : ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dateFin: e.target.value ? new Date(e.target.value) : undefined }))}
                className={errors.dateFin ? "border-red-500" : ""}
              />
              {errors.dateFin && (
                <p className="text-sm text-red-600">{errors.dateFin}</p>
              )}
            </div>
          </div>

          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-black hover:bg-neutral-800"
              disabled={loading}
            >
              {loading ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
