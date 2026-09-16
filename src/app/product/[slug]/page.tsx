import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';
import { findProductBySlug, parseProductImages } from '@/lib/products-fallback';

export const revalidate = 60; // Technical SEO ISR

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const slug = params?.slug;
  let product: any = null;

  try {
    product = await prisma.product.findUnique({
      where: { slug },
    });
  } catch {
    // Fallback if DB is unreachable
    product = findProductBySlug(slug);
  }

  if (!product) {
    product = findProductBySlug(slug);
  }

  if (!product) {
    return { title: 'Piece Not Found | A1 Luxury Furniture' };
  }

  const images = parseProductImages(product.images);

  return {
    title: `${product.name} | A1 Luxury Furniture`,
    description: product.tagline || product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const slug = params?.slug;
  let product: any = null;

  try {
    product = await prisma.product.findUnique({
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
  } catch (err) {
    console.warn('Prisma fetch failed on product page, using luxury fallback:', err);
    product = findProductBySlug(slug);
  }

  if (!product) {
    product = findProductBySlug(slug);
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
