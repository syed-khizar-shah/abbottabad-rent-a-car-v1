"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authApi, homepageApi } from "@/lib/api"
import { ArrowLeft, Loader2, Save } from "lucide-react"

export default function AdminHomepagePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

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
      const data = await homepageApi.get()
      if (data && !data.message) {
        setContent(data)
        setFormData(data)
      }
    } catch (err) {
      console.error("Error loading homepage content:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await homepageApi.update(formData)
      alert("Homepage content updated successfully!")
      await loadContent()
    } catch (err: any) {
      alert(err.message || "Failed to update homepage content")
    } finally {
      setSaving(false)
    }
  }

  const updateField = (path: string, value: any) => {
    const keys = path.split('.')
    const newData = { ...formData }
    let current: any = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {}
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]] = value
    setFormData(newData)
  }

  const updateArrayField = (path: string, index: number, field: string, value: any) => {
    const newData = { ...formData }
    const keys = path.split('.')
    let current: any = newData
    
    for (const key of keys) {
      current = current[key]
    }
    
    current[index][field] = value
    setFormData(newData)
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
            <p className="text-muted-foreground mb-4">No homepage content found. Please run the seed script first.</p>
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
          <h1 className="text-3xl font-bold font-serif">Homepage Content</h1>
          <div></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Hero Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.heroTitle || ""}
                    onChange={(e) => updateField("heroTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title Accent</label>
                  <input
                    type="text"
                    value={formData.heroTitleAccent || ""}
                    onChange={(e) => updateField("heroTitleAccent", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={formData.heroSubtitle || ""}
                    onChange={(e) => updateField("heroSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Stats</h2>
              <div className="space-y-4">
                {formData.stats?.map((stat: any, index: number) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <label className="block text-xs font-medium mb-1">Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateArrayField("stats", index, "value", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateArrayField("stats", index, "label", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Icon</label>
                      <input
                        type="text"
                        value={stat.icon}
                        onChange={(e) => updateArrayField("stats", index, "icon", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Testimonials */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Testimonials</h2>
              <div className="space-y-4">
                {formData.testimonials?.map((testimonial: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Name</label>
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) => updateArrayField("testimonials", index, "name", e.target.value)}
                          className="w-full px-2 py-1 text-sm border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Role</label>
                        <input
                          type="text"
                          value={testimonial.role}
                          onChange={(e) => updateArrayField("testimonials", index, "role", e.target.value)}
                          className="w-full px-2 py-1 text-sm border rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Text</label>
                      <textarea
                        value={testimonial.text}
                        onChange={(e) => updateArrayField("testimonials", index, "text", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Rating</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={testimonial.rating}
                        onChange={(e) => updateArrayField("testimonials", index, "rating", parseFloat(e.target.value))}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTA Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">CTA Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.ctaTitle || ""}
                    onChange={(e) => updateField("ctaTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={formData.ctaSubtitle || ""}
                    onChange={(e) => updateField("ctaSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="text"
                      value={formData.ctaPhone || ""}
                      onChange={(e) => updateField("ctaPhone", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.ctaEmail || ""}
                      onChange={(e) => updateField("ctaEmail", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.ctaAddress || ""}
                    onChange={(e) => updateField("ctaAddress", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
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

