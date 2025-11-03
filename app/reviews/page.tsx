"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ThumbsUp, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const overallStats = {
  averageRating: 4.9,
  totalReviews: 247,
  breakdown: [
    { stars: 5, count: 198, percentage: 80 },
    { stars: 4, count: 42, percentage: 17 },
    { stars: 3, count: 5, percentage: 2 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
  ],
}

const reviews = [
  {
    id: 1,
    name: "Imran Ahmed",
    location: "Islamabad",
    rating: 5,
    date: "2025-01-15",
    vehicle: "Rolls-Royce Phantom",
    image: "/placeholder.svg?key=rev1",
    review:
      "Absolutely exceptional service! Rented the Rolls-Royce Phantom for my wedding and it was the highlight of the day. The car was immaculate, the chauffeur was professional, and the entire experience was seamless. Worth every penny!",
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Khan",
    location: "Lahore",
    rating: 5,
    date: "2025-01-10",
    vehicle: "Mercedes-Benz S-Class",
    image: "/placeholder.svg?key=rev2",
    review:
      "I've used several luxury car rental services, but this one stands out. The Mercedes S-Class was in perfect condition, and the customer service was outstanding. They even delivered the car to my hotel. Highly recommended!",
    helpful: 18,
    verified: true,
  },
  {
    id: 3,
    name: "Ali Hassan",
    location: "Karachi",
    rating: 5,
    date: "2025-01-05",
    vehicle: "Bentley Continental GT",
    image: "/placeholder.svg?key=rev3",
    review:
      "What an incredible experience! The Bentley was a dream to drive through the northern areas. The team was very accommodating with our itinerary changes and provided excellent support throughout our trip.",
    helpful: 31,
    verified: true,
  },
  {
    id: 4,
    name: "Fatima Malik",
    location: "Abbottabad",
    rating: 5,
    date: "2024-12-28",
    vehicle: "Range Rover Autobiography",
    image: "/placeholder.svg?key=rev4",
    review:
      "Perfect for our family trip to Naran! The Range Rover handled the mountain roads beautifully. The staff was incredibly helpful and made sure we had everything we needed. Will definitely rent again!",
    helpful: 15,
    verified: true,
  },
  {
    id: 5,
    name: "Zain Abbas",
    location: "Rawalpindi",
    rating: 4,
    date: "2024-12-20",
    vehicle: "BMW 7 Series",
    image: "/placeholder.svg?key=rev5",
    review:
      "Great service overall. The BMW was luxurious and comfortable for our business meetings. Only minor issue was a slight delay in pickup, but they compensated with an upgrade. Very professional team.",
    helpful: 12,
    verified: true,
  },
  {
    id: 6,
    name: "Ayesha Siddiqui",
    location: "Peshawar",
    rating: 5,
    date: "2024-12-15",
    vehicle: "Porsche 911 Turbo S",
    image: "/placeholder.svg?key=rev6",
    review:
      "An unforgettable experience! Rented the Porsche for a special occasion and it exceeded all expectations. The car was pristine, powerful, and turned heads everywhere. The booking process was smooth and hassle-free.",
    helpful: 28,
    verified: true,
  },
]

const categories = [
  { id: "all", name: "All Reviews", count: 247 },
  { id: "wedding", name: "Weddings", count: 89 },
  { id: "business", name: "Business", count: 64 },
  { id: "tourism", name: "Tourism", count: 72 },
  { id: "special", name: "Special Events", count: 22 },
]

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/happy-customers-with-luxury-cars-testimonials.jpg"
            alt="Customer reviews and testimonials"
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
                Customer Testimonials
              </Badge>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              What Our Clients Say
            </motion.h1>
            <motion.p
              className="text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Real experiences from real customers who've trusted us with their luxury automotive needs
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Overall Rating Section */}
      <section className="py-12 md:py-16 border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Rating Summary */}
              <div className="text-center lg:text-left space-y-4 md:space-y-6 animate-in fade-in slide-in-from-left duration-700">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent">
                    {overallStats.averageRating}
                  </div>
                  <div>
                    <div className="flex gap-1 mb-2 justify-center lg:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 md:h-6 md:w-6 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Based on {overallStats.totalReviews} reviews
                    </p>
                  </div>
                </div>
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/contact">Share Your Experience</Link>
                </Button>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3 animate-in fade-in slide-in-from-right duration-700">
                {overallStats.breakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-1 w-16 md:w-20">
                      <span className="text-sm font-medium">{item.stars}</span>
                      <Star className="h-4 w-4 fill-accent text-accent" />
                    </div>
                    <div className="flex-1 h-2.5 md:h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 md:w-16 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mb-2 flex-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={category.id === activeCategory ? "default" : "outline"}
                  className="whitespace-nowrap transition-all duration-300 hover:scale-105"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                  <Badge variant={category.id === activeCategory ? "secondary" : "outline"} className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className="p-4 sm:p-6 md:p-8 hover:shadow-2xl hover:border-accent/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  {/* Avatar */}
                  <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-accent/20">
                      <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                    </div>
                    <div className="sm:text-center">
                      <h3 className="font-bold text-sm md:text-base">{review.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{review.location}</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 space-y-3 md:space-y-4">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 md:h-5 md:w-5 ${
                              i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Rental
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground ml-auto">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        {new Date(review.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">Rented: {review.vehicle}</p>
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-6 w-6 md:h-8 md:w-8 text-muted-foreground/20" />
                        <p className="text-sm md:text-base text-muted-foreground pl-4 md:pl-6 leading-relaxed">
                          {review.review}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/10 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-xs md:text-sm">Helpful ({review.helpful})</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
            >
              Load More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-muted/30 via-background to-muted/50">
        <div className="container mx-auto px-4">
          <Card className="p-6 sm:p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl animate-in fade-in zoom-in">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Ready to Create Your Own Story?</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
              Join hundreds of satisfied customers and experience the luxury you deserve
            </p>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/fleet">Browse Our Fleet</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}
