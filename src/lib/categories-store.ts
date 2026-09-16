export interface CategoryItem {
  id: string;
  name: string;
  categoryParam: string;
  image: string;
  subtitle?: string;
  material?: string;
  itemCount?: string;
  romanId?: string;
}

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-1',
    romanId: 'I',
    name: 'Living Room Gallery',
    subtitle: 'Hand-Tufted Chesterfields & Curved Lounges',
    categoryParam: 'Living',
    material: 'Tuscan Full-Grain & Brass',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    itemCount: '18 Masterpieces',
  },
  {
    id: 'cat-2',
    romanId: 'II',
    name: 'Dining Sanctuaries',
    subtitle: 'Carrara Marble & Fluted Cast Bronze',
    categoryParam: 'Dining',
    material: 'Book-Matched Marble',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
    itemCount: '12 Sanctuaries',
  },
  {
    id: 'cat-3',
    romanId: 'III',
    name: 'Master Bedroom Suites',
    subtitle: 'Belgian Flax Linen & Floating Platforms',
    categoryParam: 'Bedroom',
    material: 'Solid Cedar Joinery',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
    itemCount: '14 Suites',
  },
  {
    id: 'cat-4',
    romanId: 'IV',
    name: 'Executive Libraries',
    subtitle: 'Quarter-Sawn Walnut & Calfskin Accents',
    categoryParam: 'Executive',
    material: 'Black American Walnut',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85',
    itemCount: '9 Editions',
  },
  {
    id: 'cat-5',
    romanId: 'V',
    name: 'Bespoke Atelier Commissions',
    subtitle: 'One-of-a-Kind Architectural Centrepieces',
    categoryParam: 'Bespoke',
    material: 'Rare Onyx & Titanium Gilt',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    itemCount: 'Private Studio',
  },
  {
    id: 'cat-6',
    romanId: 'VI',
    name: 'Artisan Accent & Lounge',
    subtitle: 'Sculptural Occasional Chairs & Consoles',
    categoryParam: 'Living',
    material: 'Bouclé Wool & Cast Plinths',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    itemCount: '16 Accents',
  },
];

// In-memory categories store for runtime dynamism across serverless & local
let currentCategories: CategoryItem[] = [...DEFAULT_CATEGORIES];

export function getCategories(): CategoryItem[] {
  return currentCategories.length > 0 ? currentCategories : DEFAULT_CATEGORIES;
}

export function setCategories(newCategories: CategoryItem[]): void {
  currentCategories = newCategories;
}

export function addCategory(category: Omit<CategoryItem, 'id'> & { id?: string }): CategoryItem {
  const newCat: CategoryItem = {
    ...category,
    id: category.id || `cat-${Date.now()}`,
    romanId: category.romanId || `${currentCategories.length + 1}`,
  };
  currentCategories = [...currentCategories, newCat];
  return newCat;
}

export function deleteCategory(id: string): boolean {
  const initialLen = currentCategories.length;
  currentCategories = currentCategories.filter((c) => c.id !== id);
  return currentCategories.length < initialLen;
}
