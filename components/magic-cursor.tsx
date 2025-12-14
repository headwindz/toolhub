"use client"

import { useEffect, useState } from "react"

export function MagicCursor() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      opacity: number
    }>
  >([])
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let particleId = 0
    let animationFrame: number

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })

      // Create new particle
      const newParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 4,
        opacity: 1,
      }

      setParticles((prev) => [...prev, newParticle])

      // Remove particle after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 800)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Cursor glow */}
      <div
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-xl transition-all duration-100"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />

      {/* Particle trail */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/40 animate-in fade-out zoom-out duration-800"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
