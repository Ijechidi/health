"use client"
import React from 'react'
import { Heart, CheckCircle, ArrowRight, Calendar, FileText, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PatientWelcomePage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/patient/dashboard')
  }

  const features = [
    {
      icon: Calendar,
      title: "Prendre rendez-vous",
      description: "Réservez facilement vos consultations médicales"
    },
    {
      icon: FileText,
      title: "Mes documents",
      description: "Consultez vos résultats et prescriptions"
    },
    {
      icon: User,
      title: "Mon profil",
      description: "Gérez vos informations personnelles et médicales"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenue !
          </h1>
          
          <p className="text-gray-600 mb-8">
            Votre compte patient a été créé avec succès. Vous pouvez maintenant gérer votre santé en toute simplicité.
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
          >
            Accéder à mon espace santé
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
