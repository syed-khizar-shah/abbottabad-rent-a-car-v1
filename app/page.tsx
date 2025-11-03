"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  Star,
  Shield,
  Clock,
  Award,
  Car,
  Users,
  Gauge,
  Fuel,
  Calendar,
  Sparkles,
  TrendingUp,
  Gift,
  Tag,
  CheckCircle,
  Quote,
  Zap,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedSection, FadeIn, ScaleIn } from "@/components/animated-section"
import { useRef } from "react"

const featuredCars = [
  {
    id: 1,
    name: "Hyundai Elantra",
    category: "Middle",
    price: { "1-3": 120, "4-9": 110, "10-25": 100, "26+": 90 },
    image: "/silver-hyundai-elantra-2022.jpg",
    year: 2022,
    seats: 5,
    fuel: "8 L / 100 km",
    transmission: "AT",
    engine: "1.6 L 128 hp",
    drive: "Front",
    rating: 4.8,
    reviews: 4,
  },
  {
    id: 2,
    name: "Toyota Corolla",
    category: "Economy",
    price: { "1-3": 100, "4-9": 90, "10-25": 80, "26+": 70 },
    image: "/white-toyota-corolla-2023.jpg",
    year: 2023,
    seats: 5,
    fuel: "7 L / 100 km",
    transmission: "AT",
    engine: "1.8 L 140 hp",
    drive: "Front",
    rating: 4.9,
    reviews: 12,
  },
  {
    id: 3,
    name: "Honda Civic",
    category: "Premium",
    price: { "1-3": 150, "4-9": 140, "10-25": 130, "26+": 120 },
    image: "/black-honda-civic-2023.jpg",
    year: 2023,
    seats: 5,
    fuel: "7.5 L / 100 km",
    transmission: "CVT",
    engine: "1.5 L Turbo 180 hp",
    drive: "Front",
    rating: 5.0,
    reviews: 8,
  },
]

const carClasses = [
  {
    name: "Economy",
    description: "Perfect for budget-conscious travelers",
    icon: Car,
    features: ["Fuel Efficient", "Easy to Drive", "Affordable Rates"],
    priceFrom: 70,
    image: "/economy-car-compact.jpg",
  },
  {
    name: "Middle Class",
    description: "Comfort meets affordability",
    icon: Users,
    features: ["Spacious Interior", "Modern Features", "Great Value"],
    priceFrom: 90,
    image: "/sedan-car-comfortable.jpg",
  },
  {
    name: "Premium",
    description: "Luxury and performance combined",
    icon: Award,
    features: ["Premium Interior", "Advanced Tech", "Superior Comfort"],
    priceFrom: 120,
    image: "/luxury-sedan-premium.jpg",
  },
  {
    name: "SUV",
    description: "Adventure-ready vehicles",
    icon: Gauge,
    features: ["All-Terrain", "Spacious", "Family Friendly"],
    priceFrom: 150,
    image: "/suv-adventure-vehicle.jpg",
  },
]

const offers = [
  {
    title: "Weekend Special",
    description: "Get 20% off on all weekend rentals",
    discount: "20% OFF",
    icon: Gift,
    color: "bg-blue-500",
  },
  {
    title: "Long Term Rental",
    description: "Rent for 26+ days and save big",
    discount: "Up to 30% OFF",
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    title: "Wedding Package",
    description: "Special rates for wedding events",
    discount: "Custom Pricing",
    icon: Sparkles,
    color: "bg-purple-500",
  },
  {
    title: "Corporate Deals",
    description: "Exclusive rates for businesses",
    discount: "Volume Discounts",
    icon: Tag,
    color: "bg-orange-500",
  },
]

const luxuryBrands = ["Toyota", "Honda", "Hyundai", "Suzuki", "KIA", "Nissan"]

const benefits = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Comprehensive coverage on all vehicles for your peace of mind",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service for any assistance you need",
  },
  {
    icon: Award,
    title: "Premium Selection",
    description: "Meticulously maintained fleet of quality automobiles",
  },
  {
    icon: Star,
    title: "Best Service",
    description: "Professional service from booking to return",
  },
]

const homeFaqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-3 weeks in advance, especially for peak seasons. However, we do accept last-minute bookings subject to availability.",
  },
  {
    question: "What is included in the rental price?",
    answer:
      "Our rental prices include comprehensive insurance, 24/7 roadside assistance, regular maintenance, and basic cleaning. Fuel is not included.",
  },
  {
    question: "Do you offer delivery and pickup services?",
    answer:
      "Yes! We offer complimentary delivery and pickup within Abbottabad city limits. For locations outside the city, we charge a nominal fee based on distance.",
  },
  {
    question: "What documents do I need to rent a vehicle?",
    answer:
      "Required documents: Valid CNIC or passport, valid driver's license (held for minimum 3 years), proof of address, and a credit card for security deposit.",
  },
]

const recentPosts = [
  {
    id: 1,
    title: "Top 5 Scenic Routes in Pakistan Perfect for Road Trips",
    excerpt: "Explore Pakistan's most stunning drives and discover why these routes are unforgettable.",
    category: "Travel Guides",
    date: "2025-01-18",
    image: "/scenic-mountain-road-pakistan.jpg",
  },
  {
    id: 2,
    title: "First-Time Car Rental: Everything You Need to Know",
    excerpt: "A beginner's guide to renting your first vehicle with confidence.",
    category: "Rental Tips",
    date: "2025-01-12",
    image: "/car-rental-guide.jpg",
  },
  {
    id: 3,
    title: "Wedding Car Decoration: Elegant Ideas for Your Special Day",
    excerpt: "Explore tasteful decoration ideas that complement your wedding vehicle.",
    category: "Events",
    date: "2025-01-03",
    image: "/wedding-car-decorated.jpg",
  },
]

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Business Executive",
    rating: 5,
    text: "Exceptional service from start to finish. The luxury vehicle exceeded expectations, and the team's attention to detail made our corporate event truly memorable.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Fatima Ali",
    role: "Wedding Planner",
    rating: 5,
    text: "We've used Abbottabad Rent A Car for multiple weddings. Their premium fleet and professional service always impress our clients. Highly recommended!",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Hassan Malik",
    role: "Tour Operator",
    rating: 5,
    text: "The perfect partner for our tour operations. Reliable vehicles, excellent customer support, and competitive pricing. Our clients love the experience.",
    image: "/placeholder-user.jpg",
  },
]

