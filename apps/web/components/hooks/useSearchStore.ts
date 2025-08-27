import { create } from 'zustand';
import { hopitaux } from '../hopital/mockHotipal';
import { specialities } from '../specialities/mock';

interface SearchState {
  location: string;
  nom: string;
  speciality: string;
  filteredHopitaux: typeof hopitaux;
  setLocation: (location: string) => void;
  setNom: (nom: string) => void;
  setSpeciality: (speciality: string) => void;
  search: () => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  location: '',
  nom: '',
  speciality: '',
  filteredHopitaux: hopitaux, // Commencer avec tous les hôpitaux

  setLocation: (location: string) => {
    set({ location });
    // Recherche automatique quand la localisation change
    const state = get();
    let filtered = [...hopitaux];
    
    if (location.trim()) {
      filtered = filtered.filter(h => 
        h.localisation.toLowerCase().includes(location.toLowerCase()) ||
        h.adresse.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (state.nom.trim()) {
      filtered = filtered.filter(h => 
        h.nom.toLowerCase().includes(state.nom.toLowerCase())
      );
    }
    
    if (state.speciality) {
      filtered = filtered.filter(h => 
        h.specialites.includes(state.speciality)
      );
    }
    
    set({ filteredHopitaux: filtered });
  },

  setNom: (nom: string) => {
    set({ nom });
    // Recherche automatique quand le nom change
    const state = get();
    let filtered = [...hopitaux];
    
    if (state.location.trim()) {
      filtered = filtered.filter(h => 
        h.localisation.toLowerCase().includes(state.location.toLowerCase()) ||
        h.adresse.toLowerCase().includes(state.location.toLowerCase())
      );
    }
    
    if (nom.trim()) {
      filtered = filtered.filter(h => 
        h.nom.toLowerCase().includes(nom.toLowerCase())
      );
    }
    
    if (state.speciality) {
      filtered = filtered.filter(h => 
        h.specialites.includes(state.speciality)
      );
    }
    
    set({ filteredHopitaux: filtered });
  },

  setSpeciality: (speciality: string) => {
    set({ speciality });
    // Recherche automatique quand la spécialité change
    const state = get();
    let filtered = [...hopitaux];
    
    if (state.location.trim()) {
      filtered = filtered.filter(h => 
        h.localisation.toLowerCase().includes(state.location.toLowerCase()) ||
        h.adresse.toLowerCase().includes(state.location.toLowerCase())
      );
    }
    
    if (state.nom.trim()) {
      filtered = filtered.filter(h => 
        h.nom.toLowerCase().includes(state.nom.toLowerCase())
      );
    }
    
    if (speciality) {
      filtered = filtered.filter(h => 
        h.specialites.includes(speciality)
      );
    }
    
    set({ filteredHopitaux: filtered });
  },

  search: () => {
    const { location, nom, speciality } = get();
    
    let filtered = [...hopitaux];

    // Filtrage par localisation
    if (location.trim()) {
      filtered = filtered.filter(h => 
        h.localisation.toLowerCase().includes(location.toLowerCase()) ||
        h.adresse.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filtrage par nom d'hôpital
    if (nom.trim()) {
      filtered = filtered.filter(h => 
        h.nom.toLowerCase().includes(nom.toLowerCase())
      );
    }

    // Filtrage par spécialité
    if (speciality) {
      filtered = filtered.filter(h => 
        h.specialites.includes(speciality)
      );
    }

    console.log('Filtres appliqués:', { location, nom, speciality });
    console.log('Résultats filtrés:', filtered);
    
    set({ filteredHopitaux: filtered });
  },

  reset: () => {
    set({
      location: '',
      nom: '',
      speciality: '',
      filteredHopitaux: hopitaux // Remettre tous les hôpitaux
    });
  }
})); 