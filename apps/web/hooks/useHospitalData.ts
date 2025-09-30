import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface HospitalWithStats {
  id: string;
  nom: string;
  slug: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
  dateCreation: Date;
  stats: {
    totalUsers: number;
    totalMedecins: number;
    totalPatients: number;
    totalAdmins: number;
  };
}

export interface CreateHospitalData {
  nom: string;
  slug: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
}

export interface UpdateHospitalData {
  nom?: string;
  slug?: string;
  adresse?: string;
  description?: string;
  contact?: string;
  localisation?: string;
}

// API Functions
const fetchHospitals = async (): Promise<HospitalWithStats[]> => {
  const response = await fetch('/api/admin/hospitals');
  const data = await response.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const fetchHospitalStats = async () => {
  const response = await fetch('/api/admin/hospitals?action=stats');
  const data = await response.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const createHospital = async (data: CreateHospitalData): Promise<HospitalWithStats> => {
  const response = await fetch('/api/admin/hospitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

const updateHospital = async ({ id, data }: { id: string; data: UpdateHospitalData }): Promise<HospitalWithStats> => {
  const response = await fetch(`/api/admin/hospitals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

const deleteHospital = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/hospitals/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
};

// Hooks
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

// Mutations
export const useCreateHospital = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createHospital,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'hospitals'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'hospitals', 'stats'] });
    },
  });
};

export const useUpdateHospital = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateHospital,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'hospitals'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'hospitals', 'stats'] });
    },
  });
};

export const useDeleteHospital = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteHospital,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'hospitals'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'hospitals', 'stats'] });
    },
  });
};
