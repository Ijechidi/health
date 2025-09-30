"use client";

import { useState, useEffect } from 'react';

export function useSelectedHospital() {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'hôpital sélectionné depuis localStorage
    const savedHospitalId = localStorage.getItem('selectedHospitalId');
    if (savedHospitalId) {
      setSelectedHospitalId(savedHospitalId);
    }
    setLoading(false);
  }, []);

  const changeHospital = async (hospitalId: string) => {
    setSelectedHospitalId(hospitalId);
    localStorage.setItem('selectedHospitalId', hospitalId);
    
    // Charger les détails de l'hôpital
    try {
      const response = await fetch(`/api/admin/hospitals/${hospitalId}`);
      const result = await response.json();
      
      if (result.success) {
        setSelectedHospital(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'hôpital:', error);
    }
  };

  const loadHospitalDetails = async (hospitalId: string) => {
    try {
      const response = await fetch(`/api/admin/hospitals/${hospitalId}`);
      const result = await response.json();
      
      if (result.success) {
        setSelectedHospital(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'hôpital:', error);
    }
  };

  // Charger les détails de l'hôpital au démarrage
  useEffect(() => {
    if (selectedHospitalId && !selectedHospital) {
      loadHospitalDetails(selectedHospitalId);
    }
  }, [selectedHospitalId]);

  return {
    selectedHospitalId,
    selectedHospital,
    loading,
    changeHospital
  };
}
