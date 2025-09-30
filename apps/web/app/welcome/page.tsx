"use client"
import React from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()

  const handleContinue = () => {
    // Rediriger vers la page principale du rôle
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-gray-200 shadow-xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Bienvenue !
        </h1>
        
        <p className="text-gray-600 mb-8">
          Votre compte a été créé avec succès. Vous pouvez maintenant accéder à votre espace personnel.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
          >
            Continuer
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-sm text-gray-500">
            Vous serez redirigé automatiquement vers votre tableau de bord
          </p>
        </div>
      </div>
    </div>
  )
}
