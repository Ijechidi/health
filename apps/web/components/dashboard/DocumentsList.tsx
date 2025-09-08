import React from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { FileText, Download, Eye, Calendar, File } from "lucide-react";

interface DocumentItem {
  id: string;
  titre: string;
  description?: string | null;
  dateCreation: string;
  url: string;
}

interface DocumentsListProps {
  documents: DocumentItem[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Hier";
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const getDocumentIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('analyse') || lowerTitle.includes('sang')) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (lowerTitle.includes('ordonnance')) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else if (lowerTitle.includes('radio') || lowerTitle.includes('scanner')) {
      return <FileText className="h-5 w-5 text-green-500" />;
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <File className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Documents récents</h2>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Voir tous
        </Button>
      </div>

      <div className="space-y-3">
        {documents.length > 0 ? (
          documents.map((document) => (
            <div
              key={document.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <div className="flex-shrink-0">
                {getDocumentIcon(document.titre)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {document.titre}
                </h3>
                {document.description && (
                  <p className="text-sm text-muted-foreground truncate">
                    {document.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(document.dateCreation)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Aucun document disponible</p>
            <p className="text-sm">Vos documents médicaux apparaîtront ici</p>
          </div>
        )}
      </div>

      
    </Card>
  );
}
