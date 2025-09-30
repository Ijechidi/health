"use client"
import React, { useEffect, useState } from 'react'
import { Stethoscope, CheckCircle, ArrowRight, Calendar, Users, FileText, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DoctorWelcomePage() {
  const router = useRouter()
  const [doctorStatus, setDoctorStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkDoctorStatus()
  }, [])

  const checkDoctorStatus = async () => {
    try {
      const response = await fetch('/api/doctor/status')
      const result = await response.json()
      
      if (result.success) {
        setDoctorStatus(result.data.statutApproval.toLowerCase())
      } else {
        setDoctorStatus('none')
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error)
      setDoctorStatus('none')
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (doctorStatus === 'none') {
      router.push('/doctor/setup')
    } else if (doctorStatus === 'approved') {
      router.push('/doctor')
    } else {
      router.push('/doctor/pending')
    }
  }

  const features = [
    {
      icon: Calendar,
      title: "Gestion des rendez-vous",
      description: "Consultez et gérez votre planning médical"
    },
    {
      icon: Users,
      title: "Patients",
      description: "Accédez aux dossiers de vos patients"
    },
    {
      icon: FileText,
      title: "Prescriptions",
      description: "Créez et gérez les ordonnances médicales"
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de votre statut...</p>
        </div>
      </div>
    )
  }

  const getWelcomeContent = () => {
    switch (doctorStatus) {
      case 'none':
        return {
          title: "Configuration requise",
          description: "Complétez votre profil médecin pour accéder à votre espace professionnel.",
          buttonText: "Commencer la configuration",
          icon: Stethoscope,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-100"
        }
      case 'pending':
        return {
          title: "Demande en attente",
          description: "Votre demande d'approbation est en cours de traitement par l'administration.",
          buttonText: "Voir le statut",
          icon: Clock,
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-100"
        }
      case 'approved':
        return {
          title: "Bienvenue, Docteur !",
          description: "Votre compte médecin a été approuvé. Accédez à votre espace professionnel.",
          buttonText: "Accéder au dashboard",
          icon: CheckCircle,
          iconColor: "text-green-600",
          bgColor: "bg-green-100"
        }
      case 'rejected':
        return {
          title: "Demande rejetée",
          description: "Votre demande a été rejetée. Vous pouvez modifier et resoumettre votre profil.",
          buttonText: "Modifier ma demande",
          icon: Stethoscope,
          iconColor: "text-red-600",
          bgColor: "bg-red-100"
        }
      default:
        return {
          title: "Bienvenue, Docteur !",
          description: "Votre compte médecin a été créé avec succès.",
          buttonText: "Continuer",
          icon: Stethoscope,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-100"
        }
    }
  }

  const content = getWelcomeContent()
  const Icon = content.icon

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 ${content.bgColor} rounded-full mb-6`}>
            <Icon className={`w-10 h-10 ${content.iconColor}`} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {content.title}
          </h1>
          
          <p className="text-gray-600 mb-8">
            {content.description}
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
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
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
          >
            {content.buttonText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
