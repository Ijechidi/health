// hooks/useSignUp.ts
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signupAuth } from '@/services/auth/signup';

interface SignUpFormData {
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  speciality?: string;
  dateNaissance?: string;
  sexe?: string;
}

interface SignUpMutationData {
  email: string;
  password: string;
  nom?: string;
  prenom?: string;
  role?: string;
}

interface SignUpResponse {
  success: boolean;
  error?: string;
}

interface UseSignUpReturn {
  formData: SignUpFormData;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  getLoginPath: () => string;
}

export const useSignUp = (role?: 'ADMIN' | 'MEDECIN' | 'PATIENT'): UseSignUpReturn => {
  const [formData, setFormData] = useState<SignUpFormData>({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    speciality: '',
    dateNaissance: '',
    sexe: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Mutation pour l'inscription avec React Query
  const signUpMutation = useMutation<SignUpResponse, Error, SignUpMutationData>({
    mutationFn: async ({ email, password, nom, prenom, role: userRole }) => {
      const result = await signupAuth(email, password, nom, prenom, userRole);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationError) setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password) {
      setValidationError('Tous les champs obligatoires doivent être remplis');
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
      nom: formData.nom,
      prenom: formData.prenom,
      role: role,
    });
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      speciality: '',
      dateNaissance: '',
      sexe: '',
    });
    setValidationError(null);
    signUpMutation.reset();
  };

  const getLoginPath = () => {
    switch (role) {
      case 'ADMIN':
        return '/admin/login';
      case 'MEDECIN':
        return '/doctor/login';
      case 'PATIENT':
        return '/patient/login';
      default:
        return '/login';
    }
  };

  return {
    formData,
    isLoading: signUpMutation.isPending,
    error: validationError || signUpMutation.error?.message || null,
    success: signUpMutation.isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    getLoginPath,
  };
};