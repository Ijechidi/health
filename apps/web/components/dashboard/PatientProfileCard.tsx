import React from "react";
import { Card } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { User, Mail, Phone, MapPin, Calendar, Heart, Ruler, Weight } from "lucide-react";

interface PatientProfile {
  utilisateur: {
    id: string;
    nom: string;
    prenom?: string | null;
    email: string;
    telephone?: string | null;
    dateCreation: string;
  };
  patient: {
    id: string;
    dateNaissance: string;
    adresse?: string | null;
    groupeSanguin: string;
    poids?: number | null;
    taille?: number | null;
    sexe: string;
  };
}

interface PatientProfileCardProps {
  profile: PatientProfile;
}

export function PatientProfileCard({ profile }: PatientProfileCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-full">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {profile.utilisateur.prenom ? `${profile.utilisateur.prenom} ${profile.utilisateur.nom}` : profile.utilisateur.nom}
          </h2>
          <p className="text-sm text-muted-foreground">
            Patient depuis {formatDate(profile.utilisateur.dateCreation)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Informations personnelles */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Informations personnelles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{profile.utilisateur.email}</span>
            </div>
            {profile.utilisateur.telephone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{profile.utilisateur.telephone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">
                {formatDate(profile.patient.dateNaissance)} ({calculateAge(profile.patient.dateNaissance)} ans)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{profile.patient.sexe}</span>
            </div>
          </div>
        </div>

        {/* Adresse */}
        {profile.patient.adresse && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Adresse
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{profile.patient.adresse}</span>
            </div>
          </div>
        )}

        {/* Informations médicales */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Informations médicales
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              Groupe: {profile.patient.groupeSanguin}
            </Badge>
            {profile.patient.poids != null && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Weight className="h-3 w-3" />
                {profile.patient.poids} kg
              </Badge>
            )}
            {profile.patient.taille != null && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Ruler className="h-3 w-3" />
                {profile.patient.taille} m
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
