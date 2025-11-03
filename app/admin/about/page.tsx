"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authApi, aboutApi } from "@/lib/api"
import { ArrowLeft, Loader2, Save, Plus, Trash2 } from "lucide-react"

export default function AdminAboutPage() {
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
      const data = await aboutApi.get()
      if (data && !data.message) {
        setContent(data)
        setFormData(data)
      }
    } catch (err) {
      console.error("Error loading about content:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await aboutApi.update(formData)
      alert("About content updated successfully!")
      await loadContent()
    } catch (err: any) {
      alert(err.message || "Failed to update about content")
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

  const updateArrayItem = (path: string, index: number, field: string, value: any) => {
    const newData = { ...formData }
    const keys = path.split('.')
    let current: any = newData
    
    for (const key of keys) {
      current = current[key]
    }
    
    current[index][field] = value
    setFormData(newData)
  }

  const addArrayItem = (path: string, item: any) => {
    const newData = { ...formData }
    const keys = path.split('.')
    let current: any = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = []
      current = current[keys[i]]
    }
    
    if (!current[keys[keys.length - 1]]) current[keys[keys.length - 1]] = []
    current[keys[keys.length - 1]].push(item)
    setFormData(newData)
  }

  const removeArrayItem = (path: string, index: number) => {
    const newData = { ...formData }
    const keys = path.split('.')
    let current: any = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]].splice(index, 1)
    setFormData(newData)
  }

  const addParagraph = () => {
    const newData = { ...formData }
    if (!newData.storyParagraphs) newData.storyParagraphs = []
    newData.storyParagraphs.push("")
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
          <h1 className="text-3xl font-bold font-serif">About Us Content</h1>
          <div></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Hero Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Hero Section</h2>
              <div className="space-y-4">
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
                    rows={3}
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
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Stats</h2>
                <Button type="button" size="sm" onClick={() => addArrayItem("stats", { label: "", value: "" })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stat
                </Button>
              </div>
              <div className="space-y-3">
                {formData.stats?.map((stat: any, index: number) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-3 border rounded-lg">
                    <div>
                      <label className="block text-xs font-medium mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label || ""}
                        onChange={(e) => updateArrayItem("stats", index, "label", e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-medium mb-1">Value</label>
                        <input
                          type="text"
                          value={stat.value || ""}
                          onChange={(e) => updateArrayItem("stats", index, "value", e.target.value)}
                          className="w-full px-2 py-1 text-sm border rounded"
                        />
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("stats", index)} className="mt-5">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Story Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Story Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.storyTitle || ""}
                    onChange={(e) => updateField("storyTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Paragraphs</label>
                  <div className="space-y-2">
                    {formData.storyParagraphs?.map((para: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <textarea
                          value={para}
                          onChange={(e) => {
                            const newData = { ...formData }
                            newData.storyParagraphs[index] = e.target.value
                            setFormData(newData)
                          }}
                          className="flex-1 px-3 py-2 border rounded-lg"
                          rows={2}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => {
                          const newData = { ...formData }
                          newData.storyParagraphs.splice(index, 1)
                          setFormData(newData)
                        }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" size="sm" variant="outline" onClick={addParagraph}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Paragraph
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Story Image URL</label>
                  <input
                    type="text"
                    value={formData.storyImage || ""}
                    onChange={(e) => updateField("storyImage", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Button Text</label>
                  <input
                    type="text"
                    value={formData.storyButtonText || ""}
                    onChange={(e) => updateField("storyButtonText", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </Card>

            {/* Values */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Values</h2>
                <Button type="button" size="sm" onClick={() => addArrayItem("values", { icon: "Award", title: "", description: "" })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Value
                </Button>
              </div>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.valuesTitle || ""}
                    onChange={(e) => updateField("valuesTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.valuesSubtitle || ""}
                    onChange={(e) => updateField("valuesSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {formData.values?.map((value: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={value.icon || ""}
                        onChange={(e) => updateArrayItem("values", index, "icon", e.target.value)}
                        className="px-2 py-1 text-sm border rounded"
                        placeholder="Icon name"
                      />
                      <input
                        type="text"
                        value={value.title || ""}
                        onChange={(e) => updateArrayItem("values", index, "title", e.target.value)}
                        className="px-2 py-1 text-sm border rounded"
                        placeholder="Title"
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("values", index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <textarea
                      value={value.description || ""}
                      onChange={(e) => updateArrayItem("values", index, "description", e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      rows={2}
                      placeholder="Description"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Milestones */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Milestones</h2>
                <Button type="button" size="sm" onClick={() => addArrayItem("milestones", { year: "", title: "", description: "" })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Milestone
                </Button>
              </div>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.timelineTitle || ""}
                    onChange={(e) => updateField("timelineTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.timelineSubtitle || ""}
                    onChange={(e) => updateField("timelineSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {formData.milestones?.map((milestone: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={milestone.year || ""}
                        onChange={(e) => updateArrayItem("milestones", index, "year", e.target.value)}
                        className="px-2 py-1 text-sm border rounded"
                        placeholder="Year"
                      />
                      <input
                        type="text"
                        value={milestone.title || ""}
                        onChange={(e) => updateArrayItem("milestones", index, "title", e.target.value)}
                        className="px-2 py-1 text-sm border rounded"
                        placeholder="Title"
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("milestones", index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <textarea
                      value={milestone.description || ""}
                      onChange={(e) => updateArrayItem("milestones", index, "description", e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      rows={2}
                      placeholder="Description"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Team */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Team</h2>
                <Button type="button" size="sm" onClick={() => addArrayItem("team", { name: "", role: "", image: "", bio: "" })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </div>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.teamTitle || ""}
                    onChange={(e) => updateField("teamTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.teamSubtitle || ""}
                    onChange={(e) => updateField("teamSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {formData.team?.map((member: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={member.name || ""}
                        onChange={(e) => updateArrayItem("team", index, "name", e.target.value)}
                        className="px-2 py-1 text-sm border rounded"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={member.role || ""}
                        onChange={(e) => updateArrayItem("team", index, "role", e.target.value)}
                        className="px-2 py-1 text-sm border rounded"
                        placeholder="Role"
                      />
                    </div>
                    <input
                      type="text"
                      value={member.image || ""}
                      onChange={(e) => updateArrayItem("team", index, "image", e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="Image URL"
                    />
                    <textarea
                      value={member.bio || ""}
                      onChange={(e) => updateArrayItem("team", index, "bio", e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      rows={2}
                      placeholder="Bio"
                    />
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem("team", index)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Certifications</h2>
                <Button type="button" size="sm" onClick={() => {
                  const newData = { ...formData }
                  if (!newData.certifications) newData.certifications = []
                  newData.certifications.push("")
                  setFormData(newData)
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.certificationsTitle || ""}
                    onChange={(e) => updateField("certificationsTitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.certificationsSubtitle || ""}
                    onChange={(e) => updateField("certificationsSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                {formData.certifications?.map((cert: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => {
                        const newData = { ...formData }
                        newData.certifications[index] = e.target.value
                        setFormData(newData)
                      }}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="Certification name"
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => {
                      const newData = { ...formData }
                      newData.certifications.splice(index, 1)
                      setFormData(newData)
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
