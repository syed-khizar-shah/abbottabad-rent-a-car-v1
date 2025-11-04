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
        if (key === 'contactMethods' || key === 'services' || key === 'whyChooseUs' || key === 'mapCoordinates' || key === 'businessHours' || key === 'socialMedia') {
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

            {/* Contact Methods */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Contact Methods Cards</h2>
              <div className="space-y-4">
                {(formData.contactMethods || []).map((method: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Icon (Phone, Mail, MapPin, Clock)</label>
                        <input
                          type="text"
                          value={method.icon || ""}
                          onChange={(e) => {
                            const newMethods = [...(formData.contactMethods || [])]
                            newMethods[index] = { ...method, icon: e.target.value }
                            updateField("contactMethods", newMethods)
                          }}
                          className="w-full px-2 py-1 text-sm border rounded"
                          placeholder="Phone"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Title</label>
                        <input
                          type="text"
                          value={method.title || ""}
                          onChange={(e) => {
                            const newMethods = [...(formData.contactMethods || [])]
                            newMethods[index] = { ...method, title: e.target.value }
                            updateField("contactMethods", newMethods)
                          }}
                          className="w-full px-2 py-1 text-sm border rounded"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Details (one per line)</label>
                      <textarea
                        value={method.details?.join('\n') || ""}
                        onChange={(e) => {
                          const newMethods = [...(formData.contactMethods || [])]
                          newMethods[index] = { 
                            ...method, 
                            details: e.target.value.split('\n').filter(d => d.trim()) 
                          }
                          updateField("contactMethods", newMethods)
                        }}
                        className="w-full px-2 py-1 text-sm border rounded"
                        rows={3}
                        placeholder="+92 300 1234567&#10;+92 992 123456"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <input
                        type="text"
                        value={method.description || ""}
                        onChange={(e) => {
                          const newMethods = [...(formData.contactMethods || [])]
                          newMethods[index] = { ...method, description: e.target.value }
                          updateField("contactMethods", newMethods)
                        }}
                        className="w-full px-2 py-1 text-sm border rounded"
                        placeholder="Available 24/7 for your convenience"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newMethods = (formData.contactMethods || []).filter((_: any, i: number) => i !== index)
                        updateField("contactMethods", newMethods)
                      }}
                    >
                      Remove Method
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newMethods = [...(formData.contactMethods || []), { icon: "", title: "", details: [], description: "" }]
                    updateField("contactMethods", newMethods)
                  }}
                >
                  Add Contact Method
                </Button>
              </div>
            </Card>

            {/* Services */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Services</h2>
              <div className="space-y-4">
                {(formData.services || []).map((service: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={service || ""}
                      onChange={(e) => {
                        const newServices = [...(formData.services || [])]
                        newServices[index] = e.target.value
                        updateField("services", newServices)
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="Wedding Car Rental"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newServices = (formData.services || []).filter((_: any, i: number) => i !== index)
                        updateField("services", newServices)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newServices = [...(formData.services || []), ""]
                    updateField("services", newServices)
                  }}
                >
                  Add Service
                </Button>
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

            {/* Business Hours */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Business Hours</h2>
              <div className="space-y-4">
                {(formData.businessHours || []).map((schedule: any, index: number) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <label className="block text-xs font-medium mb-1">Day</label>
                      <input
                        type="text"
                        value={schedule.day || ""}
                        onChange={(e) => {
                          const newHours = [...(formData.businessHours || [])]
                          newHours[index] = { ...schedule, day: e.target.value }
                          updateField("businessHours", newHours)
                        }}
                        className="w-full px-2 py-1 text-sm border rounded"
                        placeholder="Monday - Friday"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Hours</label>
                      <input
                        type="text"
                        value={schedule.hours || ""}
                        onChange={(e) => {
                          const newHours = [...(formData.businessHours || [])]
                          newHours[index] = { ...schedule, hours: e.target.value }
                          updateField("businessHours", newHours)
                        }}
                        className="w-full px-2 py-1 text-sm border rounded"
                        placeholder="9:00 AM - 8:00 PM"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newHours = [...(formData.businessHours || []), { day: "", hours: "" }]
                    updateField("businessHours", newHours)
                  }}
                >
                  Add Business Hour
                </Button>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Social Media Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.facebook || ""}
                    onChange={(e) => updateField("socialMedia", {
                      ...formData.socialMedia,
                      facebook: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.instagram || ""}
                    onChange={(e) => updateField("socialMedia", {
                      ...formData.socialMedia,
                      instagram: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter URL</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.twitter || ""}
                    onChange={(e) => updateField("socialMedia", {
                      ...formData.socialMedia,
                      twitter: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.linkedin || ""}
                    onChange={(e) => updateField("socialMedia", {
                      ...formData.socialMedia,
                      linkedin: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://linkedin.com/company/yourpage"
                  />
                </div>
              </div>
            </Card>

            {/* Why Choose Us */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Why Choose Us</h2>
              <div className="space-y-4">
                {(formData.whyChooseUs || []).map((item: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item || ""}
                      onChange={(e) => {
                        const newItems = [...(formData.whyChooseUs || [])]
                        newItems[index] = e.target.value
                        updateField("whyChooseUs", newItems)
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="Enter a benefit"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newItems = (formData.whyChooseUs || []).filter((_: any, i: number) => i !== index)
                        updateField("whyChooseUs", newItems)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newItems = [...(formData.whyChooseUs || []), ""]
                    updateField("whyChooseUs", newItems)
                  }}
                >
                  Add Item
                </Button>
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

