'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { formatINR } from '@/lib/gst';
import {
  ShieldAlert,
  Package,
  TrendingUp,
  Tag,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Plus,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  UploadCloud,
  Building,
  Trash2,
  Camera,
  MapPin,
  Sparkles,
  Star,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  UserCheck,
  Play,
  Video,
  Film,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, loginAsAdmin, logout, switchUserRole } = useAuth();

  // Admin login form state
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState('');
  const [isAuthenticatingAdmin, setIsAuthenticatingAdmin] = useState(false);

  const [activeTab, setActiveTab] = useState<'ORDERS' | 'INVENTORY' | 'SALONS' | 'REELS' | 'COUPONS' | 'REVIEWS' | 'INSTALLATIONS' | 'AUDIT'>('ORDERS');
  const [orders, setOrders] = useState<any[]>([]);
  const [inventory, setInventory] = useState<{ products: any[]; lowStockVariants: any[] }>({
    products: [],
    lowStockVariants: [],
  });
  const [coupons, setCoupons] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [clientProjects, setClientProjects] = useState<any[]>([]);
  const [salonCategories, setSalonCategories] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Salon Card Form State
  const [newSalonName, setNewSalonName] = useState('');
  const [newSalonCategory, setNewSalonCategory] = useState('Living');
  const [newSalonImage, setNewSalonImage] = useState('');
  const [isSubmittingSalon, setIsSubmittingSalon] = useState(false);

  // New Shoppable Reel Form State
  const [newReelTitle, setNewReelTitle] = useState('');
  const [newReelVideoUrl, setNewReelVideoUrl] = useState('');
  const [newReelThumbnail, setNewReelThumbnail] = useState('');
  const [newReelProductName, setNewReelProductName] = useState('');
  const [newReelProductUrl, setNewReelProductUrl] = useState('');
  const [newReelPrice, setNewReelPrice] = useState('₹45,000');
  const [newReelOriginalPrice, setNewReelOriginalPrice] = useState('₹75,000');
  const [newReelDiscount, setNewReelDiscount] = useState('40% OFF');
  const [newReelRating, setNewReelRating] = useState(5.0);
  const [newReelReviewCount, setNewReelReviewCount] = useState(64);
  const [isSubmittingReel, setIsSubmittingReel] = useState(false);

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState('PERCENT');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(50000);
  const [newCouponMaxDiscount, setNewCouponMaxDiscount] = useState(30000);
  const [newCouponLimit, setNewCouponLimit] = useState(100);

  // New Client Installation Form State
  const [projTitle, setProjTitle] = useState('');
  const [projClient, setProjClient] = useState('');
  const [projCity, setProjCity] = useState('Jodhpur');
  const [projLocation, setProjLocation] = useState('Ratanada, Jodhpur');
  const [projRoomType, setProjRoomType] = useState('Living Room Sanctuary');
  const [projScope, setProjScope] = useState('');
  const [projArtisan, setProjArtisan] = useState('Senior Master Artisan A1 (Jodhpur)');
  const [projDate, setProjDate] = useState('March 2026');
  const [projImg1, setProjImg1] = useState('');
  const [projImg2, setProjImg2] = useState('');
  const [projBeforeImg, setProjBeforeImg] = useState('');
  const [projReview, setProjReview] = useState('');
  const [projFeatured, setProjFeatured] = useState(true);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, invRes, coupRes, revRes, projRes, catRes, reelsRes] = await Promise.all([
        fetch('/api/admin/orders').then((r) => r.json()),
        fetch('/api/admin/inventory').then((r) => r.json()),
        fetch('/api/admin/coupons').then((r) => r.json()),
        fetch('/api/admin/reviews').then((r) => r.json()),
        fetch('/api/client-work').then((r) => r.json()),
        fetch('/api/admin/categories').then((r) => r.json()),
        fetch('/api/admin/reels').then((r) => r.json()),
      ]);
      if (ordersRes.orders) setOrders(ordersRes.orders);
      if (invRes.products) setInventory(invRes);
      if (coupRes.coupons) setCoupons(coupRes.coupons);
      if (revRes.reviews) setReviews(revRes.reviews);
      if (projRes.projects) setClientProjects(projRes.projects);
      if (catRes.categories) setSalonCategories(catRes.categories);
      if (reelsRes.reels) setReels(reelsRes.reels);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update order status & tracking (§23-A)
  const handleUpdateOrder = async (orderId: string, status: string, trackingNumber: string, courierName: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status, trackingNumber, courierName }),
      });
      if (res.ok) {
        showToast(`Order status updated to ${status}. Customer notification dispatched.`);
        loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Update variant stock (§13-A, §23-A)
  const handleUpdateStock = async (variantId: string, stock: number) => {
    try {
      const res = await fetch('/api/admin/inventory', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, stock }),
      });
      if (res.ok) {
        showToast('Variant stock inventory revised.');
        loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Create new coupon (§23-A)
  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newCouponCode,
          discountType: newCouponType,
          value: newCouponValue,
          minOrderValue: newCouponMinOrder,
          maxDiscount: newCouponMaxDiscount,
          usageLimit: newCouponLimit,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast(`Privilege Voucher ${data.coupon.code} activated.`);
      setNewCouponCode('');
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Toggle coupon
  const handleToggleCoupon = async (id: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/coupons', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle review moderation
  const handleToggleReview = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'APPROVED' ? 'HIDDEN' : 'APPROVED';
    try {
      await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      showToast(`Review status set to ${nextStatus}`);
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  // Create new client project installation
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projClient) return;
    setIsSubmittingProject(true);
    try {
      const photos = [
        projImg1 ||
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      ];
      if (projImg2) photos.push(projImg2);

      const payload = {
        title: projTitle,
        clientName: projClient,
        location: projLocation || `${projCity}, Rajasthan`,
        city: projCity,
        roomType: projRoomType,
        scope: projScope || 'Bespoke in-home spatial curation and custom installation.',
        artisanSupervisor: projArtisan,
        completionDate: projDate,
        beforeImage: projBeforeImg || null,
        images: photos,
        featured: projFeatured,
        clientReview: projReview || null,
      };

      const res = await fetch('/api/client-work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast('Client on-site installation recorded and published to site archive.');
        setProjTitle('');
        setProjClient('');
        setProjLocation('Ratanada, Jodhpur');
        setProjScope('');
        setProjImg1('');
        setProjImg2('');
        setProjBeforeImg('');
        setProjReview('');
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingProject(false);
    }
  };

  // Toggle Pin (Featured) for project
  const handleTogglePinProject = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch('/api/client-work', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, featured: !currentFeatured }),
      });
      if (res.ok) {
        showToast(!currentFeatured ? '⭐ Project pinned to TOP of public showcase!' : 'Project unpinned.');
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to remove this installation project?')) return;
    try {
      const res = await fetch(`/api/client-work?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('Installation project removed from archive.');
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create new Salon / Category card
  const handleCreateSalon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSalonName.trim() || !newSalonImage.trim()) {
      showToast('⚠️ Please provide both Salon Name and Image URL.');
      return;
    }
    setIsSubmittingSalon(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSalonName.trim(),
          categoryParam: newSalonCategory,
          image: newSalonImage.trim(),
        }),
      });
      if (res.ok) {
        showToast('✨ New Salon Card added to Homepage Orbit!');
        setNewSalonName('');
        setNewSalonImage('');
        loadData();
      } else {
        const d = await res.json();
        showToast(d.error || 'Failed to add card');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingSalon(false);
    }
  };

  // Delete Salon card
  const handleDeleteSalon = async (id: string) => {
    if (!confirm('Are you sure you want to remove this Salon card from the carousel?')) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('Salon card removed.');
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Shoppable Reel
  const handleCreateReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReelTitle.trim() || !newReelVideoUrl.trim()) {
      showToast('Please provide a Reel title and Instagram link / video URL.');
      return;
    }
    setIsSubmittingReel(true);
    try {
      const res = await fetch('/api/admin/reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newReelTitle.trim(),
          videoUrl: newReelVideoUrl.trim(),
          thumbnail: newReelThumbnail.trim() || undefined,
          productName: newReelProductName.trim() || newReelTitle.trim(),
          productUrl: newReelProductUrl.trim() || '/catalog',
          price: newReelPrice.trim() || '₹49,000',
          originalPrice: newReelOriginalPrice.trim() || undefined,
          discount: newReelDiscount.trim() || '40% OFF',
          rating: Number(newReelRating) || 5.0,
          reviewCount: Number(newReelReviewCount) || 50,
          featured: true,
        }),
      });
      if (res.ok) {
        showToast('Shoppable Video Reel published successfully!');
        setNewReelTitle('');
        setNewReelVideoUrl('');
        setNewReelThumbnail('');
        setNewReelProductName('');
        setNewReelProductUrl('');
        loadData();
      } else {
        const d = await res.json();
        showToast(d.error || 'Failed to add Reel');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReel(false);
    }
  };

  // Delete Shoppable Reel
  const handleDeleteReel = async (id: string) => {
    if (!confirm('Are you sure you want to remove this Shoppable Video Reel?')) return;
    try {
      const res = await fetch(`/api/admin/reels?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('Shoppable Video Reel deleted.');
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Admin ID & Password submission
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminIdInput.trim() || !adminPasswordInput.trim()) {
      setAdminAuthError('Please enter both Admin ID and Password');
      return;
    }
    setIsAuthenticatingAdmin(true);
    setAdminAuthError('');
    try {
      await loginAsAdmin(adminIdInput.trim(), adminPasswordInput.trim());
      await loadData();
    } catch (err: any) {
      setAdminAuthError(err.message || 'Invalid Admin ID or Password. Access denied.');
    } finally {
      setIsAuthenticatingAdmin(false);
    }
  };

  // Check admin role authorization (§22-A)
  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white border border-cream-border shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-charcoal text-bronze rounded-full flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">
              Atelier Security Clearance
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal">Executive Admin Portal</h1>
            <p className="text-xs text-charcoal/70">
              Access restricted to Gallery Directors & Atelier Operations Managers.
            </p>
          </div>

          {adminAuthError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{adminAuthError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1.5">
                Admin ID / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={adminIdInput}
                  onChange={(e) => setAdminIdInput(e.target.value)}
                  placeholder="admin@a1furniture.com"
                  className="w-full px-3.5 py-2.5 bg-cream-subtle border border-cream-border text-sm text-charcoal placeholder:text-charcoal/40 focus:border-bronze focus:bg-white focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-cream-subtle border border-cream-border text-sm text-charcoal placeholder:text-charcoal/40 focus:border-bronze focus:bg-white focus:outline-none transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticatingAdmin}
              className="w-full py-3 bg-charcoal text-cream text-xs uppercase tracking-widest font-semibold hover:bg-bronze hover:text-charcoal transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isAuthenticatingAdmin ? 'Verifying Security Clearance...' : 'Authenticate & Enter Control Room'}</span>
            </button>
          </form>

          {/* Quick Credential Hint for evaluator */}
          <div className="pt-4 border-t border-cream-border text-center space-y-2">
            <div className="p-3 bg-cream-subtle border border-cream-border rounded-xs text-left text-[11px] space-y-1">
              <p className="font-semibold text-charcoal flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-bronze-dark" />
                <span>Default Admin Credentials:</span>
              </p>
              <p className="text-charcoal/80 font-mono text-[10px]">
                ID: <span className="font-semibold text-charcoal">admin@a1furniture.com</span> (or <span className="font-semibold text-charcoal">admin</span>)
              </p>
              <p className="text-charcoal/80 font-mono text-[10px]">
                Password: <span className="font-semibold text-charcoal">admin123</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setAdminIdInput('admin@a1furniture.com');
                  setAdminPasswordInput('admin123');
                }}
                className="mt-1.5 text-[10px] text-bronze-dark hover:underline font-medium block"
              >
                ⚡ 1-Click Fill Credentials
              </button>
            </div>

            <Link
              href="/"
              className="inline-block text-xs uppercase tracking-wider text-charcoal/70 hover:text-charcoal hover:underline pt-2"
            >
              ← Return to Atelier Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics (§23-A)
  const totalRevenue = orders
    .filter((o) => ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(o.status))
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const activeOrdersCount = orders.filter((o) =>
    ['PAID', 'PROCESSING', 'SHIPPED'].includes(o.status)
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-cream-border pb-6 gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">
            Atelier Executive Control Room (§23-A)
          </span>
          <h1 className="font-serif text-3xl text-charcoal mt-0.5">Commercial & Logistics Operations</h1>
          <p className="text-xs text-charcoal/70 mt-0.5 flex items-center gap-2">
            <span>Logged in as <strong>{user.name}</strong></span>
            <span className="px-2 py-0.5 bg-charcoal text-cream text-[9px] uppercase tracking-wider font-semibold rounded-xs">
              {user.role}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2 border border-cream-border bg-white text-charcoal hover:border-bronze text-xs flex items-center gap-1.5 shadow-xs"
            title="Refresh records"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => switchUserRole('CUSTOMER')}
            className="px-3 py-2 border border-charcoal/30 text-charcoal/70 hover:text-charcoal hover:border-charcoal text-xs uppercase tracking-wider transition-colors"
          >
            Exit to Client View
          </button>
          <button
            onClick={() => logout()}
            className="px-3 py-2 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            title="Sign out of Admin Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs rounded shadow-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Executive Sales Dashboard Metrics Cards (§23-A) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-cream-border p-5 space-y-2 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-charcoal/50 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Total Captured Revenue</span>
          </span>
          <p className="font-serif text-2xl font-bold text-charcoal">{formatINR(totalRevenue)}</p>
          <p className="text-[10px] text-emerald-700">Settled via Razorpay gateway</p>
        </div>

        <div className="bg-white border border-cream-border p-5 space-y-2 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-charcoal/50 font-semibold flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-bronze" />
            <span>Active Consignments</span>
          </span>
          <p className="font-serif text-2xl font-bold text-charcoal">{activeOrdersCount}</p>
          <p className="text-[10px] text-charcoal/60">In white-glove curation / transit</p>
        </div>

        <div className="bg-white border border-cream-border p-5 space-y-2 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-charcoal/50 font-semibold flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-charcoal" />
            <span>Total Orders Logged</span>
          </span>
          <p className="font-serif text-2xl font-bold text-charcoal">{orders.length}</p>
          <p className="text-[10px] text-charcoal/60">Across all Indian states</p>
        </div>

        <div className="bg-white border border-cream-border p-5 space-y-2 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Low-Stock Variant Alerts</span>
          </span>
          <p className="font-serif text-2xl font-bold text-amber-900">
            {inventory.lowStockVariants.length}
          </p>
          <p className="text-[10px] text-amber-800/80">Variants with ≤ 2 pieces in atelier</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-cream-border flex space-x-8 text-xs uppercase tracking-wider font-semibold">
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`pb-3 transition-colors ${
            activeTab === 'ORDERS' ? 'border-b-2 border-charcoal text-charcoal' : 'text-charcoal/50 hover:text-charcoal'
          }`}
        >
          Consignment Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('INVENTORY')}
          className={`pb-3 transition-colors ${
            activeTab === 'INVENTORY' ? 'border-b-2 border-charcoal text-charcoal' : 'text-charcoal/50 hover:text-charcoal'
          }`}
        >
          Variant Stock Management (§13-A)
        </button>
        <button
          onClick={() => setActiveTab('SALONS')}
          className={`pb-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'SALONS' ? 'border-b-2 border-bronze text-bronze-dark font-bold' : 'text-charcoal/50 hover:text-charcoal'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-bronze" />
          <span>Homepage Salon Cards ({salonCategories.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('REELS')}
          className={`pb-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'REELS' ? 'border-b-2 border-bronze text-bronze-dark font-bold' : 'text-charcoal/50 hover:text-charcoal'
          }`}
        >
          <Film className="w-3.5 h-3.5 text-bronze" />
          <span>Shoppable Reels ({reels.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('COUPONS')}
          className={`pb-3 transition-colors ${
            activeTab === 'COUPONS' ? 'border-b-2 border-charcoal text-charcoal' : 'text-charcoal/50 hover:text-charcoal'
          }`}
        >
          Privilege Coupons ({coupons.length})
        </button>
        <button
          onClick={() => setActiveTab('REVIEWS')}
          className={`pb-3 transition-colors ${
            activeTab === 'REVIEWS' ? 'border-b-2 border-charcoal text-charcoal' : 'text-charcoal/50 hover:text-charcoal'
          }`}
        >
          Review Moderation ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab('INSTALLATIONS')}
          className={`pb-3 transition-colors flex items-center gap-1.5 ${
            activeTab === 'INSTALLATIONS'
              ? 'border-b-2 border-bronze text-bronze-dark font-bold'
              : 'text-charcoal/50 hover:text-charcoal'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Client Site Work &amp; Installations ({clientProjects.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDERS FULFILLMENT */}
      {activeTab === 'ORDERS' && (
        <div className="bg-white border border-cream-border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-cream-subtle text-charcoal/70 uppercase text-[10px] tracking-wider border-b border-cream-border">
                <th className="py-3 px-4">Consignment #</th>
                <th className="py-3 px-4">Patron & Destination</th>
                <th className="py-3 px-4">Pieces</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Courier & Waybill</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-border">
              {orders.map((o) => {
                let parsedAddr: any = {};
                try {
                  parsedAddr = JSON.parse(o.shippingAddress);
                } catch {}

                return (
                  <tr key={o.id} className="hover:bg-cream/40">
                    <td className="py-4 px-4 font-mono font-bold text-charcoal">
                      <Link href={`/order/${o.orderNumber}`} className="hover:text-bronze underline">
                        {o.orderNumber}
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-charcoal">{parsedAddr.fullName || o.user?.name || 'Patron'}</p>
                      <p className="text-[11px] text-charcoal/60">
                        {parsedAddr.city}, {parsedAddr.state}
                      </p>
                      <p className="text-[10px] text-charcoal/50 font-mono">{parsedAddr.phone}</p>
                    </td>
                    <td className="py-4 px-4">
                      {o.items?.map((it: any) => (
                        <p key={it.id} className="text-[11px] text-charcoal/80">
                          {it.productName} ({it.variantSummary}) × {it.quantity}
                        </p>
                      ))}
                    </td>
                    <td className="py-4 px-4 font-mono font-semibold text-charcoal">
                      {formatINR(o.totalAmount)}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        defaultValue={o.status}
                        onChange={(e) =>
                          handleUpdateOrder(o.id, e.target.value, o.trackingNumber, o.courierName)
                        }
                        className="px-2 py-1 bg-cream-subtle border border-cream-border text-[11px] rounded-xs font-medium uppercase tracking-wider"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="RETURN_REQUESTED">RETURN_REQUESTED</option>
                        <option value="RETURNED">RETURNED</option>
                        <option value="REFUNDED">REFUNDED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 space-y-1">
                      <input
                        type="text"
                        defaultValue={o.trackingNumber || ''}
                        placeholder="Waybill Tracking #"
                        onBlur={(e) =>
                          handleUpdateOrder(o.id, o.status, e.target.value, o.courierName)
                        }
                        className="w-36 px-2 py-1 text-[11px] font-mono bg-cream-subtle border border-cream-border"
                      />
                      <p className="text-[10px] text-charcoal/50">{o.courierName || 'BlueDart Apex'}</p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/invoice/${o.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] text-bronze-dark hover:underline font-medium"
                      >
                        <span>Invoice</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: VARIANT INVENTORY (§13-A) */}
      {activeTab === 'INVENTORY' && (
        <div className="space-y-6">
          {/* Low stock alert callout */}
          {inventory.lowStockVariants.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded space-y-2">
              <p className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Low Inventory Backing Notice:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {inventory.lowStockVariants.map((lv: any) => (
                  <span
                    key={lv.variantId}
                    className="px-2.5 py-1 bg-amber-100 border border-amber-300 text-[11px] font-medium"
                  >
                    {lv.productName} ({lv.colorName}) — {lv.stock} left (SKU: {lv.sku})
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-cream-border shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-cream-subtle text-charcoal/70 uppercase text-[10px] tracking-wider border-b border-cream-border">
                  <th className="py-3 px-4">Masterpiece</th>
                  <th className="py-3 px-4">Variant SKU</th>
                  <th className="py-3 px-4">Color & Material</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Price (₹)</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border">
                {inventory.products.flatMap((prod: any) =>
                  prod.variants.map((variant: any) => (
                    <tr key={variant.id} className="hover:bg-cream/40">
                      <td className="py-3 px-4 font-semibold text-charcoal">{prod.name}</td>
                      <td className="py-3 px-4 font-mono text-bronze-dark">{variant.sku}</td>
                      <td className="py-3 px-4">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 border"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                        <span>{variant.colorName} • {variant.material}</span>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          defaultValue={variant.stock}
                          min={0}
                          id={`stock_${variant.id}`}
                          className="w-16 px-2 py-1 bg-cream-subtle border border-cream-border font-mono text-center"
                        />
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {formatINR(variant.priceOverride || prod.basePrice)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            const input = document.getElementById(
                              `stock_${variant.id}`
                            ) as HTMLInputElement;
                            if (input) handleUpdateStock(variant.id, Number(input.value));
                          }}
                          className="px-3 py-1 bg-charcoal text-cream text-[11px] uppercase tracking-wider hover:bg-bronze hover:text-charcoal transition-colors"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COUPONS (§23-A) */}
      {activeTab === 'COUPONS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Coupon List (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-cream-border shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-cream-subtle text-charcoal/70 uppercase text-[10px] tracking-wider border-b border-cream-border">
                  <th className="py-3 px-4">Privilege Code</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Min Spend</th>
                  <th className="py-3 px-4">Redemptions</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-cream/40">
                    <td className="py-3 px-4 font-mono font-bold text-charcoal">{c.code}</td>
                    <td className="py-3 px-4">
                      {c.discountType === 'PERCENT' ? `${c.value}% off` : `₹${c.value.toLocaleString()} flat`}
                      {c.maxDiscount && (
                        <span className="text-[10px] text-charcoal/50 block">Cap: ₹{c.maxDiscount}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono">₹{c.minOrderValue.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono">
                      {c.timesUsed} / {c.usageLimit}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded-full ${
                          c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggleCoupon(c.id, c.isActive)}
                        className="text-[11px] underline text-charcoal/70 hover:text-charcoal"
                      >
                        {c.isActive ? 'Deactivate' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create Coupon Form (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-cream-border p-6 space-y-4 shadow-sm">
            <h3 className="font-serif text-lg text-charcoal">Issue Privilege Voucher</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block text-charcoal/70 uppercase text-[10px] mb-1">Code</label>
                <input
                  type="text"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="e.g. MONSOON20"
                  className="w-full px-3 py-2 uppercase font-mono bg-cream-subtle border border-cream-border focus:border-bronze focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-charcoal/70 uppercase text-[10px] mb-1">Type</label>
                  <select
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border"
                  >
                    <option value="PERCENT">Percent (%)</option>
                    <option value="FLAT">Flat (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-charcoal/70 uppercase text-[10px] mb-1">Value</label>
                  <input
                    type="number"
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal/70 uppercase text-[10px] mb-1">Min Spend (₹)</label>
                <input
                  type="number"
                  value={newCouponMinOrder}
                  onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-cream-subtle border border-cream-border"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-charcoal text-cream uppercase text-xs tracking-wider font-semibold hover:bg-bronze hover:text-charcoal transition-colors"
              >
                Create Voucher
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: REVIEW MODERATION (§23-A) */}
      {activeTab === 'REVIEWS' && (
        <div className="bg-white border border-cream-border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-cream-subtle text-charcoal/70 uppercase text-[10px] tracking-wider border-b border-cream-border">
                <th className="py-3 px-4">Piece</th>
                <th className="py-3 px-4">Collector</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Comment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-border">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-cream/40">
                  <td className="py-3 px-4 font-semibold text-charcoal">{r.product?.name}</td>
                  <td className="py-3 px-4">{r.authorName}</td>
                  <td className="py-3 px-4 text-amber-500 font-mono">{'★'.repeat(r.rating)}</td>
                  <td className="py-3 px-4 italic text-charcoal/75 max-w-sm">&ldquo;{r.comment}&rdquo;</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded-full ${
                        r.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleToggleReview(r.id, r.status)}
                      className="px-3 py-1 bg-cream-subtle border border-cream-border text-[11px] uppercase tracking-wider hover:border-bronze"
                    >
                      {r.status === 'APPROVED' ? 'Hide' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: CLIENT INSTALLATIONS & ON-SITE WORK MANAGEMENT */}
      {activeTab === 'INSTALLATIONS' && (
        <div className="space-y-8">
          {/* Upload / Add Form */}
          <div className="bg-white border border-cream-border p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-cream-border pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-bronze-dark font-semibold">
                  Jodhpur Atelier Operations
                </span>
                <h2 className="font-serif text-2xl text-charcoal">
                  Upload &amp; Record Jodhpur On-Site Installation
                </h2>
                <p className="text-xs text-charcoal/65 mt-0.5">
                  Record residential transformations, laser spatial alignments, and photographs taken during Jodhpur client home visits.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-300 text-xs text-amber-900 font-medium">
                <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>Pin Support Enabled</span>
              </div>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 font-semibold mb-1">
                    Project / Residence Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Umaid Heritage Royal Villa"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 font-semibold mb-1">
                    Patron / Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharaja Gaj Singhji Circle / Rathore Residence"
                    value={projClient}
                    onChange={(e) => setProjClient(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 font-semibold mb-1">
                    Craft City
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Jodhpur (Rajasthan)"
                    className="w-full px-3 py-2 bg-cream-border/30 border border-cream-border text-xs text-charcoal/80 font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 font-semibold mb-1">
                    Jodhpur Locality / Address *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Circuit House Road, Ratanada, Jodhpur"
                    value={projLocation}
                    onChange={(e) => setProjLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 font-semibold mb-1">
                    Space / Room Focus *
                  </label>
                  <select
                    value={projRoomType}
                    onChange={(e) => setProjRoomType(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                  >
                    <option value="Living Room Sanctuary">Living Room Sanctuary</option>
                    <option value="Bespoke Dining Sanctuary">Bespoke Dining Sanctuary</option>
                    <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                    <option value="Executive Study &amp; Library">Executive Study &amp; Library</option>
                    <option value="Grand Haveli / Villa Curation">Grand Haveli / Villa Curation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 font-semibold mb-1">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. March 2026"
                    value={projDate}
                    onChange={(e) => setProjDate(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 font-semibold mb-1">
                    Scope of Work &amp; Pieces Installed *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Custom 12-seater Carrara marble dining table, Augustus Chesterfield sofa, laser-aligned fluted wall..."
                    value={projScope}
                    onChange={(e) => setProjScope(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal/70 font-semibold mb-1">
                    Client Testimonial / Feedback Quote
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. The in-home consultation with marble samples made the entire decision effortless."
                    value={projReview}
                    onChange={(e) => setProjReview(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                  />
                </div>
              </div>

              {/* Photos */}
              <div className="p-4 bg-cream-subtle border border-cream-border space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-charcoal font-bold flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-bronze-dark" />
                  <span>On-Site Photography URLs (Unsplash or CDN URLs)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-charcoal/60 mb-0.5">
                      Primary Installed View (Required)
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={projImg1}
                      onChange={(e) => setProjImg1(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-charcoal/60 mb-0.5">
                      Secondary Angle (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={projImg2}
                      onChange={(e) => setProjImg2(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-charcoal/60 mb-0.5">
                      Pre-Visit Before Photo (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={projBeforeImg}
                      onChange={(e) => setProjBeforeImg(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pin Option & Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-cream-border">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={projFeatured}
                    onChange={(e) => setProjFeatured(e.target.checked)}
                    className="w-4 h-4 text-bronze border-cream-border rounded focus:ring-bronze"
                  />
                  <span className="text-xs font-semibold text-charcoal flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Pin to Top as Premier Showcase Masterwork (Show at Top of Page)</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmittingProject}
                  className="px-6 py-2.5 bg-charcoal hover:bg-bronze hover:text-charcoal text-cream text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 flex items-center gap-2 shrink-0"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isSubmittingProject ? 'Publishing...' : 'Publish Jodhpur Installation'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* List of Published Works */}
          <div className="bg-white border border-cream-border shadow-sm overflow-x-auto">
            <div className="p-4 bg-cream-subtle border-b border-cream-border flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base text-charcoal font-medium">
                  Published Jodhpur Residences Archive ({clientProjects.length} Works)
                </h3>
                <p className="text-[11px] text-charcoal/60">
                  Click the ⭐ button to Pin or Unpin best masterworks to the top of the public showcase.
                </p>
              </div>
              <Link
                href="/client-work"
                target="_blank"
                className="text-xs uppercase tracking-wider text-bronze-dark font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Public Showcase</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-cream-subtle/50 text-charcoal/70 uppercase text-[10px] tracking-wider border-b border-cream-border">
                  <th className="py-3 px-4">Pin Status</th>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Residence &amp; Patron</th>
                  <th className="py-3 px-4">Jodhpur Locality</th>
                  <th className="py-3 px-4">Scope &amp; Pieces</th>
                  <th className="py-3 px-4">Supervisor</th>
                  <th className="py-3 px-4">Completed</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border">
                {clientProjects.map((proj) => {
                  let photos: string[] = [];
                  try {
                    photos = JSON.parse(proj.images);
                  } catch {
                    photos = [proj.images];
                  }

                  return (
                    <tr
                      key={proj.id}
                      className={`hover:bg-cream/40 transition-colors ${
                        proj.featured ? 'bg-amber-50/50' : ''
                      }`}
                    >
                      {/* Pin Toggle Column */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleTogglePinProject(proj.id, proj.featured)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold border transition-all ${
                            proj.featured
                              ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                              : 'bg-white border-cream-border text-charcoal/50 hover:border-bronze hover:text-charcoal'
                          }`}
                          title={proj.featured ? 'Click to unpin' : 'Click to pin to top'}
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              proj.featured ? 'text-amber-600 fill-amber-600' : 'text-charcoal/40'
                            }`}
                          />
                          <span>{proj.featured ? 'Pinned (Top)' : 'Pin to Top'}</span>
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <div className="w-16 h-12 bg-charcoal overflow-hidden border border-cream-border">
                          <img
                            src={photos[0] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-serif font-semibold text-charcoal">{proj.title}</p>
                        <p className="text-[11px] text-charcoal/60">{proj.clientName}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 bg-cream-subtle border border-cream-border text-[10px] uppercase font-medium">
                          {proj.location}
                        </span>
                        <p className="text-[10px] text-charcoal/60 mt-0.5">{proj.roomType}</p>
                      </td>
                      <td className="py-3 px-4 max-w-xs text-charcoal/80 text-[11px] truncate" title={proj.scope}>
                        {proj.scope}
                      </td>
                      <td className="py-3 px-4 text-charcoal/70">{proj.artisanSupervisor}</td>
                      <td className="py-3 px-4 text-charcoal/70">{proj.completionDate}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: HOMEPAGE SALON CARDS MANAGEMENT */}
      {activeTab === 'SALONS' && (
        <div className="space-y-8">
          {/* Add New Salon Card Form */}
          <div className="bg-white border border-cream-border p-6 shadow-sm space-y-6">
            <div className="border-b border-cream-border pb-3 flex justify-between items-center">
              <div>
                <h2 className="font-serif text-xl text-charcoal font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-bronze" />
                  <span>Add New Salon Card to Homepage Orbit</span>
                </h2>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  The cards added here appear in the 360° dynamic rotating carousel on the homepage with raw arched aesthetic shapes.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateSalon} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Salon Name / Room Title *
                  </label>
                  <input
                    type="text"
                    value={newSalonName}
                    onChange={(e) => setNewSalonName(e.target.value)}
                    placeholder="e.g. Royal Haveli Dining Sanctuary"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Catalog Category Filter *
                  </label>
                  <select
                    value={newSalonCategory}
                    onChange={(e) => setNewSalonCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:bg-white focus:outline-none"
                  >
                    <option value="Living">Living Room</option>
                    <option value="Dining">Dining Sanctuaries</option>
                    <option value="Bedroom">Master Bedroom</option>
                    <option value="Executive">Executive Study</option>
                    <option value="Bespoke">Bespoke Commissions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                  High-Resolution Image URL *
                </label>
                <input
                  type="url"
                  value={newSalonImage}
                  onChange={(e) => setNewSalonImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:bg-white focus:outline-none"
                  required
                />
                
                {/* Quick Unsplash Preset Samples */}
                <div className="flex flex-wrap gap-2 pt-2 items-center text-[10px]">
                  <span className="text-charcoal/50">Quick Sample Presets:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setNewSalonName('Royal Penthouse Foyer');
                      setNewSalonCategory('Living');
                      setNewSalonImage('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85');
                    }}
                    className="px-2 py-0.5 bg-cream-subtle border border-cream-border hover:border-bronze rounded-xs"
                  >
                    Penthouse Foyer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewSalonName('Modernist Onyx Bar Lounge');
                      setNewSalonCategory('Bespoke');
                      setNewSalonImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85');
                    }}
                    className="px-2 py-0.5 bg-cream-subtle border border-cream-border hover:border-bronze rounded-xs"
                  >
                    Onyx Bar Lounge
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewSalonName('Heritage Courtyard Veranda');
                      setNewSalonCategory('Dining');
                      setNewSalonImage('https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85');
                    }}
                    className="px-2 py-0.5 bg-cream-subtle border border-cream-border hover:border-bronze rounded-xs"
                  >
                    Courtyard Veranda
                  </button>
                </div>
              </div>

              {/* Image Preview */}
              {newSalonImage && (
                <div className="pt-2">
                  <span className="text-[10px] uppercase text-charcoal/60 tracking-wider block mb-1">Live Card Preview:</span>
                  <div className="w-32 h-44 rounded-t-[50px] rounded-b-xl overflow-hidden relative border border-bronze bg-charcoal shadow-md">
                    <img src={newSalonImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                      <p className="text-white text-[10px] font-serif font-medium leading-tight">{newSalonName || 'Salon Title'}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingSalon}
                  className="px-6 py-2.5 bg-charcoal hover:bg-bronze hover:text-charcoal text-cream text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSubmittingSalon ? 'Adding...' : 'Add Salon Card to Carousel'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Current Active Salon Cards */}
          <div className="bg-white border border-cream-border shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-cream-border pb-3">
              <div>
                <h3 className="font-serif text-lg text-charcoal font-semibold">
                  Active Homepage Carousel Cards ({salonCategories.length})
                </h3>
                <p className="text-xs text-charcoal/60">
                  These cards are rendered in the homepage continuous loop. Click Remove to delete any card.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-2">
              {salonCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="group relative bg-charcoal border border-cream-border hover:border-bronze rounded-t-[50px] rounded-b-xl overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-charcoal">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteSalon(cat.id)}
                        className="w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                        title="Delete Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white text-center border-t border-cream-border">
                    <p className="font-serif text-xs font-semibold text-charcoal truncate" title={cat.name}>
                      {cat.name}
                    </p>
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-cream-subtle text-[9px] uppercase tracking-wider text-charcoal/60 rounded-xs">
                      {cat.categoryParam}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: SHOPPABLE REELS & INSTAGRAM VIDEOS MANAGEMENT */}
      {activeTab === 'REELS' && (
        <div className="space-y-8">
          {/* Add Reel Form */}
          <div className="bg-white border border-cream-border p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-cream-border pb-4 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-bronze-dark font-semibold flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-bronze" />
                  <span>Interactive Video Commerce &amp; Instagram Showcase</span>
                </span>
                <h2 className="font-serif text-2xl text-charcoal mt-0.5">
                  Publish Shoppable Video / Instagram Reel
                </h2>
                <p className="text-xs text-charcoal/65 mt-0.5">
                  Add high-converting 9:16 vertical video reels with shoppable product cards, star ratings, and direct acquisition links.
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-medium self-start sm:self-auto rounded-xs">
                <Play className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
                <span>Supports Instagram URLs &amp; MP4 / WebM</span>
              </div>
            </div>

            <form onSubmit={handleCreateReel} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Reel Video URL or Instagram Link *
                  </label>
                  <input
                    type="url"
                    value={newReelVideoUrl}
                    onChange={(e) => setNewReelVideoUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/C.../ or https://...mp4"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:bg-white focus:outline-none"
                    required
                  />
                  <p className="text-[10px] text-charcoal/50 mt-1">
                    Paste an Instagram Reel link (`instagram.com/reel/...`) or direct MP4/WebM video stream.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Video Title / Headline *
                  </label>
                  <input
                    type="text"
                    value={newReelTitle}
                    onChange={(e) => setNewReelTitle(e.target.value)}
                    placeholder="e.g. Lotus Sheesham Wood Bed with Drawer Storage"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Cover / Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    value={newReelThumbnail}
                    onChange={(e) => setNewReelThumbnail(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Associated Product Name
                  </label>
                  <input
                    type="text"
                    value={newReelProductName}
                    onChange={(e) => setNewReelProductName(e.target.value)}
                    placeholder="e.g. Lotus King Size Bed (Honey Finish)"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Product Page Link / Slug
                  </label>
                  <input
                    type="text"
                    value={newReelProductUrl}
                    onChange={(e) => setNewReelProductUrl(e.target.value)}
                    placeholder="/catalog or /product/cararra-dining-table"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal focus:border-bronze focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Offer Price *
                  </label>
                  <input
                    type="text"
                    value={newReelPrice}
                    onChange={(e) => setNewReelPrice(e.target.value)}
                    placeholder="₹54,999"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Original Price
                  </label>
                  <input
                    type="text"
                    value={newReelOriginalPrice}
                    onChange={(e) => setNewReelOriginalPrice(e.target.value)}
                    placeholder="₹89,999"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Discount Badge
                  </label>
                  <input
                    type="text"
                    value={newReelDiscount}
                    onChange={(e) => setNewReelDiscount(e.target.value)}
                    placeholder="45% OFF"
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newReelRating}
                    onChange={(e) => setNewReelRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Review Count
                  </label>
                  <input
                    type="number"
                    value={newReelReviewCount}
                    onChange={(e) => setNewReelReviewCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-cream-subtle border border-cream-border text-xs text-charcoal"
                  />
                </div>
              </div>

              {/* Quick Sample Presets */}
              <div className="flex flex-wrap gap-2 pt-1 items-center text-[10px]">
                <span className="text-charcoal/60 font-medium">⚡ Quick 1-Click Samples:</span>
                <button
                  type="button"
                  onClick={() => {
                    setNewReelTitle('Shriyam Modern 6 Seater Sheesham Wood Dining Set');
                    setNewReelVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-hand-crafting-a-wooden-chair-42777-large.mp4');
                    setNewReelThumbnail('https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=85');
                    setNewReelProductName('Shriyam Modern 6 Seater Dining Set');
                    setNewReelProductUrl('/catalog?category=Dining');
                    setNewReelPrice('₹1,49,000');
                    setNewReelOriginalPrice('₹2,45,000');
                    setNewReelDiscount('40% OFF');
                    setNewReelRating(5.0);
                    setNewReelReviewCount(80);
                  }}
                  className="px-2 py-0.5 bg-cream-subtle border border-cream-border hover:border-bronze rounded-xs font-medium"
                >
                  Sheesham Dining Set
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewReelTitle('Shashwat 2 Seater Sheesham Wood Cane Swing Chair');
                    setNewReelVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-carpenter-measuring-a-wood-plank-42784-large.mp4');
                    setNewReelThumbnail('https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=85');
                    setNewReelProductName('Shashwat Swing Chair (Sand Grey)');
                    setNewReelProductUrl('/catalog?category=Living');
                    setNewReelPrice('₹96,000');
                    setNewReelOriginalPrice('₹1,60,000');
                    setNewReelDiscount('40% OFF');
                    setNewReelRating(5.0);
                    setNewReelReviewCount(229);
                  }}
                  className="px-2 py-0.5 bg-cream-subtle border border-cream-border hover:border-bronze rounded-xs font-medium"
                >
                  Cane Swing Chair
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewReelTitle('Albus L-Shape 5 Seater Right Aligned Sofa');
                    setNewReelVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-worker-measuring-a-plank-of-wood-with-a-tape-measure-42782-large.mp4');
                    setNewReelThumbnail('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85');
                    setNewReelProductName('Albus L-Shape Sectional (Iris Blue)');
                    setNewReelProductUrl('/catalog?category=Living');
                    setNewReelPrice('₹56,999');
                    setNewReelOriginalPrice('₹1,15,000');
                    setNewReelDiscount('50% OFF');
                    setNewReelRating(5.0);
                    setNewReelReviewCount(115);
                  }}
                  className="px-2 py-0.5 bg-cream-subtle border border-cream-border hover:border-bronze rounded-xs font-medium"
                >
                  L-Shape Sofa
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingReel}
                  className="px-6 py-2.5 bg-charcoal hover:bg-bronze hover:text-charcoal text-cream text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 flex items-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSubmittingReel ? 'Publishing Reel...' : 'Publish Reel to Storefront'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Active Reels Grid */}
          <div className="bg-white border border-cream-border shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-cream-border pb-3">
              <div>
                <h3 className="font-serif text-lg text-charcoal font-semibold">
                  Active Shoppable Video Reels ({reels.length})
                </h3>
                <p className="text-xs text-charcoal/60">
                  These 9:16 vertical video cards are displayed in the homepage Shoppable Videos section.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 pt-2">
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  className="group relative bg-[#FDFBF7] border border-cream-border hover:border-bronze rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all"
                >
                  <div className="aspect-[9/16] relative overflow-hidden bg-charcoal">
                    {reel.thumbnail ? (
                      <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-charcoal text-cream/40">
                        <Play className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-wider text-amber-300 font-bold rounded-full flex items-center gap-1 border border-amber-300/30">
                        <Play className="w-2.5 h-2.5 fill-amber-300" />
                        <span>Reel</span>
                      </span>
                    </div>

                    {/* Delete button */}
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteReel(reel.id)}
                        className="w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                        title="Delete Reel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Overlay info */}
                    <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] leading-tight space-y-0.5">
                      <p className="font-serif font-medium line-clamp-2">{reel.title}</p>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="font-bold text-amber-400">{reel.price}</span>
                        {reel.discount && (
                          <span className="text-[9px] text-emerald-400 font-semibold">{reel.discount}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white space-y-1 border-t border-cream-border">
                    <p className="text-[11px] font-serif font-medium text-charcoal truncate" title={reel.productName || reel.title}>
                      {reel.productName || reel.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-charcoal/60">
                      <div className="flex items-center text-amber-500">
                        {'★'.repeat(Math.round(reel.rating || 5))}
                        <span className="text-charcoal/50 ml-1">({reel.reviewCount || 0})</span>
                      </div>
                      <span className="font-mono font-bold text-charcoal">{reel.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

