import { Hospital, Specialty } from "./hopitals";

// À implémenter quand l'API sera disponible
export const hospitalService = {
  async getHospitalBySlug(slug: string): Promise<Hospital> {
    // TODO: Implémenter l'appel API réel
    throw new Error('Not implemented yet');
  },

  async getHospitalSpecialties(hospitalId: string): Promise<Specialty[]> {
    // TODO: Implémenter l'appel API réel
    throw new Error('Not implemented yet');
  }
};