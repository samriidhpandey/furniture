import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from '@/lib/cart-context';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'A1 LUXURY FURNITURE | Masterpieces in Living Form',
  description:
    'Handcrafted heirloom furniture for discerning architectural residences. Book-matched Italian Carrara marble, Tuscan full-grain leather, and artisan joinery. Complimentary white-glove delivery across India.',
  keywords: [
    'luxury furniture',
    'chesterfield sofa',
    'carrara marble dining table',
    'bespoke furniture India',
    'handcrafted furniture',
    'architectural interior',
  ],
  authors: [{ name: 'A1 Luxury Furniture India Pvt Ltd' }],
  metadataBase: new URL('https://a1luxuryfurniture.com'),
  openGraph: {
    title: 'A1 LUXURY FURNITURE | Sovereign Living',
    description: 'Masterpieces in Living Form. Hand-finished in Bologna, Carrara & Kyoto.',
    siteName: 'A1 Luxury Furniture',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'A1 Luxury Furniture',
    url: 'https://a1luxuryfurniture.com',
    logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-22-69408800',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 14, Palladium Annex, High Street Phoenix, Lower Parel',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400013',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal selection:bg-bronze selection:text-charcoal">
        <AuthProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
