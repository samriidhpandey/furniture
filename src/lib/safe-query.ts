import prisma from '@/lib/db';
import { FALLBACK_PRODUCTS, findProductBySlug, type FullProduct } from '@/lib/products-fallback';
import { getReels, type ShoppableReel } from '@/lib/reels-store';
import { getCategories, type CategoryCard } from '@/lib/categories-store';

/**
 * Race a promise against a timeout to ensure SSR never delays page transitions.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  fallback: T,
  timeoutMs: number = 180
): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      resolve(fallback);
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timer!);
    return result;
  } catch (err) {
    clearTimeout(timer!);
    return fallback;
  }
}

/**
 * Fast-retrieval for all products with instant memory fallback.
 */
export async function getSafeProducts(): Promise<FullProduct[]> {
  try {
    const dbPromise = prisma.product.findMany({
      include: {
        variants: true,
        reviews: { where: { status: 'APPROVED' } },
      },
      orderBy: { basePrice: 'desc' },
    });

    const products = await withTimeout(dbPromise as any, FALLBACK_PRODUCTS, 180);
    if (products && products.length > 0) {
      return products as unknown as FullProduct[];
    }
    return FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Fast-retrieval for a single product by slug.
 */
export async function getSafeProductBySlug(slug: string): Promise<FullProduct | null> {
  if (!slug) return null;
  const fallback = findProductBySlug(slug) || null;

  try {
    const dbPromise = prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          orderBy: { sku: 'asc' },
        },
        reviews: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const product = await withTimeout(dbPromise as any, fallback, 180);
    return (product as unknown as FullProduct) || fallback;
  } catch {
    return fallback;
  }
}
