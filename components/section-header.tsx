"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  icon?: LucideIcon
  centered?: boolean
  className?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  icon: Icon,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`space-y-4 ${centered ? "text-center" : ""} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Badge variant="outline" className="text-sm font-medium">
            {Icon && <Icon className="h-3.5 w-3.5 mr-1.5" />}
            {badge}
          </Badge>
        </motion.div>
      )}

      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
        <motion.div
          className="absolute -bottom-2 left-0 h-1 bg-gradient-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "60px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </motion.h2>

      {description && (
        <motion.p
          className={`text-lg md:text-xl text-muted-foreground leading-relaxed ${
            centered ? "max-w-3xl mx-auto" : "max-w-3xl"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
