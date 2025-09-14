"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

import { 
  Settings, 
  User, 
  Bell, 
  Mail, 
  Phone, 
  Save,
  Clock
} from "lucide-react";
import { NotificationToggle } from "@/components/admin/NotificationToggle";
import { ProfileForm } from "@/components/admin/ProfileForm";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');
  const [saving, setSaving] = useState(false);

  // État pour les paramètres de profil
  const [profileData, setProfileData] = useState({
    nom: "Admin",
    prenom: "Super",
    email: "admin@system.com",
    telephone: "+228 70 12 45 67",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // État pour les paramètres de notifications
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newAppointments: true,
    appointmentCancellations: true,
    appointmentReminders: true,
    systemUpdates: false,
    emergencyAlerts: true
  });

  const handleProfileSave = async () => {
    setSaving(true);
    try {
      // Mock: Simuler la sauvegarde
      console.log('Sauvegarde du profil:', profileData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationSave = async () => {
    setSaving(true);
    try {
      // Mock: Simuler la sauvegarde
      console.log('Sauvegarde des notifications:', notificationSettings);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-2">Gérer vos préférences et notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="h-8 w-8 text-gray-600" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'profile'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="h-4 w-4 inline mr-2" />
          Profil
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'notifications'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Bell className="h-4 w-4 inline mr-2" />
          Notifications
        </button>
      </div>

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <ProfileForm
          profileData={profileData}
          onProfileDataChange={setProfileData}
          onSave={handleProfileSave}
          saving={saving}
        />
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* Paramètres généraux */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Paramètres généraux
              </CardTitle>
              <CardDescription>
                Configurez comment vous souhaitez recevoir les notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationToggle
                title="Notifications par email"
                description="Recevoir les notifications par email"
                enabled={notificationSettings.emailNotifications}
                onChange={(enabled) => handleNotificationChange('emailNotifications', enabled)}
                icon={<Mail className="h-5 w-5" />}
              />

              {/* <NotificationToggle
                title="Notifications par SMS"
                description="Recevoir les notifications par SMS"
                enabled={notificationSettings.smsNotifications}
                onChange={(enabled) => handleNotificationChange('smsNotifications', enabled)}
                icon={<Phone className="h-5 w-5" />}
              /> */}
            </CardContent>
          </Card>

          {/* Types de notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Types de notifications
              </CardTitle>
              <CardDescription>
                Choisissez quels types de notifications vous souhaitez recevoir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: 'newAppointments',
                  title: 'Nouveaux rendez-vous',
                  description: 'Notification lors de la prise d\'un nouveau rendez-vous'
                },
                {
                  key: 'appointmentCancellations',
                  title: 'Annulations de rendez-vous',
                  description: 'Notification lors de l\'annulation d\'un rendez-vous'
                },
                {
                  key: 'appointmentReminders',
                  title: 'Rappels de rendez-vous',
                  description: 'Rappels avant vos rendez-vous'
                }
          
              ].map((notification) => (
                <NotificationToggle
                  key={notification.key}
                  title={notification.title}
                  description={notification.description}
                  enabled={notificationSettings[notification.key as keyof typeof notificationSettings]}
                  onChange={(enabled) => handleNotificationChange(notification.key, enabled)}
                />
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end">
            <Button
              onClick={handleNotificationSave}
              disabled={saving}
              className="bg-black hover:bg-neutral-800"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Sauvegarde..." : "Sauvegarder les notifications"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
