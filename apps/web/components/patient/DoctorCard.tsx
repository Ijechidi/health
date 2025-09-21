"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { 
  User, 
  Clock, 
  Calendar,
  MapPin,
  Phone
} from "lucide-react";

interface Doctor {
  id: string;
  nom: string;
  prenom: string;
  specialite: string;
  specialiteId: string;
  experience: number;
  dureeConsultation: string;
  photo?: string;
  adresse?: string;
  telephone?: string;
  description?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: string) => void;
  showFullDetails?: boolean;
}

export function DoctorCard({ 
  doctor, 
  onBookAppointment, 
  showFullDetails = false 
}: DoctorCardProps) {

  if (showFullDetails) {
    return (
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              Dr. {doctor.prenom} {doctor.nom}
            </h3>
            <p className="text-gray-600 mb-2">{doctor.specialite}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">
                {doctor.experience} ans d'expérience
              </span>
            </div>
            {doctor.description && (
              <p className="text-sm text-gray-600 mb-3">{doctor.description}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Durée consultation:</span>
              <span className="text-gray-600">{doctor.dureeConsultation}</span>
            </div>
          </div>
          <div className="space-y-2">
            {doctor.adresse && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{doctor.adresse}</span>
              </div>
            )}
            {doctor.telephone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{doctor.telephone}</span>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={() => onBookAppointment(doctor.id)}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Prendre rendez-vous
        </Button>
      </div>
    );
  }

  // Version compacte
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">
            Dr. {doctor.prenom} {doctor.nom}
          </h3>
          <p className="text-sm text-gray-600">{doctor.specialite}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm text-gray-500">({doctor.experience} ans d'exp.)</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Durée:</span>
          <span>{doctor.dureeConsultation}</span>
        </div>
      </div>
      
      <Button
        onClick={() => onBookAppointment(doctor.id)}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Prendre rendez-vous
      </Button>
    </div>
  );
}
