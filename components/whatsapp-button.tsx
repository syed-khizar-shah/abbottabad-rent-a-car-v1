"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
      asChild
    >
      <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle className="h-6 w-6" />
      </a>
    </Button>
  )
}
