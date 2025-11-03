"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedSection, FadeIn } from "@/components/animated-section"

const faqCategories = [
  { id: "booking", name: "Booking & Reservations", count: 8 },
  { id: "pricing", name: "Pricing & Payment", count: 6 },
  { id: "insurance", name: "Insurance & Safety", count: 5 },
  { id: "vehicles", name: "Vehicles & Features", count: 7 },
  { id: "policies", name: "Policies & Terms", count: 6 },
]

const faqs = [
  {
    category: "booking",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-3 weeks in advance, especially for peak seasons (wedding season, holidays, summer months). However, we do accept last-minute bookings subject to availability. For special events like weddings, we suggest booking 2-3 months ahead to ensure your preferred vehicle is available.",
  },
  {
    category: "booking",
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, you can modify or cancel your reservation. Modifications are free up to 48 hours before pickup. Cancellations made 7+ days before pickup receive a full refund. Cancellations 3-7 days before receive 50% refund. Cancellations within 48 hours are non-refundable. Please contact our concierge team for assistance.",
  },
  {
    category: "booking",
    question: "Do you offer delivery and pickup services?",
    answer:
      "Yes! We offer complimentary delivery and pickup within Abbottabad city limits. For locations outside the city, we charge a nominal fee based on distance. We can deliver to your home, hotel, airport, or any location of your choice. Our team will coordinate the exact timing with you.",
  },
  {
    category: "pricing",
    question: "What is included in the rental price?",
    answer:
      "Our rental prices include comprehensive insurance, 24/7 roadside assistance, regular maintenance, and basic cleaning. Fuel is not included - vehicles are provided with a full tank and should be returned with a full tank. Chauffeur services are available at an additional cost for select vehicles.",
  },
  {
    category: "pricing",
    question: "Are there any additional fees?",
    answer:
      "Additional fees may apply for: delivery outside city limits, chauffeur services, additional drivers, extended mileage (over 200km/day), late returns (charged hourly), and any traffic violations or damages. All fees are clearly outlined in your rental agreement before booking.",
  },
  {
    category: "pricing",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, bank transfers, all major credit/debit cards (Visa, Mastercard, American Express), and mobile payment apps (JazzCash, Easypaisa). A security deposit is required at pickup, which is refunded upon safe return of the vehicle. Corporate accounts with invoicing are also available.",
  },
  {
    category: "insurance",
    question: "What insurance coverage is provided?",
    answer:
      "All vehicles come with comprehensive insurance covering collision damage, theft, and third-party liability. The insurance includes a deductible amount that varies by vehicle class. Additional coverage options with reduced or zero deductible are available for purchase. Full details are provided in your rental agreement.",
  },
  {
    category: "insurance",
    question: "What happens if the vehicle is damaged?",
    answer:
      "In case of damage, immediately contact our 24/7 support line. Do not leave the scene. Our insurance covers most damages, but you'll be responsible for the deductible amount. If damage occurs due to negligence or violation of rental terms, additional charges may apply. Always file a police report for accidents.",
  },
  {
    category: "insurance",
    question: "Are there age restrictions for drivers?",
    answer:
      "Primary drivers must be at least 25 years old with a valid driver's license held for minimum 3 years. For ultra-luxury vehicles (Rolls-Royce, Bentley), the minimum age is 30 years with 5 years driving experience. International visitors must have an International Driving Permit along with their home country license.",
  },
  {
    category: "vehicles",
    question: "How often are vehicles serviced and maintained?",
    answer:
      "All vehicles undergo rigorous maintenance following manufacturer specifications. Each vehicle is professionally detailed and mechanically inspected before every rental. We maintain service records for complete transparency. Our fleet is regularly updated to ensure you always drive the latest models in pristine condition.",
  },
  {
    category: "vehicles",
    question: "Can I request specific vehicle features or colors?",
    answer:
      "Yes! When booking, you can specify preferences for color, interior options, and special features. While we'll do our best to accommodate, specific requests are subject to availability. For guaranteed specific vehicles, we recommend booking well in advance and confirming your requirements with our concierge team.",
  },
  {
    category: "vehicles",
    question: "Do you provide chauffeur services?",
    answer:
      "Yes, professional chauffeur services are available for all vehicles. Our chauffeurs are experienced, licensed, professionally trained, and familiar with all major routes in Pakistan. Chauffeur rates vary by vehicle and duration. This is especially popular for weddings, corporate events, and airport transfers.",
  },
  {
    category: "policies",
    question: "What is your fuel policy?",
    answer:
      "We operate on a 'Full-to-Full' fuel policy. Vehicles are provided with a full tank and must be returned with a full tank. If returned with less fuel, you'll be charged for the missing fuel plus a refueling service fee. We recommend refueling at a nearby station before return.",
  },
  {
    category: "policies",
    question: "Can I take the vehicle outside of Pakistan?",
    answer:
      "No, our vehicles are not permitted to leave Pakistan. They can be driven anywhere within Pakistan, but cross-border travel is strictly prohibited due to insurance and legal restrictions. Violation of this policy will result in immediate termination of rental and forfeiture of security deposit.",
  },
  {
    category: "policies",
    question: "What documents do I need to rent a vehicle?",
    answer:
      "Required documents: Valid CNIC (for Pakistani residents) or passport (for international visitors), valid driver's license (held for minimum 3 years), proof of address, and a credit card for security deposit. International visitors also need an International Driving Permit. All documents must be original.",
  },
]

export default function FAQsPage() {
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
          <div className="max-w-4xl mx-auto space-y-16">
            {faqCategories.map((category, catIndex) => (
              <AnimatedSection key={category.id} delay={catIndex * 0.1}>
                <div id={category.id} className="scroll-mt-32">
                  <h2 className="text-3xl font-serif font-bold mb-6">{category.name}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs
                      .filter((faq) => faq.category === category.id)
                      .map((faq, index) => (
                        <motion.div
                          key={index}
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
            ))}
          </div>
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
