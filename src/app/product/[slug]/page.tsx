import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import { parseProductImages } from '@/lib/products-fallback';
import { getSafeProductBySlug } from '@/lib/safe-query';

export const revalidate = 60; // Technical SEO ISR

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const slug = params?.slug;
  const product = await getSafeProductBySlug(slug);

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
  const product = await getSafeProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8 sm:py-12">
      <ProductDetailClient product={product as any} />
    </div>
  );
}
