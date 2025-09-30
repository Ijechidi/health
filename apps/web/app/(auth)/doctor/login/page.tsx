"use client"
import React from 'react'
import { DoctorSignInForm } from '@/components/auth/DoctorSignInForm'
import { Stethoscope } from 'lucide-react'
import Link from 'next/link'

export default function DoctorLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
            <Stethoscope className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-gray-900 font-semibold text-lg sm:text-xl">Espace Médecin</span>
        </div>
        <Link 
          href="/doctor/signup" 
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
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
                <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Connexion Médecin
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Accédez à votre espace professionnel
              </p>
            </div>

            <DoctorSignInForm />
          </div>
        </div>
      </div>
    </div>
  )
}
