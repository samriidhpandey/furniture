'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatINR } from '@/lib/gst';
import {
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Home,
  AlertTriangle,
  RotateCcw,
  XCircle,
  FileText,
  Phone,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const TIMELINE_STEPS = [
  { key: 'PAID', label: 'Payment Verified', desc: 'Settled securely via Razorpay' },
  { key: 'PROCESSING', label: 'Atelier Preparation', desc: 'Hand-inspection & packaging' },
  { key: 'SHIPPED', label: 'White-Glove Transit', desc: 'Dispatched with insured freight' },
  { key: 'DELIVERED', label: 'Installed in Residence', desc: 'Assembled & debris cleared' },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = (params.id as string) || 'A1-2026-89412';

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const fetchOrder = () => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you wish to cancel this consignment and initiate a full Razorpay refund?')) {
      return;
    }
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'CANCEL' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Cancellation failed');
      setMessage({ text: data.message, isError: false });
      fetchOrder();
    } catch (e: any) {
      setMessage({ text: e.message, isError: true });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestReturn = async () => {
    if (!confirm('Submit a White-Glove inspection return request for this piece?')) {
      return;
    }
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'REQUEST_RETURN' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Return request failed');
      setMessage({ text: data.message, isError: false });
      fetchOrder();
    } catch (e: any) {
      setMessage({ text: e.message, isError: true });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-lg text-charcoal">Retrieving Consignment Dossier...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl text-charcoal">Consignment Not Found</h1>
        <p className="text-xs text-charcoal/60">No order matches tracking identifier &apos;{orderId}&apos;.</p>
        <Link
          href="/catalog"
          className="inline-block px-6 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-widest"
        >
          Return to Archive
        </Link>
      </div>
    );
  }

  // Determine active step index
  const statusHierarchy = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
  const currentIndex = statusHierarchy.indexOf(order.status);
  const isCancellable = ['PENDING', 'PAID', 'PROCESSING'].includes(order.status);
  const isReturnable = order.status === 'DELIVERED';
  const isCancelledOrRefunded = ['CANCELLED', 'REFUNDED'].includes(order.status);
  const isReturnRequested = order.status === 'RETURN_REQUESTED';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-cream-border pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">
            Consignment Tracking & Operations
          </span>
          <h1 className="font-serif text-3xl text-charcoal mt-1">
            Order {order.orderNumber}
          </h1>
          <p className="text-xs text-charcoal/60 mt-1">
            Booked on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/invoice/${order.id}`}
            target="_blank"
            className="px-4 py-2 bg-white border border-cream-border text-charcoal hover:border-bronze text-xs uppercase tracking-wider font-medium flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-bronze" />
            <span>Tax Invoice</span>
          </Link>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 border text-xs rounded ${
            message.isError
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Exceptional status alert */}
      {isCancelledOrRefunded && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <p className="font-semibold">Consignment Cancelled & Refund Processed</p>
            <p className="text-[11px] text-red-700/80">
              Razorpay settlement reversal initiated. Turnaround time to original bank card is 5-7 business days.
            </p>
          </div>
        </div>
      )}

      {isReturnRequested && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
          <RotateCcw className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <p className="font-semibold">Return Inspection Requested</p>
            <p className="text-[11px] text-amber-800/80">
              Our regional white-glove logistics lead will contact you to inspect and collect the piece in its protective packaging.
            </p>
          </div>
        </div>
      )}

      {/* Progress Timeline Stepper (§21-C) */}
      {!isCancelledOrRefunded && (
        <div className="bg-white border border-cream-border p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-serif text-lg text-charcoal">Fulfillment Progression</h2>

          <div className="relative">
            <div className="hidden sm:block absolute top-5 left-6 right-6 h-0.5 bg-cream-border -z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
              {TIMELINE_STEPS.map((step, idx) => {
                const isPassed = currentIndex >= idx + 1; // index in statusHierarchy
                const isCurrent = currentIndex === idx + 1;

                return (
                  <div key={step.key} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        isPassed
                          ? 'bg-charcoal text-cream border-charcoal'
                          : isCurrent
                          ? 'bg-bronze text-charcoal border-bronze-dark font-bold'
                          : 'bg-cream border-cream-border text-charcoal/40'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div>
                      <p className="font-serif text-xs font-semibold text-charcoal">{step.label}</p>
                      <p className="text-[10px] text-charcoal/60 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier tracking details (§21-C: admin-entered tracking number) */}
          <div className="mt-6 pt-6 border-t border-cream-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-cream-subtle p-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Logistics Carrier</span>
              <p className="font-semibold text-charcoal">
                {order.courierName || 'BlueDart Apex White-Glove Logistics'}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-charcoal/50">Consignment Waybill</span>
              <p className="font-mono font-bold text-bronze-dark">
                {order.trackingNumber || 'Assigned upon departure'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pieces & Delivery Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="bg-white border border-cream-border p-6 space-y-4">
          <h3 className="font-serif text-base text-charcoal border-b border-cream-border pb-2">
            Acquired Masterpieces
          </h3>
          <div className="space-y-3">
            {order.items?.map((it: any) => (
              <div key={it.id} className="flex justify-between py-1 border-b border-cream-border/60 last:border-0">
                <div>
                  <p className="font-semibold text-charcoal">{it.productName}</p>
                  <p className="text-[10px] text-charcoal/60">{it.variantSummary} × {it.quantity}</p>
                </div>
                <p className="font-mono font-medium">{formatINR(it.totalPrice)}</p>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-cream-border flex justify-between font-bold text-charcoal">
            <span>Total Value:</span>
            <span>{formatINR(order.totalAmount)}</span>
          </div>
        </div>

        <div className="bg-white border border-cream-border p-6 space-y-3">
          <h3 className="font-serif text-base text-charcoal border-b border-cream-border pb-2">
            Residence Installation Location
          </h3>
          <div className="text-charcoal/80 space-y-1 leading-relaxed">
            <p className="font-semibold text-charcoal">{order.parsedAddress?.fullName}</p>
            <p>{order.parsedAddress?.line1}</p>
            {order.parsedAddress?.line2 && <p>{order.parsedAddress?.line2}</p>}
            <p>
              {order.parsedAddress?.city}, {order.parsedAddress?.state} - {order.parsedAddress?.postalCode}
            </p>
            <p className="font-mono text-[11px] pt-1">Tel: {order.parsedAddress?.phone}</p>
          </div>

          <div className="pt-3 border-t border-cream-border text-[11px] text-charcoal/60 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
            <span>Transit insurance policy active until signed installation handover.</span>
          </div>
        </div>
      </div>

      {/* Customer Self-Service Actions (§21-C) */}
      <div className="bg-cream-subtle border border-cream-border p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-serif text-sm font-semibold text-charcoal">Client Assistance & Concierge Actions</h4>
          <p className="text-[11px] text-charcoal/60">
            Cancellations are accepted prior to dispatch. 7-day white-glove inspection returns apply post-delivery.
          </p>
        </div>

        <div className="flex gap-3">
          {isCancellable && (
            <button
              onClick={handleCancelOrder}
              disabled={actionLoading}
              className="px-4 py-2.5 border border-red-300 text-red-700 hover:bg-red-50 text-xs uppercase tracking-wider font-medium transition-colors"
            >
              {actionLoading ? 'Processing...' : 'Cancel Consignment'}
            </button>
          )}

          {isReturnable && (
            <button
              onClick={handleRequestReturn}
              disabled={actionLoading}
              className="px-4 py-2.5 border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream text-xs uppercase tracking-wider font-medium transition-colors"
            >
              {actionLoading ? 'Submitting...' : 'Request Return Inspection'}
            </button>
          )}

          <a
            href="tel:+912269408800"
            className="px-4 py-2.5 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3 h-3 text-bronze" />
            <span>Call Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}
