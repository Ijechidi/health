import { toast } from "sonner";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export function handleApiError(error: unknown): void {
  console.error('API Error:', error);
  
  let errorMessage = 'Une erreur inattendue est survenue';
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    errorMessage = (error as ApiError).message;
  }
  
  toast.error(errorMessage);
}

export function handleApiSuccess(message: string): void {
  toast.success(message);
}

export function handleApiInfo(message: string): void {
  toast.info(message);
}

export function handleApiWarning(message: string): void {
  toast.warning(message);
}
