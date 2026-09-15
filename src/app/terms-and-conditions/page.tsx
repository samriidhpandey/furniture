import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditionsPage() {
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
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">Terms & Conditions of Consignment</h1>
        <p className="text-xs text-charcoal/60 mt-1">Governing Purchases via A1 Luxury Furniture Atelier India</p>
      </div>

      <div className="prose prose-sm max-w-none text-charcoal/80 space-y-8 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing this platform, commissioning bespoke creations, or finalizing an order through our checkout salon,
            you unconditionally agree to be bound by these Terms and Conditions and our associated operational policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">2. Artisan Materials & Natural Variations</h2>
          <p>
            Our creations utilize authentic, unadulterated natural materials including Italian Carrara marble, Spanish Nero
            Marquina, full-grain vegetable-tanned bovine leather, and quarter-sawn American Walnut. As these materials are
            organic, variations in vein striation, grain density, tonal depth, and natural markings are celebrated hallmarks
            of authentic handcrafting rather than defects.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">3. Pricing, Taxes & Invoicing</h2>
          <p>
            All prices quoted across the catalog are denominated in Indian Rupees (INR) and are inclusive of Goods and
            Services Tax (GST) at 18% under HSN Code 9403. A formal tax invoice containing CGST/SGST or IGST breakup is
            generated instantaneously upon transaction verification.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">4. White-Glove Installation Responsibility</h2>
          <p>
            The patron is responsible for ensuring unobstructed ingress pathways, service elevator clearances, and doorway
            dimensions for heavy monolithic pieces (e.g., solid marble dining slabs and 3-seater chesterfields). Our white-glove
            logistics partners conduct an inspection upon delivery; handover is deemed executed once the patron executes the
            Installation Verification Certificate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold">5. Jurisdiction & Dispute Resolution</h2>
          <p>
            These terms shall be governed by and construed in accordance with the substantive laws of India. Any legal dispute
            or claim arising out of transactions on this site shall be subject to the exclusive jurisdiction of the competent
            courts in Mumbai, Maharashtra.
          </p>
        </section>
      </div>
    </div>
  );
}
