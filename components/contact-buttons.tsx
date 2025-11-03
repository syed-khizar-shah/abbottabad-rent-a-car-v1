"use client"

import { Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function ContactButtons() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex flex-col gap-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
    >
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="group relative"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium whitespace-nowrap hidden sm:inline">WhatsApp</span>
        </div>
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]/30 blur-xl -z-10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href="tel:+923001234567"
        aria-label="Call us"
        className="group relative"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex items-center gap-3 bg-accent hover:bg-accent/90 text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
          <Phone className="h-5 w-5" />
          <span className="text-sm font-medium whitespace-nowrap hidden sm:inline">Call Now</span>
        </div>
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/30 blur-xl -z-10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.a>
    </motion.div>
  )
}
