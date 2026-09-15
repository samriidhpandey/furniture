import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';

export const revalidate = 60; // Technical SEO ISR (§27)

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return { title: 'Piece Not Found | A1 Luxury Furniture' };
  }

  const images = JSON.parse(product.images);

  return {
    title: `${product.name} | A1 Luxury Furniture`,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
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

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
