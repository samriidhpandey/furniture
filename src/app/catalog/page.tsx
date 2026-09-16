import React from 'react';
import Link from 'next/link';
import { formatINR } from '@/lib/gst';
import { SlidersHorizontal, ArrowRight, Check } from 'lucide-react';
import CircularProductShowcase from '@/components/home/CircularProductShowcase';
import { FALLBACK_PRODUCTS, parseProductImages } from '@/lib/products-fallback';
import { getSafeProducts } from '@/lib/safe-query';

export const revalidate = 60;

interface CatalogProps {
  searchParams?: {
    category?: string;
    material?: string;
    sort?: string;
    q?: string;
  };
}

export default async function CatalogPage({ searchParams }: CatalogProps) {
  const categoryFilter = searchParams?.category;
  const materialFilter = searchParams?.material;
  const sortOption = searchParams?.sort || 'featured';
  const searchQuery = searchParams?.q?.toLowerCase();

  const allMasterpieces = await getSafeProducts();
  let products = [...allMasterpieces];

  // In-memory instant filtering
  if (categoryFilter && categoryFilter !== 'All') {
    products = products.filter((p) => p.category === categoryFilter);
  }

  if (searchQuery) {
    products = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(searchQuery) ||
        p.tagline?.toLowerCase().includes(searchQuery) ||
        p.description?.toLowerCase().includes(searchQuery)
    );
  }

  if (materialFilter && materialFilter !== 'All') {
    products = products.filter((p) =>
      p.variants?.some((v) =>
        v.material?.toLowerCase().includes(materialFilter.toLowerCase())
      )
    );
  }

  // Sorting
  if (sortOption === 'price-asc') {
    products.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortOption === 'price-desc') {
    products.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sortOption === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  // Sorting
  if (sortOption === 'price-asc') {
    products.sort((a, b) => (a.basePrice || 0) - (b.basePrice || 0));
  } else if (sortOption === 'price-desc') {
    products.sort((a, b) => (b.basePrice || 0) - (a.basePrice || 0));
  } else if (sortOption === 'name') {
    products.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  const categories = ['All', 'Decor', 'Living', 'Dining', 'Bedroom', 'Executive'];
  const materials = ['All', 'Teak', 'Walnut', 'Sheesham', 'Oak', 'Cedar', 'Mango', 'Rosewood', 'Marble', 'Leather'];

  return (
    <div className="min-h-screen pb-16 space-y-12">
      {/* 50vh Rotating Kinetic 360° Circular Showcase in Collections Page */}
      <CircularProductShowcase
        products={allMasterpieces}
        title="The 2026 Sovereign Atelier Archive"
        subtitle="360° Collections Showcase (50vh)"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b border-cream-border pb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-bronze-dark font-semibold">
            The Complete Atelier Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
            {categoryFilter && categoryFilter !== 'All' ? `${categoryFilter} Collection` : 'All Masterpieces'}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl">
            Every piece is made to order or produced in limited editions. Complete with HSN 9403 GST invoicing
            and insured white-glove transport.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-cream-border">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = (!categoryFilter && cat === 'All') || categoryFilter === cat;
              return (
                <Link
                  key={cat}
                  href={`/catalog?category=${cat === 'All' ? '' : cat}${materialFilter ? `&material=${materialFilter}` : ''}&sort=${sortOption}`}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-charcoal text-cream font-medium'
                      : 'bg-white border border-cream-border text-charcoal hover:border-bronze'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Material & Sorting selectors */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-charcoal/60 uppercase text-[10px] tracking-wider">Material:</span>
              <div className="flex flex-wrap gap-1.5">
                {materials.map((mat) => {
                  const isActive = (!materialFilter && mat === 'All') || materialFilter === mat;
                  return (
                    <Link
                      key={mat}
                      href={`/catalog?${categoryFilter ? `category=${categoryFilter}&` : ''}material=${mat === 'All' ? '' : mat}&sort=${sortOption}`}
                      className={`px-2.5 py-1 text-[11px] rounded-sm transition-colors ${
                        isActive
                          ? 'bg-bronze text-charcoal font-medium'
                          : 'bg-cream-subtle text-charcoal/80 hover:bg-cream-border'
                      }`}
                    >
                      {mat}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-charcoal/60 uppercase text-[10px] tracking-wider">Sort:</span>
              <div className="flex gap-1 bg-white border border-cream-border p-0.5">
                <Link
                  href={`/catalog?${categoryFilter ? `category=${categoryFilter}&` : ''}${materialFilter ? `material=${materialFilter}&` : ''}sort=featured`}
                  className={`px-2.5 py-1 text-[11px] ${sortOption === 'featured' ? 'bg-charcoal text-cream' : 'text-charcoal'}`}
                >
                  Featured
                </Link>
                <Link
                  href={`/catalog?${categoryFilter ? `category=${categoryFilter}&` : ''}${materialFilter ? `material=${materialFilter}&` : ''}sort=price-asc`}
                  className={`px-2.5 py-1 text-[11px] ${sortOption === 'price-asc' ? 'bg-charcoal text-cream' : 'text-charcoal'}`}
                >
                  Price: Low to High
                </Link>
                <Link
                  href={`/catalog?${categoryFilter ? `category=${categoryFilter}&` : ''}${materialFilter ? `material=${materialFilter}&` : ''}sort=price-desc`}
                  className={`px-2.5 py-1 text-[11px] ${sortOption === 'price-desc' ? 'bg-charcoal text-cream' : 'text-charcoal'}`}
                >
                  Price: High to Low
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <h3 className="font-serif text-2xl text-charcoal">No pieces found matching your criteria</h3>
            <p className="text-xs text-charcoal/60">
              Try removing some filters or contact our Private Concierge for bespoke commissions.
            </p>
            <Link
              href="/catalog"
              className="inline-block px-6 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-widest"
            >
              Reset Archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const primaryImage = parseProductImages(product.images)[0];
              const variants = product.variants || [];
              const totalStock = variants.reduce((acc: number, v: any) => acc + (v.stock || 0), 0);
              const minPrice = variants[0]?.priceOverride || product.basePrice;

              return (
                <div
                  key={product.id || product.slug}
                  className="group bg-white border border-cream-border flex flex-col justify-between hover:shadow-luxury transition-all duration-300 shadow-xs"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="block relative aspect-[4/5] overflow-hidden bg-cream-subtle"
                  >
                    <img
                      src={primaryImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-charcoal/85 backdrop-blur-xs text-cream text-[10px] uppercase tracking-widest px-2.5 py-1">
                      {product.category}
                    </div>

                    {totalStock <= 3 && totalStock > 0 && (
                      <div className="absolute top-3 right-3 bg-amber-900/90 text-cream text-[10px] uppercase tracking-wider px-2 py-0.5">
                        Only {totalStock} Remaining
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Color variant dots */}
                      <div className="flex items-center gap-1.5 mb-2">
                        {variants.map((v: any) => (
                          <span
                            key={v.id || v.sku}
                            className="w-3.5 h-3.5 rounded-full border border-cream-border shadow-xs"
                            style={{ backgroundColor: v.colorHex }}
                            title={`${v.colorName} (${v.material})`}
                          />
                        ))}
                        <span className="text-[10px] text-charcoal/50 ml-1">
                          {variants.length} finishes
                        </span>
                      </div>

                      <Link href={`/product/${product.slug}`}>
                        <h2 className="font-serif text-lg text-charcoal group-hover:text-bronze-dark transition-colors">
                          {product.name}
                        </h2>
                      </Link>
                      <p className="text-xs text-charcoal/65 mt-1 line-clamp-2">{product.tagline}</p>
                    </div>

                    <div className="pt-4 border-t border-cream-border flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-charcoal/50 tracking-wider">From</span>
                        <p className="font-serif text-base font-semibold text-charcoal">
                          {formatINR(minPrice)}
                        </p>
                        <p className="text-[9px] text-charcoal/50">Incl. 18% GST (HSN 9403)</p>
                      </div>

                      <Link
                        href={`/product/${product.slug}`}
                        className="px-4 py-2 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal transition-colors text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1"
                      >
                        <span>Examine</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
