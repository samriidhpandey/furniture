import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import { formatINR } from '@/lib/gst';
import { ArrowRight, Sparkles, Shield, Compass, Gem, Check, ArrowUpRight, Star } from 'lucide-react';
import type { ProductItem } from '@/components/home/CircularProductShowcase';
import CategoryInfiniteLoop from '@/components/home/CategoryInfiniteLoop';
import HomeVisitBookingSection from '@/components/home/HomeVisitBookingSection';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollAnimation';

export const revalidate = 60; // Technical SEO ISR (§27)

export default async function HomePage() {
  // Fetch all products with variants for the circular showcase & featured products
  const allProducts = (await prisma.product.findMany({
    include: {
      variants: true,
      reviews: { where: { status: 'APPROVED' } },
    },
    orderBy: { basePrice: 'desc' },
  })) as unknown as ProductItem[];

  const featuredProducts = allProducts.filter((p) => Boolean(p.featured)).slice(0, 4);

  const categories = [
    {
      name: 'Living Room Gallery',
      desc: 'Hand-tufted chesterfields & sculptural swivel lounges',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog?category=Living',
    },
    {
      name: 'Dining Sanctuaries',
      desc: 'Book-matched Italian Carrara marble & cast bronze fluting',
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog?category=Dining',
    },
    {
      name: 'Master Bedroom Suites',
      desc: 'Belgian flax linen floating platforms & cedar joinery',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog?category=Bedroom',
    },
    {
      name: 'Executive Libraries',
      desc: 'Quarter-sawn walnut desks with hideaway calfskin drawers',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog?category=Executive',
    },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. Cinematic Luxury Hero Section with Clear Visible Background Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal text-cream">
        {/* Crisp, Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
            alt="A1 Luxury Furniture Masterpiece Architectural Residence"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out scale-100"
          />
          {/* Subtle translucent ambient wash so image is 100% visible while text is crisp */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-charcoal/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 py-20 sm:py-28">
          <ScrollReveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-bronze/60 bg-charcoal/70 backdrop-blur-md rounded-full text-xs uppercase tracking-[0.25em] text-bronze font-medium shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-bronze" />
              <span>The 2026 Sovereign Atelier Archive</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-cream leading-[1.1] max-w-4xl mx-auto drop-shadow-md">
              Masterpieces in <span className="italic font-normal text-bronze-light">Living Form</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-sm sm:text-base md:text-lg text-cream/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
              Curated book-matched Italian Carrara marble, hand-tufted Tuscan full-grain leathers, and generational solid
              hardwood joinery. Handcrafted for the world&apos;s most distinguished residences.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-8 py-4 bg-bronze text-charcoal font-semibold text-xs uppercase tracking-[0.25em] hover:bg-bronze-light transition-all shadow-bronze-glow flex items-center justify-center gap-3"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact-us"
                className="w-full sm:w-auto px-8 py-4 border border-cream/40 bg-charcoal/50 text-cream text-xs uppercase tracking-[0.25em] hover:border-bronze hover:text-bronze transition-all backdrop-blur-md flex items-center justify-center font-medium shadow-sm"
              >
                <span>Book Salon Viewing</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Quick Pillars (Glassmorphism Cards over Background Image) */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-cream/20 text-left">
              <div className="p-4 bg-charcoal/55 backdrop-blur-md border border-cream/15 rounded-xs shadow-sm hover:border-bronze/50 transition-all">
                <p className="font-serif text-base sm:text-lg text-cream font-semibold">Bespoke Curation</p>
                <p className="text-xs text-cream/75 mt-0.5">Custom sizing & rare marble selection</p>
              </div>
              <div className="p-4 bg-charcoal/55 backdrop-blur-md border border-cream/15 rounded-xs shadow-sm hover:border-bronze/50 transition-all">
                <p className="font-serif text-base sm:text-lg text-cream font-semibold">White-Glove Pan-India</p>
                <p className="text-xs text-cream/75 mt-0.5">Complimentary assembly & debris removal</p>
              </div>
              <div className="p-4 bg-charcoal/55 backdrop-blur-md border border-cream/15 rounded-xs shadow-sm hover:border-bronze/50 transition-all">
                <p className="font-serif text-base sm:text-lg text-cream font-semibold">15-Year Guarantee</p>
                <p className="text-xs text-cream/75 mt-0.5">Artisan structural integrity assurance</p>
              </div>
              <div className="p-4 bg-charcoal/55 backdrop-blur-md border border-cream/15 rounded-xs shadow-sm hover:border-bronze/50 transition-all">
                <p className="font-serif text-base sm:text-lg text-cream font-semibold">Verified Origin</p>
                <p className="text-xs text-cream/75 mt-0.5">Tuscan Leather & Carrara Quinquennial</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. INFINITE CONTINUOUS CATEGORY LOOP SECTION (Running Marquee Carousel) */}
      <CategoryInfiniteLoop />

      {/* 3. Curated Categories Gallery with Scroll Animations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-bronze-dark font-semibold">
              Curated Living Environments
            </span>
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
                className="group relative h-96 overflow-hidden border border-cream-border bg-charcoal shadow-sm block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-8 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-bronze-light font-medium">
                      Archive 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl text-cream mt-1 group-hover:text-bronze-light transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-cream/80 mt-1 max-w-xs">{cat.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-cream/50 bg-charcoal/40 backdrop-blur-xs text-cream flex items-center justify-center group-hover:bg-bronze group-hover:text-charcoal group-hover:border-bronze transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. Featured Masterpieces with Scroll Reveals */}
      <section className="bg-cream-subtle py-20 border-y border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-bronze-dark font-semibold">
                  Signature Portfolio
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
                  Masterpieces in Focus
                </h2>
              </div>
              <Link
                href="/catalog"
                className="text-xs uppercase tracking-[0.2em] font-medium text-charcoal hover:text-bronze-dark flex items-center gap-2"
              >
                <span>View Full Archive</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
            {featuredProducts.map((product: ProductItem) => {
              const primaryImage = JSON.parse(product.images)[0];
              const variantCount = product.variants.length;
              const minPrice = product.variants[0]?.priceOverride || product.basePrice;

              return (
                <StaggerItem key={product.id}>
                  <div className="group bg-white border border-cream-border flex flex-col justify-between hover:shadow-luxury transition-all duration-300 shadow-xs h-full">
                    <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-cream-subtle">
                      <img
                        src={primaryImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-xs text-cream text-[10px] uppercase tracking-widest px-2.5 py-1">
                        {product.category}
                      </div>
                    </Link>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          {product.variants.map((v) => (
                            <span
                              key={v.id}
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
                          <h3 className="font-serif text-base text-charcoal hover:text-bronze-dark transition-colors font-semibold">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-[11px] text-charcoal/65 mt-1 line-clamp-2">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-cream-border flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase text-charcoal/50 tracking-wider">From</span>
                          <p className="font-serif text-sm font-semibold text-charcoal">
                            {formatINR(minPrice)}
                          </p>
                        </div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="text-[10px] uppercase tracking-wider font-semibold text-bronze-dark hover:text-charcoal flex items-center gap-1"
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

      {/* 5. Atelier Craftsmanship Narrative with Scroll Animation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal direction="right" className="lg:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-bronze-dark font-semibold">
              The Architecture of Permanence
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
              Materials that mature with <span className="italic font-normal text-bronze-dark">sovereign dignity</span>
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              We reject the transient cadence of modern manufacturing. Every marble table begins in Carrara,
              where third-generation stonemasons inspect vein continuity for book-matching symmetry.
              Our leathers undergo 90 days of organic vegetable tanning in Santa Croce, producing a rich patina
              that deepens with each passing decade.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-cream-border">
              <div className="p-4 bg-white border border-cream-border shadow-xs">
                <p className="font-serif text-2xl text-charcoal font-semibold">HSN 9403</p>
                <p className="text-xs text-charcoal/60 mt-1">
                  Fully compliant Indian GST invoicing with 18% tax credit eligibility for residential & commercial spaces.
                </p>
              </div>
              <div className="p-4 bg-white border border-cream-border shadow-xs">
                <p className="font-serif text-2xl text-charcoal font-semibold">Zero Plastic</p>
                <p className="text-xs text-charcoal/60 mt-1">
                  Delivered in reusable organic cotton blankets with timber shock-absorbing skeletal crates.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-cream text-xs uppercase tracking-[0.2em] hover:bg-bronze hover:text-charcoal transition-all shadow-sm"
              >
                <span>Examine The Material Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-cream-border shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=80"
                alt="Master Artisan at Work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 border border-cream-border shadow-luxury max-w-xs hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest text-bronze-dark font-semibold">Quality Covenant</p>
              <p className="font-serif text-sm text-charcoal mt-1 italic">
                &ldquo;A piece of furniture should outlive the architect who drew the residence.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Private In-Home Spatial Consultation Booking Section */}
      <HomeVisitBookingSection />

      {/* 7. Client Testimonials with Scroll Stagger */}
      <section className="bg-cream-subtle text-charcoal py-20 border-t border-cream-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <ScrollReveal direction="up">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-bronze-dark font-semibold">
                Collector Testimonies
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">Patrons of Discretion</h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left" staggerDelay={0.15}>
            <StaggerItem>
              <div className="p-6 border border-cream-border bg-white shadow-xs space-y-4 h-full">
                <div className="flex text-amber-500 text-sm">
                  {'★★★★★'}
                </div>
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                  &ldquo;The Augustus Grande Chesterfield is the unquestioned crown jewel of our penthouse.
                  The leather fragrance and tufting precision rival the finest European royal houses.&rdquo;
                </p>
                <div className="pt-2 border-t border-cream-border">
                  <p className="text-xs font-serif font-semibold text-charcoal">Vikramaditya Singhania</p>
                  <p className="text-[10px] text-charcoal/50">Altamount Road, South Mumbai</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 border border-cream-border bg-white shadow-xs space-y-4 h-full">
                <div className="flex text-amber-500 text-sm">
                  {'★★★★★'}
                </div>
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                  &ldquo;The Solarium Carrara table arrived with five white-glove technicians.
                  They leveled it within 1mm precision and provided full sealing certification. Impeccable.&rdquo;
                </p>
                <div className="pt-2 border-t border-cream-border">
                  <p className="text-xs font-serif font-semibold text-charcoal">Gayatri & Samir Kapur</p>
                  <p className="text-[10px] text-charcoal/50">Golf Links, New Delhi</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 border border-cream-border bg-white shadow-xs space-y-4 h-full">
                <div className="flex text-amber-500 text-sm">
                  {'★★★★★'}
                </div>
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-serif italic">
                  &ldquo;From instantaneous Razorpay settlement to automated GST input credit invoices,
                  the purchase journey matches the elegance of the furniture.&rdquo;
                </p>
                <div className="pt-2 border-t border-cream-border">
                  <p className="text-xs font-serif font-semibold text-charcoal">Rohan Mehra, Principal Architect</p>
                  <p className="text-[10px] text-charcoal/50">Lavelle Road, Bengaluru</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
