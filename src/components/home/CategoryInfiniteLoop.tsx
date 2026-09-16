'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Pause, Play, ChevronLeft, ChevronRight, Gem } from 'lucide-react';
import { DEFAULT_CATEGORIES, type CategoryItem } from '@/lib/categories-store';

export default function CategoryInfiniteLoop() {
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch dynamic categories from API
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch categories, using default store:', err);
      });
  }, []);

  // Smooth continuous auto-scroll loop effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.8;

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
  }, [isPaused, categories]);

  // Manual nudge navigation
  const nudge = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -240 : 240,
        behavior: 'smooth',
      });
    }
  };

  // Duplicate items for continuous seamless loop
  const loopItems = [...categories, ...categories, ...categories];

  return (
    <section className="relative pt-2 sm:pt-4 pb-6 sm:pb-12 bg-[#121214] text-cream overflow-hidden z-20">
      {/* Header & Controls Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 sm:mb-5">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 sm:pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              <Gem className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#C5A880]" />
              <span>Imperial Salons</span>
            </div>
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl text-cream mt-0.5 font-normal tracking-tight">
              Masterpiece Salons & Chambers
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop manual arrow nudges */}
            <div className="hidden sm:flex items-center gap-1 border border-white/20 rounded-full p-0.5 bg-black/40 backdrop-blur-md">
              <button
                onClick={() => nudge('left')}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#C5A880] hover:text-charcoal text-cream transition-colors"
                aria-label="Previous category"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-2.5 bg-white/20" />
              <button
                onClick={() => nudge('right')}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#C5A880] hover:text-charcoal text-cream transition-colors"
                aria-label="Next category"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pause / Resume Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 border border-white/20 bg-black/40 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-wider rounded-full transition-all backdrop-blur-xs text-[#C5A880]"
              title={isPaused ? 'Resume auto-scroll' : 'Pause'}
            >
              {isPaused ? (
                <>
                  <Play className="w-2.5 h-2.5 text-[#C5A880]" />
                  <span className="hidden xs:inline">Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 text-[#C5A880]" />
                  <span className="hidden xs:inline">Pause</span>
                </>
              )}
            </button>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium text-[#C5A880] hover:text-white transition-colors"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Loop Ribbon with Clean Minimalist Arched Cards */}
      <div className="relative w-full overflow-hidden">
        {/* Very soft desktop-only vignette; removed on mobile so edge cards are 100% visible and not dark */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#121214] to-transparent z-30 pointer-events-none" />
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#121214] to-transparent z-30 pointer-events-none" />

        {/* Continuous Marquee Track */}
        <div
          ref={scrollRef}
          className="flex gap-2.5 sm:gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing px-3 sm:px-6 py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {loopItems.map((cat, idx) => (
            <Link
              key={`${cat.id}-${idx}`}
              href={`/catalog?category=${cat.categoryParam}`}
              className="group relative flex-shrink-0 w-[145px] sm:w-[220px] md:w-[270px] h-[215px] sm:h-[320px] md:h-[390px] rounded-t-[72px] sm:rounded-t-[110px] md:rounded-t-[135px] rounded-b-xl sm:rounded-b-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] flex flex-col justify-end bg-[#181716] border border-white/10 hover:border-[#D4AF37]/80"
            >
              {/* Category Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
                  loading="lazy"
                />
                {/* Clean Subtle Gradient at Bottom only for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              </div>

              {/* Clean Minimalist Bottom Title Bar */}
              <div className="relative z-20 p-2.5 sm:p-4 text-center">
                <h3 className="font-serif text-xs sm:text-base md:text-lg text-white group-hover:text-[#D4AF37] transition-colors leading-tight font-medium drop-shadow-md">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
