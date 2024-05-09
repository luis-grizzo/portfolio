import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://luisgrizzo.dev',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1
    }
  ]
}
