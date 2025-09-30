"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      richColors
      position="top-right"
      expand={true}
      closeButton={true}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'white',
          border: '1px solid #e5e7eb',
          color: '#374151',
        },
        success: {
          style: {
            background: '#f0fdf4',
            border: '1px solid #22c55e',
            color: '#166534',
          },
        },
        error: {
          style: {
            background: '#fef2f2',
            border: '1px solid #ef4444',
            color: '#dc2626',
          },
        },
        warning: {
          style: {
            background: '#fffbeb',
            border: '1px solid #f59e0b',
            color: '#92400e',
          },
        },
        info: {
          style: {
            background: '#eff6ff',
            border: '1px solid #3b82f6',
            color: '#1e40af',
          },
        },
      }}
    />
  );
}
