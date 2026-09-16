import { MetadataRoute } from 'next';
import prisma from '@/lib/db';
import { FALLBACK_PRODUCTS } from '@/lib/products-fallback';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://a1luxuryfurniture.com';
  let products: any[] = [];

  try {
    products = await prisma.product.findMany({
      select: { slug: true, updatedAt: true },
    });
  } catch {
    products = FALLBACK_PRODUCTS.map((p) => ({
      slug: p.slug,
      updatedAt: new Date(),
    }));
  }

  if (!products || products.length === 0) {
    products = FALLBACK_PRODUCTS.map((p) => ({
      slug: p.slug,
      updatedAt: new Date(),
    }));
  }

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '',
    '/catalog',
    '/client-work',
    '/privacy-policy',
    '/terms-and-conditions',
    '/refund-and-cancellation-policy',
    '/shipping-policy',
    '/contact-us',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.7,
  }));

  return [...staticPages, ...productUrls];
}
