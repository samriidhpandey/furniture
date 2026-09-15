import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sendNotification } from '@/lib/notification';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        user: true,
      },
    });

    return NextResponse.json({ orders });
  } catch (e: any) {
    console.error('Admin orders fetch error', e);
    return NextResponse.json({ error: e.message || 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, status, trackingNumber, courierName } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
    if (courierName !== undefined) updateData.courierName = courierName;

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    // Dispatch status update notification (§23-A: "Order status update should also trigger the customer email/SMS")
    try {
      const address = JSON.parse(order.shippingAddress);
      const recipient = address.phone || 'VIP Collector';

      if (status === 'SHIPPED') {
        await sendNotification({
          recipient,
          type: 'ORDER_SHIPPED',
          title: `Dispatch Notice: Order ${order.orderNumber}`,
          body: `Your luxury pieces have been dispatched via ${courierName || 'BlueDart White-Glove'}. Tracking reference: ${trackingNumber || 'Available shortly'}.`,
          orderNumber: order.orderNumber,
        });
      } else if (status === 'DELIVERED') {
        await sendNotification({
          recipient,
          type: 'ORDER_DELIVERED',
          title: `Delivered & Installed: Order ${order.orderNumber}`,
          body: `Your order ${order.orderNumber} has been delivered and assembled. We hope these pieces bring timeless beauty to your space.`,
          orderNumber: order.orderNumber,
        });
      }
    } catch (e) {
      console.error('Notification dispatch error', e);
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (e: any) {
    console.error('Admin order update error', e);
    return NextResponse.json({ error: e.message || 'Failed to update order' }, { status: 500 });
  }
}
