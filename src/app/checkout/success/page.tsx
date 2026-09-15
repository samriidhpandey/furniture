'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { formatINR } from '@/lib/gst';
import { CheckCircle2, FileText, Compass, Truck } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'A1-2026-89412';
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Fire elegant gold & cream celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#121214', '#E5D6C1', '#FBF9F5'],
      });
    } catch (e) {
      console.error(e);
    }

    // Fetch order summary
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.order) setOrderDetails(data.order);
        })
        .catch(console.error);
    }
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-10">
      {/* Icon & Celebration */}
      <div className="space-y-4">
        <div className="w-20 h-20 bg-bronze/20 text-bronze-dark rounded-full flex items-center justify-center mx-auto shadow-bronze-glow">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">
          Acquisition Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal">
          Gratitude from the Atelier
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/70 max-w-lg mx-auto">
          Your order has been registered into our white-glove curation schedule. Our master artisans and logistics team
          are preparing your pieces with the utmost discretion and care.
        </p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white border border-cream-border p-6 sm:p-8 text-left space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-cream-border pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Consignment Number</span>
            <p className="font-mono text-lg font-bold text-charcoal">{orderId}</p>
          </div>
          <div className="sm:text-right">
            <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Payment Status</span>
            <p className="text-xs font-semibold text-emerald-700 uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Paid & Verified via Razorpay</span>
            </p>
          </div>
        </div>

        {orderDetails && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-charcoal/50 uppercase text-[10px] tracking-wider mb-1">Delivering To</p>
                <p className="font-semibold text-charcoal">{orderDetails.parsedAddress?.fullName}</p>
                <p className="text-charcoal/70">{orderDetails.parsedAddress?.line1}</p>
                <p className="text-charcoal/70">
                  {orderDetails.parsedAddress?.city}, {orderDetails.parsedAddress?.state} - {orderDetails.parsedAddress?.postalCode}
                </p>
              </div>

              <div>
                <p className="text-charcoal/50 uppercase text-[10px] tracking-wider mb-1">Financial Summary</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Taxable Subtotal:</span>
                    <span>{formatINR(orderDetails.subtotal - orderDetails.discount)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>GST (18% HSN 9403):</span>
                    <span>{formatINR(orderDetails.cgst + orderDetails.sgst + orderDetails.igst)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-charcoal pt-1 border-t border-cream-border">
                    <span>Total Settled:</span>
                    <span>{formatINR(orderDetails.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item Breakdown */}
            <div className="pt-2 border-t border-cream-border space-y-2">
              <p className="text-charcoal/50 uppercase text-[10px] tracking-wider">Pieces in Consignment</p>
              {orderDetails.items?.map((it: any) => (
                <div key={it.id} className="flex justify-between text-xs py-1 border-b border-cream-border/60">
                  <span>{it.productName} ({it.variantSummary}) × {it.quantity}</span>
                  <span className="font-mono">{formatINR(it.totalPrice)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 bg-cream-subtle border border-cream-border text-xs text-charcoal/80 flex items-center gap-3">
          <Truck className="w-5 h-5 text-bronze shrink-0" />
          <div>
            <p className="font-semibold text-charcoal">Pan-India White-Glove Installation</p>
            <p className="text-[11px] text-charcoal/60">
              Our regional logistics coordinator will contact you 24 hours prior to arrival to confirm spatial clearance.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/order/${orderId}`}
          className="w-full sm:w-auto px-6 py-3.5 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Live Consignment Tracking</span>
        </Link>

        <Link
          href={`/invoice/${orderId}`}
          target="_blank"
          className="w-full sm:w-auto px-6 py-3.5 bg-white border border-cream-border text-charcoal hover:border-bronze transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 text-bronze" />
          <span>Download GST Tax Invoice</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <p className="font-serif text-lg text-charcoal">Confirming Consignment...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
