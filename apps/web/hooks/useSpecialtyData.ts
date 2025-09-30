import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface SpecialtyWithStats {
  id: string;
  nom: string;
  description?: string;
  stats: {
    totalMedecins: number;
  };
}

export interface CreateSpecialtyData {
  nom: string;
  description?: string;
}

export interface UpdateSpecialtyData {
  nom?: string;
  description?: string;
}

// API Functions
const fetchSpecialties = async (): Promise<SpecialtyWithStats[]> => {
  const response = await fetch('/api/admin/specialties');
  const data = await response.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const fetchSpecialtyStats = async () => {
  const response = await fetch('/api/admin/specialties?action=stats');
  const data = await response.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

const createSpecialty = async (data: CreateSpecialtyData): Promise<SpecialtyWithStats> => {
  const response = await fetch('/api/admin/specialties', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

const updateSpecialty = async ({ id, data }: { id: string; data: UpdateSpecialtyData }): Promise<SpecialtyWithStats> => {
  const response = await fetch(`/api/admin/specialties/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

const deleteSpecialty = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/specialties/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
};

// Hooks
export const useSpecialties = () => {
  return useQuery({
    queryKey: ['admin', 'specialties'],
    queryFn: fetchSpecialties,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export const useSpecialtyStats = () => {
  return useQuery({
    queryKey: ['admin', 'specialties', 'stats'],
    queryFn: fetchSpecialtyStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
  });
};

// Mutations
export const useCreateSpecialty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'specialties'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'specialties', 'stats'] });
    },
  });
};

export const useUpdateSpecialty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'specialties'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'specialties', 'stats'] });
    },
  });
};

export const useDeleteSpecialty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'specialties'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'specialties', 'stats'] });
    },
  });
};
