import { useQuery } from "@tanstack/react-query";

export interface ActivityStats {
  rendezVous: number;
  documents: number;
  assignations: number;
  utilisateursActifs: number;
}

export function useActivityStats() {
  return useQuery<ActivityStats>({
    queryKey: ['activity-stats'],
    queryFn: async () => {
      const response = await fetch('/api/admin/activity-stats');
      if (!response.ok) {
        throw new Error('Failed to fetch activity stats');
      }
      const result = await response.json();
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
