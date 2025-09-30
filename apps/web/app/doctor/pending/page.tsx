"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  LogOut,
  Home
} from "lucide-react";

interface DoctorStatus {
  statutApproval: 'EN_ATTENTE' | 'APPROUVE' | 'REJETE';
  specialite?: string;
  hopitaux?: string[];
  dateDemande?: string;
  commentaire?: string;
}

export default function DoctorPendingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<DoctorStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/doctor/status');
      const result = await response.json();
      
      if (result.success) {
        setStatus(result.data);
        
        // Si approuvé, rediriger vers le dashboard
        if (result.data.statutApproval === 'APPROUVE') {
          router.push('/doctor');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/doctor/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'EN_ATTENTE':
        return <Clock className="h-8 w-8 text-yellow-500" />;
      case 'APPROUVE':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'REJETE':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Clock className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'EN_ATTENTE':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROUVE':
        return 'bg-green-100 text-green-800';
      case 'REJETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'EN_ATTENTE':
        return 'En attente d\'approbation';
      case 'APPROUVE':
        return 'Approuvé';
      case 'REJETE':
        return 'Rejeté';
      default:
        return 'Statut inconnu';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de votre statut...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Statut d'approbation
                </h1>
                <p className="text-sm text-gray-500">
                  Vérification de votre compte médecin
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={checkStatus}
                disabled={refreshing}
                className="w-full sm:w-auto"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full sm:w-auto"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Statut principal */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                    {getStatusIcon(status?.statutApproval || 'EN_ATTENTE')}
                    Statut de votre demande
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    Votre demande d'approbation en tant que médecin
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(status?.statutApproval || 'EN_ATTENTE')}>
                  {getStatusText(status?.statutApproval || 'EN_ATTENTE')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {status?.statutApproval === 'EN_ATTENTE' && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-yellow-800">
                          Demande en cours de traitement
                        </h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          Votre demande est en cours d'examen par l'administration. 
                          Vous recevrez une notification dès qu'une décision sera prise.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {status.specialite && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Spécialité</h4>
                        <p className="text-gray-600">{status.specialite}</p>
                      </div>
                      {status.hopitaux && status.hopitaux.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Hôpitaux demandés</h4>
                          <ul className="text-gray-600 space-y-1">
                            {status.hopitaux.map((hopital, index) => (
                              <li key={index}>• {hopital}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {status?.statutApproval === 'APPROUVE' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-green-800">
                          Demande approuvée !
                        </h3>
                        <p className="text-sm text-green-700 mt-1">
                          Félicitations ! Votre compte médecin a été approuvé. 
                          Vous pouvez maintenant accéder à votre dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={() => router.push('/doctor')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Accéder au dashboard
                    </Button>
                  </div>
                </div>
              )}

              {status?.statutApproval === 'REJETE' && (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800">
                          Demande rejetée
                        </h3>
                        <p className="text-sm text-red-700 mt-1">
                          Votre demande a été rejetée. {status.commentaire && `Raison : ${status.commentaire}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push('/doctor/setup')}
                    >
                      Modifier ma demande
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations supplémentaires */}
          {status?.dateDemande && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Détails de la demande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Date de demande :</span>
                    <p className="text-gray-600">
                      {new Date(status.dateDemande).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {status.commentaire && (
                    <div>
                      <span className="font-medium text-gray-700">Commentaire :</span>
                      <p className="text-gray-600">{status.commentaire}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
