"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
// Suppression des toasts pour éviter la dépendance à sonner côté web

type RegisterFormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const errors = useMemo(() => {
    const next: Partial<Record<keyof RegisterFormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Le nom est requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Email invalide";
    if (form.password.length < 6) next.password = "6 caractères minimum";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Les mots de passe ne correspondent pas";
    return next;
  }, [form]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onChange = (field: keyof RegisterFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const resp = await fetch(`${apiBase}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, nom: form.fullName }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(text || `Erreur HTTP ${resp.status}`);
      }

      setSubmitMessage("Compte créé avec succès");
      setForm({ fullName: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setSubmitError("Une erreur est survenue. Réessayez.");
      setSubmitMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-design-bg flex items-center justify-center">
      <section className="w-full max-w-xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-6">Créer un compte</h1>
        <form onSubmit={handleSubmit} className="bg-background border rounded-md p-5 space-y-4">
          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
          {submitMessage && <p className="text-green-500 text-sm">{submitMessage}</p>}
          <div>
            <label className="block text-sm mb-1 text-foreground">Nom complet</label>
            <Input value={form.fullName} onChange={onChange("fullName")} placeholder="Ex: Jean Dupont" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

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

          <div>
            <label className="block text-sm mb-1 text-foreground">Confirmer le mot de passe</label>
            <Input type="password" value={form.confirmPassword} onChange={onChange("confirmPassword")} placeholder="••••••" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
            {isSubmitting ? "Création..." : "S'inscrire"}
          </Button>
        </form>
        <p className="text-sm text-foreground/60 mt-4">Déjà un compte ?
          <a href="/patient/auth/login" className="text-primary ml-1 underline">Se connecter</a>
        </p>
      </section>
    </main>
  );
}


