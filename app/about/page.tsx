"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, Users, Clock, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedSection, ScaleIn } from "@/components/animated-section"
import { useRef } from "react"

const stats = [
  { label: "Years of Excellence", value: "15+" },
  { label: "Luxury Vehicles", value: "50+" },
  { label: "Happy Clients", value: "5,000+" },
  { label: "Customer Rating", value: "4.9/5" },
]

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in vehicle quality, service delivery, and customer experience.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Your safety is paramount. All vehicles are fully insured and maintained to manufacturer specifications.",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "Our concierge team provides white-glove service tailored to your unique requirements.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance ensures you're never alone on your journey.",
  },
]

const team = [
  {
    name: "Ahmed Khan",
    role: "Founder & CEO",
    image: "/placeholder.svg?key=team1",
    bio: "15+ years in luxury automotive industry",
  },
  {
    name: "Sarah Ali",
    role: "Fleet Manager",
    image: "/placeholder.svg?key=team2",
    bio: "Expert in premium vehicle maintenance",
  },
  {
    name: "Hassan Malik",
    role: "Concierge Director",
    image: "/placeholder.svg?key=team3",
    bio: "Hospitality professional with luxury brand experience",
  },
]

const milestones = [
  {
    year: "2010",
    title: "Founded",
    description: "Started with a vision to bring world-class luxury car rentals to Abbottabad",
  },
  {
    year: "2015",
    title: "Fleet Expansion",
    description: "Expanded to include ultra-luxury brands like Rolls-Royce and Bentley",
  },
  {
    year: "2020",
    title: "5,000 Clients",
    description: "Reached milestone of serving over 5,000 satisfied customers",
  },
  {
    year: "2025",
    title: "Industry Leader",
    description: "Recognized as the premier luxury car rental service in the region",
  },
]

const certifications = [
  "ISO 9001 Certified",
  "Luxury Vehicle Specialist",
  "Comprehensive Insurance Partner",
  "24/7 Roadside Assistance",
  "Professional Chauffeur Services",
  "Corporate Account Management",
]

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/professional-luxury-car-rental-service-team.jpg"
            alt="About Abbottabad Rent A Car"
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
                Our Story
              </Badge>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Redefining Luxury Travel
            </motion.h1>
            <motion.p
              className="text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              For over 15 years, we've been the trusted choice for discerning clients seeking the finest automotive
              experiences
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 border-y border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1} direction="up">
                <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold">A Legacy of Excellence</h2>
                <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                  <p>
                    Founded in 2010, Abbottabad Rent a Car began with a simple yet ambitious vision: to bring
                    world-class luxury automotive experiences to our beautiful city and surrounding regions.
                  </p>
                  <p>
                    What started as a small collection of premium vehicles has grown into the region's most prestigious
                    luxury car rental service, featuring an exclusive fleet of the world's finest automobiles.
                  </p>
                  <p>
                    Today, we're proud to serve thousands of satisfied clients annually, from business executives and
                    wedding parties to tourists seeking an unforgettable journey through Pakistan's stunning landscapes.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="group" asChild>
                    <Link href="/fleet">
                      Explore Our Fleet
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }} className="w-full h-full">
                  <Image
                    src="/luxury-car-showroom-elegant-interior.jpg"
                    alt="Luxury showroom"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">Our Core Values</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              The principles that guide everything we do
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <ScaleIn key={value.title} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  <Card className="p-6 text-center space-y-4 hover:shadow-xl transition-all duration-300 h-full">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/10"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="h-7 w-7 md:h-8 md:w-8 text-accent" />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">Our Journey</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Key milestones in our story of growth and excellence
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 md:space-y-8">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 0.15} direction="left">
                  <div className="flex gap-4 md:gap-6 items-start group">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs md:text-sm shrink-0 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {milestone.year}
                      </motion.div>
                      {index < milestones.length - 1 && <div className="w-0.5 h-full bg-border mt-4 min-h-[60px]" />}
                    </div>
                    <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }}>
                      <Card className="flex-1 p-4 md:p-6 group-hover:shadow-xl group-hover:border-accent/50 transition-all duration-300">
                        <h3 className="text-lg md:text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </Card>
                    </motion.div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted/50 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Dedicated professionals committed to your exceptional experience
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <ScaleIn key={member.name} delay={index * 0.15}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden text-center group hover:shadow-2xl transition-all duration-500 h-full">
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }} className="w-full h-full">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
                      <p className="text-accent font-medium text-sm md:text-base">{member.role}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">Certifications & Standards</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Committed to the highest industry standards
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <AnimatedSection key={cert} delay={index * 0.05} direction="up">
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 hover:border-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                  <span className="font-medium text-sm md:text-base">{cert}</span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScaleIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-balance">
                Experience the Difference
              </h2>
              <p className="text-lg md:text-xl opacity-90 text-pretty leading-relaxed">
                Join thousands of satisfied clients who trust us for their luxury automotive needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto group"
                    asChild
                  >
                    <Link href="/contact">
                      Get in Touch
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-accent-foreground/20 hover:bg-accent-foreground/10 bg-transparent w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/fleet">View Fleet</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  )
}
