"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Stethoscope, ArrowLeft } from "lucide-react";
import { HospitalInfo } from "@/components/patient/HospitalInfo";
import { DoctorCard } from "@/components/patient/DoctorCard";
import { HospitalDetailPageProps } from "./hopitals";
import { useHospitalDetail } from "./useHospitalDetail";


export default async function HospitalDetailPage({ params }: HospitalDetailPageProps) {
  const { slug } = await params;
  
  const {
    hospital,
    specialties,
    selectedSpecialty,
    setSelectedSpecialty,
    handleBookAppointment,
    handleBack
  } = useHospitalDetail(slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec bouton retour */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Informations de l'hôpital */}
        <HospitalInfo hospital={hospital} />

        {/* Filtre par spécialité */}
        <SpecialtyFilter 
          specialties={specialties}
          selectedSpecialty={selectedSpecialty}
          onSpecialtyChange={setSelectedSpecialty}
        />

        {/* Liste des spécialités et médecins */}
        <SpecialtiesList 
          specialties={specialties}
          onBookAppointment={handleBookAppointment}
        />
      </div>
    </div>
  );
}

// Sous-composant pour le filtre des spécialités
interface SpecialtyFilterProps {
  specialties: any[];
  selectedSpecialty: string | null;
  onSpecialtyChange: (specialtyId: string | null) => void;
}

function SpecialtyFilter({ specialties, selectedSpecialty, onSpecialtyChange }: SpecialtyFilterProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Spécialités et Médecins</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedSpecialty === null ? "default" : "outline"}
          onClick={() => onSpecialtyChange(null)}
          className={selectedSpecialty === null ? "bg-green-600 text-white hover:bg-green-700" : "border-green-300 text-green-700 hover:bg-green-50"}
        >
          Toutes les spécialités
        </Button>
        {specialties.map((specialty) => (
          <Button
            key={specialty.id}
            variant={selectedSpecialty === specialty.id ? "default" : "outline"}
            onClick={() => onSpecialtyChange(specialty.id)}
            className={selectedSpecialty === specialty.id ? "bg-green-600 text-white hover:bg-green-700" : "border-green-300 text-green-700 hover:bg-green-50"}
          >
            {specialty.nom}
          </Button>
        ))}
      </div>
    </div>
  );
}

// Sous-composant pour la liste des spécialités
interface SpecialtiesListProps {
  specialties: any[];
  onBookAppointment: (doctorId: string) => void;
}

function SpecialtiesList({ specialties, onBookAppointment }: SpecialtiesListProps) {
  if (specialties.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Stethoscope className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune spécialité trouvée
          </h3>
          <p className="text-gray-600">
            Aucune spécialité ne correspond à votre recherche.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {specialties.map((specialty) => (
        <Card key={specialty.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-green-600" />
              {specialty.nom}
            </CardTitle>
            <CardDescription>
              {specialty.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialty.medecins.map((doctor: any) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookAppointment={onBookAppointment}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}