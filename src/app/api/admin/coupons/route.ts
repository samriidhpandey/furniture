import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ coupons });
  } catch (e: any) {
    console.error('Fetch coupons error', e);
    return NextResponse.json({ error: e.message || 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { code, discountType, value, minOrderValue, maxDiscount, usageLimit } = await req.json();

    if (!code || !value) {
      return NextResponse.json({ error: 'Code and discount value are required' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const existing = await prisma.coupon.findUnique({ where: { code: cleanCode } });
    if (existing) {
      return NextResponse.json({ error: 'A coupon with this code already exists' }, { status: 400 });
    }

    const now = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(now.getFullYear() + 1);

    const coupon = await prisma.coupon.create({
      data: {
        code: cleanCode,
        discountType: discountType || 'PERCENT',
        value: Number(value),
        minOrderValue: Number(minOrderValue || 0),
        maxDiscount: maxDiscount ? Number(maxDiscount) : null,
        usageLimit: Number(usageLimit || 100),
        validFrom: now,
        validTo: nextYear,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, coupon });
  } catch (e: any) {
    console.error('Create coupon error', e);
    return NextResponse.json({ error: e.message || 'Failed to create coupon' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Coupon ID is required' }, { status: 400 });
    }

    const updated = await prisma.coupon.update({
      where: { id },
      data: { isActive: Boolean(isActive) },
    });

    return NextResponse.json({ success: true, coupon: updated });
  } catch (e: any) {
    console.error('Update coupon error', e);
    return NextResponse.json({ error: e.message || 'Failed to update coupon' }, { status: 500 });
  }
}
