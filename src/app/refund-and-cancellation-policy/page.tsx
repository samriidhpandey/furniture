import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Clock, CreditCard, ShieldAlert } from 'lucide-react';

export default function RefundAndCancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="border-b border-cream-border pb-6">
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-charcoal/60 hover:text-bronze flex items-center gap-1 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Atelier Home</span>
        </Link>
        <span className="text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">
          Statutory Payment Gateway Policy (§21-A)
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">Refund & Cancellation Policy</h1>
        <p className="text-xs text-charcoal/60 mt-1">
          Compliant with Razorpay Settlement Mandates & Consumer Protection (E-Commerce) Rules, 2020
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-charcoal/80 space-y-8 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-bronze" />
            <span>1. Order Cancellation Prior to Dispatch</span>
          </h2>
          <p>
            Due to the bespoke nature and high logistical footprint of architectural furniture pieces:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Patrons may cancel standard catalog orders directly through our self-service Consignment Tracking Portal
              (<Link href="/order/A1-2026-89412" className="text-bronze-dark underline">/order/[id]</Link>) as long as the status
              remains in <strong>PENDING</strong>, <strong>PAID</strong>, or <strong>PROCESSING</strong>.
            </li>
            <li>
              Once the consignment transitions to <strong>SHIPPED</strong> (specialized heavy-freight carrier dispatched),
              cancellations cannot be processed in transit and must follow the post-delivery return protocol.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-bronze" />
            <span>2. Refund Mechanism & Razorpay Reversals</span>
          </h2>
          <p>
            All approved cancellations trigger an automated electronic refund instruction via the Razorpay Refunds API
            directly to the patron&apos;s originating payment instrument (Net Banking, UPI, Credit Card, or Debit Card).
          </p>
          <div className="p-4 bg-cream-subtle border border-cream-border text-xs space-y-2">
            <p><strong>• Processing Turnaround:</strong> 5 to 7 Indian banking business days from the timestamp of cancellation.</p>
            <p><strong>• Refund Amount:</strong> 100% full refund with zero cancellation surcharge if cancelled before carrier loading.</p>
            <p><strong>• Bank Statement Descriptor:</strong> Credits will reflect under &ldquo;RAZORPAY*A1LUXURY&rdquo; or your issuing bank&apos;s designated merchant code.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-bronze" />
            <span>3. 7-Day White-Glove Post-Delivery Returns</span>
          </h2>
          <p>
            Upon delivery and assembly at your residence, our technicians present the physical piece for your meticulous inspection.
            In the rare event of:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Structural damage incurred during freight transit (e.g., hairline marble fissure, damaged joinery), or</li>
            <li>Discrepancy in finished dimension exceeding ±15mm from blueprint specifications, or</li>
            <li>Incorrect material or color variant delivered versus order specification;</li>
          </ul>
          <p>
            You may request an immediate replacement or full refund within <strong>7 calendar days</strong> of signed delivery.
            Our white-glove team will schedule collection from your residence at zero transport cost to you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">4. How to Initiate a Return or Cancellation</h2>
          <p>
            You may trigger self-service actions via your order tracking page or contact our dedicated Private Concierge:
          </p>
          <div className="p-4 bg-cream-subtle border border-cream-border text-xs space-y-1">
            <p className="font-semibold text-charcoal">A1 Luxury Furniture Concierge Desk</p>
            <p>Email: <a href="mailto:concierge@a1furniture.com" className="text-bronze-dark underline">concierge@a1furniture.com</a></p>
            <p>Hotline: +91 (022) 6940 8800 (Available 7 days a week, 9:00 AM – 8:00 PM IST)</p>
          </div>
        </section>
      </div>
    </div>
  );
}
