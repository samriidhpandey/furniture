'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatINR } from '@/lib/gst';
import { ArrowRight, Play, Pause, RotateCw } from 'lucide-react';

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  basePrice: number;
  images: string;
  featured?: boolean;
  variants: {
    id: string;
    sku: string;
    colorName: string;
    colorHex: string;
    material: string;
    priceOverride: number | null;
    stock: number;
  }[];
}

export default function CircularProductShowcase({
  products,
  title = 'The 2026 Sovereign Atelier Archive',
  subtitle = '360° Kinetic Masterpiece Orbit',
}: {
  products: ProductItem[];
  title?: string;
  subtitle?: string;
}) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState<ProductItem>(products[0] || null);

  // Compact orbital radius for clean 50vh viewport fit
  const radiusX = 175;
  const radiusY = 135;

  // Continuous rotation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isRotating) {
        setRotationAngle((prev) => (prev + delta * 16) % 360); // 16 deg/sec smooth rotation
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating]);

  if (!activeItem) return null;

  const activePrice = activeItem.variants[0]?.priceOverride || activeItem.basePrice;
  const activeImage = JSON.parse(activeItem.images)[0];

  return (
    <section className="py-8 sm:py-10 bg-[#141312] text-cream border-y border-charcoal-subtle overflow-hidden relative min-h-[50vh] flex flex-col justify-between">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bronze/12 via-[#141312]/60 to-[#141312] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 border border-bronze/40 bg-charcoal/80 rounded-full text-[9px] uppercase tracking-[0.25em] text-bronze font-medium">
          <RotateCw className="w-2.5 h-2.5 animate-spin text-bronze" style={{ animationDuration: '6s' }} />
          <span>{subtitle}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-cream font-light">
          {title}
        </h2>
      </div>

      {/* 360° Circular Stage — 50vh Compact Fitting */}
      <div className="relative w-full max-w-[620px] h-[360px] sm:h-[400px] mx-auto flex items-center justify-center my-2">
        {/* Orbital Track Rings */}
        <div
          className="absolute rounded-full border border-dashed border-bronze/25 pointer-events-none"
          style={{
            width: `${radiusX * 2}px`,
            height: `${radiusY * 2}px`,
          }}
        />
        <div
          className="absolute rounded-full border border-bronze/10 pointer-events-none"
          style={{
            width: `${radiusX * 2 + 40}px`,
            height: `${radiusY * 2 + 40}px`,
          }}
        />

        {/* Central Compact Showcase Card */}
        <div
          className="relative z-20 w-52 sm:w-60 bg-[#1C1A17]/95 border border-bronze/40 p-3 sm:p-4 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-bronze"
          onMouseEnter={() => setIsRotating(false)}
          onMouseLeave={() => setIsRotating(true)}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-charcoal-subtle bg-charcoal mb-2">
            <img
              src={activeImage}
              alt={activeItem.name}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            <span className="absolute top-1.5 left-1.5 bg-charcoal/85 text-bronze text-[8px] uppercase tracking-widest px-1.5 py-0.5">
              {activeItem.category}
            </span>
          </div>

          <h3 className="font-serif text-sm sm:text-base text-cream font-medium truncate">
            {activeItem.name}
          </h3>

          <div className="pt-2 mt-2 border-t border-charcoal-subtle flex items-center justify-between">
            <div className="text-left">
              <span className="text-[8px] uppercase text-cream/50 tracking-wider block">Price</span>
              <p className="font-serif text-xs font-semibold text-bronze-light">
                {formatINR(activePrice)}
              </p>
            </div>

            <Link
              href={`/product/${activeItem.slug}`}
              className="px-2.5 py-1 bg-bronze text-charcoal text-[9px] uppercase tracking-widest font-semibold hover:bg-bronze-light transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Inspect</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        {/* Orbiting Product Spheres */}
        {products.map((product, idx) => {
          const angleOffset = (360 / products.length) * idx;
          const currentAngle = (rotationAngle + angleOffset) * (Math.PI / 180);

          const x = Math.cos(currentAngle) * radiusX;
          const y = Math.sin(currentAngle) * radiusY;

          const img = JSON.parse(product.images)[0];
          const isCurrentActive = activeItem.id === product.id;

          return (
            <button
              key={product.id}
              onClick={() => {
                setActiveItem(product);
                setActiveIndex(idx);
              }}
              onMouseEnter={() => {
                setIsRotating(false);
                setActiveItem(product);
                setActiveIndex(idx);
              }}
              onMouseLeave={() => setIsRotating(true)}
              className="absolute z-30 group cursor-pointer transition-transform duration-75 ease-linear"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
              aria-label={`Select ${product.name}`}
            >
              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border transition-all duration-300 shadow-lg overflow-hidden bg-[#1E1C1A] ${
                  isCurrentActive
                    ? 'border-bronze ring-2 ring-bronze/50 scale-110'
                    : 'border-cream/40 opacity-80 hover:opacity-100 hover:scale-110 hover:border-bronze'
                }`}
              >
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-charcoal/95 border border-cream/20 text-[9px] text-cream px-1.5 py-0.5 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {product.name.split(' ').slice(0, 2).join(' ')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Controls Footer */}
      <div className="flex items-center justify-center gap-3 relative z-10 pt-1">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="flex items-center gap-1.5 px-3 py-1 border border-cream/25 bg-charcoal/70 text-cream text-[10px] uppercase tracking-wider hover:border-bronze hover:text-bronze transition-all"
        >
          {isRotating ? <Pause className="w-3 h-3 text-bronze" /> : <Play className="w-3 h-3 text-bronze" />}
          <span>{isRotating ? 'Pause Orbit' : 'Rotate'}</span>
        </button>

        <div className="flex items-center gap-1 bg-[#1B1917] p-0.5 border border-charcoal-subtle">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveItem(p);
                setActiveIndex(i);
              }}
              className={`px-2 py-0.5 text-[9px] uppercase font-mono transition-colors ${
                activeItem.id === p.id
                  ? 'bg-bronze text-charcoal font-bold'
                  : 'text-cream/50 hover:text-cream'
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
