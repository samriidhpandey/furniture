import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { sendNotification } from '@/lib/notification';

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

    // Find the order
    const order = await prisma.order.findUnique({
      where: { razorpayOrderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // If order was already paid (e.g. by fast webhook), return success
    if (order.status === 'PAID') {
      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        message: 'Order already confirmed.',
      });
    }

    // Decrement stock for variants and update order status to PAID
    await prisma.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          razorpayPaymentId,
          razorpaySignature,
        },
      });

      // Decrement variant stock
      for (const item of order.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }
      }
    });

    // Send transactional order confirmation (§1-upgraded, §23-A)
    try {
      const parsedAddress = JSON.parse(order.shippingAddress);
      await sendNotification({
        recipient: parsedAddress.phone || 'VIP Client',
        type: 'ORDER_CONFIRMATION',
        title: `Order Confirmed: ${order.orderNumber}`,
        body: `Thank you for choosing A1 Luxury Furniture. Your order ${order.orderNumber} for ₹${order.totalAmount.toLocaleString('en-IN')} has been confirmed and placed into white-glove curation.`,
        orderNumber: order.orderNumber,
      });
    } catch (e) {
      console.error('Notification send error', e);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      message: 'Payment verified successfully.',
    });
  } catch (e: any) {
    console.error('Payment verification error', e);
    return NextResponse.json({ error: e.message || 'Payment verification failed' }, { status: 500 });
  }
}
