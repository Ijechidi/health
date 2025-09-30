import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface UserWithDetails {
  id: string;
  nom: string;
  prenom?: string;
  email: string;
  telephone?: string;
  dateCreation: Date;
  role: 'admin' | 'medecin' | 'patient';
  specialite?: {
    id: string;
    nom: string;
  };
  hopital?: {
    id: string;
    nom: string;
    adresse: string;
  };
}

export interface HospitalWithStats {
  id: string;
  nom: string;
  slug?: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
  stats: {
    totalUsers: number;
    totalMedecins: number;
    totalPatients: number;
    totalAdmins: number;
  };
}

export interface SpecialtyWithStats {
  id: string;
  nom: string;
  description?: string;
  stats: {
    totalMedecins: number;
  };
}

export interface DoctorActivationData {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  specialite?: string;
  hopital?: {
    nom: string;
    adresse: string;
  };
  status: 'pending' | 'active' | 'rejected';
  dateInscription: Date;
  dateValidation?: Date;
}

// API Functions
const fetchUsers = async (): Promise<UserWithDetails[]> => {
  const response = await fetch('/api/admin/users');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

const fetchUserStats = async () => {
  const response = await fetch('/api/admin/users?action=stats');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

const fetchHospitals = async (): Promise<HospitalWithStats[]> => {
  const response = await fetch('/api/admin/hospitals');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

const fetchHospitalStats = async () => {
  const response = await fetch('/api/admin/hospitals?action=stats');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

const fetchSpecialties = async (): Promise<SpecialtyWithStats[]> => {
  const response = await fetch('/api/admin/specialties');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

const fetchSpecialtyStats = async () => {
  const response = await fetch('/api/admin/specialties?action=stats');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

const fetchDoctorAccounts = async (): Promise<DoctorActivationData[]> => {
  const response = await fetch('/api/admin/doctor-activation');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

const fetchPendingDoctors = async (): Promise<DoctorActivationData[]> => {
  const response = await fetch('/api/admin/doctor-activation?action=pending');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

const fetchDoctorStats = async () => {
  const response = await fetch('/api/admin/doctor-activation?action=stats');
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
};

// Hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: fetchUsers,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ['admin', 'users', 'stats'],
    queryFn: fetchUserStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
  });
};

export const useHospitals = () => {
  return useQuery({
    queryKey: ['admin', 'hospitals'],
    queryFn: fetchHospitals,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export const useHospitalStats = () => {
  return useQuery({
    queryKey: ['admin', 'hospitals', 'stats'],
    queryFn: fetchHospitalStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
  });
};

export const useSpecialties = () => {
  return useQuery({
    queryKey: ['admin', 'specialties'],
    queryFn: fetchSpecialties,
  });
};

export const useSpecialtyStats = () => {
  return useQuery({
    queryKey: ['admin', 'specialties', 'stats'],
    queryFn: fetchSpecialtyStats,
  });
};

export const useDoctorAccounts = () => {
  return useQuery({
    queryKey: ['admin', 'doctor-accounts'],
    queryFn: fetchDoctorAccounts,
  });
};

export const usePendingDoctors = () => {
  return useQuery({
    queryKey: ['admin', 'pending-doctors'],
    queryFn: fetchPendingDoctors,
  });
};

export const useDoctorStats = () => {
  return useQuery({
    queryKey: ['admin', 'doctor-stats'],
    queryFn: fetchDoctorStats,
  });
};

// Mutations
export const useActivateDoctor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ doctorId, hopitalId }: { doctorId: string; hopitalId: string }) => {
      const response = await fetch(`/api/admin/doctor-activation/${doctorId}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hopitalId }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'doctor-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-doctors'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'doctor-stats'] });
    },
  });
};

export const useRejectDoctor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (doctorId: string) => {
      const response = await fetch(`/api/admin/doctor-activation/${doctorId}/reject`, {
        method: 'POST',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'doctor-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-doctors'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'doctor-stats'] });
    },
  });
};
