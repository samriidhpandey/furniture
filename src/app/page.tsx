import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import { formatINR } from '@/lib/gst';
import { ArrowRight, Sparkles, Shield, Compass, Gem, Check, ArrowUpRight, Star, Award, Layers } from 'lucide-react';
import type { ProductItem } from '@/components/home/CircularProductShowcase';
import { FALLBACK_PRODUCTS, parseProductImages } from '@/lib/products-fallback';
import CategoryInfiniteLoop from '@/components/home/CategoryInfiniteLoop';
import HomeVisitBookingSection from '@/components/home/HomeVisitBookingSection';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollAnimation';
import OrnateDivider, { OrnateCardCorners, OrnateCardFrame } from '@/components/ui/OrnateDivider';

export const revalidate = 60; // Technical SEO ISR (§27)

export default async function HomePage() {
  let allProducts: ProductItem[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      include: {
        variants: true,
        reviews: { where: { status: 'APPROVED' } },
      },
      orderBy: { basePrice: 'desc' },
    });

    if (dbProducts && dbProducts.length > 0) {
      allProducts = dbProducts as unknown as ProductItem[];
    } else {
      allProducts = FALLBACK_PRODUCTS;
    }
  } catch (err) {
    console.warn('Prisma fetch failed, using curated luxury fallback catalog:', err);
    allProducts = FALLBACK_PRODUCTS;
  }

  const featuredProducts = allProducts.filter((p) => Boolean(p.featured)).slice(0, 4);

  const categories = [
    {
      name: 'Living Room Gallery',
      desc: 'Hand-tufted chesterfields & sculptural swivel lounges in full-grain leather',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog?category=Living',
      romanId: 'I',
    },
    {
      name: 'Dining Sanctuaries',
      desc: 'Book-matched Italian Carrara marble & cast bronze fluted monoliths',
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog?category=Dining',
      romanId: 'II',
    },
    {
      name: 'Master Bedroom Suites',
      desc: 'Belgian flax linen floating platforms & aromatic cedar mortise joinery',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog?category=Bedroom',
      romanId: 'III',
    },
    {
      name: 'Executive Libraries',
      desc: 'Quarter-sawn walnut desks with hideaway calfskin drawers & antiqued brass',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog?category=Executive',
      romanId: 'IV',
    },
  ];

  return (
    <div className="pb-20 overflow-hidden">
      {/* 1. Cinematic Luxury Hero Section + Continuous Category Orbit (Seamless Dark Theme with Smokey Fog Atmospheric Blur) */}
      <div className="bg-[#121214] text-cream relative">
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#121214] text-cream">
          {/* Crisp, Full-bleed Background Image with Seamless Smokey Fog Diffusion */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
              alt="A1 Luxury Furniture Masterpiece Architectural Residence"
              className="w-full h-full object-cover object-center scale-100 opacity-90"
            />
            {/* Multi-layered Smokey Ambient Wash */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/50 via-[#121214]/75 to-[#121214]" />
            
            {/* Soft Radial Ambient Fog Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#121214_85%)] opacity-80" />

            {/* Seamless Dissolving Smokey Blur Bottom Transition into Category Orbit */}
            <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-[#121214] via-[#121214]/95 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 py-20 sm:py-28">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C5A880]/60 bg-[#161619]/90 backdrop-blur-md rounded-full text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>The 2026 Sovereign Atelier Archive</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-cream leading-[1.1] max-w-4xl mx-auto drop-shadow-md">
              Masterpieces in <span className="italic font-normal text-[#D4AF37]">Living Form</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-cream/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
              Curated book-matched Italian Carrara marble, hand-tufted Tuscan full-grain leathers, and generational solid
              hardwood joinery. Handcrafted for the world&apos;s most distinguished residences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-charcoal font-semibold text-xs uppercase tracking-[0.25em] hover:bg-[#D4AF37] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-3 border border-[#D4AF37]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact-us"
                className="w-full sm:w-auto px-8 py-4 border border-[#C5A880]/60 bg-[#161619]/80 text-cream text-xs uppercase tracking-[0.25em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all backdrop-blur-md flex items-center justify-center font-medium shadow-sm"
              >
                <span>Book Salon Viewing</span>
              </Link>
            </div>

            {/* Quick Pillars (Vintage Gold Filigree Glassmorphic Cards) */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-[#C5A880]/30 text-left">
              <div className="p-4 bg-[#161619]/85 backdrop-blur-md border-2 border-[#C5A880]/30 hover:border-[#D4AF37] rounded-xs shadow-md transition-all relative group overflow-hidden">
                <OrnateCardCorners color="#C5A880" size={14} />
                <div className="absolute inset-1 border border-[#C5A880]/15 pointer-events-none group-hover:border-[#D4AF37]/30 transition-colors" />
                <p className="font-serif text-base sm:text-lg text-cream font-semibold group-hover:text-[#D4AF37] transition-colors relative z-10">Bespoke Curation</p>
                <p className="text-xs text-cream/75 mt-0.5 relative z-10">Custom sizing & rare marble selection</p>
              </div>
              <div className="p-4 bg-[#161619]/85 backdrop-blur-md border-2 border-[#C5A880]/30 hover:border-[#D4AF37] rounded-xs shadow-md transition-all relative group overflow-hidden">
                <OrnateCardCorners color="#C5A880" size={14} />
                <div className="absolute inset-1 border border-[#C5A880]/15 pointer-events-none group-hover:border-[#D4AF37]/30 transition-colors" />
                <p className="font-serif text-base sm:text-lg text-cream font-semibold group-hover:text-[#D4AF37] transition-colors relative z-10">White-Glove Pan-India</p>
                <p className="text-xs text-cream/75 mt-0.5 relative z-10">Complimentary assembly & debris removal</p>
              </div>
              <div className="p-4 bg-[#161619]/85 backdrop-blur-md border-2 border-[#C5A880]/30 hover:border-[#D4AF37] rounded-xs shadow-md transition-all relative group overflow-hidden">
                <OrnateCardCorners color="#C5A880" size={14} />
                <div className="absolute inset-1 border border-[#C5A880]/15 pointer-events-none group-hover:border-[#D4AF37]/30 transition-colors" />
                <p className="font-serif text-base sm:text-lg text-cream font-semibold group-hover:text-[#D4AF37] transition-colors relative z-10">15-Year Guarantee</p>
                <p className="text-xs text-cream/75 mt-0.5 relative z-10">Artisan structural integrity assurance</p>
              </div>
              <div className="p-4 bg-[#161619]/85 backdrop-blur-md border-2 border-[#C5A880]/30 hover:border-[#D4AF37] rounded-xs shadow-md transition-all relative group overflow-hidden">
                <OrnateCardCorners color="#C5A880" size={14} />
                <div className="absolute inset-1 border border-[#C5A880]/15 pointer-events-none group-hover:border-[#D4AF37]/30 transition-colors" />
                <p className="font-serif text-base sm:text-lg text-cream font-semibold group-hover:text-[#D4AF37] transition-colors relative z-10">Verified Origin</p>
                <p className="text-xs text-cream/75 mt-0.5 relative z-10">Tuscan Leather & Carrara Quinquennial</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. INFINITE CONTINUOUS CATEGORY LOOP SECTION (Zero Gap, Continuous Auto-Orbit with Vintage Gold Frames) */}
        <CategoryInfiniteLoop />
      </div>

      {/* Main Content Body with Antique Neoclassical Trims and Vintage Borders */}
      <div className="space-y-24 pt-10">
        {/* Section Transition Ornate Royal Crest */}
        <OrnateDivider theme="light" title="ARCHITECTURAL LIVING SANCTUARIES" subtitle="Harmonious Compositions in Marble, Timber & Leather" />

        {/* 3. Curated Categories Gallery with Vintage Royal Filigree Frames */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8C6D46]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C6D46] font-semibold">
                  Curated Living Environments
                </span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#8C6D46]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">Architectural Sanctuaries</h2>
              <p className="text-xs sm:text-sm text-charcoal/70">
                Each environment is thoughtfully composed with sculptural proportion, tactile nobility, and acoustic serenity.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.15}>
            {categories.map((cat, idx) => (
              <StaggerItem key={cat.name}>
                <Link
                  href={cat.href}
                  className="group relative h-96 overflow-hidden rounded-xs border-2 border-[#C5A880]/40 hover:border-[#8C6D46] bg-charcoal shadow-sm hover:shadow-[0_12px_36px_rgba(140,109,70,0.18)] block transition-all duration-500"
                >
                  {/* Vintage Corner Brackets */}
                  <OrnateCardCorners color="#D4AF37" size={20} />

                  {/* Inner Gold Inlay Pinstripe Frame */}
                  <div className="absolute inset-2 border border-[#C5A880]/25 pointer-events-none z-10 group-hover:border-[#D4AF37]/50 transition-colors duration-500" />

                  {/* Category Image */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                  
                  {/* Top Salon Number Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-charcoal/90 backdrop-blur-md border border-[#C5A880]/50 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-serif font-bold shadow-md">
                      {`ARCHIVE 0${idx + 1}`}
                    </span>
                  </div>

                  {/* Bottom Content Bar */}
                  <div className="absolute bottom-0 inset-x-0 p-8 flex items-end justify-between z-20">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                        Atelier Salon
                      </span>
                      <h3 className="font-serif text-2xl text-cream group-hover:text-[#D4AF37] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-cream/80 max-w-sm">{cat.desc}</p>
                    </div>
                    <div className="w-11 h-11 rounded-full border border-[#C5A880]/60 bg-charcoal/60 backdrop-blur-xs text-[#D4AF37] flex items-center justify-center group-hover:bg-[#C5A880] group-hover:text-charcoal group-hover:border-[#C5A880] transition-all shadow-md shrink-0 ml-4">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* 4. Featured Masterpieces with Scroll Reveals & Vintage Frames */}
        <section className="bg-cream-subtle py-20 border-y border-[#C5A880]/30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#8C6D46] font-semibold">
                    <Gem className="w-3.5 h-3.5 text-[#8C6D46]" />
                    <span>Signature Portfolio</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
                    Masterpieces in Focus
                  </h2>
                </div>
                <Link
                  href="/catalog"
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C6D46] hover:text-charcoal flex items-center gap-2"
                >
                  <span>View Full Archive</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
              {featuredProducts.map((product: ProductItem) => {
                const primaryImage = parseProductImages(product.images)[0];
                const variants = product.variants || [];
                const variantCount = variants.length;
                const minPrice = variants[0]?.priceOverride || product.basePrice;

                return (
                  <StaggerItem key={product.id}>
                    <div className="group bg-white border-2 border-[#C5A880]/30 hover:border-[#8C6D46] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(140,109,70,0.12)] transition-all duration-300 shadow-xs h-full relative rounded-xs overflow-hidden">
                      {/* Vintage Corner Brackets */}
                      <OrnateCardCorners color="#C5A880" size={14} />

                      {/* Inner Gold Inlay Pinstripe */}
                      <div className="absolute inset-1.5 border border-[#C5A880]/15 pointer-events-none group-hover:border-[#8C6D46]/30 transition-colors" />

                      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-cream-subtle">
                        <img
                          src={primaryImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-charcoal/90 backdrop-blur-xs text-[#D4AF37] border border-[#C5A880]/40 text-[10px] uppercase tracking-widest px-2.5 py-1 font-serif">
                          {product.category}
                        </div>
                      </Link>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {variants.map((v) => (
                              <span
                                key={v.id || v.sku}
                                className="w-3 h-3 rounded-full border border-cream-border"
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

                        <div className="pt-3 border-t border-[#C5A880]/20 flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-charcoal/50 tracking-wider">From</span>
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

        {/* 5. Atelier Craftsmanship Narrative with Scroll Animation & Vintage Plaques */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal direction="right" className="lg:col-span-6 space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C6D46] font-semibold">
                The Architecture of Permanence
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
                Materials that mature with <span className="italic font-normal text-[#8C6D46]">sovereign dignity</span>
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                We reject the transient cadence of modern manufacturing. Every marble table begins in Carrara,
                where third-generation stonemasons inspect vein continuity for book-matching symmetry.
                Our leathers undergo 90 days of organic vegetable tanning in Santa Croce, producing a rich patina
                that deepens with each passing decade.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#C5A880]/30">
                <div className="p-4 bg-white border-2 border-[#C5A880]/30 rounded-xs shadow-xs relative overflow-hidden group">
                  <OrnateCardCorners color="#C5A880" size={12} />
                  <p className="font-serif text-2xl text-charcoal font-semibold">HSN 9403</p>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Fully compliant Indian GST invoicing with 18% tax credit eligibility for residential & commercial spaces.
                  </p>
                </div>
                <div className="p-4 bg-white border-2 border-[#C5A880]/30 rounded-xs shadow-xs relative overflow-hidden group">
                  <OrnateCardCorners color="#C5A880" size={12} />
                  <p className="font-serif text-2xl text-charcoal font-semibold">Zero Plastic</p>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Delivered in reusable organic cotton blankets with timber shock-absorbing skeletal crates.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-cream text-xs uppercase tracking-[0.2em] hover:bg-[#C5A880] hover:text-charcoal transition-all shadow-sm border border-[#C5A880]/40 font-medium"
                >
                  <span>Examine The Material Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2} className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xs border-2 border-[#C5A880]/40 shadow-luxury group">
                <OrnateCardCorners color="#D4AF37" size={18} />
                <div className="absolute inset-2 border border-[#C5A880]/20 pointer-events-none z-10" />
                <img
                  src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=80"
                  alt="Master Artisan at Work"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 border-2 border-[#C5A880]/50 shadow-luxury max-w-xs hidden sm:block rounded-xs">
                <OrnateCardCorners color="#C5A880" size={12} />
                <p className="text-[10px] uppercase tracking-widest text-[#8C6D46] font-semibold">Quality Covenant</p>
                <p className="font-serif text-sm text-charcoal mt-1 italic">
                  &ldquo;A piece of furniture should outlive the architect who drew the residence.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 6. Private In-Home Spatial Consultation Booking Section */}
        <HomeVisitBookingSection />

        {/* 7. Client Testimonials with Scroll Stagger & Vintage Plaques */}
        <section className="bg-cream-subtle text-charcoal py-20 border-t border-[#C5A880]/30 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <ScrollReveal direction="up">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C6D46] font-semibold">
                  Collector Testimonies
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">Patrons of Discretion</h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left" staggerDelay={0.15}>
              <StaggerItem>
                <div className="p-6 border-2 border-[#C5A880]/35 bg-white shadow-xs space-y-4 h-full relative rounded-xs group hover:border-[#8C6D46] transition-all">
                  <OrnateCardCorners color="#C5A880" size={14} />
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                    &ldquo;The Augustus Grande Chesterfield is the unquestioned crown jewel of our penthouse.
                    The leather fragrance and tufting precision rival the finest European royal houses.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-[#C5A880]/20">
                    <p className="text-xs font-serif font-semibold text-charcoal">Vikramaditya Singhania</p>
                    <p className="text-[10px] text-charcoal/50">Altamount Road, South Mumbai</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-6 border-2 border-[#C5A880]/35 bg-white shadow-xs space-y-4 h-full relative rounded-xs group hover:border-[#8C6D46] transition-all">
                  <OrnateCardCorners color="#C5A880" size={14} />
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                    &ldquo;The Solarium Carrara table arrived with five white-glove technicians.
                    They leveled it within 1mm precision and provided full sealing certification. Impeccable.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-[#C5A880]/20">
                    <p className="text-xs font-serif font-semibold text-charcoal">Gayatri & Samir Kapur</p>
                    <p className="text-[10px] text-charcoal/50">Golf Links, New Delhi</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-6 border-2 border-[#C5A880]/35 bg-white shadow-xs space-y-4 h-full relative rounded-xs group hover:border-[#8C6D46] transition-all">
                  <OrnateCardCorners color="#C5A880" size={14} />
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                    &ldquo;From instantaneous Razorpay settlement to automated GST input credit invoices,
                    the purchase journey matches the elegance of the furniture.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-[#C5A880]/20">
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

