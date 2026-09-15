import type { ProductItem } from '@/components/home/CircularProductShowcase';

export const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: 'prod_1',
    slug: 'augustus-grande-chesterfield-sofa',
    name: 'The Augustus Grande Chesterfield',
    tagline: 'Hand-tufted heirloom sofa in full-grain Italian leather',
    category: 'Living',
    basePrice: 285000,
    featured: true,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_1',
        sku: 'AUG-SOF-CGN-LTH',
        colorName: 'Cognac Saddle',
        colorHex: '#8B4513',
        material: 'Top-Grain Tuscan Leather',
        priceOverride: 285000,
        stock: 4,
      },
      {
        id: 'v_2',
        sku: 'AUG-SOF-OBS-VEL',
        colorName: 'Obsidian Velvet',
        colorHex: '#1E1E22',
        material: 'Genoese Silk-Cotton Velvet',
        priceOverride: 265000,
        stock: 2,
      },
      {
        id: 'v_3',
        sku: 'AUG-SOF-IVR-BOU',
        colorName: 'Alabaster Bouclé',
        colorHex: '#EAE6DF',
        material: 'Heavyweight Alpine Wool Bouclé',
        priceOverride: 295000,
        stock: 1,
      },
    ],
  },
  {
    id: 'prod_2',
    slug: 'solarium-carrara-marble-dining-table',
    name: 'The Solarium Carrara Dining Table',
    tagline: 'Book-matched Tuscan marble resting on sculptural brushed bronze',
    category: 'Dining',
    basePrice: 395000,
    featured: true,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_4',
        sku: 'SOL-DIN-CAR-BRZ',
        colorName: 'Statuario White & Bronze',
        colorHex: '#F0EEE9',
        material: 'Carrara Marble & Brushed Cast Bronze',
        priceOverride: 395000,
        stock: 3,
      },
      {
        id: 'v_5',
        sku: 'SOL-DIN-NER-GLD',
        colorName: 'Nero Marquina & Burnished Gold',
        colorHex: '#1F1F1F',
        material: 'Spanish Black Marble & Gold Leaf Accents',
        priceOverride: 430000,
        stock: 2,
      },
    ],
  },
  {
    id: 'prod_3',
    slug: 'elysee-swivel-armchair',
    name: 'The Élysée Sculptural Lounge Chair',
    tagline: 'Curvilinear cocoon in textured bouclé on a concealed 360° pivot',
    category: 'Living',
    basePrice: 125000,
    featured: true,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1580481077195-c3f25e406385?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_6',
        sku: 'ELY-CHR-IVR-BOU',
        colorName: 'Ivory Bouclé',
        colorHex: '#FAF7F2',
        material: 'Textured Bouclé & Brushed Brass Ring',
        priceOverride: 125000,
        stock: 5,
      },
    ],
  },
  {
    id: 'prod_4',
    slug: 'monolith-walnut-executive-desk',
    name: 'The Monolith Executive Writing Desk',
    tagline: 'Quarter-sawn American walnut with concealed calfskin leather inlay',
    category: 'Executive',
    basePrice: 210000,
    featured: true,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_7',
        sku: 'MON-DSK-WAL-BLK',
        colorName: 'Smoked Walnut & Black Leather',
        colorHex: '#3D2817',
        material: 'Solid Walnut & Italian Calfskin',
        priceOverride: 210000,
        stock: 2,
      },
    ],
  },
  {
    id: 'prod_5',
    slug: 'sanctuary-floating-platform-bed',
    name: 'The Sanctuary Floating Bedstead',
    tagline: 'Floating cedar base with integrated ambient halo and flax linen headboard',
    category: 'Bedroom',
    basePrice: 340000,
    featured: true,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_8',
        sku: 'SAN-BED-FLX-KNG',
        colorName: 'Oatmeal Belgian Linen',
        colorHex: '#D7CEC7',
        material: 'Belgian Linen & Japanese Hinoki Cedar',
        priceOverride: 340000,
        stock: 3,
      },
    ],
  },
];

export function parseProductImages(imagesRaw: any): string[] {
  if (!imagesRaw) {
    return ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'];
  }
  if (Array.isArray(imagesRaw)) {
    return imagesRaw.length > 0 ? imagesRaw : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'];
  }
  if (typeof imagesRaw === 'string') {
    try {
      const parsed = JSON.parse(imagesRaw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      if (typeof parsed === 'string') return [parsed];
    } catch {
      if (imagesRaw.startsWith('http')) return [imagesRaw];
    }
  }
  return ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'];
}
