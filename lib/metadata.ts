export const siteConfig = {
  name: "Abbottabad Rent A Car",
  description:
    "Premium car rental services in Abbottabad, Pakistan. Rent luxury cars, SUVs, sedans for weddings, corporate events, and tourism. Best rates, 24/7 service, and professional drivers available.",
  url: "https://abbottabadrentacar.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "rent a car Abbottabad",
    "car rental Abbottabad Pakistan",
    "luxury car rental Abbottabad",
    "wedding car rental Abbottabad",
    "SUV rental Abbottabad",
    "corporate car rental Abbottabad",
    "self drive car rental Abbottabad",
    "car hire Abbottabad",
    "Abbottabad car rental services",
    "rent a car in Abbottabad",
    "cheap car rental Abbottabad",
    "monthly car rental Abbottabad",
    "airport transfer Abbottabad",
    "tourism car rental Pakistan",
    "Nathia Gali car rental",
    "Murree car rental",
    "KPK car rental services",
  ],
  contact: {
    phone: "+92 300 1234567",
    whatsapp: "+92 300 1234567",
    email: "info@abbottabadrentacar.com",
    address: "Main Mansehra Road, Abbottabad, Khyber Pakhtunkhwa, Pakistan",
  },
  social: {
    facebook: "https://facebook.com/abbottabadrentacar",
    instagram: "https://instagram.com/abbottabadrentacar",
    twitter: "https://twitter.com/abbottabadrentacar",
  },
  serviceAreas: [
    "Abbottabad",
    "Mansehra",
    "Haripur",
    "Nathia Gali",
    "Ayubia",
    "Murree",
    "Islamabad",
    "Rawalpindi",
    "Balakot",
    "Shogran",
    "Naran",
    "Kaghan",
  ],
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  path = "",
}: {
  title: string
  description: string
  keywords?: string[]
  image?: string
  path?: string
}) {
  const fullTitle = `${title} | ${siteConfig.name}`
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...(keywords || [])].join(", "),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_PK",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@abbottabadrentacar",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export const generateMetadata = generatePageMetadata
