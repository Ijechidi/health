import * as React from "react"
import { cn } from "@repo/ui/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div 
      className={cn(
        "w-full overflow-hidden py-4",
        className
      )} 
      {...props}
    >
      <div className="relative flex w-full">
        <div 
          className={cn(
            "flex animate-marquee gap-4 pr-4",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={{ 
            "--duration": `${speed}s`,
            animation: `marquee var(--duration) linear infinite`
          } as React.CSSProperties}
        >
          {children}
        </div>
        <div 
          className={cn(
            "flex animate-marquee gap-4 pr-4",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={{ 
            "--duration": `${speed}s`,
            animation: `marquee var(--duration) linear infinite`
          } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  )
}