"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { User, Mail, Phone, Shield, Save, Eye, EyeOff } from "lucide-react";

interface ProfileData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileFormProps {
  profileData: ProfileData;
  onProfileDataChange: (data: ProfileData) => void;
  onSave: () => void;
  saving: boolean;
}

export function ProfileForm({
  profileData,
  onProfileDataChange,
  onSave,
  saving
}: ProfileFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    onProfileDataChange({
      ...profileData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Informations personnelles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informations personnelles
          </CardTitle>
          <CardDescription>
            Gérez vos informations de profil et vos coordonnées
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nom *</label>
              <Input
                value={profileData.nom}
                onChange={(e) => handleInputChange('nom', e.target.value)}
                placeholder="Votre nom"
                className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Prénom *</label>
              <Input
                value={profileData.prenom}
                onChange={(e) => handleInputChange('prenom', e.target.value)}
                placeholder="Votre prénom"
                className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-10 border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Téléphone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  value={profileData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  placeholder="+221 77 123 45 67"
                  className="pl-10 border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sécurité
          </CardTitle>
          <CardDescription>
            Changez votre mot de passe pour sécuriser votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Mot de passe actuel</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={profileData.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                placeholder="Votre mot de passe actuel"
                className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nouveau mot de passe</label>
              <Input
                type="password"
                value={profileData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                placeholder="Nouveau mot de passe"
                className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
              <Input
                type="password"
                value={profileData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirmer le nouveau mot de passe"
                className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
              />
            </div>
          </div>

          {profileData.newPassword && profileData.confirmPassword && 
           profileData.newPassword !== profileData.confirmPassword && (
            <p className="text-sm text-red-600">Les mots de passe ne correspondent pas</p>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button
          onClick={onSave}
          disabled={saving}
          className="bg-black hover:bg-neutral-800"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Sauvegarde..." : "Sauvegarder le profil"}
        </Button>
      </div>
    </div>
  );
}
