"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { authApi, blogsApi } from "@/lib/api"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Image from "next/image"
import { RichTextEditor } from "@/components/rich-text-editor"

const categories = [
  "Travel Guides",
  "Luxury Lifestyle",
  "Rental Tips",
  "Events & Weddings",
  "Corporate Travel",
  "Maintenance & Care",
]

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [blog, setBlog] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: categories[0],
    author: "",
    authorBio: "",
    date: new Date().toISOString().split("T")[0],
    readTime: "5 min read",
    featured: false,
    published: true,
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    tags: "",
  })
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
    loadBlog()
  }, [slug])

  const checkAuth = async () => {
    try {
      await authApi.me()
    } catch {
      router.push("/admin/login")
    }
  }

  const loadBlog = async () => {
    try {
      const data = await blogsApi.getOne(slug)
      if (data && data.blog) {
        setBlog(data.blog)
        setFormData({
          title: data.blog.title || "",
          slug: data.blog.slug || "",
          excerpt: data.blog.excerpt || "",
          content: data.blog.content || "",
          category: data.blog.category || categories[0],
          author: data.blog.author || "",
          authorBio: data.blog.authorBio || "",
          date: data.blog.date || new Date().toISOString().split("T")[0],
          readTime: data.blog.readTime || "5 min read",
          featured: data.blog.featured || false,
          published: data.blog.published !== false,
          metaTitle: data.blog.metaTitle || data.blog.title || "",
          metaDescription: data.blog.metaDescription || data.blog.excerpt || "",
          keywords: data.blog.keywords?.join(", ") || "",
          tags: data.blog.tags?.join(", ") || "",
        })
        if (data.blog.featuredImage) {
          setFeaturedImagePreview(data.blog.featuredImage)
        }
      }
    } catch (err) {
      console.error("Error loading blog:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFeaturedImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("slug", formData.slug)
      formDataToSend.append("excerpt", formData.excerpt)
      formDataToSend.append("content", formData.content)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("author", formData.author)
      formDataToSend.append("authorBio", formData.authorBio)
      formDataToSend.append("date", formData.date)
      formDataToSend.append("readTime", formData.readTime)
      formDataToSend.append("featured", formData.featured.toString())
      formDataToSend.append("published", formData.published.toString())
      formDataToSend.append("metaTitle", formData.metaTitle || formData.title)
      formDataToSend.append("metaDescription", formData.metaDescription || formData.excerpt)
      formDataToSend.append("keywords", formData.keywords)
      formDataToSend.append("tags", formData.tags)

      if (featuredImageFile) {
        formDataToSend.append("featuredImage", featuredImageFile)
      }

      await blogsApi.update(slug, formDataToSend)

      alert("Blog post updated successfully!")
      router.push("/admin/blogs")
    } catch (err: any) {
      alert(err.message || "Failed to update blog post")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Blog post not found.</p>
            <Button variant="outline" asChild>
              <Link href="/admin/blogs">Back to Blogs</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href="/admin/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-serif">Edit Blog Post</h1>
          <div></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Enter blog post title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder="blog-post-slug"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL-friendly version of the title
                  </p>
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                    rows={3}
                    placeholder="Brief description of the blog post"
                  />
                </div>
              </div>
            </Card>

            {/* Featured Image */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Featured Image</h2>
              <div className="space-y-4">
                {(featuredImagePreview || formData.featuredImage) && (
                  <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                    <Image
                      src={featuredImagePreview || blog.featuredImage || "/placeholder.svg"}
                      alt="Featured preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </Card>

            {/* Content */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Content *</h2>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Write your blog post content here..."
              />
            </Card>

            {/* Metadata */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Post Metadata</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Publish Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time *</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    required
                    placeholder="5 min read"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="authorBio">Author Bio</Label>
                <Textarea
                  id="authorBio"
                  value={formData.authorBio}
                  onChange={(e) => setFormData({ ...formData, authorBio: e.target.value })}
                  rows={2}
                  placeholder="Brief author biography"
                />
              </div>
            </Card>

            {/* SEO Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    rows={2}
                    placeholder="SEO description (defaults to excerpt)"
                  />
                </div>
                <div>
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>
            </Card>

            {/* Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

