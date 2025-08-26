'use client';

import React from 'react';
import SpecialityCard from './SpecialityCard';
import { cn } from '@repo/ui/lib/utils';
import { specialities } from './mock';
import { useSearchStore } from '../hooks/useSearchStore';
import HopitalCard from '../hopital/HopitalCard';
import { SpecialityMarquee } from './SpecialityMarquee';

export default function SpecialiterListe() {
  const { filteredHopitaux, location, nom, speciality } = useSearchStore();
  
  // Vérifier si une recherche est active
  const hasActiveSearch = Boolean(location.trim() || nom.trim() || speciality);
  
  console.log("État de la recherche:", { location, nom, speciality, hasActiveSearch });
  console.log("Hôpitaux filtrés:", filteredHopitaux);

  return (
    <div className="w-full">
      {/* Affichage des spécialités si pas de recherche active */}
      {!hasActiveSearch && (
        <div className="flex w-full justify-center items-center overflow-hidden scrollbar-hidden overflow-x-scroll scroll">
          <div className={cn("flex justify-center items-center max-w-7xl gap-8")}>
            <SpecialityMarquee specialities={specialities} />
          </div>
        </div>
      )}

      {/* Affichage des hôpitaux filtrés si recherche active */}
      {hasActiveSearch && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Résultats de recherche
            </h2>
            <p className="text-muted-foreground">
              {filteredHopitaux.length} hôpital{filteredHopitaux.length > 1 ? 'x' : ''} trouvé{filteredHopitaux.length > 1 ? 's' : ''}
            </p>
          </div>
          
          {filteredHopitaux.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {filteredHopitaux.map((hopital) => (
                <HopitalCard key={hopital.id} {...hopital} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Aucun hôpital trouvé pour votre recherche
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
