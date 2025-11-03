"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authApi, tourRoutesApi } from "@/lib/api"
import { ArrowLeft, Loader2, Save, Plus, Trash2 } from "lucide-react"

export default function AdminTourRoutesPage() {
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
      const data = await tourRoutesApi.get()
      if (data && !data.message) {
        setContent(data)
        setFormData(data)
      }
    } catch (err) {
      console.error("Error loading tour routes:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await tourRoutesApi.update(formData)
      alert("Tour routes updated successfully!")
      await loadContent()
    } catch (err: any) {
      alert(err.message || "Failed to update tour routes")
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

  const addRoute = (categoryIndex: number) => {
    const newData = { ...formData }
    if (!newData.routes) newData.routes = []
    if (!newData.routes[categoryIndex].routes) newData.routes[categoryIndex].routes = []
    newData.routes[categoryIndex].routes.push({ destination: "", oneWay: "On Call", twoWay: "On Call" })
    setFormData(newData)
  }

  const removeRoute = (categoryIndex: number, routeIndex: number) => {
    const newData = { ...formData }
    newData.routes[categoryIndex].routes.splice(routeIndex, 1)
    setFormData(newData)
  }

  const updateRoute = (categoryIndex: number, routeIndex: number, field: string, value: string) => {
    const newData = { ...formData }
    newData.routes[categoryIndex].routes[routeIndex][field] = value
    setFormData(newData)
  }

  const addCategory = () => {
    const newData = { ...formData }
    if (!newData.routes) newData.routes = []
    newData.routes.push({ category: "", routes: [] })
    setFormData(newData)
  }

  const removeCategory = (categoryIndex: number) => {
    const newData = { ...formData }
    newData.routes.splice(categoryIndex, 1)
    setFormData(newData)
  }

  const updateCategory = (categoryIndex: number, value: string) => {
    const newData = { ...formData }
    newData.routes[categoryIndex].category = value
    setFormData(newData)
  }

  const addDestination = () => {
    const newData = { ...formData }
    if (!newData.popularDestinations) newData.popularDestinations = []
    newData.popularDestinations.push("")
    setFormData(newData)
  }

  const removeDestination = (index: number) => {
    const newData = { ...formData }
    newData.popularDestinations.splice(index, 1)
    setFormData(newData)
  }

  const updateDestination = (index: number, value: string) => {
    const newData = { ...formData }
    newData.popularDestinations[index] = value
    setFormData(newData)
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
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-serif">Tour Routes Content</h1>
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
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={formData.heroSubtitle || ""}
                    onChange={(e) => updateField("heroSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Badge</label>
                  <input
                    type="text"
                    value={formData.heroBadge || ""}
                    onChange={(e) => updateField("heroBadge", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Image URL</label>
                  <input
                    type="text"
                    value={formData.heroImage || ""}
                    onChange={(e) => updateField("heroImage", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="text"
                      value={formData.heroPhone || ""}
                      onChange={(e) => updateField("heroPhone", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp</label>
                    <input
                      type="text"
                      value={formData.heroWhatsApp || ""}
                      onChange={(e) => updateField("heroWhatsApp", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary CTA</label>
                    <input
                      type="text"
                      value={formData.heroPrimaryCTA || ""}
                      onChange={(e) => updateField("heroPrimaryCTA", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary CTA</label>
                    <input
                      type="text"
                      value={formData.heroSecondaryCTA || ""}
                      onChange={(e) => updateField("heroSecondaryCTA", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Popular Destinations */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Popular Destinations</h2>
                <Button type="button" size="sm" onClick={addDestination}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Destination
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.popularDestinationsTitle || ""}
                  onChange={(e) => updateField("popularDestinationsTitle", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg mb-4"
                />
              </div>
              <div className="space-y-2">
                {formData.popularDestinations?.map((dest: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={dest}
                      onChange={(e) => updateDestination(index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="Destination name"
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeDestination(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tour Routes */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Tour Routes by Category</h2>
                <Button type="button" size="sm" onClick={addCategory}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
              <div className="space-y-6">
                {formData.routes?.map((category: any, categoryIndex: number) => (
                  <Card key={categoryIndex} className="p-4 border-2">
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={category.category}
                        onChange={(e) => updateCategory(categoryIndex, e.target.value)}
                        className="text-lg font-bold px-3 py-1 border rounded-lg flex-1"
                        placeholder="Category name (e.g., From Islamabad)"
                      />
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeCategory(categoryIndex)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Category
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {category.routes?.map((route: any, routeIndex: number) => (
                        <div key={routeIndex} className="grid grid-cols-4 gap-2 p-2 border rounded">
                          <input
                            type="text"
                            value={route.destination}
                            onChange={(e) => updateRoute(categoryIndex, routeIndex, "destination", e.target.value)}
                            className="px-2 py-1 text-sm border rounded"
                            placeholder="Destination"
                          />
                          <input
                            type="text"
                            value={route.oneWay}
                            onChange={(e) => updateRoute(categoryIndex, routeIndex, "oneWay", e.target.value)}
                            className="px-2 py-1 text-sm border rounded"
                            placeholder="One Way"
                          />
                          <input
                            type="text"
                            value={route.twoWay}
                            onChange={(e) => updateRoute(categoryIndex, routeIndex, "twoWay", e.target.value)}
                            className="px-2 py-1 text-sm border rounded"
                            placeholder="Round Trip"
                          />
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeRoute(categoryIndex, routeIndex)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" size="sm" variant="outline" onClick={() => addRoute(categoryIndex)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Route
                      </Button>
                    </div>
                  </Card>
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
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Button</label>
                    <input
                      type="text"
                      value={formData.ctaPrimaryButton || ""}
                      onChange={(e) => updateField("ctaPrimaryButton", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Button</label>
                    <input
                      type="text"
                      value={formData.ctaSecondaryButton || ""}
                      onChange={(e) => updateField("ctaSecondaryButton", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="text"
                      value={formData.ctaPhone || ""}
                      onChange={(e) => updateField("ctaPhone", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
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
