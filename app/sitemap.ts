import type { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: seoConfig.siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${seoConfig.siteUrl}/products`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${seoConfig.siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${seoConfig.siteUrl}/cart`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}
