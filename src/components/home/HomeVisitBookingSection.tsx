'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  Compass,
  Layers,
  Ruler,
  ShieldCheck,
  Send,
  Building,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollAnimation';

export default function HomeVisitBookingSection() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Jodhpur — Ratanada & Circuit House Rd');
  const [residenceAddress, setResidenceAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 AM – 1:00 PM)');
  const [roomType, setRoomType] = useState('Living Room Sanctuary');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !residenceAddress) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
    }, 800);
  };

  return (
    <section id="home-visit" className="py-20 bg-cream-subtle border-y border-cream-border relative overflow-hidden scroll-mt-20">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cream-border/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Service Narrative & Experience (6 Cols) */}
          <ScrollReveal direction="right" className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-bronze/50 bg-white/80 backdrop-blur-xs rounded-full text-[10px] uppercase tracking-[0.25em] text-bronze-dark font-medium shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-bronze-dark" />
                <span>Jodhpur Heritage Concierge Service</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
                Private In-Home <span className="italic font-normal text-bronze-dark">Spatial Consultation</span>
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                Experience haute couture furniture selection in the comfort of your private Jodhpur residence.
                Our Senior Architectural Curators visit your space with physical marble &amp; leather trunks, laser spatial mapping,
                and bespoke 3D layout blueprints.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white border border-cream-border flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-bronze/15 text-bronze-dark flex items-center justify-center shrink-0 mt-0.5">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-charcoal font-semibold">
                    1. 3D Laser Dimensioning & Spatial Flow
                  </h3>
                  <p className="text-xs text-charcoal/65 mt-0.5">
                    Precise spatial scanning of entryways, ceiling heights, and circulation zones to guarantee perfect scale.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-cream-border flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-bronze/15 text-bronze-dark flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-charcoal font-semibold">
                    2. Physical Quarry Marble & Leather Trunk
                  </h3>
                  <p className="text-xs text-charcoal/65 mt-0.5">
                    Evaluate genuine Italian Carrara marble slabs, Tuscan top-grain hides, and bouclé fabrics directly under your residence&apos;s natural lighting.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-cream-border flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-bronze/15 text-bronze-dark flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-charcoal font-semibold">
                    3. Bespoke CAD Architectural Blueprint
                  </h3>
                  <p className="text-xs text-charcoal/65 mt-0.5">
                    Receive a personalized 3D spatial curation proposal prepared by our chief residential interior architect.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-6 text-xs text-charcoal/70">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Zero Obligation Consultation</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Building className="w-4 h-4 text-bronze-dark" />
                <span>Available Pan-India</span>
              </span>
            </div>
          </ScrollReveal>

          {/* Right: Interactive Booking Form Card (6 Cols) */}
          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-6">
            <div className="bg-white border border-cream-border p-6 sm:p-8 shadow-luxury relative">
              <div className="border-b border-cream-border pb-4 mb-6">
                <span className="text-[10px] tracking-[0.25em] uppercase text-bronze-dark font-semibold">
                  Reservation Form
                </span>
                <h3 className="font-serif text-2xl text-charcoal mt-1">Book Your In-Home Visit</h3>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Select your preferred residence coordinates and appointment window.
                </p>
              </div>

              {isBooked ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-4 rounded-xs">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-emerald-900">
                      In-Home Consultation Scheduled
                    </h4>
                    <p className="text-xs text-emerald-800/80 mt-1 max-w-sm mx-auto">
                      Thank you, <strong>{fullName}</strong>. Our Senior Curator will telephone you at{' '}
                      <strong>{phone}</strong> to confirm your architectural visit at {city}.
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-emerald-200 text-xs text-emerald-900 font-mono text-left space-y-1">
                    <p>• Room Focus: {roomType}</p>
                    <p>• Slot: {timeSlot}</p>
                    <p>• Address: {residenceAddress}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBooked(false)}
                    className="px-6 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-wider hover:bg-bronze hover:text-charcoal transition-colors font-medium"
                  >
                    Schedule Another Consultation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-charcoal/80 mb-1 font-medium">
                        Patron Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Vikramaditya Singhania"
                        className="w-full px-3 py-2.5 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-charcoal/80 mb-1 font-medium">
                        Direct Mobile Coordinates *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98200 12345"
                        className="w-full px-3 py-2.5 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-charcoal/80 mb-1 font-medium">
                        Jodhpur Locality / Region *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      >
                        <option value="Jodhpur — Ratanada & Circuit House Rd">Jodhpur — Ratanada &amp; Circuit House Rd</option>
                        <option value="Jodhpur — Umaid Heritage & Cantt">Jodhpur — Umaid Heritage &amp; Palace Enclave</option>
                        <option value="Jodhpur — Shastri Nagar">Jodhpur — Shastri Nagar</option>
                        <option value="Jodhpur — Sardarpura (C Road / B Road)">Jodhpur — Sardarpura</option>
                        <option value="Jodhpur — Paota & Mandore Haveli Estates">Jodhpur — Paota &amp; Mandore</option>
                        <option value="Jodhpur — Chopasni & Pal Road">Jodhpur — Chopasni &amp; Pal Road</option>
                        <option value="Jodhpur — Other Heritage Residence">Jodhpur — Other Heritage Residence</option>
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-charcoal/80 mb-1 font-medium">
                        Room Focus *
                      </label>
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full px-3 py-2.5 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      >
                        <option value="Living Room Sanctuary">Living Room &amp; Lounge Sanctuary</option>
                        <option value="Carrara Dining Banquet">Carrara Dining &amp; Marble Banquet</option>
                        <option value="Master Bedroom Suite">Master Bedroom Platform Suite</option>
                        <option value="Executive Library / Study">Executive Library &amp; Study</option>
                        <option value="Full Penthouse / Villa Curation">Full Haveli / Villa Curation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-charcoal/80 mb-1 font-medium">
                      Jodhpur Residence Address &amp; Villa / Haveli Details *
                    </label>
                    <input
                      type="text"
                      value={residenceAddress}
                      onChange={(e) => setResidenceAddress(e.target.value)}
                      placeholder="e.g. Bungalow 14, Near Circuit House, Ratanada, Jodhpur"
                      className="w-full px-3 py-2.5 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-charcoal/80 mb-1 font-medium">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-charcoal/80 mb-1 font-medium">
                        Preferred Time Slot
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                      >
                        <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                        <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                        <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-charcoal/80 mb-1 font-medium">
                      Architectural Notes or Specific Pieces of Interest
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="e.g. Need 10-seater Carrara marble dining table and Chesterfield sofa for double-height living room..."
                      className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs focus:border-bronze focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal transition-all text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-bronze" />
                    <span>
                      {isSubmitting ? 'Reserving Master Curator...' : 'Request In-Home Visit'}
                    </span>
                  </button>

                  <p className="text-[10px] text-center text-charcoal/60">
                    Complimentary service • Our Senior Interior Architect will contact you to confirm within 3 hours.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
