"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users
} from "lucide-react";

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

interface HospitalInfoProps {
  hospital: Hospital;
}

export function HospitalInfo({ hospital }: HospitalInfoProps) {

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">{hospital.nom}</CardTitle>
              <CardDescription className="mt-1">
                {hospital.description}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {hospital.nombreMedecins && (
              <Badge variant="outline" className="border-green-300 text-green-700">
                <Users className="h-3 w-3 mr-1" />
                {hospital.nombreMedecins} médecins
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Adresse</p>
              <p className="text-sm text-gray-600">{hospital.adresse}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Contact</p>
              <p className="text-sm text-gray-600">{hospital.contact}</p>
            </div>
          </div>
          
          {hospital.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{hospital.email}</p>
              </div>
            </div>
          )}
          
          
          {hospital.localisation && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Localisation</p>
                <p className="text-sm text-gray-600">{hospital.localisation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Services disponibles */}
        {hospital.services && hospital.services.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-3">Services disponibles</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.services.map((service, index) => (
                <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
