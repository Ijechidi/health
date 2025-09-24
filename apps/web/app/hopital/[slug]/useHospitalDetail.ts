import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Hospital, Specialty } from './hopitals';


export const useHospitalDetail = (slug: string) => {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  // Mock data - à remplacer par un appel API réel
  const hospital: Hospital = useMemo(() => ({
    id: 'h1',
    slug: slug,
    nom: 'Hôpital Principal',
    adresse: '123 Avenue de la République, Lomé',
    description: 'Hôpital de référence offrant des soins de qualité avec des équipements modernes et un personnel médical qualifié.',
    contact: '+228 22 123 45 67',
    email: 'contact@hopital-principal.tg',
    localisation: 'Lomé, Togo',
    services: ['Urgences', 'Chirurgie', 'Maternité', 'Pédiatrie', 'Cardiologie'],
    nombreMedecins: 15
  }), [slug]);

  const specialties: Specialty[] = useMemo(() => [
    {
      id: 's1',
      nom: 'Cardiologie',
      description: 'Spécialité médicale qui traite les maladies du cœur et des vaisseaux sanguins',
      medecins: [
        {
          id: 'd1',
          nom: 'Ndiaye',
          prenom: 'Ahmadou',
          specialite: 'Cardiologie',
          specialiteId: 's1',
          experience: 15,
          dureeConsultation: '30 min',
          photo: undefined
        },
        {
          id: 'd2',
          nom: 'Diop',
          prenom: 'Fatou',
          specialite: 'Cardiologie',
          specialiteId: 's1',
          experience: 12,
          dureeConsultation: '45 min',
          photo: undefined
        }
      ]
    },
    {
      id: 's2',
      nom: 'Dermatologie',
      description: 'Spécialité médicale qui traite les maladies de la peau, des cheveux et des ongles',
      medecins: [
        {
          id: 'd3',
          nom: 'Fall',
          prenom: 'Moussa',
          specialite: 'Dermatologie',
          specialiteId: 's2',
          experience: 8,
          dureeConsultation: '20 min',
          photo: undefined
        }
      ]
    },
    {
      id: 's3',
      nom: 'Pédiatrie',
      description: 'Spécialité médicale qui traite les enfants de la naissance à l\'adolescence',
      medecins: [
        {
          id: 'd4',
          nom: 'Ba',
          prenom: 'Aminata',
          specialite: 'Pédiatrie',
          specialiteId: 's3',
          experience: 20,
          dureeConsultation: '40 min',
          photo: undefined
        },
        {
          id: 'd5',
          nom: 'Sarr',
          prenom: 'Ibrahima',
          specialite: 'Pédiatrie',
          specialiteId: 's3',
          experience: 10,
          dureeConsultation: '35 min',
          photo: undefined
        }
      ]
    }
  ], []);

  const filteredSpecialties = selectedSpecialty 
    ? specialties.filter(s => s.id === selectedSpecialty)
    : specialties;

  const handleBookAppointment = (doctorId: string) => {
    router.push(`/patient/appointments?doctor=${doctorId}&hospital=${hospital.id}`);
  };

  const handleBack = () => {
    router.back();
  };

  return {
    hospital,
    specialties: filteredSpecialties,
    selectedSpecialty,
    setSelectedSpecialty,
    handleBookAppointment,
    handleBack
  };
};