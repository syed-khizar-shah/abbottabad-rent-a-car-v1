"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Navigation, Loader2 } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { contactApi } from "@/lib/api"

const iconMap: Record<string, any> = {
  Phone,
  Mail,
  MapPin,
  Clock,
}

export default function ContactPage() {
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const data = await contactApi.get()
      setContent(data)
    } catch (err) {
      console.error("Error loading contact content:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Contact content not found. Please run the seed script.</p>
      </div>
    )
  }

  // Format WhatsApp number for URL (remove spaces and special chars)
  const whatsappNumber = content.whatsappNumber?.replace(/[^\d]/g, '') || '923001234567'
  const phoneNumber = content.phoneNumber?.replace(/[^\d+]/g, '') || '+923001234567'
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={content.heroImage || "/luxury-car-rental-customer-service-concierge-desk.jpg"}
            alt="Contact our concierge team"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="text-sm md:text-base px-4 py-2 bg-white/10 backdrop-blur-md border-white/20 text-white shadow-lg">
                Get in Touch
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-balance leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {content.heroTitle}
              {content.heroTitleAccent && (
                <span className="block mt-2 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
                  {content.heroTitleAccent}
                </span>
              )}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {content.heroSubtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-16 border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {content.contactMethods?.map((method: any, index: number) => {
              const IconComponent = iconMap[method.icon] || Phone
              return (
                <Card
                  key={method.title || index}
                  className="p-4 md:p-6 text-center space-y-3 md:space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/10">
                    <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2">{method.title}</h3>
                    {method.details?.map((detail: string, i: number) => (
                      <p key={i} className="text-xs md:text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                    <p className="text-xs text-muted-foreground mt-2">{method.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">{content.formTitle || "Send Us a Message"}</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {content.formSubtitle || "Fill out the form below and our team will get back to you within 2 hours during business hours"}
                </p>
              </div>

              <form className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm md:text-base">
                      First Name *
                    </Label>
                    <Input id="firstName" placeholder="John" required className="h-10 md:h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm md:text-base">
                      Last Name *
                    </Label>
                    <Input id="lastName" placeholder="Doe" required className="h-10 md:h-11" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm md:text-base">
                    Email Address *
                  </Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="h-10 md:h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm md:text-base">
                    Phone Number *
                  </Label>
                  <Input id="phone" type="tel" placeholder="+92 300 1234567" required className="h-10 md:h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm md:text-base">
                    Service Interested In *
                  </Label>
                  <select
                    id="service"
                    className="flex h-10 md:h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                    required
                  >
                    <option value="">Select a service</option>
                    {content.services?.map((service: string) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm md:text-base">
                    Preferred Rental Date
                  </Label>
                  <Input id="date" type="date" className="h-10 md:h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm md:text-base">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    required
                    className="resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full group">
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service
                </p>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-right duration-700">
              <div className="space-y-4">
                {/* Map */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                    <iframe
                      src={content.mapEmbedUrl || `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.8!2d73.2390944!3d34.2031195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de31e0862c305b%3A0x37c9fb9a927a10e8!2sAbbottabad%20luxury%20Ride%20Tours%20%26%20rent%20a%20car%20quick%20classy%20service!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                      title="Abbottabad Rent a Car Location"
                    />
                  </div>

                  {/* Get Directions Button */}
                  <div className="mt-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${content.mapCoordinates?.lat || 34.2031195},${content.mapCoordinates?.lng || 73.2390944}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="mr-2 h-5 w-5" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="p-4 md:p-6 space-y-4 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg md:text-xl font-bold">Why Choose Us?</h3>
                <ul className="space-y-3 text-xs md:text-sm text-muted-foreground">
                  {content.whyChooseUs?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-4 md:p-6 bg-accent text-accent-foreground shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <MessageCircle className="h-8 w-8 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold mb-2">Prefer to Chat?</h3>
                    <p className="mb-4 opacity-90 text-sm md:text-base">
                      Connect with us instantly on WhatsApp for quick responses
                    </p>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
                      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                        Open WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-muted/30 via-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-in fade-in zoom-in">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Looking for Quick Answers?</h2>
            <p className="text-sm md:text-base text-muted-foreground text-pretty">
              Check out our comprehensive FAQ section for instant answers to common questions
            </p>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
              asChild
            >
              <a href="/faqs">View FAQs</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
