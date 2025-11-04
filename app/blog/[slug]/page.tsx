"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { blogsApi } from "@/lib/api"

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])

  useEffect(() => {
    loadBlog()
  }, [slug])

  const loadBlog = async () => {
    try {
      setLoading(true)
      const data = await blogsApi.getOne(slug)
      if (data && data.blog) {
        setPost(data.blog)
        setRelatedPosts(data.relatedPosts || [])
      }
    } catch (err) {
      console.error("Error loading blog:", err)
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full">
        <Image
          src={post.featuredImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <Card className="p-6 sm:p-8 lg:p-12 mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-medium">Share:</span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-transparent"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-transparent"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-transparent"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-transparent"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Article Body */}
            <div
              className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:text-muted-foreground prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>

          {/* Author Bio */}
          <Card className="p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <User className="h-8 w-8 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">About {post.author}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.authorBio}
                </p>
              </div>
            </div>
          </Card>

          {/* Related Posts */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
              Related Articles
            </h2>
            {relatedPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost._id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="overflow-hidden group hover:shadow-xl transition-shadow h-full">
                      <div className="relative h-48">
                        <Image
                          src={relatedPost.featuredImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-bold text-sm line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No related posts found.</p>
            )}
          </div>

          {/* CTA */}
          <Card className="p-8 sm:p-12 text-center bg-accent text-accent-foreground">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
              Ready to Experience Luxury?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Browse our premium fleet and book your perfect luxury vehicle
              today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/fleet">View Our Fleet</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </Card>
        </div>
      </article>
    </div>
  );
}
