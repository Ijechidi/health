// hooks/useLogin.ts
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, LoginCredentials, LoginResponse } from '@/services/login';

interface UseLoginReturn {
  credentials: LoginCredentials;
  isLoading: boolean;
  error: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const loginMutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.error) {
        setValidationError(data.error);
        return;
      }
      
      if (data.redirectPath) {
        router.push(data.redirectPath);
        router.refresh();
      }
    },
    onError: (error) => {
      setValidationError(error.message || 'Une erreur est survenue');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
    if (validationError) setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!credentials.email || !credentials.password) {
      setValidationError('Email et mot de passe requis');
      return;
    }

    loginMutation.mutate(credentials);
  };

  return {
    credentials,
    isLoading: loginMutation.isPending,
    error: validationError || loginMutation.error?.message || null,
    handleChange,
    handleSubmit,
  };
};