
import { Marquee } from "@repo/ui/components/Marquee"
import SpecialityCard, { Speciality } from "./SpecialityCard"


interface SpecialityMarqueeProps {
  specialities: Speciality[]
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
}

export function SpecialityMarquee({ 
  specialities, 
  pauseOnHover = true,
  direction = "left",
  speed = 40
}: SpecialityMarqueeProps) {
  return (
    <Marquee 
      pauseOnHover={pauseOnHover} 
      direction={direction} 
      speed={speed}
    >
      {specialities?.map((specialite) => (
        <div key={specialite.id} className="flex-shrink-0">
          <SpecialityCard {...specialite} />
        </div>
      ))}
    </Marquee>
  )
}