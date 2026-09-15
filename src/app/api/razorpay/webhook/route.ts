import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { sendNotification } from '@/lib/notification';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || req.headers.get('X-Razorpay-Signature') || '';

    // 1. Verify Webhook Signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn('Webhook received with invalid signature');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const eventId = event.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const eventType = event.event;

    // 2. Check Idempotency via WebhookEvent table (§11-A, §13-A)
    const existingEvent = await prisma.webhookEvent.findUnique({
      where: { razorpayEventId: eventId },
    });

    if (existingEvent) {
      console.log(`Duplicate webhook event ignored: ${eventId}`);
      return NextResponse.json({ status: 'ignored_duplicate', eventId });
    }

    // Record the webhook event for audit trail & idempotency
    await prisma.webhookEvent.create({
      data: {
        razorpayEventId: eventId,
        type: eventType,
        payload: rawBody,
      },
    });

    // 3. Process events
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity || event.payload?.order?.entity;
      const razorpayOrderId = paymentEntity?.order_id || paymentEntity?.id;
      const razorpayPaymentId = paymentEntity?.id;

      if (razorpayOrderId) {
        const order = await prisma.order.findUnique({
          where: { razorpayOrderId },
          include: { items: true },
        });

        if (order && order.status !== 'PAID' && order.status !== 'PROCESSING') {
          await prisma.$transaction(async (tx) => {
            await tx.order.update({
              where: { id: order.id },
              data: {
                status: 'PAID',
                razorpayPaymentId: razorpayPaymentId || order.razorpayPaymentId,
              },
            });

            // Decrement variant stock if not already decremented
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

          // Trigger email/SMS notification
          try {
            const parsedAddress = JSON.parse(order.shippingAddress);
            await sendNotification({
              recipient: parsedAddress.phone || 'VIP Customer',
              type: 'ORDER_CONFIRMATION',
              title: `Order Verified via Webhook: ${order.orderNumber}`,
              body: `Payment captured successfully via Razorpay webhook. Order ${order.orderNumber} is confirmed.`,
              orderNumber: order.orderNumber,
            });
          } catch (e) {
            console.error('Webhook notification error', e);
          }
        }
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      if (razorpayOrderId) {
        await prisma.order.updateMany({
          where: { razorpayOrderId, status: 'PENDING' },
          data: { status: 'CANCELLED' },
        });
      }
    }

    return NextResponse.json({ success: true, processedEvent: eventId });
  } catch (e: any) {
    console.error('Webhook processing error', e);
    return NextResponse.json({ error: e.message || 'Webhook processing failed' }, { status: 500 });
  }
}
