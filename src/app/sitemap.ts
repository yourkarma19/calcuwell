import { MetadataRoute } from 'next'
import { calculators, categories } from '@/lib/calculators'

const a_second_one = "https://calcpro.online"

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorEntries: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${a_second_one}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${a_second_one}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))
  
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: a_second_one,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${a_second_one}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${a_second_one}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${a_second_one}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${a_second_one}/terms-of-use`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...staticEntries, ...categoryEntries, ...calculatorEntries]
}
