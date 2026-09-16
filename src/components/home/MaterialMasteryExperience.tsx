'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, Shield, Gem, Layers, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollAnimation';

interface MaterialStory {
  id: string;
  tag: string;
  title: string;
  provenance: string;
  origin: string;
  description: string;
  tactility: string;
  covenant: string;
  image: string;
  catalogCategory: string;
  highlights: string[];
}

const MATERIAL_STORIES: MaterialStory[] = [
  {
    id: 'marble',
    tag: 'Monolithic Stone',
    title: 'Book-Matched Italian Carrara & Calacatta',
    provenance: 'Extracted from the historic Apuan Alps quarry, Carrara, Italy',
    origin: 'Tuscany, Italy',
    description:
      'Each monolithic slab is hand-selected for continuous vein flow. Third-generation Italian stonemasons mirror-cut adjacent blocks to create hypnotic, kaleidoscopic symmetry across dining tables and consoles.',
    tactility: 'Feather-soft honed matte patina, impervious to transient trends.',
    covenant: 'Lifetime Structural Integrity & Chemical Stone Sealing Certificate.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1400&q=85',
    catalogCategory: 'Dining',
    highlights: ['1mm Book-matching alignment', 'Diamond-beveled 45mm edges', 'Zero artificial resins'],
  },
  {
    id: 'leather',
    tag: 'Heirloom Upholstery',
    title: 'Tuscan Full-Grain Vegetable-Tanned Leather',
    provenance: 'Tanned in organic oak-bark barrels, Santa Croce sull’Arno, Italy',
    origin: 'Pisa, Italy',
    description:
      'We reject chromium and synthetic coatings. Our leathers undergo 90 days of slow vegetable tanning with natural chestnut and mimosa tannins, developing an incomparable deep cognac patina that matures with generational grace.',
    tactility: 'Supple, buttery grain with natural aromatic warmth.',
    covenant: '15 Years Hand-Tied Coil & Leather Longevity Covenant.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85',
    catalogCategory: 'Living',
    highlights: ['Eight-way hand-tied springs', 'Hand-hammered antiqued brass studs', 'Organic beeswax nourished'],
  },
  {
    id: 'hardwood',
    tag: 'Generational Joinery',
    title: 'Quarter-Sawn Old-Growth American Walnut & Cedar',
    provenance: 'Sustainably harvested from certified temperate Appalachian forests',
    origin: 'Kyoto & North America',
    description:
      'Carved with precision mortise-and-tenon interlocking joinery. Every joint breathes naturally with ambient temperature and humidity shifts without loosening or squeaking, requiring zero visible metal screws.',
    tactility: 'Velvety organic hand-rubbed Danish oil finish.',
    covenant: '20 Years Solid Hardwood Structural Guarantee.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1400&q=85',
    catalogCategory: 'Executive',
    highlights: ['Concealed cable routing', 'Calfskin-lined quiet-glide drawers', 'Zero synthetic veneers'],
  },
  {
    id: 'textile',
    tag: 'Tactile Cocoon',
    title: 'Belgian Flax Linen & Alpine Wool Bouclé',
    provenance: 'Woven on heritage artisanal looms in Flanders & Como',
    origin: 'Flanders, Belgium',
    description:
      'Textiles woven from long-staple European flax and dense alpine wool. Offering acoustic softening and supreme thermal neutrality for sanctuary master bedrooms and sculptural swivel lounge chairs.',
    tactility: 'Deeply textured, cozy three-dimensional weave.',
    covenant: 'High-density cold-molded memory foam core guarantee.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85',
    catalogCategory: 'Bedroom',
    highlights: ['Acoustic resonance dampening', 'Hypoallergenic natural fibers', 'OEKO-TEX Class 1 certified'],
  },
];

export default function MaterialMasteryExperience() {
  const [activeStory, setActiveStory] = useState<MaterialStory>(MATERIAL_STORIES[0]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal direction="up">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C6D46]/10 text-[#8C6D46] rounded-full text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-semibold">
            <Gem className="w-3 h-3 text-[#8C6D46]" />
            <span>The Alchemy of Provenance</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-charcoal font-light">
            Materials that mature with <span className="italic font-normal text-[#8C6D46]">sovereign dignity</span>
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 max-w-2xl mx-auto">
            Touch, acoustics, and generational permanence. Explore the noble raw materials selected by our master ateliers.
          </p>
        </div>
      </ScrollReveal>

      {/* Interactive Material Tabs Bar */}
      <div className="flex justify-center mb-6 sm:mb-10 overflow-x-auto no-scrollbar pb-2">
        <div className="inline-flex p-1 sm:p-1.5 bg-[#EFE9DF] border border-[#D8CEBF] rounded-full gap-1 shadow-inner max-w-full">
          {MATERIAL_STORIES.map((story) => {
            const isActive = story.id === activeStory.id;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStory(story)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-charcoal text-[#D4AF37] shadow-md font-semibold'
                    : 'text-charcoal/70 hover:text-charcoal hover:bg-[#FAF7F2]'
                }`}
              >
                {story.tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Showcase Display */}
      <div className="bg-[#FDFBF7] border-2 border-[#D8CEBF] rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm overflow-hidden transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left: Cinematic Visual with Floating Provenance Tag */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden border border-[#D8CEBF] bg-[#FAF6F0] shadow-sm group">
              <img
                key={activeStory.image}
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Top Floating Provenance Tag */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                <span className="px-3 py-1 bg-charcoal/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-serif font-bold rounded-full shadow-md">
                  {activeStory.origin}
                </span>
              </div>

              {/* Bottom Visual Highlights */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-wrap gap-1.5 sm:gap-2">
                {activeStory.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="px-2.5 py-0.5 sm:py-1 bg-black/65 backdrop-blur-md text-white text-[9px] sm:text-[10px] uppercase tracking-wider rounded-md border border-white/20"
                  >
                    ✓ {hl}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative & Specifications */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C6D46] font-semibold">
                {activeStory.tag}
              </span>
              <h3 className="font-serif text-xl sm:text-3xl text-charcoal font-normal leading-tight">
                {activeStory.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-charcoal/60 font-serif italic">
                {activeStory.provenance}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              {activeStory.description}
            </p>

            {/* Tactility & Covenant Grid */}
            <div className="space-y-2.5 pt-2 border-t border-[#D8CEBF]/80 text-xs">
              <div className="p-3 bg-[#FAF6F0] border border-[#D8CEBF]/60 rounded-xl space-y-0.5">
                <span className="text-[9px] uppercase tracking-wider text-[#8C6D46] font-semibold">
                  Tactile Impression
                </span>
                <p className="text-charcoal/80 text-[11px] sm:text-xs">{activeStory.tactility}</p>
              </div>

              <div className="p-3 bg-[#FAF6F0] border border-[#D8CEBF]/60 rounded-xl space-y-0.5">
                <span className="text-[9px] uppercase tracking-wider text-[#8C6D46] font-semibold flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#8C6D46]" />
                  <span>Quality Covenant</span>
                </span>
                <p className="text-charcoal/80 text-[11px] sm:text-xs">{activeStory.covenant}</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/catalog?category=${activeStory.catalogCategory}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-cream hover:bg-[#8C6D46] hover:text-charcoal transition-all text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-sm"
              >
                <span>View {activeStory.catalogCategory} Masterpieces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
