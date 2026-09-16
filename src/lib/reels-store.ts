export interface ShoppableReel {
  id: string;
  title: string;
  videoUrl: string; // Instagram Reel URL, MP4 video link, or embed iframe URL
  thumbnail: string;
  productSlug?: string;
  productName: string;
  productPrice: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  categoryTag?: string;
  embedCode?: string;
  createdAt: string;
}

export const DEFAULT_REELS: ShoppableReel[] = [
  {
    id: 'reel_1',
    title: 'The Solarium Carrara Monolith Dining Experience',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-dining-room-interior-41584-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
    productSlug: 'solarium-carrara-marble-dining-table',
    productName: 'The Solarium Carrara Dining Table',
    productPrice: 395000,
    originalPrice: 430000,
    rating: 5,
    reviewCount: 48,
    categoryTag: 'Dining Sanctum',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel_2',
    title: 'Hand-Tufting the Augustus Chesterfield in Tuscan Leather',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-carpenter-measuring-a-wooden-board-42993-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    productSlug: 'augustus-grande-chesterfield-sofa',
    productName: 'The Augustus Grande Chesterfield',
    productPrice: 285000,
    originalPrice: 310000,
    rating: 5,
    reviewCount: 92,
    categoryTag: 'Living Heirloom',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel_3',
    title: 'Kyoto Hand-Turned Walnut Centerpiece Bowl Polishing',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-carpenter-working-on-wood-with-a-lathe-42991-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    productSlug: 'kyoto-solid-walnut-sculptural-bowl',
    productName: 'The Kyoto Sculptural Walnut Centerpiece Bowl',
    productPrice: 24500,
    originalPrice: 28000,
    rating: 5,
    reviewCount: 34,
    categoryTag: 'Noble Decor',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel_4',
    title: 'Floating Hinoki Cedar Platform Bed with Ambient LED Glow',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-bedroom-with-a-king-size-bed-41582-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    productSlug: 'aurelia-king-platform-bed',
    productName: 'The Aurelia Sanctuary Platform Bed',
    productPrice: 245000,
    originalPrice: 270000,
    rating: 5,
    reviewCount: 29,
    categoryTag: 'Master Suite',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel_5',
    title: '360° Silent Pivot Test: Élysée Bouclé Swivel Lounge',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-luxury-armchair-in-a-minimalist-living-room-41583-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    productSlug: 'elysee-swivel-armchair',
    productName: 'The Élysée Sculptural Lounge Chair',
    productPrice: 125000,
    originalPrice: 140000,
    rating: 5,
    reviewCount: 65,
    categoryTag: 'Accent Swivel',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel_6',
    title: 'Mehrangarh Inspired Teak Jali Wall Panel Installation',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-carving-wood-with-a-chisel-42992-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    productSlug: 'solaria-hand-carved-teak-wall-panel',
    productName: 'The Solaria Jodhpur Jali Carved Teak Wall Panel',
    productPrice: 68000,
    originalPrice: 75000,
    rating: 5,
    reviewCount: 42,
    categoryTag: 'Wall Sculptures',
    createdAt: new Date().toISOString(),
  },
];

let currentReels: ShoppableReel[] = [...DEFAULT_REELS];

export function getReels(): ShoppableReel[] {
  return currentReels.length > 0 ? currentReels : DEFAULT_REELS;
}

export function addReel(reelData: Omit<ShoppableReel, 'id' | 'createdAt'>): ShoppableReel {
  const newReel: ShoppableReel = {
    ...reelData,
    id: `reel_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  currentReels = [newReel, ...currentReels];
  return newReel;
}

export function deleteReel(id: string): boolean {
  const initLen = currentReels.length;
  currentReels = currentReels.filter((r) => r.id !== id);
  return currentReels.length < initLen;
}
