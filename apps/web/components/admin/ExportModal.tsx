"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  File,
  X,
  Settings,
  Users,
  Calendar,
  Mail,
  Phone,
  Building2,
  Stethoscope
} from "lucide-react";

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: any[];
  filteredUsers: any[];
}

interface ExportField {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
}

export function ExportModal({ open, onOpenChange, users, filteredUsers }: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'excel'>('csv');
  const [exportScope, setExportScope] = useState<'all' | 'filtered'>('filtered');
  const [selectedFields, setSelectedFields] = useState<ExportField[]>([
    { key: 'nom', label: 'Nom', icon: Users, enabled: true },
    { key: 'prenom', label: 'Prénom', icon: Users, enabled: true },
    { key: 'email', label: 'Email', icon: Mail, enabled: true },
    { key: 'telephone', label: 'Téléphone', icon: Phone, enabled: true },
    { key: 'role', label: 'Rôle', icon: Users, enabled: true },
    { key: 'status', label: 'Statut', icon: Users, enabled: true },
    { key: 'specialite', label: 'Spécialité', icon: Stethoscope, enabled: true },
    { key: 'hopital', label: 'Hôpital', icon: Building2, enabled: true },
    { key: 'dateCreation', label: 'Date de création', icon: Calendar, enabled: true }
  ]);

  const toggleField = (key: string) => {
    setSelectedFields(prev => 
      prev.map(field => 
        field.key === key ? { ...field, enabled: !field.enabled } : field
      )
    );
  };

  const exportData = exportScope === 'all' ? users : filteredUsers;
  const enabledFields = selectedFields.filter(field => field.enabled);

  const handleExportCSV = () => {
    const csvData = exportData.map(user => {
      const row: any = {};
      enabledFields.forEach(field => {
        switch (field.key) {
          case 'role':
            row[field.label] = user.role === 'admin' ? 'Administrateur' : 
                              user.role === 'medecin' ? 'Médecin' : 'Patient';
            break;
          case 'status':
            row[field.label] = user.status === 'actif' ? 'Actif' : 'Inactif';
            break;
          default:
            row[field.label] = user[field.key] || '';
        }
      });
      return row;
    });

    const csvContent = [
      enabledFields.map(field => field.label).join(','),
      ...csvData.map(row => 
        enabledFields.map(field => `"${row[field.label]}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `utilisateurs_${exportScope}_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // En-tête
    doc.setFontSize(20);
    doc.text('Liste des utilisateurs', 14, 22);
    doc.setFontSize(12);
    doc.text(`Exporté le ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);
    doc.text(`Portée: ${exportScope === 'all' ? 'Tous les utilisateurs' : 'Utilisateurs filtrés'}`, 14, 36);

    // Préparation des données
    const tableData = exportData.map(user => {
      const row: any[] = [];
      enabledFields.forEach(field => {
        switch (field.key) {
          case 'role':
            row.push(user.role === 'admin' ? 'Administrateur' : 
                    user.role === 'medecin' ? 'Médecin' : 'Patient');
            break;
          case 'status':
            row.push(user.status === 'actif' ? 'Actif' : 'Inactif');
            break;
          default:
            row.push(user[field.key] || '');
        }
      });
      return row;
    });

    // Tableau
    doc.autoTable({
      head: [enabledFields.map(field => field.label)],
      body: tableData,
      startY: 50,
      styles: { 
        fontSize: 10,
        cellPadding: 3
      },
      headStyles: { 
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    doc.save(`utilisateurs_${exportScope}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  const handleExportExcel = () => {
    // Préparation des données
    const excelData = exportData.map(user => {
      const row: any = {};
      enabledFields.forEach(field => {
        switch (field.key) {
          case 'role':
            row[field.label] = user.role === 'admin' ? 'Administrateur' : 
                              user.role === 'medecin' ? 'Médecin' : 'Patient';
            break;
          case 'status':
            row[field.label] = user.status === 'actif' ? 'Actif' : 'Inactif';
            break;
          default:
            row[field.label] = user[field.key] || '';
        }
      });
      return row;
    });

    // Création du workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    
    // Ajout de métadonnées
    const metadata = [
      ['Export des utilisateurs'],
      [`Date d'export: ${new Date().toLocaleDateString('fr-FR')}`],
      [`Portée: ${exportScope === 'all' ? 'Tous les utilisateurs' : 'Utilisateurs filtrés'}`],
      [`Nombre d'utilisateurs: ${exportData.length}`],
      [''], // Ligne vide
      ...excelData
    ];
    
    const metadataSheet = XLSX.utils.aoa_to_sheet(metadata);
    
    // Style des métadonnées
    metadataSheet['!cols'] = [
      { width: 20 },
      { width: 15 },
      { width: 25 },
      { width: 20 },
      { width: 15 },
      { width: 20 },
      { width: 15 },
      { width: 15 },
      { width: 20 },
      { width: 20 }
    ];

    XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Utilisateurs');
    
    // Sauvegarde
    XLSX.writeFile(workbook, `utilisateurs_${exportScope}_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const handleExport = () => {
    switch (exportFormat) {
      case 'csv':
        handleExportCSV();
        break;
      case 'pdf':
        handleExportPDF();
        break;
      case 'excel':
        handleExportExcel();
        break;
    }
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Download className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Exporter les utilisateurs</h2>
                <p className="text-sm text-gray-500">
                  {exportScope === 'all' ? `${users.length} utilisateurs` : `${filteredUsers.length} utilisateurs filtrés`}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Format Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Format d'export
                </CardTitle>
                <CardDescription>Choisissez le format de fichier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={exportFormat === 'csv' ? 'default' : 'outline'}
                    className={exportFormat === 'csv' ? 'bg-black hover:bg-neutral-800' : ''}
                    onClick={() => setExportFormat('csv')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                  <Button
                    variant={exportFormat === 'pdf' ? 'default' : 'outline'}
                    className={exportFormat === 'pdf' ? 'bg-black hover:bg-neutral-800' : ''}
                    onClick={() => setExportFormat('pdf')}
                  >
                    <File className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant={exportFormat === 'excel' ? 'default' : 'outline'}
                    className={exportFormat === 'excel' ? 'bg-black hover:bg-neutral-800' : ''}
                    onClick={() => setExportFormat('excel')}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scope Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Portée de l'export</CardTitle>
                <CardDescription>Choisissez quels utilisateurs exporter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={exportScope === 'all' ? 'default' : 'outline'}
                    className={exportScope === 'all' ? 'bg-black hover:bg-neutral-800' : ''}
                    onClick={() => setExportScope('all')}
                  >
                    Tous les utilisateurs ({users.length})
                  </Button>
                  <Button
                    variant={exportScope === 'filtered' ? 'default' : 'outline'}
                    className={exportScope === 'filtered' ? 'bg-black hover:bg-neutral-800' : ''}
                    onClick={() => setExportScope('filtered')}
                  >
                    Utilisateurs filtrés ({filteredUsers.length})
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fields Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Champs à inclure</CardTitle>
                <CardDescription>Sélectionnez les colonnes à exporter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedFields.map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.key} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={field.key}
                          checked={field.enabled}
                          onChange={() => toggleField(field.key)}
                          className="h-4 w-4 text-black border-gray-300 rounded focus:ring-gray-600 focus:ring-2"
                        />
                        <label
                          htmlFor={field.key}
                          className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
                        >
                          <Icon className="h-4 w-4" />
                          {field.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedFields(prev => prev.map(field => ({ ...field, enabled: true })))}
                  >
                    Tout sélectionner
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedFields(prev => prev.map(field => ({ ...field, enabled: false })))}
                  >
                    Tout désélectionner
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu</CardTitle>
                <CardDescription>
                  {enabledFields.length} colonnes sélectionnées pour {exportData.length} utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p><strong>Format:</strong> {exportFormat.toUpperCase()}</p>
                  <p><strong>Portée:</strong> {exportScope === 'all' ? 'Tous les utilisateurs' : 'Utilisateurs filtrés'}</p>
                  <p><strong>Colonnes:</strong> {enabledFields.map(field => field.label).join(', ')}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              className="bg-black hover:bg-neutral-800"
              onClick={handleExport}
              disabled={enabledFields.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter ({exportData.length} utilisateurs)
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
