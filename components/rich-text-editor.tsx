"use client"

import { useRef, useEffect, useState } from "react"
import type Quill from "quill"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Write your content here..." }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    let QuillModule: typeof Quill
    let isMounted = true

    // Dynamically import Quill
    const initQuill = async () => {
      try {
        // Load CSS
        const linkId = "quill-snow-css"
        if (!document.getElementById(linkId)) {
          const link = document.createElement("link")
          link.id = linkId
          link.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css"
          link.rel = "stylesheet"
          document.head.appendChild(link)
        }

        // Import Quill
        QuillModule = (await import("quill")).default

        if (!isMounted || !editorRef.current || quillRef.current) return

        // Initialize Quill
        const quill = new QuillModule(editorRef.current, {
          theme: "snow",
          placeholder,
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
              ["link", "image", "video"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
            ],
            clipboard: {
              matchVisual: false,
            },
          },
        })

        // Set initial content
        if (value) {
          quill.root.innerHTML = value
        }

        // Listen for text changes
        quill.on("text-change", () => {
          const html = quill.root.innerHTML
          onChange(html)
        })

        quillRef.current = quill
        setMounted(true)
      } catch (error) {
        console.error("Error initializing Quill:", error)
      }
    }

    initQuill()

    return () => {
      isMounted = false
      if (quillRef.current) {
        quillRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update content when value prop changes (external updates)
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      const selection = quillRef.current.getSelection()
      const currentContent = quillRef.current.root.innerHTML
      if (value !== currentContent) {
        quillRef.current.root.innerHTML = value
        // Restore selection after a brief delay
        setTimeout(() => {
          if (quillRef.current && selection) {
            quillRef.current.setSelection(selection)
          }
        }, 0)
      }
    }
  }, [value])

  if (!mounted) {
    return (
      <div className="min-h-[300px] border rounded-lg p-4 bg-muted/50 animate-pulse">
        <div className="h-10 bg-muted rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </div>
    )
  }

  return (
    <div className="rich-text-editor">
      <div ref={editorRef} className="bg-background" />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          font-family: inherit;
          font-size: 1rem;
          min-height: 300px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .rich-text-editor .ql-editor {
          min-height: 300px;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: hsl(var(--muted));
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }
      `}</style>
    </div>
  )
}

