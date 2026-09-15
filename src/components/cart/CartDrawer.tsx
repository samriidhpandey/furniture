'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatINR } from '@/lib/gst';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, Check } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    setIsApplying(true);
    setCouponStatus(null);
    const res = await applyCoupon(couponCodeInput);
    setCouponStatus({ message: res.message, isError: !res.success });
    setIsApplying(false);
    if (res.success) setCouponCodeInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream border-l border-cream-border flex flex-col shadow-2xl animate-slideLeft">
          {/* Drawer Header */}
          <div className="p-6 border-b border-cream-border flex items-center justify-between bg-cream-subtle">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-bronze" />
              <h2 className="font-serif text-lg tracking-wide text-charcoal">Your Selection</h2>
              <span className="text-xs bg-charcoal text-cream px-2 py-0.5 rounded-full font-sans">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary White-Glove installation bar */}
          <div className="bg-bronze/10 border-b border-bronze/20 px-6 py-2.5 text-xs text-charcoal flex items-center justify-between">
            <span className="font-medium text-bronze-dark">✨ White-Glove Courier Included</span>
            <span className="text-[11px] text-charcoal/70">Pan-India Transit Insured</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-border/50 flex items-center justify-center mx-auto text-charcoal/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif text-lg text-charcoal">Your shopping bag is empty</p>
                <p className="text-xs text-charcoal/60 max-w-xs mx-auto">
                  Explore our curated catalogue of architectural furniture pieces crafted for discerning living spaces.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-block px-6 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-widest hover:bg-bronze hover:text-charcoal transition-all"
                >
                  Explore Catalogue
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variantId} className="flex gap-4 pb-6 border-b border-cream-border last:border-0">
                  <div className="relative w-20 h-24 bg-cream-subtle shrink-0 border border-cream-border overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm text-charcoal truncate">{item.name}</h3>
                      <p className="text-[11px] text-charcoal/70 mt-0.5">
                        {item.colorName} • {item.material}
                      </p>
                      <p className="text-[10px] font-mono text-bronze-dark mt-0.5">SKU: {item.sku}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-cream-border bg-white">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 hover:bg-cream-subtle text-charcoal/70"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 hover:bg-cream-subtle text-charcoal/70 disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-semibold text-charcoal">
                          {formatINR(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-[10px] text-red-600/70 hover:text-red-700 flex items-center gap-1 mt-1 ml-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-cream-subtle border-t border-cream-border space-y-4">
              {/* Promotional Coupon Section (§13-A) */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-bronze/15 border border-bronze/30 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-bronze-dark" />
                      <span className="font-mono font-medium text-charcoal">{appliedCoupon.code}</span>
                      <span className="text-bronze-dark">(-{formatINR(appliedCoupon.discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-charcoal/70 hover:text-charcoal underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="Privilege Code (e.g. LUXURY10)"
                      className="flex-1 px-3 py-2 text-xs bg-white border border-cream-border uppercase tracking-wider focus:outline-none focus:border-bronze"
                    />
                    <button
                      type="submit"
                      disabled={isApplying}
                      className="px-4 py-2 bg-charcoal text-cream text-xs uppercase tracking-wider hover:bg-bronze hover:text-charcoal transition-colors"
                    >
                      {isApplying ? 'Applying...' : 'Apply'}
                    </button>
                  </form>
                )}
                {couponStatus && (
                  <p className={`text-[11px] mt-1 ${couponStatus.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                    {couponStatus.message}
                  </p>
                )}
              </div>

              {/* Subtotal & Totals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Benefit</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal/70">
                  <span>White-Glove Installation</span>
                  <span className="text-emerald-700 uppercase text-[10px] tracking-wider font-semibold">
                    Complimentary
                  </span>
                </div>
                <div className="pt-2 border-t border-cream-border flex justify-between items-baseline">
                  <span className="font-serif text-sm font-semibold text-charcoal">Estimated Total</span>
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-charcoal">{formatINR(total)}</span>
                    <p className="text-[10px] text-charcoal/60">Includes GST • Formal breakup at checkout</p>
                  </div>
                </div>
              </div>

              {/* Checkout Link */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                <span>Proceed to Private Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
