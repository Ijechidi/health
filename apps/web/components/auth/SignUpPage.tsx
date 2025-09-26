// components/auth/SignUpPage.tsx
"use client"

import { Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';

import { useSignUp } from '@/hooks/useSignUp';
import { Testimonial, GlassInputWrapper, GoogleIcon, TestimonialCard } from './authComponents.js';
import { useState } from 'react';

// Types d'erreur spécifiques
interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface SignUpPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: () => void;
  onGoogleSignIn?: () => void;
  onSuccess?: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  title = <span className="font-light text-foreground tracking-tighter">Créer un compte</span>,
  description = "Rejoignez notre plateforme médicale et commencez votre parcours de santé",
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onGoogleSignIn,
  onSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  const { formData, loading, error, success, handleChange, handleSubmit } = useSignUp();

  // Fonction de validation des champs
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'L\'email est requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Format d\'email invalide';
        return undefined;
      case 'password':
        if (!value) return 'Le mot de passe est requis';
        if (value.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
        return undefined;
      case 'confirmPassword':
        if (!value) return 'La confirmation du mot de passe est requise';
        if (value !== formData.password) return 'Les mots de passe ne correspondent pas';
        return undefined;
      default:
        return undefined;
    }
  };

  // Gestionnaire de changement avec validation
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Valider le champ et mettre à jour les erreurs
    const fieldError = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: fieldError,
      general: undefined // Effacer l'erreur générale lors de la modification
    }));
    
    handleChange(e);
  };

  if (success) {
    return (
      <div className="h-[100dvh] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="animate-element animate-delay-100 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Inscription réussie !</h2>
            <p className="text-muted-foreground">
              Un email de confirmation a été envoyé à <strong>{formData.email}</strong>. 
              Veuillez vérifier votre boîte de réception pour activer votre compte.
            </p>
          </div>
          <button 
            onClick={onSignIn}
            className="animate-element animate-delay-200 rounded-2xl bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw]">
      {/* Left column: sign-up form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={onSignIn}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
                <p className="animate-element animate-delay-200 text-muted-foreground">{description}</p>
              </div>
            </div>

            {/* Affichage des erreurs générales */}
            {(error || formErrors.general) && (
              <div className="animate-element animate-delay-150 p-4 rounded-2xl bg-red-500/10 border border-red-400/50 text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error || formErrors.general}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="animate-element animate-delay-300">
                <label className="text-sm font-medium text-muted-foreground">Email Address *</label>
                <GlassInputWrapper error={!!formErrors.email}>
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="Entrez votre adresse email" 
                    value={formData.email}
                    onChange={handleFieldChange}
                    required
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" 
                  />
                </GlassInputWrapper>
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground">Mot de passe *</label>
                <GlassInputWrapper error={!!formErrors.password}>
                  <div className="relative">
                    <input 
                      name="password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Créez un mot de passe sécurisé" 
                      value={formData.password}
                      onChange={handleFieldChange}
                      required
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
                {formErrors.password ? (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.password}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-2">Minimum 6 caractères</p>
                )}
              </div>

              <div className="animate-element animate-delay-500">
                <label className="text-sm font-medium text-muted-foreground">Confirmer le mot de passe *</label>
                <GlassInputWrapper error={!!formErrors.confirmPassword}>
                  <div className="relative">
                    <input 
                      name="confirmPassword" 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="Confirmez votre mot de passe" 
                      value={formData.confirmPassword}
                      onChange={handleFieldChange}
                      required
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
                {formErrors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Inscription en cours...' : 'Créer mon compte'}
              </button>
            </form>

            <div className="animate-element animate-delay-700 relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground bg-background absolute">Ou continuer avec</span>
            </div>

            <button 
              onClick={onGoogleSignIn} 
              disabled={loading}
              className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <GoogleIcon />
              S'inscrire avec Google
            </button>

            <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
              Déjà un compte ? {' '}
              <button 
                onClick={onSignIn}
                className="text-violet-400 hover:underline transition-colors"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${heroImageSrc})` }}></div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              {testimonials[0] && <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />}
              {testimonials[1] && <div className="hidden xl:flex"><TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" /></div>}
              {testimonials[2] && <div className="hidden 2xl:flex"><TestimonialCard testimonial={testimonials[2]} delay="animate-delay-1400" /></div>}
            </div>
          )}
        </section>
      )}
    </div>
  );
};