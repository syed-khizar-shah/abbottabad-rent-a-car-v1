"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authApi, categoriesApi } from "@/lib/api"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [category, setCategory] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "Car",
    features: "",
    priceFrom: "",
    order: "0"
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
    loadCategory()
  }, [categoryId])

  const checkAuth = async () => {
    try {
      await authApi.me()
    } catch {
      router.push("/admin/login")
    }
  }

  const loadCategory = async () => {
    try {
      const data = await categoriesApi.getOne(categoryId)
      setCategory(data)
      setFormData({
        name: data.name || "",
        description: data.description || "",
        icon: data.icon || "Car",
        features: data.features?.join(", ") || "",
        priceFrom: data.priceFrom?.toString() || "",
        order: data.order?.toString() || "0"
      })
    } catch (err) {
      console.error("Error loading category:", err)
      alert("Failed to load category data")
      router.push("/admin/categories")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("icon", formData.icon)
      formDataToSend.append("priceFrom", formData.priceFrom)
      formDataToSend.append("order", formData.order)
      
      const features = formData.features.split(",").map(f => f.trim()).filter(f => f)
      formDataToSend.append("features", JSON.stringify(features))
      
      if (imageFile) {
        formDataToSend.append("image", imageFile)
      }

      await categoriesApi.update(categoryId, formDataToSend)
      router.push("/admin/categories")
    } catch (err: any) {
      alert(err.message || "Failed to update category")
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/admin/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>

        <Card className="p-6">
          <h1 className="text-3xl font-bold font-serif mb-6">Edit Category</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price From (per day) *</label>
                <input
                  type="number"
                  value={formData.priceFrom}
                  onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Icon Name (lucide-react icon)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
              <input
                type="text"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <div className="space-y-2">
                {(imagePreview || category?.image) && (
                  <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                    <img
                      src={imagePreview || category?.image}
                      alt="Category preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setImageFile(file || null);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setImagePreview(null);
                    }
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {category?.image && !imageFile && (
                  <p className="text-xs text-muted-foreground">Current image: {category.image}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Category"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/categories">Cancel</Link>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

