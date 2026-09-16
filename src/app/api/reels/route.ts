import { NextResponse } from 'next/server';
import { getReels } from '@/lib/reels-store';

export async function GET() {
  try {
    const reels = getReels();
    return NextResponse.json({ reels, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, reels: getReels() }, { status: 200 });
  }
}
