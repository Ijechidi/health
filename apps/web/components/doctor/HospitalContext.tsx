"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelectedHospital } from '@/hooks/useSelectedHospital';

interface HospitalContextType {
  selectedHospitalId: string;
  selectedHospital: any;
  changeHospital: (hospitalId: string) => void;
  loading: boolean;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export function HospitalProvider({ children }: { children: React.ReactNode }) {
  const hospitalData = useSelectedHospital();

  return (
    <HospitalContext.Provider value={hospitalData}>
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
}

// HOC pour wrapper les pages qui nécessitent un hôpital sélectionné
export function withHospitalSelection<T extends object>(
  Component: React.ComponentType<T>
) {
  return function HospitalWrappedComponent(props: T) {
    const { selectedHospitalId, loading } = useHospital();

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'hôpital...</p>
          </div>
        </div>
      );
    }

    if (!selectedHospitalId) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">
                Aucun hôpital sélectionné
              </h3>
              <p className="text-yellow-700">
                Veuillez sélectionner un hôpital depuis le dashboard pour accéder à cette page.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
