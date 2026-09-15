'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#1C1A17] text-cream text-[11px] md:text-xs tracking-wider uppercase py-2 px-4 border-b border-[#2C2925] no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 text-bronze font-medium">
            <Truck className="w-3.5 h-3.5 text-bronze" />
            <span>Complimentary Insured White-Glove Installation</span>
          </span>
          <span className="hidden md:inline text-bronze/40">•</span>
          <span className="hidden md:flex items-center gap-1 text-cream/90">
            <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
            <span>15-Year Master Artisan Guarantee</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="tel:+912269408800"
            className="flex items-center gap-1.5 text-cream hover:text-bronze transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-bronze" />
            <span>Private Concierge: +91 (022) 6940 8800</span>
          </a>
          <span className="text-bronze/40">|</span>
          <Link href="/contact-us" className="hover:text-bronze text-bronze-light transition-colors font-medium">
            Book Viewing
          </Link>
        </div>
      </div>
    </div>
  );
}
