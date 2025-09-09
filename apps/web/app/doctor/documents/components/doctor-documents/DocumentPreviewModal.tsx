"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { X } from "lucide-react";

interface DocumentPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url?: string;
  title?: string;
}

export function DocumentPreviewModal({ open, onOpenChange, url, title }: DocumentPreviewModalProps) {
  if (!open || !url) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title ?? 'Aperçu du document'}</h3>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <iframe src={url} title={title ?? 'Document'} className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}


