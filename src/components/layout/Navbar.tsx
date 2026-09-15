'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import AuthModal from '@/components/auth/AuthModal';
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  ShieldAlert,
  Compass,
  FileText,
  Sparkles,
  UploadCloud,
  Home,
} from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const { items, setIsCartOpen } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Collections', href: '/catalog' },
    { label: 'Client Residences', href: '/client-work' },
    { label: 'Book Home Visit', href: '/#home-visit' },
    { label: 'Track Order', href: '/order/A1-2026-89412' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-cream-border transition-all duration-300 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-bronze"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block group">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-charcoal uppercase group-hover:text-bronze-dark transition-colors">
                    A1 LUXURY
                  </span>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-bronze font-medium -mt-1">
                    FURNITURE ATELIER
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.18em] font-medium text-charcoal/80 hover:text-bronze transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions: Search, User, Cart */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Quick Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-charcoal/80 hover:text-bronze transition-colors"
                aria-label="Search Collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account / Sign In */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-charcoal/90 hover:text-bronze transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline max-w-[120px] truncate">
                  {user ? user.name.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-charcoal hover:text-bronze transition-colors"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1 right-0 w-4 h-4 bg-bronze text-charcoal text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cream border-b border-cream-border px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-widest text-charcoal hover:text-bronze"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-cream-border">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-2.5 bg-charcoal text-cream text-xs uppercase tracking-widest"
              >
                {user ? `Logged in: ${user.name}` : 'Sign In with Google / OTP'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Dialog */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-cream w-full max-w-xl border border-cream-border p-6 shadow-2xl relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-5 right-5 text-charcoal/60 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-lg text-charcoal mb-4">Search The A1 Archive</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Chesterfields, Carrara Marble, Armchairs, Desks..."
                className="flex-1 px-4 py-2.5 bg-white border border-cream-border text-sm text-charcoal focus:border-bronze focus:outline-none"
                autoFocus
              />
              <Link
                href={`/catalog?q=${encodeURIComponent(searchQuery)}`}
                onClick={() => setSearchOpen(false)}
                className="px-6 py-2.5 bg-charcoal text-cream text-xs uppercase tracking-widest hover:bg-bronze hover:text-charcoal transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Find</span>
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-charcoal/70">
              <span className="font-medium text-charcoal">Trending:</span>
              <Link
                href="/catalog?category=Living"
                onClick={() => setSearchOpen(false)}
                className="hover:text-bronze underline"
              >
                Chesterfield Sofas
              </Link>
              <span>•</span>
              <Link
                href="/catalog?category=Dining"
                onClick={() => setSearchOpen(false)}
                className="hover:text-bronze underline"
              >
                Carrara Marble Dining
              </Link>
              <span>•</span>
              <Link
                href="/catalog?category=Bedroom"
                onClick={() => setSearchOpen(false)}
                className="hover:text-bronze underline"
              >
                Japanese Platform Beds
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
