'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ArrowRight,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  ExternalLink,
} from 'lucide-react';
import { formatINR } from '@/lib/gst';
import { DEFAULT_REELS, type ShoppableReel } from '@/lib/reels-store';
import { ScrollReveal } from '@/components/ui/ScrollAnimation';

// Helper to test if a video URL is a direct video (mp4/webm) vs an Instagram/web embed
const isDirectVideo = (url: string) => {
  if (!url) return false;
  return (
    url.endsWith('.mp4') ||
    url.endsWith('.webm') ||
    url.includes('mixkit.co') ||
    url.includes('cloudinary') ||
    url.includes('.mp4?') ||
    url.includes('blob:')
  );
};

// Extract Instagram reel embed URL if needed
const getEmbedUrl = (reel: ShoppableReel) => {
  if (reel.embedCode && reel.embedCode.includes('src=')) {
    const match = reel.embedCode.match(/src=["'](.*?)["']/);
    if (match && match[1]) return match[1];
  }
  if (reel.videoUrl.includes('instagram.com')) {
    const cleanUrl = reel.videoUrl.split('?')[0].replace(/\/$/, '');
    return `${cleanUrl}/embed/captioned/`;
  }
  return reel.videoUrl;
};

// Individual Shoppable Reel Card with auto-play on scroll
function AutoPlayReelCard({
  reel,
  onOpenModal,
}: {
  reel: ShoppableReel;
  onOpenModal: (reel: ShoppableReel) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isDirect = isDirectVideo(reel.videoUrl);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card || !isDirect) return;

    // IntersectionObserver to auto-play video whenever it is scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                video.muted = true;
                video.play().then(() => setIsPlaying(true)).catch(() => {});
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.15, // Triggers auto-play when at least 15% of card is visible
        rootMargin: '60px 0px',
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [isDirect]);

  return (
    <div ref={cardRef} className="group flex flex-col justify-between">
      {/* 9:16 Vertical Video Frame */}
      <div
        onClick={() => onOpenModal(reel)}
        className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-md border border-[#D8CEBF]/80 cursor-pointer group-hover:shadow-[0_12px_36px_rgba(140,109,70,0.25)] transition-all duration-300"
      >
        {/* Video / Thumbnail preview */}
        {isDirect ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.thumbnail}
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <img
            src={reel.thumbnail}
            alt={reel.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
          />
        )}

        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />

        {/* Top Badge */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white border border-white/20 text-[9px] uppercase tracking-wider font-semibold rounded-full truncate max-w-[70%]">
            {reel.categoryTag || 'A1 Atelier'}
          </span>
          <div className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
            <Play className={`w-2.5 h-2.5 fill-white ${isPlaying ? 'opacity-90' : 'opacity-100'}`} />
          </div>
        </div>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-[#D4AF37]/90 text-charcoal flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-110 group-hover:bg-[#D4AF37] transition-all duration-300 opacity-80 group-hover:opacity-100">
            <Play className="w-4 h-4 fill-charcoal ml-0.5" />
          </div>
        </div>

        {/* Bottom Video Caption */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
          <p className="text-white text-[11px] sm:text-xs font-serif font-medium line-clamp-2 drop-shadow-md leading-snug">
            {reel.title}
          </p>
        </div>
      </div>

      {/* Bottom Product Details */}
      <div className="pt-2.5 pb-1 space-y-1">
        <Link
          href={`/product/${reel.productSlug || 'augustus-grande-chesterfield-sofa'}`}
          className="block group/link"
        >
          <h3 className="font-serif text-xs sm:text-sm text-charcoal font-semibold group-hover/link:text-[#8C6D46] transition-colors line-clamp-2 leading-tight">
            {reel.productName}
          </h3>
        </Link>

        {/* Star Ratings */}
        <div className="flex items-center gap-1 text-[11px]">
          <div className="flex text-amber-500 text-xs">
            {'★'.repeat(reel.rating || 5)}
          </div>
          <span className="text-charcoal/50 text-[10px]">
            ({reel.reviewCount || 42})
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-baseline justify-between pt-0.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-serif text-xs sm:text-sm font-bold text-charcoal">
              {formatINR(reel.productPrice)}
            </span>
            {reel.originalPrice && reel.originalPrice > reel.productPrice && (
              <span className="text-[10px] text-charcoal/40 line-through">
                {formatINR(reel.originalPrice)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${reel.productSlug || 'augustus-grande-chesterfield-sofa'}`}
            className="text-[10px] uppercase tracking-wider font-semibold text-[#8C6D46] hover:text-charcoal flex items-center gap-0.5 shrink-0"
          >
            <span>Shop</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ShoppableReelsSection() {
  const [reels, setReels] = useState<ShoppableReel[]>(DEFAULT_REELS);
  const [activeModalReel, setActiveModalReel] = useState<ShoppableReel | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Fetch dynamic reels from API
  useEffect(() => {
    fetch('/api/reels')
      .then((res) => res.json())
      .then((data) => {
        if (data.reels && Array.isArray(data.reels) && data.reels.length > 0) {
          setReels(data.reels);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch reels, using default reels:', err);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <ScrollReveal direction="up">
        {/* Section Header (No scroller arrows) */}
        <div className="text-center sm:text-left mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#8C6D46] font-semibold">
            <Sparkles className="w-3 h-3 text-[#8C6D46]" />
            <span>In-Residence Living Stories</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-charcoal font-normal mt-1">
            Shoppable Videos
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-xl">
            Witness our masterworks in dynamic architectural spaces. Videos play automatically as you scroll. Tap any reel to inspect craftsmanship and shop the look.
          </p>
        </div>
      </ScrollReveal>

      {/* Shoppable Reels Grid (No horizontal scroller, clean responsive grid with auto-play) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {reels.map((reel) => (
          <AutoPlayReelCard
            key={reel.id}
            reel={reel}
            onOpenModal={(r) => setActiveModalReel(r)}
          />
        ))}
      </div>

      {/* FULLSCREEN SHOPPABLE REELS MODAL (Instagram / TikTok Style Player) */}
      {activeModalReel && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-4xl bg-[#121214] border border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]">
            {/* Close Modal Button */}
            <button
              onClick={() => setActiveModalReel(null)}
              className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-white hover:text-charcoal text-white flex items-center justify-center border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Center: Vertical 9:16 Video Player */}
            <div className="relative w-full md:w-[420px] aspect-[9/16] bg-black flex-shrink-0 flex items-center justify-center overflow-hidden">
              {isDirectVideo(activeModalReel.videoUrl) ? (
                <video
                  src={activeModalReel.videoUrl}
                  controls
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : activeModalReel.videoUrl.includes('instagram.com') || activeModalReel.embedCode ? (
                <iframe
                  src={getEmbedUrl(activeModalReel)}
                  className="w-full h-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img
                  src={activeModalReel.thumbnail}
                  alt={activeModalReel.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Sound Toggle (for direct videos) */}
              {isDirectVideo(activeModalReel.videoUrl) && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 left-4 z-20 w-8 h-8 rounded-full bg-black/70 text-white border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:text-charcoal transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Right: Shoppable Product Details & Direct Acquisition Bar */}
            <div className="flex-1 p-5 sm:p-8 flex flex-col justify-between space-y-6 text-cream bg-[#161619] overflow-y-auto">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#C5A880]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] uppercase tracking-widest rounded-full font-medium">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Featured in Reel</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-white">
                  {activeModalReel.title}
                </h3>

                {/* Linked Shoppable Piece Card */}
                <div className="p-4 bg-[#1F1F24] border border-[#C5A880]/30 rounded-xl flex gap-4 items-center shadow-inner">
                  <img
                    src={activeModalReel.thumbnail}
                    alt={activeModalReel.productName}
                    className="w-20 h-20 rounded-lg object-cover border border-[#C5A880]/40 shrink-0"
                  />
                  <div className="space-y-1">
                    <p className="font-serif text-sm font-semibold text-white">
                      {activeModalReel.productName}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400">
                      {'★'.repeat(activeModalReel.rating || 5)}
                      <span className="text-white/50 text-[10px]">
                        ({activeModalReel.reviewCount || 42} reviews)
                      </span>
                    </div>
                    <p className="font-serif text-base font-bold text-[#D4AF37]">
                      {formatINR(activeModalReel.productPrice)}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-cream/70 leading-relaxed">
                  Handcrafted with generational solid hardwood mortise-and-tenon joinery and compliant HSN 9403 GST tax credit invoicing. Includes white-glove assembly.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <Link
                  href={`/product/${activeModalReel.productSlug || 'augustus-grande-chesterfield-sofa'}`}
                  className="w-full py-3.5 bg-[#C5A880] text-charcoal hover:bg-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 rounded-xs shadow-md transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Configure & Acquire Piece</span>
                </Link>

                <Link
                  href="/contact-us"
                  className="w-full py-3 bg-[#1C1C20] text-cream hover:text-[#D4AF37] border border-white/20 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xs transition-colors"
                >
                  <span>Book Private In-Home Viewing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
