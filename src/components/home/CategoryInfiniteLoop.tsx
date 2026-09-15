'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Pause, Play, ArrowUpRight, ChevronLeft, ChevronRight, Gem } from 'lucide-react';
import OrnateDivider, { OrnateCardCorners } from '@/components/ui/OrnateDivider';

export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  categoryParam: string;
  material: string;
  image: string;
  itemCount: string;
  romanId: string;
}

const defaultCategories: CategoryItem[] = [
  {
    id: 'cat-1',
    romanId: 'I',
    name: 'Living Room Gallery',
    subtitle: 'Hand-Tufted Chesterfields & Curved Lounges',
    categoryParam: 'Living',
    material: 'Tuscan Full-Grain & Antiqued Brass',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    itemCount: '18 Masterpieces',
  },
  {
    id: 'cat-2',
    romanId: 'II',
    name: 'Dining Sanctuaries',
    subtitle: 'Carrara Marble & Fluted Cast Bronze',
    categoryParam: 'Dining',
    material: 'Book-Matched Italian Marble',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
    itemCount: '12 Sanctuaries',
  },
  {
    id: 'cat-3',
    romanId: 'III',
    name: 'Master Bedroom Suites',
    subtitle: 'Belgian Flax Linen & Floating Platforms',
    categoryParam: 'Bedroom',
    material: 'Aromatic Solid Cedar Joinery',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
    itemCount: '14 Suites',
  },
  {
    id: 'cat-4',
    romanId: 'IV',
    name: 'Executive Libraries',
    subtitle: 'Quarter-Sawn Walnut & Calfskin Accents',
    categoryParam: 'Executive',
    material: 'Heirloom Black American Walnut',
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
    material: 'Bouclé Wool & Cast Iron Plinths',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    itemCount: '16 Accents',
  },
];

export default function CategoryInfiniteLoop() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth continuous auto-scroll loop effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.9;

    const scrollStep = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        // Seamless infinite reset at half width
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Manual nudge navigation
  const nudge = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -380 : 380,
        behavior: 'smooth',
      });
    }
  };

  // Duplicate items for continuous seamless loop
  const loopItems = [...defaultCategories, ...defaultCategories, ...defaultCategories];

  return (
    <section className="relative pt-6 pb-16 bg-gradient-to-b from-[#121214] via-[#161619] to-[#121214] text-cream overflow-hidden z-20">
      {/* Header & Controls Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#C5A880]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold">
              <Gem className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Imperial Portfolio in Motion</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-cream mt-1 font-normal tracking-tight">
              Masterpiece Salons & Chambers
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Manual arrow nudges with vintage brass styling */}
            <div className="hidden sm:flex items-center gap-1.5 border border-[#C5A880]/40 rounded-full p-1 bg-charcoal/80 backdrop-blur-md shadow-sm">
              <button
                onClick={() => nudge('left')}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#C5A880] hover:text-charcoal text-[#C5A880] transition-colors"
                aria-label="Previous category"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-px h-3 bg-[#C5A880]/30" />
              <button
                onClick={() => nudge('right')}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#C5A880] hover:text-charcoal text-[#C5A880] transition-colors"
                aria-label="Next category"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pause / Resume Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C5A880]/40 bg-charcoal/70 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[11px] uppercase tracking-wider rounded-full transition-all backdrop-blur-xs text-[#C5A880]"
              title={isPaused ? 'Resume auto-scrolling loop' : 'Pause loop to inspect'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-[#C5A880]" />
                  <span>Resume Orbit</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-[#C5A880]" />
                  <span>Pause Motion</span>
                </>
              )}
            </button>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium text-[#C5A880] hover:text-[#E5C494] transition-colors"
            >
              <span>Explore Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Loop Ribbon / Track with Vintage Gold Frames */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Soft Smokey Vignette Blur Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#121214] via-[#121214]/85 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#121214] via-[#121214]/85 to-transparent z-30 pointer-events-none" />

        {/* Continuous Marquee Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loopItems.map((cat, idx) => (
            <Link
              key={`${cat.id}-${idx}`}
              href={`/catalog?category=${cat.categoryParam}`}
              className="group relative flex-shrink-0 w-[280px] sm:w-[360px] h-[460px] bg-charcoal border-2 border-[#C5A880]/30 hover:border-[#D4AF37] overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col justify-end rounded-xs"
            >
              {/* Ornate Vintage Corner Accents */}
              <OrnateCardCorners color="#C5A880" />

              {/* Inner Fine Gold Inlay Pinstripe */}
              <div className="absolute inset-1.5 border border-[#C5A880]/20 pointer-events-none z-20 group-hover:border-[#D4AF37]/50 transition-colors" />

              {/* Category Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out brightness-[0.88] group-hover:brightness-95"
                  loading="lazy"
                />
                {/* Smokey Atmospheric Gradient Wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
              </div>

              {/* Top Roman Imperial Badge */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                <span className="px-2.5 py-1 bg-charcoal/90 backdrop-blur-md border border-[#C5A880]/40 text-[#EAE6DF] text-[10px] uppercase tracking-[0.25em] font-serif font-semibold shadow-md">
                  {`SALON ${cat.romanId}`}
                </span>
                <span className="w-8 h-8 rounded-full bg-charcoal/90 backdrop-blur-md border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-charcoal transition-all shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content Card */}
              <div className="relative z-20 p-6 space-y-2 bg-gradient-to-t from-[#121214] via-[#121214]/95 to-transparent pt-12">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                    {cat.material}
                  </span>
                  <span className="text-cream/30 text-xs">•</span>
                  <span className="text-[10px] uppercase tracking-widest text-cream/70">
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-cream group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-cream/80 line-clamp-1 font-light">
                  {cat.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <span>Enter Salon</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Heritage Flourish Divider */}
      <div className="max-w-5xl mx-auto px-4 mt-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent" />
        <div className="flex items-center justify-center gap-3 -mt-2.5">
          <div className="w-2 h-2 rotate-45 border border-[#C5A880] bg-charcoal" />
          <span className="text-[9px] uppercase tracking-[0.3em] font-serif text-[#C5A880]/80 bg-charcoal px-3">
            Bespoke Joinery & Rare Carrara Provenance
          </span>
          <div className="w-2 h-2 rotate-45 border border-[#C5A880] bg-charcoal" />
        </div>
      </div>
    </section>
  );
}
