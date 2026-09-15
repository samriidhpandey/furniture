import React from 'react';
import Link from 'next/link';
import { Shield, Lock, FileText, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          Statutory Compliance Document
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">Privacy & Discretion Policy</h1>
        <p className="text-xs text-charcoal/60 mt-1">Last Updated: September 14, 2026 • Effective Date: January 1, 2024</p>
      </div>

      <div className="prose prose-sm max-w-none text-charcoal/80 space-y-8 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">1. Corporate Commitment</h2>
          <p>
            A1 Luxury Furniture India Private Limited (&ldquo;A1&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
            operates with the highest standards of discretion for our discerning patrons. This Privacy Policy governs the
            collection, storage, processing, and transfer of sensitive personal data when you interact with our digital atelier,
            visit our physical galleries, or acquire bespoke pieces.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Patron Identification:</strong> Full legal name, residential delivery addresses, email coordinates, and contact telephone numbers.
            </li>
            <li>
              <strong>Corporate Tax Details:</strong> Goods and Services Tax Identification Number (GSTIN) and registered entity name for B2B input tax invoicing.
            </li>
            <li>
              <strong>Payment Data:</strong> All financial transactions are processed directly through Razorpay Software Private Limited. We do not store full credit card credentials or bank net-banking passwords on our private servers.
            </li>
            <li>
              <strong>Technical & Telemetric Records:</strong> IP address, device fingerprints, and browser sessions for rate-limiting protection against automated abuse.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">3. Purpose of Processing</h2>
          <p>
            Your information is collected exclusively to coordinate white-glove logistics, fulfill customized structural
            manufacturing covenants, issue statutory GST invoices (HSN 9403), transmit tracking notifications via SMS/email,
            and provide lifelong artisan preservation services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">4. Data Sharing & Discretion</h2>
          <p>
            We do not sell, rent, or trade patron profiles to third-party commercial brokers. Information is shared solely with:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Authorized white-glove freight carriers (e.g., BlueDart Apex, Delhivery Special Handling) for installation access.</li>
            <li>Razorpay payment gateway under RBI merchant regulations.</li>
            <li>Statutory Indian tax authorities under GST compliance mandates.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">5. Statutory Grievance Redressal</h2>
          <p>
            In compliance with the Information Technology Act, 2000 and rules made thereunder, the contact coordinates of our
            designated Grievance Redressal Officer are:
          </p>
          <div className="p-4 bg-cream-subtle border border-cream-border text-xs space-y-1">
            <p className="font-semibold text-charcoal">Mr. Kabir Sen — Chief Compliance Officer</p>
            <p>A1 Luxury Furniture India Private Limited</p>
            <p>Level 14, Palladium Annex, High Street Phoenix, Lower Parel, Mumbai, Maharashtra 400013</p>
            <p>Email: <a href="mailto:grievance@a1furniture.com" className="text-bronze-dark underline">grievance@a1furniture.com</a></p>
            <p>Direct Phone: +91 (022) 6940 8800 (Monday to Friday, 10:00 AM – 6:00 PM IST)</p>
          </div>
        </section>
      </div>
    </div>
  );
}
