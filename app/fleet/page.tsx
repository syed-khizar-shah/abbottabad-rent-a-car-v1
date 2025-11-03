"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Gauge, Fuel, Settings, Shield, ArrowRight, Filter, Award, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ScaleIn } from "@/components/animated-section"

const categories = [
  { id: "all", name: "All Vehicles", count: 15 },
  { id: "ultra-luxury", name: "Ultra Luxury", count: 4 },
  { id: "executive", name: "Executive", count: 5 },
  { id: "sports", name: "Sports & Performance", count: 3 },
  { id: "suv", name: "Luxury SUVs", count: 3 },
]

const fleet = [
  {
    id: 1,
    name: "Rolls-Royce Phantom",
    category: "ultra-luxury",
    categoryName: "Ultra Luxury",
    price: 1500,
    image: "/black-rolls-royce-phantom-luxury-car.jpg",
    specs: {
      passengers: 5,
      transmission: "Automatic",
      fuel: "Premium",
      power: "563 HP",
    },
    features: [
      "Chauffeur Service Available",
      "Starlight Headliner",
      "Bespoke Audio System",
      "Rear Executive Seating",
      "Champagne Cooler",
    ],
    rating: 5.0,
    reviews: 28,
  },
  {
    id: 2,
    name: "Bentley Continental GT",
    category: "ultra-luxury",
    categoryName: "Ultra Luxury",
    price: 1200,
    image: "/white-bentley-continental-gt-luxury-sports-car.jpg",
    specs: {
      passengers: 4,
      transmission: "Automatic",
      fuel: "Premium",
      power: "626 HP",
    },
    features: ["W12 Engine", "Rotating Display", "Diamond Quilted Leather", "Sport Mode", "Naim Audio"],
    rating: 5.0,
    reviews: 34,
  },
  {
    id: 3,
    name: "Mercedes-Benz S-Class",
    category: "executive",
    categoryName: "Executive Sedan",
    price: 800,
    image: "/silver-mercedes-s-class-luxury-sedan.jpg",
    specs: {
      passengers: 5,
      transmission: "Automatic",
      fuel: "Premium",
      power: "429 HP",
    },
    features: ["MBUX Infotainment", "Executive Rear Seats", "Air Suspension", "Burmester Sound", "Ambient Lighting"],
    rating: 4.9,
    reviews: 52,
  },
  {
    id: 4,
    name: "BMW 7 Series",
    category: "executive",
    categoryName: "Executive Sedan",
    price: 750,
    image: "/black-bmw-7-series-luxury-sedan.jpg",
    specs: {
      passengers: 5,
      transmission: "Automatic",
      fuel: "Premium",
      power: "523 HP",
    },
    features: [
      "Executive Lounge Seating",
      "Gesture Control",
      "Laser Headlights",
      "Sky Lounge Panoramic Roof",
      "Bowers & Wilkins Audio",
    ],
    rating: 4.9,
    reviews: 41,
  },
  {
    id: 5,
    name: "Porsche 911 Turbo S",
    category: "sports",
    categoryName: "Sports & Performance",
    price: 1100,
    image: "/red-porsche-911-turbo-sports-car.jpg",
    specs: {
      passengers: 4,
      transmission: "PDK",
      fuel: "Premium",
      power: "640 HP",
    },
    features: ["Sport Chrono Package", "Active Suspension", "Carbon Ceramic Brakes", "Sport Exhaust", "Launch Control"],
    rating: 5.0,
    reviews: 19,
  },
  {
    id: 6,
    name: "Audi RS7",
    category: "sports",
    categoryName: "Sports & Performance",
    price: 900,
    image: "/grey-audi-rs7-sportback.jpg",
    specs: {
      passengers: 5,
      transmission: "Automatic",
      fuel: "Premium",
      power: "591 HP",
    },
    features: [
      "Quattro AWD",
      "Dynamic Ride Control",
      "Matrix LED Headlights",
      "Bang & Olufsen 3D Sound",
      "Sport Differential",
    ],
    rating: 4.8,
    reviews: 27,
  },
  {
    id: 7,
    name: "Range Rover Autobiography",
    category: "suv",
    categoryName: "Luxury SUV",
    price: 950,
    image: "/white-range-rover-autobiography-suv.jpg",
    specs: {
      passengers: 7,
      transmission: "Automatic",
      fuel: "Premium",
      power: "518 HP",
    },
    features: [
      "Terrain Response 2",
      "Executive Class Seating",
      "Meridian Signature Sound",
      "Air Suspension",
      "Panoramic Roof",
    ],
    rating: 4.9,
    reviews: 38,
  },
  {
    id: 8,
    name: "Mercedes-Benz GLS Maybach",
    category: "suv",
    categoryName: "Luxury SUV",
    price: 1300,
    image: "/black-mercedes-gls-maybach-luxury-suv.jpg",
    specs: {
      passengers: 7,
      transmission: "Automatic",
      fuel: "Premium",
      power: "550 HP",
    },
    features: [
      "Maybach Executive Seats",
      "MBUX Rear Tablet",
      "Burmester 4D Sound",
      "Active Multicontour Seats",
      "Refrigerator",
    ],
    rating: 5.0,
    reviews: 15,
  },
]

