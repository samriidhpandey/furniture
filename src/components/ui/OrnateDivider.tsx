'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface OrnateDividerProps {
  theme?: 'dark' | 'light';
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function OrnateDivider({
  theme = 'dark',
  title,
  subtitle,
  className = '',
}: OrnateDividerProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`relative w-full my-10 flex flex-col items-center justify-center select-none ${className}`}>
      {/* Neoclassical Gold Filigree Band with Royal Medallion */}
      <div className="w-full max-w-5xl flex items-center justify-center gap-3 sm:gap-4 px-4">
        {/* Left Ornate Line & Diamond Flourish */}
        <div className="flex-1 flex items-center">
          <div className={`w-full h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#C5A880]/40 to-[#D4AF37]' : 'bg-gradient-to-r from-transparent via-[#8C6D46]/40 to-[#8C6D46]'}`} />
          <div className="w-2.5 h-2.5 rotate-45 border border-[#C5A880] bg-[#C5A880]/20 shrink-0 ml-1.5 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
          </div>
        </div>

        {/* Center Sovereign Diamond Medallion & Motif */}
        <div className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border ${isDark ? 'border-[#C5A880]/30 bg-[#161619]/90 backdrop-blur-md text-[#D4AF37]' : 'border-[#8C6D46]/30 bg-[#F9F6F0] text-[#8C6D46]'} shadow-sm`}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" fillOpacity="0.2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
          <span className="text-[9px] uppercase tracking-[0.35em] font-serif font-bold">
            A1 ATELIER • ROYAL ARCHIVE
          </span>
          <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" fillOpacity="0.2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
        </div>

        {/* Right Ornate Line & Diamond Flourish */}
        <div className="flex-1 flex items-center">
          <div className="w-2.5 h-2.5 rotate-45 border border-[#C5A880] bg-[#C5A880]/20 shrink-0 mr-1.5 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
          </div>
          <div className={`w-full h-px ${isDark ? 'bg-gradient-to-l from-transparent via-[#C5A880]/40 to-[#D4AF37]' : 'bg-gradient-to-l from-transparent via-[#8C6D46]/40 to-[#8C6D46]'}`} />
        </div>
      </div>

      {title && (
        <div className="text-center mt-3 space-y-1">
          <p className={`font-serif text-sm uppercase tracking-[0.25em] font-medium ${isDark ? 'text-[#EAE6DF]' : 'text-[#121214]'}`}>
            {title}
          </p>
          {subtitle && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Ornate Corner Bracket for luxury vintage cards
export function OrnateCardCorners({ color = '#C5A880', size = 18 }: { color?: string; size?: number }) {
  return (
    <>
      {/* Top-Left Vintage Corner */}
      <div className="absolute top-2 left-2 pointer-events-none z-20" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M0 12V3C0 1.34315 1.34315 0 3 0H12" />
          <path d="M4 4H8V8H4V4Z" fill={color} fillOpacity="0.3" strokeWidth="0.8" />
          <circle cx="3" cy="3" r="1.2" fill={color} />
        </svg>
      </div>

      {/* Top-Right Vintage Corner */}
      <div className="absolute top-2 right-2 pointer-events-none z-20" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M20 12V3C20 1.34315 18.6569 0 17 0H8" />
          <path d="M12 4H16V8H12V4Z" fill={color} fillOpacity="0.3" strokeWidth="0.8" />
          <circle cx="17" cy="3" r="1.2" fill={color} />
        </svg>
      </div>

      {/* Bottom-Left Vintage Corner */}
      <div className="absolute bottom-2 left-2 pointer-events-none z-20" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M0 8V17C0 18.6569 1.34315 20 3 20H12" />
          <path d="M4 12H8V16H4V12Z" fill={color} fillOpacity="0.3" strokeWidth="0.8" />
          <circle cx="3" cy="17" r="1.2" fill={color} />
        </svg>
      </div>

      {/* Bottom-Right Vintage Corner */}
      <div className="absolute bottom-2 right-2 pointer-events-none z-20" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M20 8V17C20 18.6569 18.6569 20 17 20H8" />
          <path d="M12 12H16V16H12V12Z" fill={color} fillOpacity="0.3" strokeWidth="0.8" />
          <circle cx="17" cy="17" r="1.2" fill={color} />
        </svg>
      </div>
    </>
  );
}

// Full Ornate Card Wrapper with Vintage Borders, Gold Pinstripe, and Antique Brass Corners
export function OrnateCardFrame({
  children,
  className = '',
  borderColor = '#C5A880',
  theme = 'light',
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  theme?: 'light' | 'dark';
}) {
  const isDark = theme === 'dark';
  return (
    <div
      className={`relative group rounded-xs border-2 transition-all duration-500 overflow-hidden ${
        isDark
          ? 'bg-[#18181B] border-[#C5A880]/30 hover:border-[#D4AF37] hover:shadow-[0_10px_30px_rgba(212,175,55,0.12)]'
          : 'bg-white border-[#C5A880]/35 hover:border-[#8C6D46] hover:shadow-[0_12px_32px_rgba(140,109,70,0.12)]'
      } ${className}`}
    >
      {/* Antique Corner Filigree */}
      <OrnateCardCorners color={borderColor} />

      {/* Inner Inlay Pinstripe Frame */}
      <div
        className={`absolute inset-2 border pointer-events-none z-10 transition-colors duration-500 ${
          isDark
            ? 'border-[#C5A880]/20 group-hover:border-[#D4AF37]/50'
            : 'border-[#C5A880]/25 group-hover:border-[#8C6D46]/50'
        }`}
      />

      {children}
    </div>
  );
}

