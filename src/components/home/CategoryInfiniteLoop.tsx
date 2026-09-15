'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Pause, Play, Compass, ArrowUpRight } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  categoryParam: string;
  material: string;
  image: string;
  itemCount: string;
}

const defaultCategories: CategoryItem[] = [
  {
    id: 'cat-1',
    name: 'Living Room Gallery',
    subtitle: 'Hand-Tufted Chesterfields & Curved Lounges',
    categoryParam: 'Living',
    material: 'Tuscan Full-Grain & Antiqued Brass',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    itemCount: '18 Masterpieces',
  },
  {
    id: 'cat-2',
    name: 'Dining Sanctuaries',
    subtitle: 'Carrara Marble & Fluted Cast Bronze',
    categoryParam: 'Dining',
    material: 'Book-Matched Italian Marble',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
    itemCount: '12 Sanctuaries',
  },
  {
    id: 'cat-3',
    name: 'Master Bedroom Suites',
    subtitle: 'Belgian Flax Linen & Floating Platforms',
    categoryParam: 'Bedroom',
    material: 'Aromatic Solid Cedar Joinery',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
    itemCount: '14 Suites',
  },
  {
    id: 'cat-4',
    name: 'Executive Libraries',
    subtitle: 'Quarter-Sawn Walnut & Calfskin Accents',
    categoryParam: 'Executive',
    material: 'Heirloom Black American Walnut',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85',
    itemCount: '9 Editions',
  },
  {
    id: 'cat-5',
    name: 'Bespoke Atelier Commissions',
    subtitle: 'One-of-a-Kind Architectural Centrepieces',
    categoryParam: 'Bespoke',
    material: 'Rare Onyx & Titanium Gilt',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    itemCount: 'Private Studio',
  },
  {
    id: 'cat-6',
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

  // Duplicate items twice to achieve seamless infinite continuous loop
  const loopItems = [...defaultCategories, ...defaultCategories];

  return (
    <section className="relative py-12 bg-charcoal text-cream overflow-hidden border-y border-cream/10">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-radial from-bronze/10 via-transparent to-transparent pointer-events-none opacity-50" />

      {/* Header & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cream/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">
              <Sparkles className="w-3 h-3 text-bronze" />
              <span>Architectural Collections in Motion</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-cream mt-1 font-normal tracking-tight">
              Curated Living Sanctuaries
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-cream/20 bg-charcoal/60 hover:border-bronze hover:text-bronze text-[11px] uppercase tracking-wider rounded-full transition-all backdrop-blur-xs"
              title={isPaused ? 'Resume auto-scrolling loop' : 'Pause loop to inspect'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-bronze" />
                  <span>Resume Orbit</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-bronze" />
                  <span>Pause Motion</span>
                </>
              )}
            </button>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium text-bronze hover:text-bronze-light transition-colors"
            >
              <span>View All Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Loop Ribbon / Track */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle Edge Vignette Shadow for Premium Depth */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-charcoal via-charcoal/80 to-transparent z-10 pointer-events-none" />

        {/* Continuous Marquee Track */}
        <div
          className="flex gap-6 w-max animate-category-marquee"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loopItems.map((cat, idx) => (
            <Link
              key={`${cat.id}-${idx}`}
              href={`/catalog?category=${cat.categoryParam}`}
              className="group relative flex-shrink-0 w-[280px] sm:w-[360px] h-[440px] bg-charcoal-light border border-cream/15 overflow-hidden transition-all duration-500 hover:border-bronze hover:shadow-2xl flex flex-col justify-end"
            >
              {/* Category Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out brightness-[0.88] group-hover:brightness-95"
                  loading="lazy"
                />
                {/* Rich atmospheric luxury gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
              </div>

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 bg-charcoal/80 backdrop-blur-md border border-cream/20 text-cream text-[10px] uppercase tracking-[0.2em] font-medium">
                  {`0${(idx % defaultCategories.length) + 1} / ARCHIVE`}
                </span>
                <span className="w-8 h-8 rounded-full bg-charcoal/80 backdrop-blur-md border border-cream/20 flex items-center justify-center text-bronze group-hover:bg-bronze group-hover:text-charcoal transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content Card */}
              <div className="relative z-10 p-6 space-y-2 bg-gradient-to-t from-charcoal via-charcoal/90 to-transparent pt-12">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-bronze font-semibold">
                    {cat.material}
                  </span>
                  <span className="text-cream/30 text-xs">•</span>
                  <span className="text-[10px] uppercase tracking-widest text-cream/70">
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-cream group-hover:text-bronze transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-cream/80 line-clamp-1 font-light">
                  {cat.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bronze font-medium opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <span>Enter Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
