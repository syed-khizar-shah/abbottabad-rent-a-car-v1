import * as LucideIcons from "lucide-react"

export function getIcon(iconName: string) {
  const IconComponent = (LucideIcons as any)[iconName]
  if (!IconComponent) {
    // Fallback to Car icon if icon not found
    return LucideIcons.Car
  }
  return IconComponent
}

