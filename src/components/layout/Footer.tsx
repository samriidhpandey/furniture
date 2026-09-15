'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, Award, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-12 border-t border-charcoal-subtle no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-charcoal-subtle">
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.25em] text-cream uppercase">
                A1 LUXURY
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-bronze font-medium">
                FURNITURE ATELIER & CO.
              </span>
            </div>
            <p className="text-xs text-cream/70 leading-relaxed max-w-sm">
              Conceived for those who view living spaces as fine galleries. We curate book-matched Italian marbles,
              hand-hammered bronze, and heritage Tuscan leathers into architectural masterpieces that endure generations.
            </p>
            <div className="pt-2 text-[11px] text-cream/60 space-y-1">
              <p>Registered Entity: A1 Luxury Furniture India Private Limited</p>
              <p>Corporate GSTIN: 27AABCA1234F1Z5 | HSN Category: 9403</p>
            </div>
          </div>

          {/* Curated Collections */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm uppercase tracking-wider text-bronze font-medium">
              Curated Collections
            </h3>
            <ul className="space-y-2 text-xs text-cream/70">
              <li>
                <Link href="/catalog?category=Living" className="hover:text-bronze transition-colors">
                  Living Room Gallery
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Dining" className="hover:text-bronze transition-colors">
                  Dining & Marble Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Bedroom" className="hover:text-bronze transition-colors">
                  Master Bedroom Suites
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Executive" className="hover:text-bronze transition-colors">
                  Executive Desks & Libraries
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-bronze transition-colors">
                  The Full Heritage Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Tracking */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm uppercase tracking-wider text-bronze font-medium">
              Concierge Services
            </h3>
            <ul className="space-y-2 text-xs text-cream/70">
              <li>
                <Link href="/client-work" className="hover:text-bronze transition-colors">
                  Client Residences &amp; Site Archive
                </Link>
              </li>
              <li>
                <Link href="/#home-visit" className="hover:text-bronze transition-colors">
                  Book In-Home Consultation
                </Link>
              </li>
              <li>
                <Link href="/order/A1-2026-89412" className="hover:text-bronze transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-bronze transition-colors">
                  Private Salon Appointment
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-bronze transition-colors">
                  White-Glove Installation
                </Link>
              </li>
              <li>
                <Link href="/refund-and-cancellation-policy" className="hover:text-bronze transition-colors">
                  Returns & Cancellations
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-bronze/80 hover:text-bronze transition-colors">
                  Atelier Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Newsletter */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm uppercase tracking-wider text-bronze font-medium">
              Private Salon Dispatch
            </h3>
            <p className="text-xs text-cream/70">
              Receive private invitations to limited quarry marble releases and new bespoke suites.
            </p>
            {subscribed ? (
              <div className="p-3 bg-bronze/20 border border-bronze/40 text-cream text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-bronze" />
                <span>You are on our private guestlist.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your personal email address"
                  className="w-full px-3 py-2 bg-charcoal-light border border-charcoal-subtle text-cream text-xs focus:border-bronze focus:outline-none placeholder:text-cream/40"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-bronze text-charcoal font-semibold text-xs uppercase tracking-widest hover:bg-bronze-dark transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Request Invitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Physical Showrooms (§21-A) */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-cream/70 border-b border-charcoal-subtle">
          <div className="space-y-1">
            <p className="font-serif text-cream font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-bronze" />
              <span>Mumbai Flagship Atelier</span>
            </p>
            <p>Level 14, Palladium Annex, High Street Phoenix, Lower Parel, Mumbai 400013</p>
            <p className="text-bronze font-mono">Tel: +91 (022) 6940 8800</p>
          </div>
          <div className="space-y-1">
            <p className="font-serif text-cream font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-bronze" />
              <span>New Delhi Heritage Gallery</span>
            </p>
            <p>Kalka Das Marg, Near Qutub Minar, Mehrauli, New Delhi 110030</p>
            <p className="text-bronze font-mono">Tel: +91 (011) 4890 2200</p>
          </div>
          <div className="space-y-1">
            <p className="font-serif text-cream font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-bronze" />
              <span>Bengaluru Design Residence</span>
            </p>
            <p>Lavelle Mansion, 24 Lavelle Road, Shanthala Nagar, Bengaluru 560001</p>
            <p className="text-bronze font-mono">Tel: +91 (080) 4120 7700</p>
          </div>
        </div>

        {/* Legal & Compliance Links (§21-A - Required for Razorpay approval) */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-cream/60">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-bronze transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-bronze transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/refund-and-cancellation-policy" className="hover:text-bronze transition-colors">
              Refund & Cancellation Policy
            </Link>
            <span>•</span>
            <Link href="/shipping-policy" className="hover:text-bronze transition-colors">
              Shipping & White-Glove Policy
            </Link>
            <span>•</span>
            <Link href="/contact-us" className="hover:text-bronze transition-colors">
              Contact & Grievance Desk
            </Link>
          </div>
          <div>
            <p>© {new Date().getFullYear()} A1 Luxury Furniture India Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
