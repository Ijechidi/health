"use client";

import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Building2, ChevronDown } from "lucide-react";

interface Hospital {
  id: string;
  nom: string;
  localisation?: string;
}

interface HospitalSelectorProps {
  onHospitalChange: (hospitalId: string) => void;
  currentHospitalId?: string;
}

export function HospitalSelector({ onHospitalChange, currentHospitalId }: HospitalSelectorProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState<string>(currentHospitalId || "");

  useEffect(() => {
    loadHospitals();
  }, []);

  useEffect(() => {
    if (currentHospitalId) {
      setSelectedHospital(currentHospitalId);
    }
  }, [currentHospitalId]);

  const loadHospitals = async () => {
    try {
      const response = await fetch('/api/doctor/hospitals');
      const result = await response.json();
      
      if (result.success) {
        setHospitals(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des hôpitaux:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalChange = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
    onHospitalChange(hospitalId);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('selectedHospitalId', hospitalId);
  };

  const getCurrentHospital = () => {
    return hospitals.find(h => h.id === selectedHospital);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
        <Building2 className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-500">Chargement...</span>
      </div>
    );
  }

  if (hospitals.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg">
        <Building2 className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-600">Aucun hôpital assigné</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Building2 className="h-4 w-4 text-blue-600" />
      <Select value={selectedHospital} onValueChange={handleHospitalChange}>
        <SelectTrigger className="w-[200px] sm:w-[250px] border-blue-200 focus:border-blue-400">
          <SelectValue placeholder="Sélectionner un hôpital">
            {getCurrentHospital()?.nom || "Sélectionner un hôpital"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hospitals.map((hospital) => (
            <SelectItem key={hospital.id} value={hospital.id}>
              <div className="flex flex-col">
                <span className="font-medium">{hospital.nom}</span>
                {hospital.localisation && (
                  <span className="text-xs text-gray-500">{hospital.localisation}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
