"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { authApi, blogsApi } from "@/lib/api"
import { Loader2, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function AdminBlogsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<any[]>([])
  const [categoryCounts, setCategoryCounts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    checkAuth()
    loadBlogs()
  }, [selectedCategory])

  const checkAuth = async () => {
    try {
      await authApi.me()
    } catch {
      router.push("/admin/login")
    }
  }

  const loadBlogs = async () => {
    try {
      const params: any = { published: "true" } // Show all for admin
      if (selectedCategory !== "all") {
        params.category = selectedCategory
      }
      const data = await blogsApi.getAll(params)
      setBlogs(data.blogs || [])
      setCategoryCounts(data.categoryCounts || [])
    } catch (err) {
      console.error("Error loading blogs:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    try {
      await blogsApi.delete(slug)
      await loadBlogs()
    } catch (err: any) {
      alert(err.message || "Failed to delete blog post")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif">Blog Posts</h1>
          <Button size="sm" asChild className="w-full sm:w-auto">
            <Link href="/admin/blogs/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Post
            </Link>
          </Button>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="whitespace-nowrap shrink-0"
          >
            All Posts
          </Button>
          {categoryCounts.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="whitespace-nowrap shrink-0"
            >
              {cat.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {cat.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Blog List */}
        <div className="grid gap-4">
          {blogs.length === 0 ? (
            <Card className="p-6 sm:p-8 text-center">
              <p className="text-sm sm:text-base text-muted-foreground mb-4">No blog posts found.</p>
              <Button asChild size="sm">
                <Link href="/admin/blogs/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Post
                </Link>
              </Button>
            </Card>
          ) : (
            blogs.map((blog) => (
              <Card key={blog._id} className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={blog.featuredImage || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{blog.category}</Badge>
                          {blog.featured && (
                            <Badge variant="default" className="text-xs">Featured</Badge>
                          )}
                          {!blog.published && (
                            <Badge variant="outline" className="text-xs">Draft</Badge>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 line-clamp-2">{blog.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                          <span>By {blog.author}</span>
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                          <span>{blog.readTime}</span>
                          {blog.views && <span>{blog.views} views</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs sm:text-sm"
                      >
                        <Link href={`/blog/${blog.slug}`} target="_blank">
                          <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          View
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs sm:text-sm"
                      >
                        <Link href={`/admin/blogs/${blog.slug}`}>
                          <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(blog.slug)}
                        className="text-xs sm:text-sm text-destructive hover:text-destructive"
                      >
                        <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

