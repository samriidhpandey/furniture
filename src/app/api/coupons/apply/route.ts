import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Please provide a coupon code' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = await prisma.coupon.findUnique({
      where: { code: cleanCode },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ error: 'This coupon code is invalid or has expired' }, { status: 404 });
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTo) {
      return NextResponse.json({ error: 'This promotional code is no longer active' }, { status: 400 });
    }

    if (coupon.timesUsed >= coupon.usageLimit) {
      return NextResponse.json({ error: 'This promotional voucher has reached its redemption limit' }, { status: 400 });
    }

    if (subtotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          error: `Minimum order value for ${cleanCode} is ₹${coupon.minOrderValue.toLocaleString('en-IN')}`,
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (coupon.discountType === 'PERCENT') {
      discountAmount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = Math.min(coupon.value, subtotal);
    }

    return NextResponse.json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        value: coupon.value,
        maxDiscount: coupon.maxDiscount,
      },
      discountAmount,
    });
  } catch (e: any) {
    console.error('Coupon apply error', e);
    return NextResponse.json({ error: e.message || 'Failed to process coupon' }, { status: 500 });
  }
}
