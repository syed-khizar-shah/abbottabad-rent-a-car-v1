import { siteConfig } from "@/lib/metadata"

export default function sitemap() {
  const routes = [
    "",
    "/fleet",
    "/about",
    "/reviews",
    "/faqs",
    "/blog",
    "/contact",
    "/services",
    "/gallery",
    "/service-areas",
    "/packages",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : ("weekly" as const),
    priority: route === "" ? 1 : 0.8,
  }))

  return routes
}
