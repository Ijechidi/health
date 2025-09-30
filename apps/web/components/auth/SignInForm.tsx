// components/auth/SignInForm.tsx
"use client"
import { SignInPage } from './SignInPage';
import { useLogin } from '@/hooks/useLogin';

export const SignInForm = () => {
  const {
    credentials,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <SignInPage
        onSignIn={handleSubmit}
        isLoading={isLoading}
        onEmailChange={handleChange}
        onPasswordChange={handleChange}
        emailValue={credentials.email}
        passwordValue={credentials.password}
        heroImageSrc="/images/auth-hero.jpg"
      />
      
      {error && (
        <div className="fixed top-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}
    </>
  );
};