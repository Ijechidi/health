"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { Calendar, Download, Edit, Eye } from "lucide-react";
import { Document } from "@/types";

interface DocumentItemProps {
  document: Document;
  onEdit?: (doc: Document) => void;
}

export const DocumentItem = ({ document, onEdit }: DocumentItemProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
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
        return "";
      case "Rapport":
        return "";
      case "Certificat":
        return "";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
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
          <Button variant="ghost" size="sm" onClick={() => setPreviewOpen(true)} title="Voir">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => {
            const url = (document as any).url;
            if (url) {
              const a = document.createElement('a');
              a.href = url;
              a.download = '';
              a.target = '_blank';
              a.rel = 'noopener';
              a.click();
            }
          }} title="Télécharger">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit?.(document)} title="Modifier">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <DocumentPreviewModal open={previewOpen} onOpenChange={setPreviewOpen} url={(document as any).url} title={document.title} />
    </div>
  );
};