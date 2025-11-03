import type { Metadata } from "next"
import PrivacyClientPage from "./privacyClientPage"

export const metadata: Metadata = {
  title: "Privacy Policy | Abbottabad Rent A Car",
  description: "Learn how Abbottabad Rent A Car protects your privacy and handles your personal information.",
  keywords: "privacy policy, data protection, personal information, Abbottabad rent a car",
}

export default function PrivacyPage() {
  return <PrivacyClientPage />
}
