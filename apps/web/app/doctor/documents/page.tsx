"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { FileText, Plus, Download, Eye, Edit, Calendar, User } from "lucide-react";

export default function DoctorDocumentsPage() {
  const documents = [
    {
      id: "1",
      title: "Ordonnance - Marie Dupont",
      type: "Ordonnance",
      patientName: "Marie Dupont",
      date: "2024-01-15",
      status: "GENEREE",
      size: "2.3 MB"
    },
    {
      id: "2",
      title: "Rapport de consultation - Jean Martin",
      type: "Rapport",
      patientName: "Jean Martin",
      date: "2024-01-14",
      status: "BROUILLON",
      size: "1.8 MB"
    },
    {
      id: "3",
      title: "Certificat médical - Sophie Bernard",
      type: "Certificat",
      patientName: "Sophie Bernard",
      date: "2024-01-13",
      status: "GENEREE",
      size: "1.2 MB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "GENEREE":
        return "bg-green-100 text-green-800 border-green-200";
      case "BROUILLON":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "EN_ATTENTE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Ordonnance":
        return "💊";
      case "Rapport":
        return "📋";
      case "Certificat":
        return "🏥";
      default:
        return "📄";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Document
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordonnances</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">57% du total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rapports</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">29% du total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificats</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">14% du total</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des documents</CardTitle>
          <CardDescription>
            Gérez vos ordonnances, rapports et certificats médicaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                    {getTypeIcon(document.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {document.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {document.type} • {document.patientName}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{document.date}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {document.size}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(document.status)}>
                    {document.status.replace('_', ' ')}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Créez rapidement vos documents médicaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
              <FileText className="h-6 w-6" />
              <span>Nouvelle ordonnance</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
              <FileText className="h-6 w-6" />
              <span>Rapport de consultation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
              <FileText className="h-6 w-6" />
              <span>Certificat médical</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
