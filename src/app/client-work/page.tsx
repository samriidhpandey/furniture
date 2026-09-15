'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Calendar,
  UserCheck,
  Ruler,
  Building,
  ArrowRight,
  Search,
  Star,
  X,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollAnimation';

interface ClientProject {
  id: string;
  title: string;
  clientName: string;
  location: string;
  city: string;
  roomType: string;
  scope: string;
  artisanSupervisor: string;
  completionDate: string;
  beforeImage?: string | null;
  images: string; // JSON string array
  featured: boolean; // Pinned
  clientReview?: string | null;
}

export default function ClientWorkPage() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/client-work');
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error('Failed to load projects', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects by Search Query across Title, Client Name, Locality, Scope, Room Type
  const filteredProjects = projects.filter((p) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.clientName.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.scope.toLowerCase().includes(query) ||
      p.roomType.toLowerCase().includes(query) ||
      (p.clientReview && p.clientReview.toLowerCase().includes(query)) ||
      (p.artisanSupervisor && p.artisanSupervisor.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-cream pb-24 text-charcoal">
      {/* 1. Header Banner */}
      <section className="bg-[#151413] text-cream py-16 sm:py-20 border-b border-charcoal-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-bronze/15 via-[#151413]/70 to-[#151413] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-bronze/50 bg-charcoal/80 rounded-full text-[10px] uppercase tracking-[0.25em] text-bronze font-medium">
                <Sparkles className="w-3.5 h-3.5 text-bronze" />
                <span>Exclusively Handcrafted &amp; Installed in Jodhpur</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-light text-cream leading-tight">
                Jodhpur Residences <span className="italic font-normal text-bronze">&amp; Site Archive</span>
              </h1>
              <p className="text-xs sm:text-sm text-cream/75 leading-relaxed">
                A photographic record of our on-site residential curations, 3D laser spatial calibration,
                and white-glove masterwork installations across Jodhpur&apos;s most distinguished estates,
                heritage havelis, and luxury villas.
              </p>
            </div>

            {/* In-Home Visit Direct CTA */}
            <div className="shrink-0">
              <Link
                href="/#home-visit"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-bronze hover:bg-bronze-light text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-luxury"
              >
                <span>Book Jodhpur Home Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search Bar */}
      <section className="sticky top-20 z-30 bg-cream/95 backdrop-blur-md border-b border-cream-border py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search works (e.g. Umaid Heritage, Ratanada, Carrara Table, Chesterfield, Shastri Nagar)..."
                className="w-full pl-10 pr-10 py-3 bg-white border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none shadow-2xs placeholder:text-charcoal/40"
              />
              <Search className="w-4 h-4 text-bronze-dark absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status counter & Quick Jodhpur tags */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-charcoal/70">
              <span className="text-[11px] uppercase tracking-wider text-charcoal/60">
                Showing <strong className="text-charcoal font-bold">{filteredProjects.length}</strong> Works
              </span>
              <div className="hidden lg:flex items-center gap-1.5 ml-3">
                <span className="text-[10px] text-charcoal/40">Popular:</span>
                {['Umaid Heritage', 'Ratanada', 'Shastri Nagar', 'Sardarpura'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-2 py-0.5 bg-white border border-cream-border text-[10px] hover:border-bronze text-charcoal/80"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Installations Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-8 h-8 border-2 border-bronze border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-widest text-charcoal/60">
              Loading Jodhpur Client Archive...
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-24 text-center bg-white border border-cream-border p-12 space-y-4">
            <Building className="w-12 h-12 text-bronze/60 mx-auto" />
            <h3 className="font-serif text-xl text-charcoal">No Site Installations Found</h3>
            <p className="text-xs text-charcoal/60 max-w-md mx-auto">
              No completed installations matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs uppercase tracking-widest text-bronze-dark underline hover:text-charcoal"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            {filteredProjects.map((project, idx) => {
              let photoList: string[] = [];
              try {
                photoList = JSON.parse(project.images);
              } catch {
                photoList = [project.images];
              }

              return (
                <ScrollReveal key={project.id} direction="up" delay={idx * 0.08}>
                  <article
                    className={`bg-white border transition-all duration-300 overflow-hidden ${
                      project.featured
                        ? 'border-bronze shadow-luxury ring-1 ring-bronze/30'
                        : 'border-cream-border shadow-xs hover:shadow-luxury'
                    }`}
                  >
                    {/* Top Pinned Banner if Featured */}
                    {project.featured && (
                      <div className="bg-gradient-to-r from-amber-600 via-bronze to-amber-700 px-4 py-1.5 flex items-center justify-between text-charcoal text-[10px] uppercase tracking-[0.25em] font-bold">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-charcoal text-charcoal" />
                          <span>Pinned Signature Masterwork • Jodhpur Prime Portfolio</span>
                        </div>
                        <span className="hidden sm:inline text-[9px] tracking-widest opacity-90">
                          Curator’s Choice
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Left: Gallery & Before/After (7 Cols) */}
                      <div className="lg:col-span-7 bg-[#121110] relative flex flex-col justify-between group">
                        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                          <img
                            src={photoList[0] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4 bg-charcoal/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-bronze font-semibold border border-bronze/30">
                            {project.roomType}
                          </div>
                          <div className="absolute top-4 right-4 bg-charcoal/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-white/90 font-medium flex items-center gap-1.5 border border-white/10">
                            <MapPin className="w-3 h-3 text-bronze" />
                            <span>{project.location}</span>
                          </div>
                        </div>

                        {/* Secondary thumbnails / Before comparison if available */}
                        {photoList.length > 1 || project.beforeImage ? (
                          <div className="p-3 bg-[#191817] border-t border-white/10 flex items-center gap-3 overflow-x-auto">
                            {project.beforeImage && (
                              <div className="relative shrink-0 w-24 h-16 border border-amber-500/40 overflow-hidden">
                                <img
                                  src={project.beforeImage}
                                  alt="Pre-Installation State"
                                  className="w-full h-full object-cover grayscale opacity-75 hover:opacity-100 transition-opacity"
                                />
                                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] uppercase tracking-wider text-amber-300 text-center py-0.5">
                                  Pre-Site Visit
                                </span>
                              </div>
                            )}
                            {photoList.map((photo, pIdx) => (
                              <div
                                key={pIdx}
                                className="relative shrink-0 w-24 h-16 border border-white/20 overflow-hidden"
                              >
                                <img
                                  src={photo}
                                  alt={`${project.title} angle ${pIdx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] uppercase tracking-wider text-white/80 text-center py-0.5">
                                  View {pIdx + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {/* Right: Architectural Documentation & Client Specs (5 Cols) */}
                      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-bronze-dark font-semibold">
                              Verified Sovereign Installation • Jodhpur
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mt-1 leading-snug">
                              {project.title}
                            </h2>
                            <p className="text-xs text-charcoal/60 mt-0.5">
                              Patron: <strong className="text-charcoal font-semibold">{project.clientName}</strong>
                            </p>
                          </div>

                          <div className="p-4 bg-cream-subtle border border-cream-border space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
                              <Ruler className="w-3.5 h-3.5 text-bronze-dark" />
                              <span>Scope of On-Site Execution</span>
                            </div>
                            <p className="text-xs text-charcoal/80 leading-relaxed">
                              {project.scope}
                            </p>
                          </div>

                          {project.clientReview && (
                            <div className="pt-2 border-l-2 border-bronze pl-4 italic text-xs sm:text-sm text-charcoal/80 font-serif leading-relaxed">
                              &ldquo;{project.clientReview}&rdquo;
                            </div>
                          )}
                        </div>

                        {/* Metadata Footer */}
                        <div className="pt-4 border-t border-cream-border grid grid-cols-2 gap-4 text-[11px] text-charcoal/70">
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-charcoal/40 font-semibold">
                              Lead Supervisor
                            </span>
                            <span className="font-medium text-charcoal flex items-center gap-1 mt-0.5">
                              <UserCheck className="w-3 h-3 text-bronze-dark" />
                              {project.artisanSupervisor}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-charcoal/40 font-semibold">
                              Completed On
                            </span>
                            <span className="font-medium text-charcoal flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3 text-bronze-dark" />
                              {project.completionDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* 4. Bottom CTA Section for In-Home Visit */}
        <section className="mt-20 p-8 sm:p-12 bg-charcoal text-cream border border-charcoal-subtle relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-bronze/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold">
              Jodhpur In-Home Spatial Concierge
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-cream font-light">
              Book A Private In-Home Visit In Jodhpur
            </h2>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
              Our Senior Curators arrive at your Jodhpur residence with genuine Italian quarry marbles, full-grain leather trunks,
              and 3D laser scanners to create a bespoke architectural furniture layout.
            </p>
            <div className="pt-2">
              <Link
                href="/#home-visit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-bronze hover:bg-bronze-light text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-luxury"
              >
                <span>Reserve Jodhpur In-Home Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
