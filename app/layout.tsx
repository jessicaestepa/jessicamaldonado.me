import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  keywords: [
    site.name,
    'Jessica Maldonado',
    site.profession,
    site.city,
    'portfolio',
    'Jessica M. Estepa',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.shortDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.shortDescription,
    images: ['/opengraph-image'],
    creator: site.social.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: [...site.alternateNames],
  givenName: 'Jessica',
  familyName: 'Maldonado Estepa',
  url: site.url,
  image: `${site.url}/opengraph-image`,
  jobTitle: site.profession,
  description: site.shortDescription,
  email: site.email,
  sameAs: [
    site.social.linkedin,
    site.social.github,
    site.social.instagram,
    site.social.twitter,
  ],
  knowsAbout: [...site.knowsAbout],
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressCountry: site.country,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="es-CO">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
