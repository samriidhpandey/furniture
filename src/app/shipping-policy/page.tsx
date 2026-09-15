import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, ShieldCheck, MapPin, PackageCheck } from 'lucide-react';

export default function ShippingPolicyPage() {
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
          Logistics Covenant (§21-A)
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">Shipping & White-Glove Installation</h1>
        <p className="text-xs text-charcoal/60 mt-1">Pan-India Freight Logistics & Spatial Assembly Protocol</p>
      </div>

      <div className="prose prose-sm max-w-none text-charcoal/80 space-y-8 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold flex items-center gap-2">
            <Truck className="w-4 h-4 text-bronze" />
            <span>1. Complimentary White-Glove Standard</span>
          </h2>
          <p>
            Unlike conventional freight delivery that leaves parcels curbside, every piece commissioned from A1 Luxury Furniture
            is transported via specialized air-ride suspension vans and installed in your designated room by trained assembly craftsmen.
            All debris, protective blankets, and timber skeletal crates are dismantled and recycled by our team upon completion.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-bronze" />
            <span>2. Geographic Service Coverage & Timelines</span>
          </h2>
          <div className="p-4 bg-cream-subtle border border-cream-border text-xs space-y-2">
            <p><strong>• Mumbai Metropolitan Region & Pune:</strong> 3 to 5 business days for in-stock pieces.</p>
            <p><strong>• Delhi NCR, Bengaluru, Hyderabad & Chennai:</strong> 5 to 8 business days for in-stock pieces.</p>
            <p><strong>• All Other Tier-1 & Tier-2 Indian PIN Codes:</strong> 7 to 10 business days.</p>
            <p><strong>• Custom Made-to-Order Commissions:</strong> 4 to 6 weeks for Italian quarry extraction & tanning.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bronze" />
            <span>3. 100% In-Transit Cargo Insurance</span>
          </h2>
          <p>
            Every consignment is covered by an active comprehensive marine and transit insurance underwritten by leading national
            insurers. Patrons bear zero financial risk in the extraordinary circumstance of freight collision or natural calamity
            prior to physical handover.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg text-charcoal font-semibold flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-bronze" />
            <span>4. Scheduling & Access Prerequisites</span>
          </h2>
          <p>
            Our logistics dispatcher will telephone you 24 to 48 hours prior to delivery to confirm a convenient 2-hour appointment
            window. Please ensure service elevator booking and gate clearances are coordinated with your residential building society.
          </p>
        </section>
      </div>
    </div>
  );
}
