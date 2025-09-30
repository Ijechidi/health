"use client"
import React from 'react'
import Link from 'next/link'
import { Shield, Stethoscope, Heart, ArrowRight } from 'lucide-react'

export default function LoginSelectionPage() {
  const loginOptions = [
    {
      title: 'Administrateur',
      description: 'Gérez les utilisateurs, hôpitaux et spécialités',
      icon: Shield,
      href: '/admin/login',
      color: 'violet',
      bgGradient: 'from-violet-600 to-purple-600',
      textColor: 'text-white',
      borderColor: 'border-violet-200',
      hoverColor: 'hover:from-violet-700 hover:to-purple-700'
    },
    {
      title: 'Médecin',
      description: 'Gérez vos patients et rendez-vous',
      icon: Stethoscope,
      href: '/doctor/login',
      color: 'green',
      bgGradient: 'from-green-600 to-emerald-600',
      textColor: 'text-white',
      borderColor: 'border-green-200',
      hoverColor: 'hover:from-green-700 hover:to-emerald-700'
    },
    {
      title: 'Patient',
      description: 'Prenez rendez-vous et gérez votre santé',
      icon: Heart,
      href: '/patient/login',
      color: 'green',
      bgGradient: 'from-emerald-600 to-green-600',
      textColor: 'text-white',
      borderColor: 'border-emerald-200',
      hoverColor: 'hover:from-emerald-700 hover:to-green-700'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 bg-slate-50/50"></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Système de Santé
          </h1>
          <p className="text-slate-600">
            Choisissez votre espace de connexion
          </p>
        </div>
      </div>

      {/* Login Options */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-4xl mx-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loginOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <Link
                  key={index}
                  href={option.href}
                  className="group block"
                >
                  <div className={`
                    bg-white rounded-2xl p-8 border-2 ${option.borderColor} 
                    shadow-lg hover:shadow-xl transition-all duration-300 
                    transform hover:-translate-y-1
                  `}>
                    {/* Icon */}
                    <div className={`
                      inline-flex items-center justify-center w-16 h-16 
                      bg-gradient-to-r ${option.bgGradient} ${option.hoverColor}
                      rounded-xl mb-6 transition-all duration-300
                    `}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {option.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {option.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-slate-500 group-hover:text-slate-700 transition-colors">
                      <span className="text-sm font-medium">Se connecter</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-slate-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-slate-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-200 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}