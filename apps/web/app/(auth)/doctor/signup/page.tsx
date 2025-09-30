"use client"
import React from 'react'
import { DoctorSignUpForm } from '@/components/auth/DoctorSignUpForm'
import { Stethoscope } from 'lucide-react'
import Link from 'next/link'

export default function DoctorSignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span className="text-gray-900 font-semibold text-xl">Espace Médecin</span>
        </div>
        <Link 
          href="/doctor/login" 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Déjà un compte ?
        </Link>
      </div>

      {/* SignUp Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Inscription Médecin
              </h1>
              <p className="text-gray-600">
                Créez votre compte professionnel
              </p>
            </div>

            <DoctorSignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}
