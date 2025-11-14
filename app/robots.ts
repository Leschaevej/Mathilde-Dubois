import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mathildedubois.fr'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '/favicon.ico',
        '/site.webmanifest',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}