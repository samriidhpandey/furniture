'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ArrowLeft,
} from 'lucide-react';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Private Salon Viewing');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-cream-border pb-6">
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-charcoal/60 hover:text-bronze flex items-center gap-1 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Atelier Home</span>
        </Link>
        <span className="text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">
          Registered Corporate Entity & Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1">Connect with the Atelier</h1>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-2 max-w-2xl">
          Whether arranging a private salon appointment, commissioning custom architectural pieces, or inquiring on an
          in-flight consignment, our concierge stands at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Registered Headquarters & Physical Galleries (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Registered Corporate Office (§21-A) */}
          <div className="p-6 bg-white border border-cream-border space-y-3">
            <span className="text-xs uppercase tracking-wider text-bronze-dark font-semibold flex items-center gap-1.5">
              <Building className="w-4 h-4 text-bronze" />
              <span>Registered Corporate Office & Flagship Salon</span>
            </span>
            <p className="font-serif text-base text-charcoal font-semibold">
              A1 Luxury Furniture India Private Limited
            </p>
            <p className="text-xs text-charcoal/80 leading-relaxed">
              The Penthouse Gallery, Level 14, Palladium Annex, High Street Phoenix,
              <br />
              Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013, India
            </p>
            <div className="pt-2 border-t border-cream-border text-xs text-charcoal/70 space-y-1">
              <p>Corporate Identity Number (CIN): <span className="font-mono">U36100MH2021PTC369401</span></p>
              <p>Goods & Services Tax (GSTIN): <span className="font-mono font-bold text-charcoal">27AABCA1234F1Z5</span></p>
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-5 bg-white border border-cream-border space-y-2">
              <div className="flex items-center gap-2 text-charcoal font-semibold">
                <Phone className="w-4 h-4 text-bronze" />
                <span>Concierge Telephone Desk</span>
              </div>
              <p className="text-charcoal/70">Pan-India Hotline:</p>
              <p className="font-mono font-bold text-charcoal text-sm">+91 (022) 6940 8800</p>
              <p className="text-[11px] text-charcoal/50">Monday – Sunday: 9:00 AM – 8:00 PM IST</p>
            </div>

            <div className="p-5 bg-white border border-cream-border space-y-2">
              <div className="flex items-center gap-2 text-charcoal font-semibold">
                <Mail className="w-4 h-4 text-bronze" />
                <span>Official Electronic Mail</span>
              </div>
              <p className="text-charcoal/70">Client Concierge:</p>
              <a href="mailto:concierge@a1furniture.com" className="font-mono text-bronze-dark underline font-medium block">
                concierge@a1furniture.com
              </a>
              <p className="text-charcoal/70 pt-1">Grievance Officer:</p>
              <a href="mailto:grievance@a1furniture.com" className="font-mono text-charcoal/80 underline block">
                grievance@a1furniture.com
              </a>
            </div>
          </div>

          {/* Regional Salons */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-charcoal">Regional Private Galleries</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-cream-subtle border border-cream-border space-y-1">
                <p className="font-semibold text-charcoal">New Delhi Heritage Residence</p>
                <p className="text-charcoal/70">Kalka Das Marg, Mehrauli, New Delhi 110030</p>
                <p className="font-mono text-bronze-dark">Tel: +91 (011) 4890 2200</p>
              </div>

              <div className="p-4 bg-cream-subtle border border-cream-border space-y-1">
                <p className="font-semibold text-charcoal">Bengaluru Design Gallery</p>
                <p className="text-charcoal/70">24 Lavelle Road, Shanthala Nagar, Bengaluru 560001</p>
                <p className="font-mono text-bronze-dark">Tel: +91 (080) 4120 7700</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Salon Booking & Inquiries (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-cream-border p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-bronze font-semibold">
              Private Appointment
            </span>
            <h2 className="font-serif text-2xl text-charcoal mt-1">Schedule an Encounter</h2>
            <p className="text-xs text-charcoal/60 mt-1">
              Complimentary champagne consultation with our principal interior architect.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-3 rounded-xs text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-serif text-base font-semibold">Inquiry Confirmed</p>
              <p className="text-emerald-800/80">
                Thank you, {name}. Our Senior Curator will contact you at {phone || email} within 3 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs uppercase tracking-wider text-emerald-900 underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maharani Gayatri Devi"
                  className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-charcoal focus:border-bronze focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@estate.in"
                  className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-charcoal focus:border-bronze focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                  Telephone Coordinates
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 12345"
                  className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-charcoal focus:border-bronze focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                  Nature of Consultation
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-charcoal focus:border-bronze focus:outline-none"
                >
                  <option value="Private Salon Viewing">Private Flagship Salon Viewing (Mumbai)</option>
                  <option value="New Delhi Gallery">New Delhi Gallery Appointment</option>
                  <option value="Bengaluru Residence">Bengaluru Residence Consultation</option>
                  <option value="Bespoke Architectural Commission">Bespoke Architectural Commission</option>
                  <option value="Active Consignment Inquiry">Active Consignment Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-charcoal/80 mb-1">
                  Special Notes or Dimensional Requests
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Specify architectural blueprints, preferred marble varieties, or timeline requirements..."
                  className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-charcoal focus:border-bronze focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit to Concierge Desk</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
