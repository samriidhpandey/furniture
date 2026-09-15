import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { calculateGst } from '@/lib/gst';
import { generateRazorpayOrderId } from '@/lib/razorpay';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, address, buyerGstin, couponCode, userId } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Your bag is empty' }, { status: 400 });
    }

    if (!address || !address.fullName || !address.line1 || !address.city || !address.state || !address.postalCode) {
      return NextResponse.json({ error: 'Complete delivery address is required' }, { status: 400 });
    }

    // Rate-limit checkout attempts per IP/user (§22-A)
    const rateLimitKey = `checkout_${userId || address.phone || 'guest'}`;
    const rateCheck = checkRateLimit(rateLimitKey, 10, 5 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json({ error: 'Too many checkout attempts. Please wait a few moments.' }, { status: 429 });
    }

    // Server-side inventory & price validation (§22-A)
    let verifiedSubtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: true },
      });

      if (!variant) {
        return NextResponse.json({ error: `Selected piece (${item.name || 'Product'}) is no longer available.` }, { status: 400 });
      }

      if (variant.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Insufficient stock for ${variant.product.name} in ${variant.colorName}. Only ${variant.stock} piece(s) available.`,
          },
          { status: 400 }
        );
      }

      const itemUnitPrice = variant.priceOverride || variant.product.basePrice;
      const itemTotalPrice = itemUnitPrice * item.quantity;
      verifiedSubtotal += itemTotalPrice;

      verifiedItems.push({
        productId: variant.productId,
        variantId: variant.id,
        productName: variant.product.name,
        variantSummary: `${variant.colorName} • ${variant.material}`,
        quantity: item.quantity,
        unitPrice: itemUnitPrice,
        totalPrice: itemTotalPrice,
      });
    }

    // Verify coupon discount if applied
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });
      if (coupon && coupon.isActive && verifiedSubtotal >= coupon.minOrderValue) {
        if (coupon.discountType === 'PERCENT') {
          discountAmount = Math.round((verifiedSubtotal * coupon.value) / 100);
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
        } else {
          discountAmount = Math.min(coupon.value, verifiedSubtotal);
        }
      }
    }

    // Compute GST (§21-B)
    const gstBreakdown = calculateGst(verifiedSubtotal, discountAmount, address.state);

    // Generate unique order ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `A1-${new Date().getFullYear()}-${randomSuffix}`;
    const razorpayOrderId = generateRazorpayOrderId();

    // Verify if user exists in database or find by email/phone
    let actualUserId: string | null = null;
    if (userId) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { id: userId },
            { phone: address.phone },
          ],
        },
      });

      if (existingUser) {
        actualUserId = existingUser.id;
        // Save address if not already present
        try {
          const existingAddr = await prisma.address.findFirst({
            where: {
              userId: existingUser.id,
              line1: address.line1,
              postalCode: address.postalCode,
            },
          });
          if (!existingAddr) {
            await prisma.address.create({
              data: {
                userId: existingUser.id,
                fullName: address.fullName,
                phone: address.phone,
                line1: address.line1,
                line2: address.line2 || null,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                country: address.country || 'India',
                isDefault: true,
              },
            });
          }
        } catch (e) {
          console.error('Error saving user address', e);
        }
      }
    }

    // Create Order in DB
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: actualUserId || null,
        status: 'PENDING',
        subtotal: verifiedSubtotal,
        discount: discountAmount,
        gstRate: 0.18,
        cgst: gstBreakdown.cgstAmount,
        sgst: gstBreakdown.sgstAmount,
        igst: gstBreakdown.igstAmount,
        totalAmount: gstBreakdown.totalAmount,
        razorpayOrderId,
        shippingAddress: JSON.stringify(address),
        buyerGstin: buyerGstin ? buyerGstin.trim().toUpperCase() : null,
        items: {
          create: verifiedItems,
        },
      },
      include: { items: true },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        subtotal: order.subtotal,
        discount: order.discount,
        gstBreakdown,
        razorpayOrderId: order.razorpayOrderId,
      },
    });
  } catch (e: any) {
    console.error('Checkout order creation error', e);
    return NextResponse.json({ error: e.message || 'Failed to initialize order' }, { status: 500 });
  }
}
