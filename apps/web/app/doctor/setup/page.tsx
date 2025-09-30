"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Checkbox } from "@repo/ui/components/checkbox";
import { useToast } from "@repo/ui/hooks/use-toast";
import { 
  Stethoscope, 
  Building2, 
  User, 
  GraduationCap,
  MapPin,
  Phone,
  Save,
  ArrowRight
} from "lucide-react";

interface Specialite {
  id: string;
  nom: string;
  description?: string;
}

interface Hopital {
  id: string;
  nom: string;
  adresse: string;
  localisation?: string;
}

export default function DoctorSetupPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // États du formulaire
  const [formData, setFormData] = useState({
    numLicence: "",
    anneeExperience: "",
    titre: "",
    specialiteId: "",
    hopitauxIds: [] as string[]
  });
  
  const [specialites, setSpecialites] = useState<Specialite[]>([]);
  const [hopitaux, setHopitaux] = useState<Hopital[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      try {
        const [specialitesRes, hopitauxRes] = await Promise.all([
          fetch('/api/admin/specialties'),
          fetch('/api/admin/hospitals')
        ]);
        
        const [specialitesData, hopitauxData] = await Promise.all([
          specialitesRes.json(),
          hopitauxRes.json()
        ]);
        
        setSpecialites(specialitesData.data || []);
        setHopitaux(hopitauxData.data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [toast]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHopitalToggle = (hopitalId: string) => {
    setFormData(prev => ({
      ...prev,
      hopitauxIds: prev.hopitauxIds.includes(hopitalId)
        ? prev.hopitauxIds.filter(id => id !== hopitalId)
        : [...prev.hopitauxIds, hopitalId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.numLicence || !formData.titre || !formData.specialiteId || formData.hopitauxIds.length === 0) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/doctor/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          anneeExperience: formData.anneeExperience ? parseInt(formData.anneeExperience) : null
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Informations enregistrées avec succès ! Votre demande est en attente d'approbation.");
        router.push('/doctor/pending');
      } else {
        toast.error(result.error || "Erreur lors de l'enregistrement");
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
            <Stethoscope className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Configuration de votre profil médecin
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Complétez vos informations pour finaliser votre inscription
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations professionnelles */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                Informations professionnelles
              </CardTitle>
              <CardDescription className="text-sm">
                Vos informations de médecin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Numéro de licence *
                  </label>
                  <Input
                    placeholder="Ex: MED123456"
                    value={formData.numLicence}
                    onChange={(e) => handleInputChange('numLicence', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Titre professionnel *
                  </label>
                  <Input
                    placeholder="Ex: Dr, Pr, etc."
                    value={formData.titre}
                    onChange={(e) => handleInputChange('titre', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Années d'expérience
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 5"
                  value={formData.anneeExperience}
                  onChange={(e) => handleInputChange('anneeExperience', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Spécialité */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />
                Spécialité médicale
              </CardTitle>
              <CardDescription className="text-sm">
                Sélectionnez votre spécialité
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Spécialité *
                </label>
                <Select
                  value={formData.specialiteId}
                  onValueChange={(value) => handleInputChange('specialiteId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialites.map((specialite) => (
                      <SelectItem key={specialite.id} value={specialite.id}>
                        {specialite.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Hôpitaux */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                Hôpitaux d'exercice
              </CardTitle>
              <CardDescription className="text-sm">
                Sélectionnez les hôpitaux où vous souhaitez exercer
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {hopitaux.map((hopital) => (
                  <div key={hopital.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={hopital.id}
                      checked={formData.hopitauxIds.includes(hopital.id)}
                      onCheckedChange={() => handleHopitalToggle(hopital.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={hopital.id} className="font-medium text-gray-900 cursor-pointer block">
                        {hopital.nom}
                      </label>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{hopital.adresse}</span>
                        </div>
                        {hopital.localisation && (
                          <span className="text-xs sm:text-sm">• {hopital.localisation}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {formData.hopitauxIds.length === 0 && (
                <p className="text-sm text-red-600 mt-2">
                  Veuillez sélectionner au moins un hôpital
                </p>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Retour
            </Button>
            <Button
              type="submit"
              disabled={loading || formData.hopitauxIds.length === 0}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer et soumettre
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
