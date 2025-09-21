"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { 
  Stethoscope,
  Calendar,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import { HospitalInfo } from "@/components/patient/HospitalInfo";
import { DoctorCard } from "@/components/patient/DoctorCard";

interface Hospital {
  id: string;
  slug: string;
  nom: string;
  adresse: string;
  description?: string;
  contact: string;
  email?: string;
  localisation?: string;
  services?: string[];
  nombreMedecins?: number;
}

interface Doctor {
  id: string;
  nom: string;
  prenom: string;
  specialite: string;
  specialiteId: string;
  experience: number;
  dureeConsultation: string;
  photo?: string;
}

interface Specialty {
  id: string;
  nom: string;
  description: string;
  medecins: Doctor[];
}

interface HospitalDetailPageProps {
  params: {
    slug: string;
  };
}

export default function HospitalDetailPage({ params }: HospitalDetailPageProps) {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  // Mock data - en réalité, ces données viendraient de l'API
  const hospital: Hospital = useMemo(() => ({
    id: 'h1',
    slug: params.slug,
    nom: 'Hôpital Principal',
    adresse: '123 Avenue de la République, Lomé',
    description: 'Hôpital de référence offrant des soins de qualité avec des équipements modernes et un personnel médical qualifié.',
    contact: '+228 22 123 45 67',
    email: 'contact@hopital-principal.tg',
    localisation: 'Lomé, Togo',
    services: ['Urgences', 'Chirurgie', 'Maternité', 'Pédiatrie', 'Cardiologie'],
    nombreMedecins: 15
  }), [params.slug]);

  const specialties: Specialty[] = useMemo(() => [
    {
      id: 's1',
      nom: 'Cardiologie',
      description: 'Spécialité médicale qui traite les maladies du cœur et des vaisseaux sanguins',
      medecins: [
        {
          id: 'd1',
          nom: 'Ndiaye',
          prenom: 'Ahmadou',
          specialite: 'Cardiologie',
          specialiteId: 's1',
          experience: 15,
          dureeConsultation: '30 min',
          photo: undefined
        },
        {
          id: 'd2',
          nom: 'Diop',
          prenom: 'Fatou',
          specialite: 'Cardiologie',
          specialiteId: 's1',
          experience: 12,
          dureeConsultation: '45 min',
          photo: undefined
        }
      ]
    },
    {
      id: 's2',
      nom: 'Dermatologie',
      description: 'Spécialité médicale qui traite les maladies de la peau, des cheveux et des ongles',
      medecins: [
        {
          id: 'd3',
          nom: 'Fall',
          prenom: 'Moussa',
          specialite: 'Dermatologie',
          specialiteId: 's2',
          experience: 8,
          dureeConsultation: '20 min',
          photo: undefined
        }
      ]
    },
    {
      id: 's3',
      nom: 'Pédiatrie',
      description: 'Spécialité médicale qui traite les enfants de la naissance à l\'adolescence',
      medecins: [
        {
          id: 'd4',
          nom: 'Ba',
          prenom: 'Aminata',
          specialite: 'Pédiatrie',
          specialiteId: 's3',
          experience: 20,
          dureeConsultation: '40 min',
          photo: undefined
        },
        {
          id: 'd5',
          nom: 'Sarr',
          prenom: 'Ibrahima',
          specialite: 'Pédiatrie',
          specialiteId: 's3',
          experience: 10,
          dureeConsultation: '35 min',
          photo: undefined
        }
      ]
    }
  ], []);

  const filteredSpecialties = selectedSpecialty 
    ? specialties.filter(s => s.id === selectedSpecialty)
    : specialties;

  const handleBookAppointment = (doctorId: string) => {
    // Rediriger vers la page de rendez-vous du patient
    router.push(`/patient/appointments?doctor=${doctorId}&hospital=${hospital.id}`);
  };

  const handleBack = () => {
    router.back();
  };

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
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Spécialités et Médecins</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSpecialty === null ? "default" : "outline"}
              onClick={() => setSelectedSpecialty(null)}
              className={selectedSpecialty === null ? "bg-green-600 text-white hover:bg-green-700" : "border-green-300 text-green-700 hover:bg-green-50"}
            >
              Toutes les spécialités
            </Button>
            {specialties.map((specialty) => (
              <Button
                key={specialty.id}
                variant={selectedSpecialty === specialty.id ? "default" : "outline"}
                onClick={() => setSelectedSpecialty(specialty.id)}
                className={selectedSpecialty === specialty.id ? "bg-green-600 text-white hover:bg-green-700" : "border-green-300 text-green-700 hover:bg-green-50"}
              >
                {specialty.nom}
              </Button>
            ))}
          </div>
        </div>

        {/* Liste des spécialités et médecins */}
        <div className="space-y-6">
          {filteredSpecialties.map((specialty) => (
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
                  {specialty.medecins.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onBookAppointment={handleBookAppointment}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message si aucune spécialité trouvée */}
        {filteredSpecialties.length === 0 && (
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
        )}
      </div>
    </div>
  );
}
