import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        product: {
          select: { name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ reviews });
  } catch (e: any) {
    console.error('Fetch reviews error', e);
    return NextResponse.json({ error: e.message || 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Review ID and status are required' }, { status: 400 });
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, review: updated });
  } catch (e: any) {
    console.error('Review update error', e);
    return NextResponse.json({ error: e.message || 'Failed to update review' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { productId, authorName, rating, comment } = await req.json();

    if (!productId || !authorName || !comment) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        authorName,
        rating: Number(rating) || 5,
        comment,
        verifiedPurchase: true,
        status: 'APPROVED',
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (e: any) {
    console.error('Create review error', e);
    return NextResponse.json({ error: e.message || 'Failed to post review' }, { status: 500 });
  }
}
