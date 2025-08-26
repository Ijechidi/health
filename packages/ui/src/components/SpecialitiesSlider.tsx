'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'

export interface Speciality {
  id?: string
  name?: string
  description?: string
  image?: string
  url?: string
}

interface SpecialitiesSliderProps {
  specialities: Speciality[]
}

export const SpecialitiesSlider: React.FC<SpecialitiesSliderProps> = ({ specialities }) => {
  return (
    <Swiper
      slidesPerView={1}
      loop
      autoplay={{ delay: 4000 }}
      modules={[Autoplay, EffectCoverflow]}
      className="w-full max-w-lg mx-auto"
    >
      {specialities.map((spec) => (
        <SwiperSlide key={spec.id || spec.name} className="px-2">
          <div className="bg-background rounded-xl h-44 border p-6 flex flex-col items-center justify-center">
            {spec.image && (
              <img
                src={spec.image}
                alt={spec.name}
                className="mb-4 h-12 w-12 object-contain dark:invert dark:brightness-0"
              />
            )}
            <h3 className="text-lg font-semibold text-center">{spec.name}</h3>
            {spec.description && (
              <p className="mt-2 text-center text-sm text-muted-foreground">{spec.description}</p>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
