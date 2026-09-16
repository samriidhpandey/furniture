import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { findOrderByRazorpayId, saveOrderToStore } from '@/lib/orders-store';

export async function POST(req: Request) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    if (!razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json({ error: 'Payment identifiers missing' }, { status: 400 });
    }

    // Verify signature
    const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) {
      return NextResponse.json({ error: 'Cryptographic signature verification failed' }, { status: 400 });
    }

    // Check in fast memory store first
    let memoryOrder = findOrderByRazorpayId(razorpayOrderId);
    if (memoryOrder) {
      memoryOrder.status = 'PAID';
      memoryOrder.razorpayPaymentId = razorpayPaymentId;
      memoryOrder.razorpaySignature = razorpaySignature;
      saveOrderToStore(memoryOrder);
    }

    // Also update in DB if present
    try {
      const dbOrder = await prisma.order.findUnique({
        where: { razorpayOrderId },
      });
      if (dbOrder) {
        await prisma.order.update({
          where: { id: dbOrder.id },
          data: {
            status: 'PAID',
            razorpayPaymentId,
            razorpaySignature,
          },
        });
      }
    } catch {
      // Ignored if DB is unavailable
    }

    const orderNumber = memoryOrder?.orderNumber || `A1-2026-${Date.now().toString().slice(-5)}`;
    const orderId = memoryOrder?.id || `ord_${Date.now()}`;

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
      message: 'Payment verified successfully.',
    });
  } catch (e: any) {
    console.error('Payment verification error', e);
    return NextResponse.json({ error: e.message || 'Payment verification failed' }, { status: 500 });
  }
}
