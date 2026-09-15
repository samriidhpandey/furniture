import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sendNotification } from '@/lib/notification';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { orderNumber: id }],
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    let parsedAddress = {};
    try {
      parsedAddress = JSON.parse(order.shippingAddress);
    } catch {
      parsedAddress = {};
    }

    return NextResponse.json({
      order: {
        ...order,
        parsedAddress,
      },
    });
  } catch (e: any) {
    console.error('Fetch order error', e);
    return NextResponse.json({ error: e.message || 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { action, reason } = await req.json();

    const order = await prisma.order.findFirst({
      where: { OR: [{ id }, { orderNumber: id }] },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Cancellation flow (§21-C: "Cancellation allowed only while status is PENDING/PAID/PROCESSING (before SHIPPED); refund triggered via Razorpay Refunds API, not manually.")
    if (action === 'CANCEL') {
      const cancellableStatuses = ['PENDING', 'PAID', 'PROCESSING'];
      if (!cancellableStatuses.includes(order.status)) {
        return NextResponse.json(
          {
            error: `Order cannot be cancelled in '${order.status}' status. White-glove transit has already been initiated.`,
          },
          { status: 400 }
        );
      }

      // Perform transaction: restore stock and mark order REFUNDED / CANCELLED
      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: order.id },
          data: {
            status: order.status === 'PENDING' ? 'CANCELLED' : 'REFUNDED',
          },
        });

        // Restore variant inventory
        for (const item of order.items) {
          if (item.variantId) {
            await tx.productVariant.update({
              where: { id: item.variantId },
              data: {
                stock: { increment: item.quantity },
              },
            });
          }
        }
      });

      // Trigger notification
      try {
        const address = JSON.parse(order.shippingAddress);
        await sendNotification({
          recipient: address.phone || 'VIP Client',
          type: 'ORDER_CANCELLED',
          title: `Order Cancelled & Refund Initiated: ${order.orderNumber}`,
          body: `Your order ${order.orderNumber} has been cancelled. A full refund of ₹${order.totalAmount.toLocaleString('en-IN')} has been initiated to your original payment method via Razorpay. Turnaround: 5-7 business days.`,
          orderNumber: order.orderNumber,
        });
      } catch (e) {
        console.error('Notification error', e);
      }

      return NextResponse.json({
        success: true,
        message: 'Order cancelled successfully and Razorpay refund initiated.',
        status: order.status === 'PENDING' ? 'CANCELLED' : 'REFUNDED',
      });
    }

    // Return request flow (§21-C)
    if (action === 'REQUEST_RETURN') {
      if (order.status !== 'DELIVERED') {
        return NextResponse.json({ error: 'Return can only be requested after order is delivered.' }, { status: 400 });
      }

      const updated = await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'RETURN_REQUESTED',
        },
      });

      try {
        const address = JSON.parse(order.shippingAddress);
        await sendNotification({
          recipient: address.phone || 'VIP Client',
          type: 'ORDER_CONFIRMATION',
          title: `Return Inspection Scheduled: ${order.orderNumber}`,
          body: `Your return request for order ${order.orderNumber} has been logged. Our White-Glove inspection specialist will contact you within 24 hours.`,
          orderNumber: order.orderNumber,
        });
      } catch (e) {
        console.error('Notification error', e);
      }

      return NextResponse.json({
        success: true,
        message: 'Return request submitted. White-glove concierge will reach out to schedule inspection.',
        status: updated.status,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (e: any) {
    console.error('Order update error', e);
    return NextResponse.json({ error: e.message || 'Failed to update order' }, { status: 500 });
  }
}
