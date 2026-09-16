import { NextResponse } from 'next/server';
import { getCategories, addCategory, deleteCategory } from '@/lib/categories-store';

export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json({ categories, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, categories: getCategories() }, { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, categoryParam, image, subtitle, material, itemCount, romanId } = body;

    if (!name || !image) {
      return NextResponse.json(
        { error: 'Name and image URL are required fields.' },
        { status: 400 }
      );
    }

    const newCategory = addCategory({
      name,
      categoryParam: categoryParam || 'Living',
      image,
      subtitle: subtitle || '',
      material: material || 'Artisan Materials',
      itemCount: itemCount || 'Masterpieces',
      romanId: romanId || '',
    });

    return NextResponse.json({ category: newCategory, categories: getCategories(), success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add salon card' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    deleteCategory(id);
    return NextResponse.json({ categories: getCategories(), success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete salon card' }, { status: 500 });
  }
}
