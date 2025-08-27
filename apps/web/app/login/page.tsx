"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

type LoginFormState = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const errors = useMemo(() => {
    const next: Partial<Record<keyof LoginFormState, string>> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Email invalide";
    if (form.password.length < 6) next.password = "6 caractères minimum";
    return next;
  }, [form]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onChange = (field: keyof LoginFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setSubmitError("Veuillez corriger les erreurs du formulaire");
      setSubmitMessage("");
      return;
    }
    try {
      setIsSubmitting(true);
      setSubmitError("");
      setSubmitMessage("");

      // Placeholder d'authentification (à connecter à l'API JWT plus tard)
      await new Promise(res => setTimeout(res, 600));
      setSubmitMessage("Connexion réussie");
    } catch (err) {
      setSubmitError("Identifiants invalides");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-design-bg flex items-center justify-center">
      <section className="w-full max-w-xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-6">Se connecter</h1>
        <form onSubmit={handleSubmit} className="bg-background border rounded-md p-5 space-y-4">
          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
          {submitMessage && <p className="text-green-500 text-sm">{submitMessage}</p>}

          <div>
            <label className="block text-sm mb-1 text-foreground">Email</label>
            <Input type="email" value={form.email} onChange={onChange("email")} placeholder="vous@exemple.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-foreground">Mot de passe</label>
            <Input type="password" value={form.password} onChange={onChange("password")} placeholder="••••••" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
        <p className="text-sm text-foreground/60 mt-4">
          Pas de compte ?
          <a href="/patient/auth/register" className="text-primary ml-1 underline">Créer un compte</a>
        </p>
      </section>
    </main>
  );
}


