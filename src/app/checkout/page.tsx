'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { calculateGst, formatINR } from '@/lib/gst';
import AuthModal from '@/components/auth/AuthModal';
import {
  ShieldCheck,
  CreditCard,
  Building,
  MapPin,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Tag,
} from 'lucide-react';

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'Gujarat',
  'Haryana',
  'Telangana',
  'Uttar Pradesh',
  'Rajasthan',
  'West Bengal',
  'Goa',
  'Kerala',
  'Punjab',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, isLoaded, subtotal, discount, total, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Address state
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [postalCode, setPostalCode] = useState('400026');
  const [buyerGstin, setBuyerGstin] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-fill from user or saved address (§9-A)
  useEffect(() => {
    if (user) {
      if (user.defaultAddress && useSavedAddress) {
        setFullName(user.defaultAddress.fullName);
        setPhone(user.defaultAddress.phone);
        setLine1(user.defaultAddress.line1);
        setLine2(user.defaultAddress.line2 || '');
        setCity(user.defaultAddress.city);
        setState(user.defaultAddress.state);
        setPostalCode(user.defaultAddress.postalCode);
      } else if (!fullName) {
        setFullName(user.name);
        if (user.phone) setPhone(user.phone);
      }
    }
  }, [user, useSavedAddress]);

  // Calculate live GST breakdown based on state (§21-B)
  const gst = calculateGst(subtotal, discount, state);

  // If cart is still reading from storage, show fast luxury skeleton
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
        <div className="h-8 w-64 bg-[#D8CEBF]/40 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 h-96 bg-[#D8CEBF]/20 rounded-xl" />
          <div className="lg:col-span-5 h-96 bg-[#D8CEBF]/20 rounded-xl" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl text-charcoal">Your Selection is Empty</h1>
        <p className="text-xs text-charcoal/60">
          Please curate pieces from our archive before proceeding to the checkout salon.
        </p>
        <Link
          href="/catalog"
          className="inline-block px-6 py-3 bg-charcoal text-cream text-xs uppercase tracking-widest hover:bg-bronze hover:text-charcoal transition-all"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (!fullName || !phone || !line1 || !city || !state || !postalCode) {
      setErrorMessage('Please provide full residential delivery information.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Initialize Order on Server with server-side stock and price re-verification (§22-A)
      const addressPayload = {
        fullName,
        phone,
        line1,
        line2,
        city,
        state,
        postalCode,
        country: 'India',
      };

      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            name: i.name,
            quantity: i.quantity,
          })),
          address: addressPayload,
          buyerGstin: buyerGstin || undefined,
          couponCode: appliedCoupon?.code,
          userId: user.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize order');
      }

      const { order } = data;

      // 2. Client-Side Payment Flow (with seamless instant simulation verification)
      // In production, window.Razorpay is invoked. Here we simulate the razorpay payment modal callback
      const mockPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const mockSignature = `sig_mock_verified_${Date.now()}`;

      // 3. Verify Payment on Server (§11-A)
      const verifyRes = await fetch('/api/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: order.razorpayOrderId,
          razorpayPaymentId: mockPaymentId,
          razorpaySignature: mockSignature,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      // Clear shopping bag
      clearCart();

      // Redirect to Order Confirmation Success Screen
      router.push(`/checkout/success?orderId=${order.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during transaction processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-cream-border pb-6 mb-8">
        <span className="text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">
          Private Checkout Salon
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
          Finalize Consignment
        </h1>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form: Authentication & Address (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Client Authentication Status (§8-A) */}
          <div className="p-6 bg-white border border-cream-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-charcoal font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-bronze" />
                <span>1. Collector Identity</span>
              </span>
              {user ? (
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authenticated ({user.role})</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="text-xs text-bronze-dark underline font-medium"
                >
                  Sign In (Google / OTP)
                </button>
              )}
            </div>

            {user ? (
              <div className="flex items-center justify-between text-xs text-charcoal/80 bg-cream-subtle p-3">
                <div>
                  <p className="font-semibold text-charcoal">{user.name}</p>
                  <p className="text-[11px] text-charcoal/60">{user.email || user.phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="text-[11px] text-charcoal/70 hover:text-charcoal underline"
                >
                  Switch Account
                </button>
              </div>
            ) : (
              <div className="text-xs text-charcoal/70 p-3 bg-amber-50/70 border border-amber-200/60 flex items-center justify-between">
                <span>Please sign in or use a 1-tap demo profile to bind order tracking.</span>
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3 py-1 bg-charcoal text-cream text-[11px] uppercase tracking-wider"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Returning User Address Reuse (§9-A) */}
          <div className="p-6 bg-white border border-cream-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-charcoal font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-bronze" />
                <span>2. White-Glove Delivery Residence</span>
              </span>
              {user?.defaultAddress && (
                <button
                  type="button"
                  onClick={() => setUseSavedAddress(!useSavedAddress)}
                  className="text-xs text-bronze-dark underline font-medium"
                >
                  {useSavedAddress ? 'Enter Different Address' : 'Use Saved Residence'}
                </button>
              )}
            </div>

            {/* Saved Address Banner (§9-A) */}
            {user?.defaultAddress && useSavedAddress ? (
              <div className="p-4 bg-cream-subtle border border-bronze/40 rounded-xs space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-charcoal">
                    Primary Residence: {user.defaultAddress.fullName}
                  </span>
                  <span className="text-[10px] bg-bronze/20 text-bronze-dark px-2 py-0.5 rounded font-medium">
                    1-Tap Saved Address
                  </span>
                </div>
                <p className="text-charcoal/80">{user.defaultAddress.line1}</p>
                {user.defaultAddress.line2 && <p className="text-charcoal/70">{user.defaultAddress.line2}</p>}
                <p className="text-charcoal/80">
                  {user.defaultAddress.city}, {user.defaultAddress.state} - {user.defaultAddress.postalCode}
                </p>
                <p className="text-charcoal/60 pt-1 font-mono">{user.defaultAddress.phone}</p>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal/80 mb-1">
                      Full Recipient Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Vikramaditya Singhania"
                      className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal/80 mb-1">
                      Direct Phone for Logistics *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal/80 mb-1">
                    Street Address & Estate / Apartment *
                  </label>
                  <input
                    type="text"
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    placeholder="Villa 7, The Oberoi Enclave, Altamount Road"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal/80 mb-1">
                    Landmark / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    placeholder="Near Cumballa Hill Hospital"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal/80 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal/80 mb-1">
                      State (Affects GST) *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      required
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal/80 mb-1">
                      Postal PIN *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="400026"
                      className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* GST Invoicing / B2B Details (§21-B) */}
          <div className="p-6 bg-white border border-cream-border space-y-3">
            <span className="text-xs uppercase tracking-wider text-charcoal font-semibold flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-bronze" />
              <span>3. Corporate GSTIN for Tax Credit (Optional)</span>
            </span>
            <p className="text-[11px] text-charcoal/70">
              Provide your 15-character GSTIN if acquiring pieces for a corporate office, hotel, or private gallery to claim Input Tax Credit (ITC).
            </p>
            <input
              type="text"
              maxLength={15}
              value={buyerGstin}
              onChange={(e) => setBuyerGstin(e.target.value.toUpperCase())}
              placeholder="e.g. 27AABCU9603R1ZM"
              className="w-full sm:w-80 px-3 py-2 bg-cream-subtle border border-cream-border text-xs font-mono uppercase tracking-wider focus:border-bronze focus:outline-none"
            />
          </div>
        </div>

        {/* Right Summary: Items, GST Breakup & Razorpay trigger (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white border border-cream-border space-y-6 shadow-sm">
            <h2 className="font-serif text-xl text-charcoal border-b border-cream-border pb-3">
              Consignment Summary
            </h2>

            {/* Item list */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-3 text-xs">
                  <div className="w-14 h-16 bg-cream-subtle border border-cream-border shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-charcoal font-medium truncate">{item.name}</p>
                    <p className="text-[10px] text-charcoal/60">
                      {item.colorName} • Qty: {item.quantity}
                    </p>
                    <p className="text-[10px] font-mono text-bronze-dark">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-charcoal">{formatINR(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* GST Tax Calculation Breakup (§21-B) */}
            <div className="p-4 bg-cream-subtle border border-cream-border space-y-2 text-xs">
              <div className="flex justify-between items-center text-charcoal font-semibold border-b border-cream-border pb-1.5">
                <span className="flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5 text-bronze-dark" />
                  <span>Tax Invoice Breakdown (HSN 9403)</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal/60 font-normal">
                  {gst.isInterState ? 'Inter-State (IGST 18%)' : 'Intra-State (CGST+SGST 18%)'}
                </span>
              </div>

              <div className="flex justify-between text-charcoal/70">
                <span>Taxable Value:</span>
                <span>{formatINR(gst.taxableAmount)}</span>
              </div>

              {!gst.isInterState ? (
                <>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Central GST (CGST @ 9%):</span>
                    <span>{formatINR(gst.cgstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>State GST (SGST @ 9%):</span>
                    <span>{formatINR(gst.sgstAmount)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-charcoal/70">
                  <span>Integrated GST (IGST @ 18%):</span>
                  <span>{formatINR(gst.igstAmount)}</span>
                </div>
              )}

              <div className="flex justify-between font-medium text-charcoal pt-1 border-t border-cream-border/60">
                <span>Total Tax Amount (18%):</span>
                <span>{formatINR(gst.totalTax)}</span>
              </div>
            </div>

            {/* Financial Totals */}
            <div className="space-y-2 text-xs border-t border-cream-border pt-4">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal (MRP Equivalent)</span>
                <span>{formatINR(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Privilege Voucher ({appliedCoupon?.code})</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-charcoal/70">
                <span>Insured White-Glove Delivery</span>
                <span className="text-emerald-700 uppercase font-semibold text-[10px]">
                  Complimentary
                </span>
              </div>

              <div className="pt-3 border-t border-cream-border flex justify-between items-baseline">
                <span className="font-serif text-base font-semibold text-charcoal">
                  Net Amount Payable
                </span>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-charcoal">
                    {formatINR(gst.totalAmount)}
                  </span>
                  <p className="text-[10px] text-charcoal/60">All taxes included</p>
                </div>
              </div>
            </div>

            {/* Razorpay Action Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal transition-all text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4 text-bronze" />
              <span>{isProcessing ? 'Connecting to Razorpay Secure...' : `Authorize Payment (${formatINR(gst.totalAmount)})`}</span>
            </button>

            <div className="text-center space-y-1">
              <p className="text-[10px] text-charcoal/60 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
                <span>Protected by Razorpay Orders API & 256-bit TLS encryption</span>
              </p>
              <p className="text-[10px] text-charcoal/50">
                Supports UPI, NetBanking (HDFC, ICICI, SBI), Amex & Visa Infinite
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* Auth Modal if triggered */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Authenticate Before Payment"
      />
    </div>
  );
}
