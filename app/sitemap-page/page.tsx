import type { Metadata } from "next"
import SitemapClientPage from "./sitemap-client-page"

export const metadata: Metadata = {
  title: "Sitemap | Abbottabad Rent A Car",
  description:
    "Navigate through all pages of Abbottabad Rent A Car website. Find luxury car rentals, services, and information easily.",
  keywords: "sitemap, website navigation, Abbottabad rent a car pages",
}

export default function SitemapPage() {
  return <SitemapClientPage />
}
