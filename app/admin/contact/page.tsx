"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authApi, contactApi } from "@/lib/api"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Image from "next/image"

export default function AdminContactPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null)
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
    loadContent()
  }, [])

  const checkAuth = async () => {
    try {
      await authApi.me()
    } catch {
      router.push("/admin/login")
    }
  }

  const loadContent = async () => {
    try {
      const data = await contactApi.get()
      if (data && !data.message) {
        setContent(data)
        setFormData(data)
      }
    } catch (err) {
      console.error("Error loading contact content:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const formDataToSend = new FormData()
      
      // Add all text fields
      Object.keys(formData).forEach(key => {
        if (key === 'contactMethods' || key === 'services' || key === 'whyChooseUs' || key === 'mapCoordinates') {
          formDataToSend.append(key, JSON.stringify(formData[key]))
        } else if (key !== 'heroImage') {
          formDataToSend.append(key, formData[key] || '')
        }
      })
      
      // Handle map coordinates separately
      if (formData.mapCoordinates) {
        formDataToSend.append('mapCoordinates.lat', formData.mapCoordinates.lat?.toString() || '')
        formDataToSend.append('mapCoordinates.lng', formData.mapCoordinates.lng?.toString() || '')
      }
      
      // Add hero image if selected
      if (heroImageFile) {
        formDataToSend.append('heroImage', heroImageFile)
      }
      
      await contactApi.update(formDataToSend)
      
      alert("Contact content updated successfully!")
      setHeroImageFile(null)
      setHeroImagePreview(null)
      await loadContent()
    } catch (err: any) {
      alert(err.message || "Failed to update contact content")
    } finally {
      setSaving(false)
    }
  }
  
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHeroImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No contact content found. Please run the seed script first.</p>
            <Button variant="outline" asChild>
              <Link href="/admin/dashboard">Back to Dashboard</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-serif">Contact Content</h1>
          <div></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Hero Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Image</label>
                  <div className="space-y-2">
                    {(heroImagePreview || formData.heroImage) && (
                      <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                        <Image
                          src={heroImagePreview || formData.heroImage}
                          alt="Hero preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageChange}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Title</label>
                  <input
                    type="text"
                    value={formData.heroTitle || ""}
                    onChange={(e) => updateField("heroTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Title Accent</label>
                  <input
                    type="text"
                    value={formData.heroTitleAccent || ""}
                    onChange={(e) => updateField("heroTitleAccent", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                  <textarea
                    value={formData.heroSubtitle || ""}
                    onChange={(e) => updateField("heroSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp Number *</label>
                    <input
                      type="text"
                      value={formData.whatsappNumber || ""}
                      onChange={(e) => updateField("whatsappNumber", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="+92 300 1234567"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="text"
                      value={formData.phoneNumber || ""}
                      onChange={(e) => updateField("phoneNumber", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="+92 300 1234567"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <input
                    type="text"
                    value={formData.address || ""}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Map Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Map Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Map Embed URL</label>
                  <input
                    type="text"
                    value={formData.mapEmbedUrl || ""}
                    onChange={(e) => updateField("mapEmbedUrl", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.mapCoordinates?.lat || ""}
                      onChange={(e) => updateField("mapCoordinates", {
                        ...formData.mapCoordinates,
                        lat: parseFloat(e.target.value) || 0
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.mapCoordinates?.lng || ""}
                      onChange={(e) => updateField("mapCoordinates", {
                        ...formData.mapCoordinates,
                        lng: parseFloat(e.target.value) || 0
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Form Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Contact Form</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Form Title</label>
                  <input
                    type="text"
                    value={formData.formTitle || ""}
                    onChange={(e) => updateField("formTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Form Subtitle</label>
                  <textarea
                    value={formData.formSubtitle || ""}
                    onChange={(e) => updateField("formSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={2}
                  />
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

