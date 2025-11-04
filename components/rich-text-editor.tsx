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
    let changeTimeout: NodeJS.Timeout | null = null

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

        // Listen for text changes with proper state management
        quill.on("text-change", (delta, oldDelta, source) => {
          if (isMounted && !isUpdatingRef.current && source === "user") {
            // Debounce onChange to prevent too many updates
            if (changeTimeout) {
              clearTimeout(changeTimeout)
            }
            changeTimeout = setTimeout(() => {
              if (isMounted && quillRef.current && !isUpdatingRef.current) {
                try {
                  const html = quillRef.current.root.innerHTML
                  isUpdatingRef.current = true
                  onChange(html)
                  // Reset flag after a short delay
                  setTimeout(() => {
                    isUpdatingRef.current = false
                  }, 10)
                } catch (error) {
                  console.error("Error in onChange:", error)
                  isUpdatingRef.current = false
                }
              }
            }, 50)
          }
        })

        // Handle selection changes to prevent cursor issues
        quill.on("selection-change", (range) => {
          // Prevent cursor errors by ensuring selection is valid
          if (range && quillRef.current) {
            try {
              const length = quillRef.current.getLength()
              if (range.index > length || range.index < 0) {
                // Invalid selection, reset to end
                quillRef.current.setSelection(length - 1)
              }
            } catch (e) {
              // Ignore selection errors
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
      if (changeTimeout) {
        clearTimeout(changeTimeout)
      }
      isMounted = false
      if (quillRef.current) {
        // Remove all event listeners
        quillRef.current.off("text-change")
        quillRef.current.off("selection-change")
        quillRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update content when value prop changes (external updates only)
  useEffect(() => {
    if (!quillRef.current || isUpdatingRef.current || !mounted) return

    const currentContent = quillRef.current.root.innerHTML
    // Normalize HTML for comparison (remove extra whitespace)
    const normalizeHTML = (html: string) => html.trim().replace(/\s+/g, " ")
    const normalizedCurrent = normalizeHTML(currentContent)
    const normalizedValue = normalizeHTML(value || "")

    // Only update if value is actually different and not from user input
    if (normalizedValue !== normalizedCurrent && value !== undefined && value !== null && value !== "") {
      try {
        isUpdatingRef.current = true
        
        // Save selection before update
        const selection = quillRef.current.getSelection(true)
        const lengthBefore = quillRef.current.getLength()
        
        // Update content using delta if possible, otherwise use innerHTML
        try {
          quillRef.current.root.innerHTML = value
        } catch (e) {
          console.error("Error setting innerHTML:", e)
          isUpdatingRef.current = false
          return
        }

        // Wait for DOM to update before restoring selection
        requestAnimationFrame(() => {
          if (quillRef.current && selection) {
            try {
              const lengthAfter = quillRef.current.getLength()
              // Adjust selection if content length changed
              let adjustedIndex = selection.index
              const lengthDiff = lengthAfter - lengthBefore
              
              if (lengthDiff !== 0 && selection.index >= lengthBefore) {
                // Selection was at end, keep it at end
                adjustedIndex = lengthAfter - 1
              } else if (adjustedIndex > lengthAfter - 1) {
                adjustedIndex = lengthAfter - 1
              } else if (adjustedIndex < 0) {
                adjustedIndex = 0
              }

              // Ensure selection is within bounds
              const safeIndex = Math.max(0, Math.min(adjustedIndex, lengthAfter - 1))
              const safeLength = selection.length ? Math.min(selection.length, lengthAfter - safeIndex) : 0
              
              quillRef.current.setSelection(safeIndex, safeLength)
            } catch (e) {
              // If selection fails, set to end
              try {
                const length = quillRef.current.getLength()
                quillRef.current.setSelection(length - 1)
              } catch (e2) {
                // Ignore if still fails
              }
            }
          }
          isUpdatingRef.current = false
        })
      } catch (error) {
        console.error("Error updating Quill content:", error)
        isUpdatingRef.current = false
      }
    } else if (value === "" && currentContent !== "") {
      // Handle empty value case
      try {
        isUpdatingRef.current = true
        quillRef.current.root.innerHTML = ""
        requestAnimationFrame(() => {
          isUpdatingRef.current = false
        })
      } catch (error) {
        console.error("Error clearing Quill content:", error)
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

