import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import { formatINR } from '@/lib/gst';
import { ArrowRight, Sparkles, Shield, Compass, Gem, Check, ArrowUpRight, Star, Award, Layers } from 'lucide-react';
import type { ProductItem } from '@/components/home/CircularProductShowcase';
import { FALLBACK_PRODUCTS, parseProductImages } from '@/lib/products-fallback';
import CategoryInfiniteLoop from '@/components/home/CategoryInfiniteLoop';
import MaterialMasteryExperience from '@/components/home/MaterialMasteryExperience';
import ShoppableReelsSection from '@/components/home/ShoppableReelsSection';
import HomeVisitBookingSection from '@/components/home/HomeVisitBookingSection';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollAnimation';
import OrnateDivider, { OrnateCardCorners, OrnateCardFrame } from '@/components/ui/OrnateDivider';

import { getSafeProducts } from '@/lib/safe-query';

export const revalidate = 60; // Technical SEO ISR

export default async function HomePage() {
  const allProducts = await getSafeProducts();
  const featuredProducts = allProducts.filter((p) => Boolean(p.featured)).slice(0, 4);

  return (
    <div className="pb-12 sm:pb-20 overflow-hidden">
      {/* 1. Cinematic Luxury Hero Section + Continuous Category Orbit (Seamless Dark Theme) */}
      <div className="bg-[#121214] text-cream relative">
        <section className="relative min-h-[65vh] sm:min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#121214] text-cream">
          {/* Crisp Full-bleed Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
              alt="A1 Luxury Furniture Masterpiece Architectural Residence"
              className="w-full h-full object-cover object-center scale-100 brightness-105 contrast-[1.02]"
            />
            {/* Soft Ambient Contrast Tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#121214]" />

            {/* Bottom Fog Blend into Category Orbit */}
            <div className="absolute bottom-0 inset-x-0 h-24 sm:h-44 bg-gradient-to-t from-[#121214] via-[#121214]/80 to-transparent backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4 sm:space-y-7 py-10 sm:py-24 md:py-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/40 bg-[#121214]/70 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium mx-auto">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Sovereign Furniture Atelier</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-white leading-[1.15] max-w-4xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Masterpieces in <span className="italic font-normal text-[#D4AF37]">Living Form</span>
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-white/95 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-2">
              Curated book-matched Italian Carrara marble, hand-tufted Tuscan full-grain leathers, and generational solid
              hardwood joinery. Handcrafted for distinguished residences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-7 py-3 sm:px-9 sm:py-4 bg-[#C5A880] text-charcoal font-semibold text-[11px] sm:text-xs uppercase tracking-[0.22em] hover:bg-[#D4AF37] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2.5 border border-[#D4AF37] rounded-xs"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/contact-us"
                className="w-full sm:w-auto px-7 py-3 sm:px-9 sm:py-4 border border-[#C5A880]/70 bg-[#161619]/85 text-cream text-[11px] sm:text-xs uppercase tracking-[0.22em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all backdrop-blur-md flex items-center justify-center font-medium shadow-sm rounded-xs"
              >
                <span>Book Salon Viewing</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. INFINITE CONTINUOUS CATEGORY LOOP SECTION (Raw Arched Aesthetic) */}
        <CategoryInfiniteLoop />
      </div>

      {/* Main Content Body with Warm Off-White Cream Theme & Sculptural Curved Silhouette */}
      <div className="bg-[#FAF7F2] text-charcoal space-y-12 sm:space-y-20 pt-8 sm:pt-14">
        {/* 3. Interactive Material Mastery & Tactile Provenance Experience */}
        <MaterialMasteryExperience />

        {/* 4. Featured Masterpieces with Sculptural Organic Cards */}
        <section className="bg-[#F4EFE6] py-12 sm:py-20 border-y border-[#D8CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#8C6D46] font-semibold">
                    <Gem className="w-3.5 h-3.5 text-[#8C6D46]" />
                    <span>Signature Portfolio</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-4xl text-charcoal mt-1">
                    Masterpieces in Focus
                  </h2>
                </div>
                <Link
                  href="/catalog"
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C6D46] hover:text-charcoal flex items-center gap-1.5"
                >
                  <span>View Full Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.12}>
              {featuredProducts.map((product: ProductItem) => {
                const primaryImage = parseProductImages(product.images)[0];
                const variants = product.variants || [];
                const variantCount = variants.length;
                const minPrice = variants[0]?.priceOverride || product.basePrice;

                return (
                  <StaggerItem key={product.id}>
                    <div className="group bg-[#FDFBF7] border-2 border-[#D8CEBF] hover:border-[#8C6D46] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(140,109,70,0.15)] transition-all duration-300 shadow-xs h-full relative rounded-t-[50px] sm:rounded-t-[70px] rounded-b-xl overflow-hidden p-1.5">
                      {/* Inner Gold Pinstripe */}
                      <div className="absolute inset-1.5 border border-[#C5A880]/20 rounded-t-[44px] sm:rounded-t-[64px] rounded-b-lg pointer-events-none group-hover:border-[#8C6D46]/40 transition-colors" />

                      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-[#FAF6F0] rounded-t-[42px] sm:rounded-t-[62px] rounded-b-lg">
                        <img
                          src={primaryImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-charcoal/90 backdrop-blur-xs text-[#D4AF37] border border-[#C5A880]/40 text-[9px] sm:text-[10px] uppercase tracking-widest px-2.5 py-0.5 font-serif rounded-full">
                          {product.category}
                        </div>
                      </Link>

                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 relative z-10">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {variants.map((v) => (
                              <span
                                key={v.id || v.sku}
                                className="w-3 h-3 rounded-full border border-[#D8CEBF]"
                                style={{ backgroundColor: v.colorHex }}
                                title={`${v.colorName} (${v.material})`}
                              />
                            ))}
                            <span className="text-[10px] text-charcoal/50 ml-1">
                              {variantCount} finishes
                            </span>
                          </div>
                          <Link href={`/product/${product.slug}`}>
                            <h3 className="font-serif text-base text-charcoal hover:text-[#8C6D46] transition-colors font-semibold">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-[11px] text-charcoal/65 mt-1 line-clamp-2">
                            {product.tagline}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-[#D8CEBF]/60 flex items-baseline justify-between">
                          <div>
                            <span className="text-[9px] uppercase text-charcoal/50 tracking-wider">From</span>
                            <p className="font-serif text-sm font-semibold text-charcoal">
                              {formatINR(minPrice)}
                            </p>
                          </div>
                          <Link
                            href={`/product/${product.slug}`}
                            className="text-[10px] uppercase tracking-wider font-semibold text-[#8C6D46] hover:text-charcoal flex items-center gap-1"
                          >
                            <span>Configure</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* 5. Atelier Craftsmanship Narrative */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <ScrollReveal direction="right" className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#8C6D46] font-semibold">
                The Architecture of Permanence
              </span>
              <h2 className="font-serif text-2xl sm:text-5xl text-charcoal font-light leading-tight">
                Materials that mature with <span className="italic font-normal text-[#8C6D46]">sovereign dignity</span>
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                We reject the transient cadence of modern manufacturing. Every marble table begins in Carrara,
                where third-generation stonemasons inspect vein continuity for book-matching symmetry.
                Our leathers undergo 90 days of organic vegetable tanning in Santa Croce, producing a rich patina
                that deepens with each passing decade.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-3 sm:pt-4 border-t border-[#D8CEBF]">
                <div className="p-3.5 sm:p-4 bg-[#FDFBF7] border-2 border-[#D8CEBF] rounded-xl shadow-xs relative overflow-hidden group">
                  <p className="font-serif text-lg sm:text-2xl text-charcoal font-semibold">HSN 9403</p>
                  <p className="text-[11px] sm:text-xs text-charcoal/60 mt-0.5 sm:mt-1">
                    Fully compliant Indian GST invoicing with 18% tax credit eligibility for residential & commercial spaces.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 bg-[#FDFBF7] border-2 border-[#D8CEBF] rounded-xl shadow-xs relative overflow-hidden group">
                  <p className="font-serif text-lg sm:text-2xl text-charcoal font-semibold">Zero Plastic</p>
                  <p className="text-[11px] sm:text-xs text-charcoal/60 mt-0.5 sm:mt-1">
                    Delivered in reusable organic cotton blankets with timber shock-absorbing skeletal crates.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-charcoal text-cream text-[11px] sm:text-xs uppercase tracking-[0.2em] hover:bg-[#C5A880] hover:text-charcoal transition-all shadow-sm border border-[#C5A880]/40 font-medium rounded-xs"
                >
                  <span>Examine The Material Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2} className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[80px] sm:rounded-t-[120px] rounded-b-2xl border-2 border-[#C5A880]/40 shadow-luxury group">
                <div className="absolute inset-2 border border-[#C5A880]/20 rounded-t-[72px] sm:rounded-t-[112px] rounded-b-xl pointer-events-none z-10" />
                <img
                  src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=80"
                  alt="Master Artisan at Work"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-[#FDFBF7] p-4 sm:p-6 border-2 border-[#D8CEBF] shadow-luxury max-w-xs hidden sm:block rounded-xl">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8C6D46] font-semibold">Quality Covenant</p>
                <p className="font-serif text-xs sm:text-sm text-charcoal mt-1 italic">
                  &ldquo;A piece of furniture should outlive the architect who drew the residence.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 6. Shoppable Videos & Instagram Reels Section */}
        <ShoppableReelsSection />

        {/* 7. Private In-Home Spatial Consultation Booking Section */}
        <HomeVisitBookingSection />

        {/* 7. Client Testimonials */}
        <section className="bg-[#F4EFE6] text-charcoal py-12 sm:py-20 border-t border-[#D8CEBF] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 sm:space-y-12">
            <ScrollReveal direction="up">
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#8C6D46] font-semibold">
                  Collector Testimonies
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-charcoal">Patrons of Discretion</h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 text-left" staggerDelay={0.15}>
              <StaggerItem>
                <div className="p-5 sm:p-6 border-2 border-[#D8CEBF] bg-[#FDFBF7] shadow-xs space-y-3 sm:space-y-4 h-full relative rounded-2xl group hover:border-[#8C6D46] transition-all">
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                    &ldquo;The Augustus Grande Chesterfield is the unquestioned crown jewel of our penthouse.
                    The leather fragrance and tufting precision rival the finest European royal houses.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-[#D8CEBF]/60">
                    <p className="text-xs font-serif font-semibold text-charcoal">Vikramaditya Singhania</p>
                    <p className="text-[10px] text-charcoal/50">Altamount Road, South Mumbai</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-5 sm:p-6 border-2 border-[#D8CEBF] bg-[#FDFBF7] shadow-xs space-y-3 sm:space-y-4 h-full relative rounded-2xl group hover:border-[#8C6D46] transition-all">
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                    &ldquo;The Solarium Carrara table arrived with five white-glove technicians.
                    They leveled it within 1mm precision and provided full sealing certification. Impeccable.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-[#D8CEBF]/60">
                    <p className="text-xs font-serif font-semibold text-charcoal">Gayatri & Samir Kapur</p>
                    <p className="text-[10px] text-charcoal/50">Golf Links, New Delhi</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-5 sm:p-6 border-2 border-[#D8CEBF] bg-[#FDFBF7] shadow-xs space-y-3 sm:space-y-4 h-full relative rounded-2xl group hover:border-[#8C6D46] transition-all">
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                    &ldquo;From instantaneous Razorpay settlement to automated GST input credit invoices,
                    the purchase journey matches the elegance of the furniture.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-[#D8CEBF]/60">
                    <p className="text-xs font-serif font-semibold text-charcoal">Rohan Mehra, Principal Architect</p>
                    <p className="text-[10px] text-charcoal/50">Lavelle Road, Bengaluru</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
