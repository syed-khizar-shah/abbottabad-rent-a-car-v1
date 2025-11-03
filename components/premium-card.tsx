"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PremiumCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  gradient?: boolean
  delay?: number
}

export function PremiumCard({
  children,
  className = "",
  hover = true,
  glass = false,
  gradient = false,
  delay = 0,
}: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
    >
      <Card
        className={`
          relative overflow-hidden
          ${glass ? "glass-card" : ""}
          ${gradient ? "gradient-primary text-white" : ""}
          ${hover ? "hover:shadow-premium-xl transition-all duration-500" : ""}
          ${className}
        `}
      >
        {/* Decorative corner element */}
        <div className="decorative-corner" />

        {/* Shimmer effect on hover */}
        {hover && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )}

        <div className="relative z-10">{children}</div>
      </Card>
    </motion.div>
  )
}
