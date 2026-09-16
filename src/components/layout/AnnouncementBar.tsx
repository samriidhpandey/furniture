'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#1C1A17] text-cream text-[10px] sm:text-xs tracking-wider uppercase py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#2C2925] no-print">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="flex items-center gap-1.5 text-bronze font-medium truncate">
            <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-bronze shrink-0" />
            <span className="truncate">White-Glove Insured Delivery</span>
          </span>
          <span className="hidden md:inline text-bronze/40">•</span>
          <span className="hidden md:flex items-center gap-1 text-cream/90">
            <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
            <span>15-Year Master Artisan Guarantee</span>
          </span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0 text-[10px] sm:text-xs">
          <a
            href="tel:+912269408800"
            className="hidden sm:flex items-center gap-1 text-cream hover:text-bronze transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-bronze" />
            <span>+91 (022) 6940 8800</span>
          </a>
          <span className="hidden sm:inline text-bronze/40">|</span>
          <Link href="/contact-us" className="hover:text-bronze text-bronze-light transition-colors font-medium">
            Book Viewing
          </Link>
        </div>
      </div>
    </div>
  );
}
