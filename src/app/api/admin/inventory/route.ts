import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { FALLBACK_PRODUCTS } from '@/lib/products-fallback';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          orderBy: { sku: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    const lowStockVariants = [];
    for (const p of products) {
      for (const v of p.variants) {
        if (v.stock <= 2) {
          lowStockVariants.push({
            productId: p.id,
            productName: p.name,
            variantId: v.id,
            sku: v.sku,
            colorName: v.colorName,
            material: v.material,
            stock: v.stock,
          });
        }
      }
    }

    return NextResponse.json({ products, lowStockVariants });
  } catch (e: any) {
    console.warn('Inventory fetch error, using fallback products:', e);
    const lowStockVariants = [];
    for (const p of FALLBACK_PRODUCTS) {
      for (const v of p.variants) {
        if (v.stock <= 2) {
          lowStockVariants.push({
            productId: p.id,
            productName: p.name,
            variantId: v.id,
            sku: v.sku,
            colorName: v.colorName,
            material: v.material,
            stock: v.stock,
          });
        }
      }
    }
    return NextResponse.json({ products: FALLBACK_PRODUCTS, lowStockVariants });
  }
}

export async function PATCH(req: Request) {
  try {
    const { variantId, stock, priceOverride } = await req.json();

    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
    }

    const data: any = {};
    if (stock !== undefined) data.stock = Number(stock);
    if (priceOverride !== undefined) data.priceOverride = priceOverride === '' ? null : Number(priceOverride);

    const updated = await prisma.productVariant.update({
      where: { id: variantId },
      data,
    });

    return NextResponse.json({ success: true, variant: updated });
  } catch (e: any) {
    console.error('Variant update error', e);
    return NextResponse.json({ error: e.message || 'Failed to update variant' }, { status: 500 });
  }
}
