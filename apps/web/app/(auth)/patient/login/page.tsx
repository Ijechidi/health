"use client"
import React from 'react'
import { PatientSignInForm } from '@/components/auth/PatientSignInForm'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function PatientLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-primary rounded-lg">
            <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-gray-900 font-semibold text-lg sm:text-xl">Espace Patient</span>
        </div>
        <Link 
          href="/patient/signup" 
          className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
        >
          Pas de compte ?
        </Link>
      </div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-xl">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full mb-3 sm:mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Connexion Patient
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Accédez à votre espace santé
              </p>
            </div>

            <PatientSignInForm />
          </div>
        </div>
      </div>
    </div>
  )
}
