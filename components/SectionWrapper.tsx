// components/SectionWrapper.tsx
//
// Drop-in wrapper that applies the shared dark background system
// (radial glow + grid overlay) to every section — matching the Hero.
//
// Usage:
//   <SectionWrapper id="about">
//     ...your section content...
//   </SectionWrapper>
//
// Optional props:
//   glowPosition  — where the radial glow originates (default: "center")
//   className     — extra classes on the outer <section> (e.g. "py-28")

import { ReactNode } from "react"

type GlowPosition = "top" | "center" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"

const glowMap: Record<GlowPosition, string> = {
  "top":          "bg-[radial-gradient(ellipse_at_top,#0ea5e922,transparent_60%)]",
  "center":       "bg-[radial-gradient(ellipse_at_center,#0ea5e918,transparent_65%)]",
  "bottom":       "bg-[radial-gradient(ellipse_at_bottom,#0ea5e922,transparent_60%)]",
  "top-left":     "bg-[radial-gradient(ellipse_at_top_left,#0ea5e920,transparent_60%)]",
  "top-right":    "bg-[radial-gradient(ellipse_at_top_right,#0ea5e920,transparent_60%)]",
  "bottom-left":  "bg-[radial-gradient(ellipse_at_bottom_left,#0ea5e920,transparent_60%)]",
  "bottom-right": "bg-[radial-gradient(ellipse_at_bottom_right,#0ea5e920,transparent_60%)]",
}

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  glowPosition?: GlowPosition
  className?: string
}

export default function SectionWrapper({
  children,
  id,
  glowPosition = "center",
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative bg-slate-950 text-white scroll-mt-16 ${className}`}
    >
      {/* Radial cyan glow */}
      <div className={`pointer-events-none absolute inset-0 ${glowMap[glowPosition]}`} />

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Section content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
