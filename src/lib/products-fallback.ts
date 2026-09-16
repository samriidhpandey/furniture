import type { ProductItem } from '@/components/home/CircularProductShowcase';

export interface FullProduct extends ProductItem {
  description: string;
  dimensions: string;
  warranty: string;
  careInstructions: string;
  hsnCode?: string;
  reviews?: {
    id: string;
    authorName: string;
    rating: number;
    comment: string;
    verifiedPurchase: boolean;
    createdAt: string;
    status: string;
  }[];
}

export const CORE_PRODUCTS: FullProduct[] = [
  {
    id: 'prod_1',
    slug: 'augustus-grande-chesterfield-sofa',
    name: 'The Augustus Grande Chesterfield',
    tagline: 'Hand-tufted heirloom sofa in full-grain Italian leather',
    description:
      'Handcrafted by master artisans in Bologna, the Augustus Grande is an icon of timeless majesty. Deep diamond button tufting, antiqued brass studs hand-hammered along sweeping rolled arms, and an eight-way hand-tied spring foundation engineered for generations of sovereign comfort.',
    category: 'Living',
    dimensions: 'W: 245cm | D: 105cm | H: 85cm | Seat Depth: 62cm | Weight: 98kg',
    warranty: '15 Years Master Artisan Structural Warranty',
    careInstructions: 'Nourish quarterly with beeswax leather balm. Vacuum crevices gently with a horsehair brush attachment.',
    basePrice: 285000,
    featured: true,
    hsnCode: '9403',
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
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'v_2',
        sku: 'AUG-SOF-OBS-VEL',
        colorName: 'Obsidian Velvet',
        colorHex: '#1E1E22',
        material: 'Genoese Silk-Cotton Velvet',
        priceOverride: 265000,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'v_3',
        sku: 'AUG-SOF-IVR-BOU',
        colorName: 'Alabaster Bouclé',
        colorHex: '#EAE6DF',
        material: 'Heavyweight Alpine Wool Bouclé',
        priceOverride: 295000,
        stock: 1,
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev_1',
        authorName: 'Rohan Mehra, Architect',
        rating: 5,
        comment:
          'The depth of the hand-tufting and the aromatic Italian leather are truly exceptional. Delivered with white-glove assembly in South Mumbai without a scratch.',
        verifiedPurchase: true,
        createdAt: '2026-02-15T10:00:00.000Z',
        status: 'APPROVED',
      },
      {
        id: 'rev_2',
        authorName: 'Gayatri Devi',
        rating: 5,
        comment: 'The centerpiece of our drawing room. Impeccable weight and proportion.',
        verifiedPurchase: true,
        createdAt: '2026-01-20T10:00:00.000Z',
        status: 'APPROVED',
      },
    ],
  },
  {
    id: 'prod_2',
    slug: 'solarium-carrara-marble-dining-table',
    name: 'The Solarium Carrara Dining Table',
    tagline: 'Book-matched Tuscan marble resting on sculptural brushed bronze',
    description:
      'Each Solarium slab is extracted from the storied quarries of Carrara, Italy. Hand-finished with a feather-soft honed patina and supported by monolithic cast-brass pillars with hand-chiseled fluting.',
    category: 'Dining',
    dimensions: 'L: 280cm | W: 115cm | H: 76cm | Tabletop Thickness: 45mm | Weight: 240kg',
    warranty: 'Lifetime Marble Integrity & Structural Guarantee',
    careInstructions: 'Seal annually with breathable fluoropolymer sealer. Wipe spills promptly with pH-neutral stone wash.',
    basePrice: 395000,
    featured: true,
    hsnCode: '9403',
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
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'v_5',
        sku: 'SOL-DIN-NER-GLD',
        colorName: 'Nero Marquina & Burnished Gold',
        colorHex: '#1F1F1F',
        material: 'Spanish Black Marble & Gold Leaf Accents',
        priceOverride: 430000,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev_3',
        authorName: 'Sanjay Kapur',
        rating: 5,
        comment: 'We host dinners for 10 people comfortably. The book-matching on the marble veins is mesmerizing.',
        verifiedPurchase: true,
        createdAt: '2026-03-01T10:00:00.000Z',
        status: 'APPROVED',
      },
    ],
  },
  {
    id: 'prod_3',
    slug: 'elysee-swivel-armchair',
    name: 'The Élysée Sculptural Lounge Chair',
    tagline: 'Curvilinear cocoon in textured bouclé on a concealed 360° pivot',
    description:
      'An architectural silhouette designed to catch light from every angle. Built around a precision steel skeleton wrapped in molded high-density memory foam, creating fluid ergonomic grace.',
    category: 'Living',
    dimensions: 'W: 94cm | D: 90cm | H: 78cm | Seat Height: 44cm | Weight: 34kg',
    warranty: '10 Years Mechanical Swivel & Frame Warranty',
    careInstructions: 'Spot clean bouclé with organic dry foam shampoo.',
    basePrice: 125000,
    featured: true,
    hsnCode: '9403',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1580481077195-c3f25e406385?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_6',
        sku: 'ELY-CHR-IVR-BOU',
        colorName: 'Ivory Bouclé',
        colorHex: '#EFEAE1',
        material: 'Belgian Bouclé & Smoked Oak Base',
        priceOverride: 125000,
        stock: 5,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'v_7',
        sku: 'ELY-CHR-TER-VEL',
        colorName: 'Terracotta Rust',
        colorHex: '#9E4733',
        material: 'Mohair Velvet & Brushed Brass',
        priceOverride: 135000,
        stock: 3,
        image: 'https://images.unsplash.com/photo-1580481077195-c3f25e406385?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'v_8',
        sku: 'ELY-CHR-EMR-VEL',
        colorName: 'Forest Emerald',
        colorHex: '#1B3B2B',
        material: 'Silk-Blend Velvet & Bronze Base',
        priceOverride: 138000,
        stock: 1,
        image: 'https://images.unsplash.com/photo-1580481077195-c3f25e406385?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev_4',
        authorName: 'Priyamvada Rao',
        rating: 5,
        comment: 'The 360 swivel is completely silent and buttery smooth. It is my favorite reading nook.',
        verifiedPurchase: true,
        createdAt: '2026-02-28T10:00:00.000Z',
        status: 'APPROVED',
      },
    ],
  },
  {
    id: 'prod_4',
    slug: 'aurelia-king-platform-bed',
    name: 'The Aurelia Sanctuary Platform Bed',
    tagline: 'Floating Japanese cedar silhouette with padded linen headboard',
    description:
      'Crafted with mortise-and-tenon joinery requiring zero visible fasteners. The Aurelia integrates softly recessed ambient LED channel routing and an inclined ergonomic headboard upholstered in natural Belgian flax linen.',
    category: 'Bedroom',
    dimensions: 'L: 228cm | W: 204cm | Headboard H: 110cm | Platform H: 26cm | Weight: 115kg',
    warranty: '20 Years Solid Hardwood Structural Guarantee',
    careInstructions: 'Dust with soft lint-free cloth. Condition wood annually with organic citrus wax.',
    basePrice: 245000,
    featured: true,
    hsnCode: '9403',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_9',
        sku: 'AUR-BED-NAT-LIN',
        colorName: 'Natural Flax & Smoked Cedar',
        colorHex: '#D3C8B4',
        material: 'Belgian Linen & Japanese Cedar',
        priceOverride: 245000,
        stock: 3,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'v_10',
        sku: 'AUR-BED-CHA-OAK',
        colorName: 'Charcoal Linen & Blackened Oak',
        colorHex: '#2B2B2D',
        material: 'Charcoal Flax & Rift-Cut White Oak',
        priceOverride: 260000,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev_5',
        authorName: 'Dr. Kabir Sen',
        rating: 5,
        comment: 'The solid wood joinery is museum grade. No squeaks, rock solid, and breathtaking craftsmanship.',
        verifiedPurchase: true,
        createdAt: '2026-03-05T10:00:00.000Z',
        status: 'APPROVED',
      },
    ],
  },
  {
    id: 'prod_5',
    slug: 'monolith-executive-writing-desk',
    name: 'The Monolith Executive Writing Desk',
    tagline: 'Quarter-sawn American Walnut with wireless hideaway charging ports',
    description:
      'An executive centerpiece carved from sustainable old-growth American Black Walnut. Features discreet soft-close drawers lined in burgundy calfskin, integrated cable conduit chambers, and hand-patinated solid bronze handles.',
    category: 'Executive',
    dimensions: 'W: 195cm | D: 85cm | H: 76cm | Knee Clearance: 68cm | Weight: 92kg',
    warranty: '10 Years Joinery & Hardware Warranty',
    careInstructions: 'Avoid direct prolonged sunlight. Clean with pure walnut oil cleaner.',
    basePrice: 210000,
    featured: true,
    hsnCode: '9403',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_11',
        sku: 'MON-DSK-WAL-BRZ',
        colorName: 'Rich Walnut & Warm Bronze',
        colorHex: '#5C3A21',
        material: 'American Walnut & Hand-Patinated Bronze',
        priceOverride: 210000,
        stock: 4,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'v_12',
        sku: 'MON-DSK-EBO-CHR',
        colorName: 'Ebony Stained & Brushed Chrome',
        colorHex: '#1A1816',
        material: 'Smoked Ash & Solid Chrome Hardware',
        priceOverride: 225000,
        stock: 1,
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    reviews: [
      {
        id: 'rev_6',
        authorName: 'Aman Singhal, VC Partner',
        rating: 5,
        comment: 'The calfskin drawer liners and secret cable compartments keep my workspace completely pristine.',
        verifiedPurchase: true,
        createdAt: '2026-03-02T10:00:00.000Z',
        status: 'APPROVED',
      },
    ],
  },
  {
    id: 'prod_6',
    slug: 'seraphina-fluted-credenza-sideboard',
    name: 'The Seraphina Fluted Credenza',
    tagline: 'Architectural tambour doors with polished Calacatta Viola marble crown',
    description:
      'A grand statement storage console featuring rhythmically fluted tambour sliding doors that conceal adjustable shelves and twin velvet-lined silverware trays. Topped with a rare violet-veined Calacatta Viola marble slab.',
    category: 'Dining',
    dimensions: 'W: 210cm | D: 50cm | H: 82cm | Weight: 130kg',
    warranty: '10 Years Structural Warranty',
    careInstructions: 'Wipe marble with damp cloth; polish tambour wood with microfibre cloth.',
    basePrice: 320000,
    featured: false,
    hsnCode: '9403',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80',
    ]),
    variants: [
      {
        id: 'v_13',
        sku: 'SER-CRD-CAL-OAK',
        colorName: 'Calacatta Viola & White Oak',
        colorHex: '#D8CFBC',
        material: 'Natural White Oak & Calacatta Viola Marble',
        priceOverride: 320000,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    reviews: [],
  },
];

