"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authApi, carsApi, categoriesApi } from "@/lib/api"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function NewCarPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    "pricing.1-3": "",
    "pricing.4-9": "",
    "pricing.10-25": "",
    "pricing.26+": "",
    "specs.passengers": "",
    "specs.transmission": "",
    "specs.fuel": "",
    "specs.power": "",
    "specs.engine": "",
    "specs.drive": "",
    "specs.year": "",
    "specs.seats": "",
    features: "",
    rating: "4.5",
    reviews: "0",
    isFeatured: false,
    isAvailable: true
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    checkAuth()
    loadCategories()
  }, [])

  const checkAuth = async () => {
    try {
      await authApi.me()
    } catch {
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch (err) {
      console.error("Error loading categories:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const formDataToSend = new FormData()
      
      // Basic fields
      formDataToSend.append("name", formData.name)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("price", formData.price)
      
      // Pricing
      const pricing = {
        "1-3": parseFloat(formData["pricing.1-3"]),
        "4-9": parseFloat(formData["pricing.4-9"]),
        "10-25": parseFloat(formData["pricing.10-25"]),
        "26+": parseFloat(formData["pricing.26+"])
      }
      formDataToSend.append("pricing", JSON.stringify(pricing))
      
      // Specs
      const specs = {
        passengers: parseInt(formData["specs.passengers"]),
        transmission: formData["specs.transmission"],
        fuel: formData["specs.fuel"],
        power: formData["specs.power"] || undefined,
        engine: formData["specs.engine"] || undefined,
        drive: formData["specs.drive"] || undefined,
        year: parseInt(formData["specs.year"]) || undefined,
        seats: parseInt(formData["specs.seats"]) || undefined
      }
      formDataToSend.append("specs", JSON.stringify(specs))
      
      // Features
      const features = formData.features.split(",").map(f => f.trim()).filter(f => f)
      formDataToSend.append("features", JSON.stringify(features))
      
      // Other fields
      formDataToSend.append("rating", formData.rating)
      formDataToSend.append("reviews", formData.reviews)
      formDataToSend.append("isFeatured", formData.isFeatured.toString())
      formDataToSend.append("isAvailable", formData.isAvailable.toString())
      
      if (imageFile) {
        formDataToSend.append("image", imageFile)
      }

      await carsApi.create(formDataToSend)
      router.push("/admin/cars")
    } catch (err: any) {
      alert(err.message || "Failed to create car")
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
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/admin/cars">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Link>
        </Button>

        <Card className="p-6">
          <h1 className="text-3xl font-bold font-serif mb-6">Add New Car</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Base Price (per day) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pricing Tiers *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">1-3 days</label>
                  <input
                    type="number"
                    value={formData["pricing.1-3"]}
                    onChange={(e) => setFormData({ ...formData, "pricing.1-3": e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">4-9 days</label>
                  <input
                    type="number"
                    value={formData["pricing.4-9"]}
                    onChange={(e) => setFormData({ ...formData, "pricing.4-9": e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">10-25 days</label>
                  <input
                    type="number"
                    value={formData["pricing.10-25"]}
                    onChange={(e) => setFormData({ ...formData, "pricing.10-25": e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">26+ days</label>
                  <input
                    type="number"
                    value={formData["pricing.26+"]}
                    onChange={(e) => setFormData({ ...formData, "pricing.26+": e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Passengers *</label>
                <input
                  type="number"
                  value={formData["specs.passengers"]}
                  onChange={(e) => setFormData({ ...formData, "specs.passengers": e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Transmission *</label>
                <input
                  type="text"
                  value={formData["specs.transmission"]}
                  onChange={(e) => setFormData({ ...formData, "specs.transmission": e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., AT, CVT, Manual"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fuel *</label>
                <input
                  type="text"
                  value={formData["specs.fuel"]}
                  onChange={(e) => setFormData({ ...formData, "specs.fuel": e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., 8 L / 100 km"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Power</label>
                <input
                  type="text"
                  value={formData["specs.power"]}
                  onChange={(e) => setFormData({ ...formData, "specs.power": e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., 180 HP"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Engine</label>
                <input
                  type="text"
                  value={formData["specs.engine"]}
                  onChange={(e) => setFormData({ ...formData, "specs.engine": e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., 1.6 L 128 hp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Drive</label>
                <input
                  type="text"
                  value={formData["specs.drive"]}
                  onChange={(e) => setFormData({ ...formData, "specs.drive": e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Front, AWD, RWD"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <input
                  type="number"
                  value={formData["specs.year"]}
                  onChange={(e) => setFormData({ ...formData, "specs.year": e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="2023"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Seats</label>
                <input
                  type="number"
                  value={formData["specs.seats"]}
                  onChange={(e) => setFormData({ ...formData, "specs.seats": e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
              <input
                type="text"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Bluetooth, USB Charging, Air Conditioning"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reviews Count</label>
                <input
                  type="number"
                  value={formData.reviews}
                  onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  />
                  Available
                </label>
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
                  "Create Car"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/cars">Cancel</Link>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

