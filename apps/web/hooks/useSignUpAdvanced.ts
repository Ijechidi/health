// hooks/useSignUpAdvanced.ts - Version avancée avec plus de fonctionnalités React Query
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signupAuth } from '@/services/auth/signup';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpMutationData {
  email: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  error?: string;
}

interface UseSignUpAdvancedReturn {
  formData: SignUpFormData;
  loading: boolean;
  error: string | null;
  success: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  // Nouvelles fonctionnalités React Query
  isIdle: boolean;
  isError: boolean;
  isSuccess: boolean;
  isPending: boolean;
  errorMessage: string | null;
  resetMutation: () => void;
}

export const useSignUpAdvanced = (): UseSignUpAdvancedReturn => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Mutation avancée avec plus d'options
  const signUpMutation = useMutation<SignUpResponse, Error, SignUpMutationData>({
    mutationFn: async ({ email, password }) => {
      const result = await signupAuth(email, password);
      if (result.error) {
        throw new Error(result.error);
      }
      return { success: true };
    },
    onSuccess: (data, variables) => {
      setValidationError(null);
      
      // Invalider les queries liées à l'authentification
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      
      // Optionnel: Pré-charger des données utilisateur
      queryClient.setQueryData(['user', variables.email], {
        email: variables.email,
        isAuthenticated: true,
      });
      
      console.log('Inscription réussie:', data);
    },
    onError: (error, variables) => {
      setValidationError(error.message);
      console.error('Erreur d\'inscription:', error, 'Variables:', variables);
    },
    onSettled: () => {
      // Exécuté dans tous les cas (succès ou erreur)
      console.log('Mutation terminée');
    },
    // Options de retry personnalisées
    retry: (failureCount, error) => {
      // Ne pas retry pour les erreurs de validation
      if (error.message.includes('invalide') || error.message.includes('existe')) {
        return false;
      }
      return failureCount < 2;
    },
    // Timeout personnalisé
    meta: {
      errorMessage: 'Erreur lors de l\'inscription',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationError) setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setValidationError('L\'email et le mot de passe sont obligatoires');
      return false;
    }

    if (formData.password.length < 6) {
      setValidationError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Les mots de passe ne correspondent pas');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError('Adresse email invalide');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!validateForm()) return;

    // Utiliser la mutation React Query
    signUpMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });
    setValidationError(null);
    signUpMutation.reset();
  };

  return {
    formData,
    loading: signUpMutation.isPending,
    error: validationError || signUpMutation.error?.message || null,
    success: signUpMutation.isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    // Nouvelles fonctionnalités exposées
    isIdle: signUpMutation.isIdle,
    isError: signUpMutation.isError,
    isSuccess: signUpMutation.isSuccess,
    isPending: signUpMutation.isPending,
    errorMessage: signUpMutation.error?.message || null,
    resetMutation: signUpMutation.reset,
  };
};