const stats = [
  { value: "5,000+", label: "Happy Customers", icon: Users },
  { value: "50+", label: "Premium Vehicles", icon: Car },
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "4.9/5", label: "Average Rating", icon: Star },
]

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div className="flex flex-col">
      {/* Hero Section - Premium Redesign */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <Image
            src="/luxury-car-showroom-elegant-interior.jpg"
            alt="Luxury car showroom"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        </motion.div>

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

        {/* Main content */}
        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="max-w-5xl mx-auto space-y-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="text-sm md:text-base px-4 py-2 bg-white/10 backdrop-blur-md border-white/20 text-white shadow-lg hover:bg-white/15 transition-all">
                <Sparkles className="h-4 w-4 mr-2" />
                Abbottabad's Premier Luxury Car Rental
              </Badge>
            </motion.div>

            {/* Hero headline */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-balance leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Excellence in Every
              <span className="block mt-2 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
                Mile
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Experience the pinnacle of luxury automotive rentals. Hand-selected premium vehicles,
              impeccable service, and unforgettable journeys await.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-white/80">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="text-sm text-white/80">5,000+ Satisfied Customers</div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="text-sm text-white/80">15+ Years Excellence</div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all bg-accent hover:bg-accent/90 border-0"
                asChild
              >
                <Link href="/fleet" className="group">
                  Explore Premium Fleet
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary transition-all shadow-xl hover:scale-105"
                asChild
              >
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5">
              <motion.div
                className="w-1.5 h-3 bg-white/60 rounded-full"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Premium Stats Bar */}
      <section className="relative -mt-20 z-20 mb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="border-0 shadow-2xl bg-background/95 backdrop-blur-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-6 md:p-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                    <stat.icon className="h-7 w-7 md:h-8 md:w-8 text-accent" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Premium Vehicle Categories Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-bl-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-tr-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 text-xs md:text-sm px-3 py-1.5 bg-accent/5 border-accent/20">
              <Car className="h-3.5 w-3.5 mr-2 text-accent" />
              Our Vehicle Categories
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-4 md:mb-6 leading-tight">
              Choose Your Class
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From economical to premium, discover the perfect vehicle category tailored to your journey and preferences
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {carClasses.map((carClass, index) => (
              <ScaleIn key={carClass.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 h-full border-border/50 bg-gradient-to-br from-background to-muted/10 backdrop-blur-sm">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image container */}
                    <div className="relative h-64 md:h-72 overflow-hidden bg-muted/30">
                      <Image
                        src={carClass.image || "/placeholder.svg"}
                        alt={carClass.name}
                        fill
                        className="object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
                      />
                      {/* Enhanced overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Icon badge */}
                      <motion.div
                        className="absolute top-5 left-5 p-3 rounded-xl bg-accent/95 backdrop-blur-md shadow-xl border border-accent/30"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <carClass.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                      </motion.div>
                      
                      {/* Price badge */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <motion.div
                          className="bg-background/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-border/50"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-xs text-muted-foreground mb-0.5">Starting from</p>
                          <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                            ${carClass.priceFrom}/day
                          </p>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 md:p-8 space-y-6 relative z-10">
                      <div className="space-y-3">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold group-hover:text-accent transition-colors duration-300">
                          {carClass.name}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {carClass.description}
                        </p>
                      </div>
                      
                      {/* Features list */}
                      <div className="space-y-3 pt-2 border-t border-border/50">
                        {carClass.features.map((feature, idx) => (
                          <motion.div
                            key={feature}
                            className="flex items-center gap-3 text-sm md:text-base group-hover:text-foreground transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                          >
                            <div className="h-2 w-2 rounded-full bg-accent shrink-0 group-hover:scale-125 transition-transform duration-300" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent group-hover:shadow-lg transition-all duration-300 font-medium"
                        asChild
                      >
                        <Link href="/fleet" className="group/link">
                          Explore {carClass.name}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-2" />
                        </Link>
                      </Button>
                    </div>
                    
                    {/* Bottom accent line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Offers Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-muted/40 via-background to-muted/30 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:50px_50px]" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 text-xs md:text-sm px-3 py-1">
              Exclusive Offers
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">
              Special Promotions
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Limited-time offers designed to enhance your rental experience
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {offers.map((offer, index) => (
              <AnimatedSection key={offer.title} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 h-full border-border/50 bg-gradient-to-br from-background to-muted/20">
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute top-0 right-0 w-40 h-40 ${offer.color} opacity-5 rounded-bl-[4rem]`}
                      whileHover={{ scale: 1.5, opacity: 0.15 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="p-6 md:p-8 space-y-6 relative z-10">
                      {/* Icon */}
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${offer.color} text-white shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <offer.icon className="h-8 w-8" />
                      </motion.div>
                      
                      {/* Content */}
                      <div className="space-y-3">
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                          {offer.discount}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold font-serif leading-tight">{offer.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {offer.description}
                        </p>
                      </div>
                      
                      {/* CTA */}
                      <Button
                        variant="ghost"
                        className="w-full justify-between group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 font-medium"
                        asChild
                      >
                        <Link href="/contact" className="group">
                          Explore Offer
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                      </Button>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Brands Bar */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeIn className="mb-12">
            <div className="text-center space-y-3">
              <Badge variant="outline" className="text-xs md:text-sm px-3 py-1">
                Our Fleet Partners
              </Badge>
              <p className="text-sm md:text-base uppercase tracking-widest text-muted-foreground font-medium">
                Trusted Brands in Our Premium Fleet
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-20">
            {luxuryBrands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-muted-foreground/50 hover:text-accent transition-all duration-300 cursor-default">
                  {brand}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Featured Vehicles Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:60px_60px]" />
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 text-xs md:text-sm px-3 py-1.5 bg-accent/5 border-accent/20">
              <Star className="h-3.5 w-3.5 mr-2 text-accent fill-accent" />
              Popular Choices
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-4 md:mb-6 leading-tight">
              Featured Vehicles
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Curated selection of premium vehicles offering the perfect fusion of luxury, performance, and exceptional value
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredCars.map((car, index) => (
              <ScaleIn key={car.id} delay={index * 0.15}>
                <Card className="group overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full border-border/50 bg-background relative">
                  {/* Premium badge overlay */}
                  {index === 0 && (
                    <div className="absolute top-0 right-0 z-20 bg-gradient-to-br from-accent to-accent/80 text-white px-4 py-1.5 rounded-bl-xl shadow-lg">
                      <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="h-3 w-3" />
                        Featured
                      </span>
                    </div>
                  )}

                  <div className="relative h-64 md:h-72 overflow-hidden bg-muted/30">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl border border-border/50 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                      <Star className="h-4 w-4 fill-accent text-accent group-hover:fill-white group-hover:text-white transition-colors" />
                      <span className="text-sm font-bold group-hover:text-white transition-colors">{car.rating}</span>
                      <span className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">
                        ({car.reviews})
                      </span>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent/95 backdrop-blur-sm text-accent-foreground shadow-xl border-0 text-xs font-semibold">
                        {car.category}
                      </Badge>
                    </div>
                  </div>
                  {/* Content Section */}
                  <div className="p-6 md:p-8 space-y-6 relative z-10 bg-gradient-to-b from-background to-muted/5">
                    {/* Header */}
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold group-hover:text-accent transition-colors duration-300">
                        {car.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="text-sm md:text-base text-muted-foreground">{car.year} Model</p>
                        <div className="h-1 w-1 rounded-full bg-accent/50" />
                        <Badge variant="secondary" className="text-xs">{car.category}</Badge>
                      </div>
                    </div>

                    {/* Premium Specs Grid */}
                    <div className="grid grid-cols-2 gap-3 py-5 border-y border-border/50 bg-gradient-to-br from-muted/20 to-transparent rounded-lg px-2">
                      <motion.div
                        className="flex items-center gap-3 text-sm group-hover:text-foreground transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Users className="h-4 w-4 text-accent" />
                        </div>
                        <span className="font-medium">{car.seats} Seats</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 text-sm group-hover:text-foreground transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Gauge className="h-4 w-4 text-accent" />
                        </div>
                        <span className="font-medium">{car.transmission}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 text-sm group-hover:text-foreground transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Fuel className="h-4 w-4 text-accent" />
                        </div>
                        <span className="font-medium">{car.fuel}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 text-sm group-hover:text-foreground transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Car className="h-4 w-4 text-accent" />
                        </div>
                        <span className="font-medium">{car.drive}</span>
                      </motion.div>
                    </div>

                    {/* Premium Pricing Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Daily Rates</p>
                        <Badge variant="outline" className="text-xs bg-accent/5 border-accent/20">
                          Best Value
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { days: "1-3", price: car.price["1-3"], highlight: false },
                          { days: "4-9", price: car.price["4-9"], highlight: false },
                          { days: "10-25", price: car.price["10-25"], highlight: false },
                          { days: "26+", price: car.price["26+"], highlight: true },
                        ].map((tier, tierIdx) => (
                          <motion.div
                            key={tier.days}
                            className={`flex flex-col justify-center p-3 rounded-xl transition-all duration-300 ${
                              tier.highlight
                                ? "bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 shadow-md"
                                : "bg-muted/30 group-hover:bg-accent/5 border border-border/50"
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="text-xs text-muted-foreground mb-1">{tier.days} days</span>
                            <span className={`text-lg font-bold ${tier.highlight ? "text-accent" : "text-foreground"}`}>
                              ${tier.price}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Premium CTA Button */}
                    <Button
                      className="w-full shadow-lg hover:shadow-xl group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 font-semibold text-base py-6"
                      asChild
                    >
                      <Link href="/contact" className="group/btn">
                        Reserve Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </ScaleIn>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12" delay={0.5}>
            <Button size="lg" variant="outline" asChild>
              <Link href="/fleet">
                View All Vehicles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 text-xs md:text-sm px-3 py-1">
              Client Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Hear from our valued customers who have experienced the premium difference
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScaleIn key={testimonial.name} delay={index * 0.15}>
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full border-border/50 p-8">
                  <Quote className="absolute top-6 right-6 h-16 w-16 text-accent/10" />
                  <div className="relative z-10 space-y-6">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <p className="text-muted-foreground leading-relaxed text-base italic">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={testimonial.image || "/placeholder-user.jpg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Premium Redesign */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 text-xs md:text-sm px-3 py-1">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">
              Unmatched Excellence
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every detail crafted to deliver a premium experience that exceeds expectations
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1} direction="up">
                <motion.div
                  className="group relative h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full p-8 text-center space-y-5 hover:border-accent/50 hover:shadow-xl transition-all duration-300 border-border/50 bg-background/50 backdrop-blur-sm">
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300 mx-auto"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <benefit.icon className="h-10 w-10 text-accent" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 font-serif">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {benefit.description}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Common Questions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Quick answers to questions you may have
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {homeFaqs.map((faq, index) => (
                <AnimatedSection key={index} delay={index * 0.1} direction="up">
                  <AccordionItem value={`faq-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedSection>
              ))}
            </Accordion>

            <AnimatedSection className="text-center mt-8" delay={0.5}>
              <Button variant="outline" size="lg" asChild>
                <Link href="/faqs">
                  View All FAQs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Latest Updates
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">From Our Blog</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tips, guides, and stories to enhance your rental experience
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recentPosts.map((post, index) => (
              <ScaleIn key={post.id} delay={index * 0.15}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group-hover:bg-accent/10 transition-colors"
                      asChild
                    >
                      <Link href={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </ScaleIn>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12" delay={0.5}>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <ScaleIn delay={0.2}>
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background via-background to-muted/30 backdrop-blur-xl">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-bl-full blur-3xl" />

                <div className="relative z-10 p-8 md:p-16 text-center space-y-8">
                  {/* Badge */}
                  <div>
                    <Badge className="text-sm md:text-base px-4 py-2 bg-accent/10 text-accent border-accent/20">
                      <Zap className="h-4 w-4 mr-2" />
                      Experience Premium Service
                    </Badge>
                  </div>

                  {/* Heading */}
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                      Begin Your Luxury Journey
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      Our dedicated team is ready to curate the perfect rental experience tailored to your needs
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button
                      size="lg"
                      className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 shadow-xl hover:shadow-2xl hover:scale-105 transition-all bg-accent hover:bg-accent/90 border-0"
                      asChild
                    >
                      <Link href="/contact" className="group">
                        Schedule Your Rental
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all shadow-lg hover:scale-105"
                      asChild
                    >
                      <a href="tel:+923001234567" className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        +92 300 1234567
                      </a>
                    </Button>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <span>Instant Booking</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-5 w-5 text-accent" />
                      <span>Fully Insured</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-5 w-5 text-accent" />
                      <span>24/7 Support</span>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="pt-6 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Main Mansehra Road, Abbottabad, KPK, Pakistan</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:info@abbottabadrentacar.com" className="hover:text-accent transition-colors">
                        info@abbottabadrentacar.com
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </ScaleIn>
          </div>
        </div>
      </section>
    </div>
  )
}