export default function FleetPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredFleet = activeCategory === "all" ? fleet : fleet.filter((car) => car.category === activeCategory)

  return (
    <div className="flex flex-col">
      {/* Premium Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with enhanced overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/luxury-sports-cars-mountain-road-scenic-drive.jpg"
            alt="Luxury fleet showroom"
            fill
            className="object-cover brightness-[0.25]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8 text-white"
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
                <Award className="h-4 w-4 mr-2" />
                Premium Collection
              </Badge>
            </motion.div>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Our Exclusive
              <span className="block mt-2 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
                Fleet
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Meticulously curated collection of the world's most prestigious automobiles, each handpicked for excellence
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Category Filter */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 py-5">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
              <Filter className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mb-2 flex-1">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={category.id === activeCategory ? "default" : "outline"}
                    className={`whitespace-nowrap transition-all duration-300 ${
                      category.id === activeCategory
                        ? "shadow-md bg-accent hover:bg-accent/90"
                        : "hover:bg-accent/10 hover:border-accent/30"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                    <Badge
                      variant={category.id === activeCategory ? "secondary" : "outline"}
                      className={`ml-2 ${
                        category.id === activeCategory
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-accent/10 text-accent border-accent/20"
                      }`}
                    >
                      {category.count}
                    </Badge>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Fleet Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredFleet.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-accent/50 h-full bg-gradient-to-br from-background to-muted/10">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-6 relative z-10">
                    {/* Premium Image Section */}
                    <div className="md:col-span-2 relative h-64 sm:h-72 md:h-full min-h-[280px] overflow-hidden bg-muted/30 rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full"
                      >
                        <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                      </motion.div>
                      {/* Enhanced overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Premium rating badge */}
                      <motion.div
                        className="absolute top-5 left-5 bg-background/95 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl border border-border/50 group-hover:bg-accent group-hover:border-accent transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Star className="h-4 w-4 fill-accent text-accent group-hover:fill-white group-hover:text-white transition-colors" />
                        <span className="text-sm font-bold group-hover:text-white transition-colors">{car.rating}</span>
                        <span className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">
                          ({car.reviews})
                        </span>
                      </motion.div>
                      
                      {/* Category badge */}
                      <div className="absolute top-5 right-5">
                        <Badge className="bg-accent/95 backdrop-blur-sm text-accent-foreground shadow-xl border-0 text-xs font-semibold">
                          {car.categoryName}
                        </Badge>
                      </div>
                    </div>

                    {/* Premium Details Section */}
                    <div className="md:col-span-3 p-6 sm:p-8 flex flex-col">
                      <div className="flex-1 space-y-5">
                        {/* Title */}
                        <div className="space-y-2">
                          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                            {car.categoryName}
                          </p>
                          <h3 className="text-2xl sm:text-3xl font-serif font-bold group-hover:text-accent transition-colors duration-300">
                            {car.name}
                          </h3>
                        </div>

                        {/* Premium Specs Grid */}
                        <div className="grid grid-cols-2 gap-3 py-4 border-y border-border/50 bg-gradient-to-br from-muted/20 to-transparent rounded-lg px-3">
                          {[
                            { icon: Users, text: `${car.specs.passengers} Passengers` },
                            { icon: Settings, text: car.specs.transmission },
                            { icon: Fuel, text: car.specs.fuel },
                            { icon: Gauge, text: car.specs.power },
                          ].map((spec, i) => (
                            <motion.div
                              key={i}
                              className="flex items-center gap-3 text-sm group-hover:text-foreground transition-colors"
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                <spec.icon className="h-4 w-4 text-accent" />
                              </div>
                              <span className="font-medium">{spec.text}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Premium Features */}
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Key Features
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {car.features.slice(0, 3).map((feature, i) => (
                              <motion.span
                                key={feature}
                                className="text-xs bg-muted/80 px-3 py-1.5 rounded-lg hover:bg-accent/20 hover:text-accent transition-all duration-300 border border-border/50"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                {feature}
                              </motion.span>
                            ))}
                            {car.features.length > 3 && (
                              <span className="text-xs text-muted-foreground px-3 py-1.5 flex items-center">
                                +{car.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Premium Price & CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-6 mt-6 border-t border-border/50">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-1"
                        >
                          <p className="text-xs sm:text-sm text-muted-foreground font-medium">Starting from</p>
                          <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                            ${car.price}
                            <span className="text-base sm:text-lg font-normal text-muted-foreground">/day</span>
                          </p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            asChild
                            className="w-full sm:w-auto transition-all duration-300 shadow-md hover:shadow-xl bg-accent hover:bg-accent/90"
                          >
                            <Link href={`/fleet/${car.id}`} className="group/btn">
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredFleet.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <Car className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground text-lg font-medium">No vehicles found in this category.</p>
                <Button variant="outline" asChild>
                  <Link href="/fleet" onClick={() => setActiveCategory("all")}>
                    View All Vehicles
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Premium Insurance Notice */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:50px_50px]" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <ScaleIn delay={0.2}>
            <Card className="p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm">
              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 mb-6 md:mb-8 mx-auto"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="h-10 w-10 md:h-12 md:w-12 text-accent" />
              </motion.div>
              
              {/* Content */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                  Comprehensive Insurance Included
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Every vehicle in our premium fleet comes with full comprehensive insurance coverage, providing you with
                  complete peace of mind throughout your rental period. Additional coverage options are available upon request.
                </p>
                
                {/* Features list */}
                <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto pt-4">
                  {["Full Coverage Insurance", "24/7 Roadside Assistance", "Zero Liability", "Additional Options Available"].map(
                    (item, idx) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
                
                {/* CTA */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Link href="/contact">Learn More About Coverage</Link>
                  </Button>
                </motion.div>
              </div>
            </Card>
          </ScaleIn>
        </div>
      </section>
    </div>
  )
}
