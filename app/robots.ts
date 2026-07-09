import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/admin/', '/login/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/login/'],
      },
    ],
    sitemap: 'https://arvandsmart.vercel.app/sitemap.xml',
  }
}
