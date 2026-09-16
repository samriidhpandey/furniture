import { NextResponse } from 'next/server';
import { getReels, addReel, deleteReel } from '@/lib/reels-store';

export async function GET() {
  try {
    const reels = getReels();
    return NextResponse.json({ reels, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, reels: getReels() }, { status: 200 });
  }
}

const parseNumeric = (val: any, defaultVal = 0) => {
  if (typeof val === 'number') return isNaN(val) ? defaultVal : val;
  if (!val) return defaultVal;
  const cleaned = String(val).replace(/[^0-9.]/g, '');
  const parsed = Number(cleaned);
  return isNaN(parsed) ? defaultVal : parsed;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      videoUrl,
      thumbnail,
      productSlug,
      productName,
      productPrice,
      price,
      originalPrice,
      rating,
      reviewCount,
      categoryTag,
      discount,
      embedCode,
    } = body;

    if (!title || (!videoUrl && !embedCode)) {
      return NextResponse.json(
        { error: 'Title and Video URL or Embed Code are required.' },
        { status: 400 }
      );
    }

    const priceNum = parseNumeric(productPrice || price, 49000);
    const origPriceNum = originalPrice ? parseNumeric(originalPrice, 0) : undefined;
    const ratingNum = parseNumeric(rating, 5);
    const revNum = parseNumeric(reviewCount, 25);

    const newReel = addReel({
      title,
      videoUrl: videoUrl || '',
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
      productSlug: productSlug || 'augustus-grande-chesterfield-sofa',
      productName: productName || 'A1 Masterpiece Collection Piece',
      productPrice: priceNum,
      originalPrice: origPriceNum && origPriceNum > 0 ? origPriceNum : undefined,
      rating: ratingNum,
      reviewCount: revNum,
      categoryTag: categoryTag || discount || 'Atelier Masterwork',
      embedCode: embedCode || '',
    });

    return NextResponse.json({ reel: newReel, reels: getReels(), success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add reel' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Reel ID is required' }, { status: 400 });
    }

    deleteReel(id);
    return NextResponse.json({ reels: getReels(), success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete reel' }, { status: 500 });
  }
}