import { WOODEN_DECOR_PRODUCTS } from './wooden-decor-data';

export const FALLBACK_PRODUCTS: FullProduct[] = [...CORE_PRODUCTS, ...WOODEN_DECOR_PRODUCTS];

// Map of aliases to normalize any legacy slugs
const SLUG_ALIASES: Record<string, string> = {
  'sanctuary-floating-platform-bed': 'aurelia-king-platform-bed',
  'monolith-walnut-executive-desk': 'monolith-executive-writing-desk',
  'valkyrie-fluted-credenza': 'seraphina-fluted-credenza-sideboard',
};

export function findProductBySlug(slug: string): FullProduct | undefined {
  if (!slug) return undefined;
  const targetSlug = SLUG_ALIASES[slug] || slug;
  return FALLBACK_PRODUCTS.find(
    (p) => p.slug === targetSlug || p.slug === slug || SLUG_ALIASES[p.slug] === targetSlug
  );
}

export function findVariantById(variantId: string): { product: FullProduct; variant: any } | undefined {
  if (!variantId) return undefined;
  for (const p of FALLBACK_PRODUCTS) {
    const v = p.variants?.find((item) => item.id === variantId || item.sku === variantId);
    if (v) {
      return { product: p, variant: v };
    }
  }
  return undefined;
}

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


