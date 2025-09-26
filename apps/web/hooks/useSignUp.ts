// hooks/useSignUp.ts
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
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

interface UseSignUpReturn {
  formData: SignUpFormData;
  loading: boolean;
  error: string | null;
  success: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export const useSignUp = (): UseSignUpReturn => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Mutation pour l'inscription avec React Query
  const signUpMutation = useMutation<SignUpResponse, Error, SignUpMutationData>({
    mutationFn: async ({ email, password }) => {
      const result = await signupAuth(email, password);
      if (result.error) {
        throw new Error(result.error);
      }
      return { success: true };
    },
    onSuccess: () => {
      setValidationError(null);
    },
    onError: (error) => {
      setValidationError(error.message);
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
  };
};