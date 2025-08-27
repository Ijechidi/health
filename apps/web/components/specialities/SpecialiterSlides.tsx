import { SpecialitiesSlider } from '@repo/ui/components/SpecialitiesSlider'
import React from 'react'
import { specialities } from './mock'

export default function SpecialiterSlides() {
  return (
    <div>
          <SpecialitiesSlider specialities={specialities} />
    </div>
  )
}
