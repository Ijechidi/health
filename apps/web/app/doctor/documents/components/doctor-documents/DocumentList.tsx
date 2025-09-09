"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { FileText } from "lucide-react";
import { Document } from "@/types";
import { DocumentItem } from "./DocumentItem";

interface DocumentListProps {
  documents: Document[];
  filteredDocuments: Document[];
  onClearAllFilters: () => void;
  onEdit?: (doc: Document) => void;
}

export const DocumentList = ({ documents, filteredDocuments, onClearAllFilters, onEdit }: DocumentListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des documents</CardTitle>
        <CardDescription>
          {filteredDocuments.length === documents.length 
            ? "Gérez vos ordonnances, rapports et certificats médicaux"
            : `${filteredDocuments.length} document(s) trouvé(s) sur ${documents.length}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              Aucun document trouvé
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
            <Button variant="outline" onClick={onClearAllFilters}>
              Effacer tous les filtres
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {filteredDocuments.map((document) => (
              <DocumentItem key={document.id} document={document} onEdit={onEdit} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};