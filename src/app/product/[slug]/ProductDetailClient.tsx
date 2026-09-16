'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatINR } from '@/lib/gst';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  ChevronDown,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Package,
} from 'lucide-react';

import { parseProductImages } from '@/lib/products-fallback';

interface Variant {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  material: string;
  priceOverride: number | null;
  stock: number;
  image?: string | null;
}

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string | Date;
}

interface ProductDetailProps {
  product: {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    category: string;
    dimensions: string;
    warranty: string;
    careInstructions: string;
    basePrice: number;
    images: string;
    variants: Variant[];
    reviews: Review[];
  };
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  const { addItem, setIsCartOpen } = useCart();

  const imageList: string[] = parseProductImages(product.images);
  const [selectedImage, setSelectedImage] = useState<string>(imageList[0]);
  
  const fallbackVariant: Variant = {
    id: 'default-v',
    sku: product.slug,
    colorName: 'Artisan Bespoke',
    colorHex: '#8C6D46',
    material: 'Full-Grain Material & Hardwood',
    priceOverride: null,
    stock: 5,
  };
  
  const variantsList = (product.variants && product.variants.length > 0) ? product.variants : [fallbackVariant];
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variantsList[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Accordion open states
  const [openSection, setOpenSection] = useState<string | null>('dimensions');

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const currentPrice = selectedVariant?.priceOverride || product.basePrice;
  const isOutOfStock = (selectedVariant?.stock ?? 0) <= 0;

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
    if (variant.image) {
      setSelectedImage(variant.image);
    }
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantId: selectedVariant.id,
      sku: selectedVariant.sku,
      colorName: selectedVariant.colorName,
      material: selectedVariant.material,
      image: selectedVariant.image || selectedImage,
      price: currentPrice,
      maxStock: selectedVariant.stock,
      quantity,
    });
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus(`Complimentary white-glove installation available for ${pincode}. Estimated delivery: 5-8 business days.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian Postal PIN.');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          authorName: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      if (res.ok) {
        setReviewSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Top Grid: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] bg-cream-subtle border border-cream-border overflow-hidden shadow-sm">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-charcoal/80 text-cream text-[10px] uppercase tracking-widest px-3 py-1">
              {product.category}
            </div>
          </div>

          {/* Thumbnail row */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {imageList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 shrink-0 border transition-all ${
                  selectedImage === img
                    ? 'border-bronze ring-2 ring-bronze/30'
                    : 'border-cream-border opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Variant Configuration & Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-cream-border pb-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-bronze font-semibold">
              Masterpiece Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">{product.name}</h1>
            <p className="text-xs text-charcoal/70 leading-relaxed">{product.tagline}</p>

            <div className="pt-3 flex items-baseline justify-between">
              <div>
                <p className="font-serif text-2xl font-bold text-charcoal">{formatINR(currentPrice)}</p>
                <p className="text-[11px] text-charcoal/60 mt-0.5">
                  Includes 18% GST (HSN: 9403) • Pan-India White-Glove Transit
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-bronze-dark uppercase">
                  SKU: {selectedVariant.sku}
                </span>
              </div>
            </div>
          </div>

          {/* Color & Material Variant Selector (§13-A) */}
          <div className="space-y-4 border-b border-cream-border pb-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal mb-2 font-medium">
                Finish & Palette:{' '}
                <span className="font-serif text-bronze-dark font-normal normal-case">
                  {selectedVariant.colorName} ({selectedVariant.material})
                </span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantSelect(variant)}
                      className={`flex items-center gap-2 px-3 py-2 border text-xs transition-all ${
                        isSelected
                          ? 'border-charcoal bg-charcoal text-cream'
                          : 'border-cream-border bg-white text-charcoal hover:border-bronze'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-cream-border shrink-0"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                      <span>{variant.colorName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Stock Indicator per variant (§13-A) */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-charcoal/70">Inventory Backing:</span>
              {selectedVariant.stock > 3 ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock Atelier Ready ({selectedVariant.stock} pieces)</span>
                </span>
              ) : selectedVariant.stock > 0 ? (
                <span className="text-amber-800 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Only {selectedVariant.stock} remaining in this finish</span>
                </span>
              ) : (
                <span className="text-red-700 font-medium">Temporarily Reserved / Backorder</span>
              )}
            </div>
          </div>

          {/* Quantity and Add to Bag */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-28 border border-cream-border bg-white flex items-center justify-between px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="text-charcoal/70 hover:text-charcoal disabled:opacity-30 p-1"
                >
                  -
                </button>
                <span className="font-mono text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                  disabled={quantity >= selectedVariant.stock || isOutOfStock}
                  className="text-charcoal/70 hover:text-charcoal disabled:opacity-30 p-1"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-4 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal transition-all text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 disabled:bg-charcoal/40"
              >
                <Package className="w-4 h-4" />
                <span>{isOutOfStock ? 'Sold Out in Finish' : 'Add to Private Bag'}</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-charcoal/60">
              Personalized White-Glove Delivery • Transit Fully Insured by A1 Concierge
            </p>
          </div>

          {/* Pincode Estimator */}
          <div className="p-4 bg-cream-subtle border border-cream-border space-y-2">
            <label className="text-xs uppercase tracking-wider text-charcoal font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-bronze" />
              <span>Verify White-Glove Installation Timeline</span>
            </label>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode (e.g. 400013)"
                className="flex-1 px-3 py-2 bg-white border border-cream-border text-xs focus:border-bronze focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-charcoal text-cream text-xs uppercase tracking-wider hover:bg-bronze hover:text-charcoal"
              >
                Check
              </button>
            </form>
            {pincodeStatus && <p className="text-xs text-charcoal/80 pt-1">{pincodeStatus}</p>}
          </div>

          {/* Accordion Specs */}
          <div className="border-t border-cream-border divide-y divide-cream-border">
            {/* Dimensions */}
            <div>
              <button
                onClick={() => setOpenSection(openSection === 'dimensions' ? null : 'dimensions')}
                className="w-full py-3.5 flex justify-between items-center text-xs uppercase tracking-wider text-charcoal font-medium"
              >
                <span>Dimensions & Architecture</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${openSection === 'dimensions' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'dimensions' && (
                <div className="pb-4 text-xs text-charcoal/70 space-y-2 font-mono">
                  <p>{product.dimensions}</p>
                  <p className="text-[11px] font-sans text-charcoal/60">
                    Pre-installation spatial consultation available with our chief interior architect.
                  </p>
                </div>
              )}
            </div>

            {/* Materials & Provenance */}
            <div>
              <button
                onClick={() => setOpenSection(openSection === 'materials' ? null : 'materials')}
                className="w-full py-3.5 flex justify-between items-center text-xs uppercase tracking-wider text-charcoal font-medium"
              >
                <span>Craftsmanship & Material Provenance</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${openSection === 'materials' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'materials' && (
                <div className="pb-4 text-xs text-charcoal/70 space-y-2">
                  <p>{product.description}</p>
                  <p className="font-semibold text-charcoal">Selected Material: {selectedVariant.material}</p>
                </div>
              )}
            </div>

            {/* Warranty & Care */}
            <div>
              <button
                onClick={() => setOpenSection(openSection === 'warranty' ? null : 'warranty')}
                className="w-full py-3.5 flex justify-between items-center text-xs uppercase tracking-wider text-charcoal font-medium"
              >
                <span>Warranty & Preservation Guide</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${openSection === 'warranty' ? 'rotate-180' : ''}`}
                />
              </button>
              {openSection === 'warranty' && (
                <div className="pb-4 text-xs text-charcoal/70 space-y-2">
                  <p className="font-semibold text-charcoal">Covenant: {product.warranty}</p>
                  <p>{product.careInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Collector Reviews Section */}
      <section className="border-t border-cream-border pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-bronze font-semibold">
              Client Testimonials
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mt-1">Verified Patrons</h2>
          </div>
          <p className="text-xs text-charcoal/60">
            {(product.reviews || []).length} Verified Architectural Reviews
          </p>
        </div>

        {(product.reviews || []).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(product.reviews || []).map((rev) => (
              <div key={rev.id} className="p-5 bg-white border border-cream-border space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-serif text-sm font-semibold text-charcoal">{rev.authorName}</p>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                        <Check className="w-3 h-3" />
                        <span>Verified Acquisition</span>
                      </span>
                    )}
                  </div>
                  <div className="flex text-amber-500 text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
                <p className="text-xs text-charcoal/75 leading-relaxed font-light italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-charcoal/60 italic">
            Be the first patron to submit an architectural review for this bespoke piece.
          </p>
        )}

        {/* Submit Review */}
        <div className="bg-cream-subtle p-6 border border-cream-border max-w-xl">
          <h3 className="font-serif text-lg text-charcoal mb-2">Record Your Experience</h3>
          {reviewSubmitted ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded">
              Thank you. Your testimonial has been logged into the patron archive.
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Yashodhara Birla"
                  className="w-full px-3 py-2 bg-white border border-cream-border text-xs focus:outline-none focus:border-bronze"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`px-3 py-1 border text-xs ${
                        reviewRating === star ? 'border-bronze bg-bronze text-charcoal font-bold' : 'border-cream-border bg-white'
                      }`}
                    >
                      {star} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal mb-1">
                  Your Remarks
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={3}
                  placeholder="Describe the craftsmanship, tactile finish, and presentation in your space..."
                  className="w-full px-3 py-2 bg-white border border-cream-border text-xs focus:outline-none focus:border-bronze"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-6 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-wider hover:bg-bronze hover:text-charcoal transition-colors"
              >
                {isSubmittingReview ? 'Recording...' : 'Submit Testimonial'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
