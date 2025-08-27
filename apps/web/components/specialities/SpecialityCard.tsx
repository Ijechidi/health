import { Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export interface Speciality {
  id?: string
  name?: string
  description?: string
  image?: string
  url?: string
}   

export default function SpecialityCard({
  id,
  name,
  description,
  image,
  url
}: Speciality) {
  return (
<div className="border border-dashed cursor-pointer transition-all dark:bg-black/50 w-32 h-40 p-2 rounded-md shadow-sm flex flex-col">
  <div className="bg-muted h-32 flex items-center rounded justify-center mb-2">
    {image ? (
      <Image
        src={image || "default.png"}
        width={50}
        height={50}
        alt={name || ""}
        className="object-cover w-full h-full dark:invert dark:brightness-0 rounded-md"
      />
    ) : (
      <Heart className="w-10 h-10 text-gray-500" />
    )}
  </div>

  <div className="flex flex-col items-center flex-1 py-1">
    <h3 className="font-semibold text-xs  truncate">{name}</h3>
    {/* <p className="text-sm text-gray-600 flex-1 overflow-hidden line-clamp-2">
      {description}
    </p> */}
  </div>
</div>

  )
}
