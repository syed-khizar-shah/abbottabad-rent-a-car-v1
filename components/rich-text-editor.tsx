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
  const isUpdatingRef = useRef(false)
  const initialValueSetRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    let QuillModule: typeof Quill
    let isMounted = true

    // Dynamically import Quill
    const initQuill = async () => {
      try {
        // Wait for the ref to be available
        if (!editorRef.current) {
          // Retry after a short delay
          setTimeout(() => {
            if (isMounted && editorRef.current) {
              initQuill()
            }
          }, 100)
          return
        }

        // Check if already initialized
        if (quillRef.current) return

        // Load CSS
        const linkId = "quill-snow-css"
        if (!document.getElementById(linkId)) {
          const link = document.createElement("link")
          link.id = linkId
          link.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css"
          link.rel = "stylesheet"
          document.head.appendChild(link)
          // Wait for CSS to load
          await new Promise((resolve) => {
            link.onload = resolve
            link.onerror = resolve
            setTimeout(resolve, 100) // Fallback timeout
          })
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

        // Set initial content only once
        if (value && !initialValueSetRef.current) {
          quill.root.innerHTML = value
          initialValueSetRef.current = true
        }

        // Listen for text changes - simplified without debouncing
        quill.on("text-change", (delta, oldDelta, source) => {
          if (source === "user" && isMounted && !isUpdatingRef.current) {
            try {
              const html = quill.root.innerHTML
              // Immediately call onChange without debouncing
              isUpdatingRef.current = true
              onChange(html)
              // Use microtask queue to reset flag
              Promise.resolve().then(() => {
                isUpdatingRef.current = false
              })
            } catch (error) {
              console.error("Error in onChange:", error)
              isUpdatingRef.current = false
            }
          }
        })

        quillRef.current = quill
        setMounted(true)
      } catch (error) {
        console.error("Error initializing Quill:", error)
        // Set mounted anyway to show error state
        setMounted(true)
      }
    }

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initQuill()
    }, 50)

    return () => {
      clearTimeout(timeoutId)
      isMounted = false
      if (quillRef.current) {
        // Remove all event listeners
        quillRef.current.off("text-change")
        quillRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update content when value prop changes (external updates only, not from user typing)
  useEffect(() => {
    if (!quillRef.current || isUpdatingRef.current || !mounted || !initialValueSetRef.current) return

    const currentContent = quillRef.current.root.innerHTML
    
    // Simple comparison - only update if value is different
    // Don't normalize to preserve exact formatting
    if (value !== currentContent && value !== undefined && value !== null) {
      try {
        isUpdatingRef.current = true
        
        // Save current selection
        const selection = quillRef.current.getSelection()
        
        // Update content
        quillRef.current.root.innerHTML = value || ""
        
        // Restore selection if it existed and is valid
        if (selection && quillRef.current) {
          requestAnimationFrame(() => {
            try {
              if (quillRef.current) {
                const length = quillRef.current.getLength()
                const safeIndex = Math.max(0, Math.min(selection.index, length - 1))
                quillRef.current.setSelection(safeIndex)
              }
            } catch (e) {
              // Ignore selection errors
            }
            isUpdatingRef.current = false
          })
        } else {
          isUpdatingRef.current = false
        }
      } catch (error) {
        console.error("Error updating Quill content:", error)
        isUpdatingRef.current = false
      }
    }
  }, [value, mounted])

  return (
    <div className="rich-text-editor relative">
      {/* Always render the editor container so ref is available */}
      <div 
        ref={editorRef} 
        className={`bg-background ${!mounted ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Show loading skeleton overlay while mounting */}
      {!mounted && (
        <div className="absolute inset-0 min-h-[300px] border rounded-lg p-4 bg-muted/50 animate-pulse pointer-events-none">
          <div className="h-10 bg-muted rounded mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      )}
      
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

