"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, Phone, Mail, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedSection, FadeIn } from "@/components/animated-section"
import { faqsApi } from "@/lib/api"

export default function FAQsPage() {
  const [loading, setLoading] = useState(true)
  const [faqs, setFaqs] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const data = await faqsApi.getAll()
      setFaqs(data.faqs || [])
      setCategories(data.categories || [])
    } catch (err) {
      console.error("Error loading FAQs:", err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/customer-service-help-desk-professional-support-te.jpg"
            alt="FAQs Help Center"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/40 to-accent/20 z-[1]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="outline" className="text-sm bg-background/20 backdrop-blur-sm">
                Help Center
              </Badge>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Find answers to common questions about our luxury car rental services
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="text-center text-muted-foreground mb-6">Can't find what you're looking for?</p>
            </FadeIn>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: MessageCircle, text: "Live Chat", href: "/contact" },
                { icon: Phone, text: "Call Us", href: "tel:+92-300-1234567" },
                { icon: Mail, text: "Email Support", href: "mailto:info@abbottabadrentacar.com" },
              ].map((item, index) => (
                <FadeIn key={item.text} delay={index * 0.1}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" asChild>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.text}
                      </Link>
                    </Button>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {faqCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Button variant="outline" className="whitespace-nowrap bg-transparent" asChild>
                  <a href={`#${category.id}`}>
                    {category.name}
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-16">
              {categories.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No FAQs found.</p>
                </Card>
              ) : (
                categories.map((category, catIndex) => {
                  const categoryFaqs = faqs.filter((faq) => faq.category === category.id)
                  if (categoryFaqs.length === 0) return null
                  
                  return (
                    <AnimatedSection key={category.id} delay={catIndex * 0.1}>
                      <div id={category.id} className="scroll-mt-32">
                        <h2 className="text-3xl font-serif font-bold mb-6">{category.name}</h2>
                        <Accordion type="single" collapsible className="space-y-4">
                          {categoryFaqs.map((faq, index) => (
                            <motion.div
                              key={faq._id || index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <AccordionItem value={`${category.id}-${index}`} className="border rounded-lg px-6">
                                <AccordionTrigger className="text-left hover:no-underline py-6">
                                  <span className="font-semibold">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
                              </AccordionItem>
                            </motion.div>
                          ))}
                        </Accordion>
                      </div>
                    </AnimatedSection>
                  )
                })
              )}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl font-serif font-bold">Still Have Questions?</h2>
              <p className="text-xl opacity-90">
                Our concierge team is available 24/7 to assist you with any inquiries
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Contact Our Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
