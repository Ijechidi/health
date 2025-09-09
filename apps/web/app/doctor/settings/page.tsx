"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { User, Bell, Shield, Clock, Calendar, Save } from "lucide-react";

export default function DoctorSettingsPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Profil Personnel
          </CardTitle>
          <CardDescription>
            Modifiez vos informations personnelles et professionnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">Prénom</label>
              <Input id="firstName" defaultValue="Dr. Martin" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">Nom</label>
              <Input id="lastName" defaultValue="Cardiologue" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email professionnel</label>
            <Input id="email" type="email" defaultValue="dr.martin@healthapp.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="specialty" className="text-sm font-medium">Spécialité</label>
            <Input id="specialty" defaultValue="Cardiologie" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
            <Input id="phone" defaultValue="01 23 45 67 89" />
          </div>
        </CardContent>
      </Card>

      {/* Practice Settings */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Paramètres de Cabinet
          </CardTitle>
          <CardDescription>
            Configurez vos horaires et disponibilités
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startTime" className="text-sm font-medium">Heure de début</label>
              <Input id="startTime" type="time" defaultValue="09:00" />
            </div>
            <div className="space-y-2">
              <label htmlFor="endTime" className="text-sm font-medium">Heure de fin</label>
              <Input id="endTime" type="time" defaultValue="18:00" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="appointmentDuration" className="text-sm font-medium">Durée par RDV (minutes)</label>
            <Input id="appointmentDuration" type="number" defaultValue="30" />
          </div>
          <div className="space-y-2">
            <label htmlFor="breakTime" className="text-sm font-medium">Pause déjeuner (minutes)</label>
            <Input id="breakTime" type="number" defaultValue="60" />
          </div>
        </CardContent>
      </Card> */}

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Notifications
          </CardTitle>
          <CardDescription>
            Gérez vos préférences de notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Nouveaux rendez-vous</label>
              <p className="text-sm text-muted-foreground">
                Recevoir une notification pour chaque nouveau RDV
              </p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              aria-label="Activer les notifications pour nouveaux rendez-vous"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Rappels RDV</label>
              <p className="text-sm text-muted-foreground">
                Rappel 24h avant chaque rendez-vous
              </p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              aria-label="Activer les rappels de rendez-vous"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
            />
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Messages patients</label>
              <p className="text-sm text-muted-foreground">
                Notifications pour les messages des patients
              </p>
            </div>
            <input 
              type="checkbox" 
              aria-label="Activer les notifications pour messages patients"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
            />
          </div> */}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Sécurité et Confidentialité
          </CardTitle>
          <CardDescription>
            Paramètres de sécurité de votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">Mot de passe actuel</label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">Nouveau mot de passe</label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</label>
            <Input id="confirmPassword" type="password" />
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Authentification à deux facteurs</label>
              <p className="text-sm text-muted-foreground">
                Sécurisez votre compte avec la 2FA
              </p>
            </div>
            <input 
              type="checkbox" 
              aria-label="Activer l'authentification à deux facteurs"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
            />
          </div> */}
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle>Export et Sauvegarde</CardTitle>
          <CardDescription>
            Exportez vos données et sauvegardez vos informations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              Exporter mes données
            </Button>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              Sauvegarder la configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
