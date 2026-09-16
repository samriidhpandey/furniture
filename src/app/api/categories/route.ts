import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/categories-store';

export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json({ categories, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, categories: getCategories() }, { status: 200 });
  }
}
