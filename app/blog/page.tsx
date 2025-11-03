"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedSection, ScaleIn, FadeIn } from "@/components/animated-section"

const categories = [
  { id: "all", name: "All Posts", count: 24 },
  { id: "travel", name: "Travel Guides", count: 8 },
  { id: "luxury", name: "Luxury Lifestyle", count: 6 },
  { id: "tips", name: "Rental Tips", count: 5 },
  { id: "events", name: "Events & Weddings", count: 5 },
]

const featuredPost = {
  id: 1,
  title: "The Ultimate Guide to Planning a Luxury Wedding in Northern Pakistan",
  excerpt:
    "Discover how to create an unforgettable wedding experience in the breathtaking landscapes of northern Pakistan, complete with luxury transportation that matches the grandeur of your special day.",
  category: "Events & Weddings",
  author: "Sarah Khan",
  date: "2025-01-20",
  readTime: "8 min read",
  image: "/placeholder.svg?key=blog1",
  featured: true,
}

const posts = [
  {
    id: 2,
    title: "Top 5 Scenic Routes in Pakistan Perfect for Luxury Car Tours",
    excerpt:
      "Explore Pakistan's most stunning drives, from the Karakoram Highway to the coastal beauty of Makran, and discover why these routes are best experienced in a luxury vehicle.",
    category: "Travel Guides",
    author: "Ahmed Hassan",
    date: "2025-01-18",
    readTime: "6 min read",
    image: "/placeholder.svg?key=blog2",
  },
  {
    id: 3,
    title: "Rolls-Royce vs Bentley: Choosing the Perfect Ultra-Luxury Vehicle",
    excerpt:
      "A comprehensive comparison of two automotive icons. Learn about the unique characteristics, features, and experiences that set these prestigious brands apart.",
    category: "Luxury Lifestyle",
    author: "Zain Abbas",
    date: "2025-01-15",
    readTime: "7 min read",
    image: "/placeholder.svg?key=blog3",
  },
  {
    id: 4,
    title: "First-Time Luxury Car Rental: Everything You Need to Know",
    excerpt:
      "A beginner's guide to renting your first luxury vehicle. From documentation to driving tips, we cover everything to ensure a smooth and enjoyable experience.",
    category: "Rental Tips",
    author: "Fatima Ali",
    date: "2025-01-12",
    readTime: "5 min read",
    image: "/placeholder.svg?key=blog4",
  },
  {
    id: 5,
    title: "Corporate Travel: Why Executives Choose Luxury Car Rentals",
    excerpt:
      "Discover how luxury car rentals enhance business travel, from making powerful first impressions to providing mobile offices for busy executives.",
    category: "Luxury Lifestyle",
    author: "Hassan Malik",
    date: "2025-01-10",
    readTime: "6 min read",
    image: "/placeholder.svg?key=blog5",
  },
  {
    id: 6,
    title: "Naran to Hunza: Planning the Perfect Northern Areas Road Trip",
    excerpt:
      "Your complete guide to exploring Pakistan's northern beauty. Route planning, accommodation tips, and why a luxury SUV is your best companion for this journey.",
    category: "Travel Guides",
    author: "Ali Raza",
    date: "2025-01-08",
    readTime: "10 min read",
    image: "/placeholder.svg?key=blog6",
  },
  {
    id: 7,
    title: "The Art of Chauffeur Service: What Makes It Truly Luxurious",
    excerpt:
      "Go behind the scenes of professional chauffeur services. Learn what distinguishes exceptional service and why it's worth considering for your next event.",
    category: "Luxury Lifestyle",
    author: "Sarah Khan",
    date: "2025-01-05",
    readTime: "5 min read",
    image: "/placeholder.svg?key=blog7",
  },
  {
    id: 8,
    title: "Wedding Car Decoration: Elegant Ideas for Your Special Day",
    excerpt:
      "From classic floral arrangements to modern minimalist designs, explore tasteful decoration ideas that complement your luxury wedding vehicle.",
    category: "Events & Weddings",
    author: "Ayesha Siddiqui",
    date: "2025-01-03",
    readTime: "4 min read",
    image: "/placeholder.svg?key=blog8",
  },
  {
    id: 9,
    title: "Insurance Explained: Understanding Your Luxury Car Rental Coverage",
    excerpt:
      "Demystifying rental insurance. A clear explanation of what's covered, what's not, and how to choose the right protection for your peace of mind.",
    category: "Rental Tips",
    author: "Ahmed Hassan",
    date: "2024-12-30",
    readTime: "7 min read",
    image: "/placeholder.svg?key=blog9",
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/luxury-lifestyle-magazine-editorial-automotive-pho.jpg"
            alt="Blog Insights"
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
                Insights & Stories
              </Badge>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Our Blog
            </motion.h1>
            <motion.p
              className="text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Expert insights, travel guides, and luxury lifestyle stories from the world of premium automotive
              experiences
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Button variant={category.id === "all" ? "default" : "outline"} className="whitespace-nowrap">
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <Badge className="mb-4">Featured Article</Badge>
            </FadeIn>
            <ScaleIn delay={0.2}>
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-full min-h-[400px]">
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} className="w-full h-full">
                        <Image
                          src={featuredPost.image || "/placeholder.svg"}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <Badge variant="secondary" className="w-fit mb-4">
                        {featuredPost.category}
                      </Badge>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{featuredPost.title}</h2>
                      <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPost.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" asChild>
                          <Link href={`/blog/${featuredPost.id}`}>
                            Read Full Article
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-serif font-bold mb-8">Latest Articles</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <ScaleIn key={post.id} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    <Card className="overflow-hidden group hover:shadow-xl transition-shadow flex flex-col h-full">
                      <div className="relative h-48 overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <Badge variant="secondary" className="w-fit mb-3">
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <Button variant="ghost" className="w-full justify-between" asChild>
                          <Link href={`/blog/${post.id}`}>
                            Read More
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>

            {/* Load More */}
            <AnimatedSection className="text-center mt-12" delay={0.5}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScaleIn delay={0.2}>
            <Card className="p-8 md:p-12 text-center max-w-3xl mx-auto bg-accent text-accent-foreground">
              <h3 className="text-3xl font-serif font-bold mb-4">Stay Updated</h3>
              <p className="text-xl opacity-90 mb-6">
                Subscribe to our newsletter for the latest luxury travel tips, exclusive offers, and automotive insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-background text-foreground"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary">
                    Subscribe
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
