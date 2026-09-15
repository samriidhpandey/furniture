'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { X, Phone, Mail, Shield, CheckCircle2, ArrowRight, Lock, KeyRound, User, LogOut, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, title = 'Atelier Patron Access', onSuccess }: AuthModalProps) {
  const { user, loginAsUser, loginAsAdmin, loginWithGoogle, sendPhoneOtp, verifyPhoneOtp, setQuickDemoUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'EMAIL_NAME' | 'PHONE_OTP' | 'ADMIN_LOGIN' | 'CHOICE'>('CHOICE');
  
  // Custom user form state
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  
  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState('+91 98111 22334');
  const [otpCode, setOtpCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [step, setStep] = useState<'SEND_OTP' | 'VERIFY_OTP'>('SEND_OTP');
  const [simulatedOtpNotice, setSimulatedOtpNotice] = useState<string | null>(null);

  // Admin Login state
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // 1. Custom User Sign In / Register
  const handleCustomUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail && !customPhone) {
      setErrorMessage('Please provide an email or phone number');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await loginAsUser(customName, customEmail || undefined, customPhone || undefined);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e: any) {
      setErrorMessage(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // 2. Admin ID + Password Login
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId || !adminPassword) {
      setErrorMessage('Both Admin ID and Password are required');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await loginAsAdmin(adminId, adminPassword);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e: any) {
      setErrorMessage(e.message || 'Invalid Admin ID or Password');
    } finally {
      setLoading(false);
    }
  };

  // 3. Phone OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 8) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await sendPhoneOtp(phoneNumber);
      if (res.demoOtp) {
        setSimulatedOtpNotice(res.demoOtp);
        setOtpCode(res.demoOtp);
      }
      setStep('VERIFY_OTP');
    } catch (e: any) {
      setErrorMessage(e.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the verification code');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await verifyPhoneOtp(phoneNumber, otpCode, fullName || undefined);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e: any) {
      setErrorMessage(e.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: 'VIP_CUSTOMER' | 'ADMIN' | 'REGULAR_CLIENT') => {
    setLoading(true);
    setErrorMessage('');
    try {
      await setQuickDemoUser(role);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e: any) {
      setErrorMessage(e.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream w-full max-w-md border border-cream-border shadow-2xl rounded-xs p-6 md:p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-charcoal/60 hover:text-charcoal transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] tracking-[0.25em] uppercase text-bronze font-semibold">
            Private Atelier Gateway
          </span>
          <h2 className="text-2xl font-serif mt-1 text-charcoal">{title}</h2>
          <p className="text-xs text-charcoal/70 mt-1">
            Access your curated bespoke orders, saved residences, and privilege rates.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
            {errorMessage}
          </div>
        )}

        {/* If user is already logged in */}
        {user ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-bronze/15 text-bronze-dark rounded-full flex items-center justify-center mx-auto border border-bronze/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="font-serif text-xl text-charcoal">{user.name}</p>
              <p className="text-xs text-charcoal/70 mt-0.5">{user.email || user.phone}</p>
              <span className={`inline-block mt-2 px-3 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                user.role === 'ADMIN' ? 'bg-bronze text-charcoal' : 'bg-charcoal text-cream'
              }`}>
                Active Role: {user.role}
              </span>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => logout()}
                className="px-4 py-2.5 border border-charcoal text-charcoal text-xs uppercase tracking-wider hover:bg-charcoal hover:text-cream transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-bronze text-charcoal font-semibold text-xs uppercase tracking-wider hover:bg-bronze-dark transition-colors"
              >
                Continue to Atelier
              </button>
            </div>
          </div>
        ) : activeTab === 'CHOICE' ? (
          <div className="space-y-3">
            {/* 1. Custom User Name & Email Sign In */}
            <button
              onClick={() => setActiveTab('EMAIL_NAME')}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-charcoal text-cream hover:bg-charcoal-light transition-all text-xs uppercase tracking-wider font-medium shadow-xs"
            >
              <User className="w-4 h-4 text-bronze" />
              <span>Sign In / Create Patron Account</span>
            </button>

            {/* 2. Phone OTP Login */}
            <button
              onClick={() => setActiveTab('PHONE_OTP')}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-cream-border text-charcoal hover:border-bronze hover:shadow-xs transition-all text-xs uppercase tracking-wider font-medium"
            >
              <Phone className="w-4 h-4 text-bronze" />
              <span>Sign In with Mobile (SMS OTP)</span>
            </button>

            {/* 3. Direct Admin Portal Login */}
            <button
              onClick={() => setActiveTab('ADMIN_LOGIN')}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-cream-subtle border border-cream-border text-charcoal/80 hover:text-charcoal hover:border-charcoal transition-all text-xs uppercase tracking-wider font-medium"
            >
              <Lock className="w-3.5 h-3.5 text-charcoal" />
              <span>Atelier Admin Login (ID & Password)</span>
            </button>

            {/* Quick Demo Profiles */}
            <div className="pt-4 mt-4 border-t border-cream-border">
              <p className="text-[10px] text-center uppercase tracking-widest text-charcoal/60 mb-2 font-medium">
                — Quick Multi-User Demo Profiles —
              </p>
              <div className="grid grid-cols-3 gap-2 text-left">
                <button
                  onClick={() => handleQuickDemo('REGULAR_CLIENT')}
                  disabled={loading}
                  className="p-2 bg-cream-subtle border border-cream-border hover:border-bronze rounded-xs transition-all text-left"
                >
                  <p className="text-[11px] font-semibold text-charcoal leading-tight">Priya Sharma</p>
                  <p className="text-[9px] text-charcoal/60">New Patron</p>
                </button>
                <button
                  onClick={() => handleQuickDemo('VIP_CUSTOMER')}
                  disabled={loading}
                  className="p-2 bg-cream-subtle border border-cream-border hover:border-bronze rounded-xs transition-all text-left"
                >
                  <p className="text-[11px] font-semibold text-charcoal leading-tight">Vikramaditya</p>
                  <p className="text-[9px] text-charcoal/60">VIP Collector</p>
                </button>
                <button
                  onClick={() => handleQuickDemo('ADMIN')}
                  disabled={loading}
                  className="p-2 bg-charcoal text-cream hover:bg-bronze hover:text-charcoal rounded-xs transition-all text-left"
                >
                  <p className="text-[11px] font-semibold leading-tight">Admin Director</p>
                  <p className="text-[9px] opacity-75">Full /admin</p>
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'EMAIL_NAME' ? (
          /* Custom User Sign In / Register Form */
          <form onSubmit={handleCustomUserSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 bg-white border border-cream-border text-sm text-charcoal focus:border-bronze focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="e.g. rahul.sharma@example.com"
                className="w-full px-3 py-2 bg-white border border-cream-border text-sm text-charcoal focus:border-bronze focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                value={customPhone}
                onChange={(e) => setCustomPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 bg-white border border-cream-border text-sm text-charcoal focus:border-bronze focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-charcoal text-cream text-xs uppercase tracking-widest font-semibold hover:bg-bronze hover:text-charcoal transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Entering Atelier...' : 'Sign In as Patron'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('CHOICE')}
              className="w-full text-center text-xs text-charcoal/70 hover:text-charcoal hover:underline pt-1"
            >
              ← Back to Sign In Methods
            </button>
          </form>
        ) : activeTab === 'ADMIN_LOGIN' ? (
          /* Admin ID & Password Modal Tab */
          <form onSubmit={handleAdminSubmit} className="space-y-3.5">
            <div className="p-3 bg-cream-subtle border border-cream-border text-[11px] text-charcoal/80 space-y-1">
              <p className="font-semibold text-charcoal flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-bronze-dark" />
                <span>Atelier Executive Control Access</span>
              </p>
              <p className="text-[10px] text-charcoal/70">
                Demo Admin: <code className="bg-white px-1 py-0.5 border border-cream-border font-bold">admin@a1furniture.com</code> | Pass: <code className="bg-white px-1 py-0.5 border border-cream-border font-bold">admin123</code>
              </p>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                Admin ID / Email
              </label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="admin@a1furniture.com"
                className="w-full px-3 py-2 bg-white border border-cream-border text-sm text-charcoal focus:border-bronze focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showAdminPass ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-white border border-cream-border text-sm text-charcoal focus:border-bronze focus:outline-none pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPass(!showAdminPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal"
                >
                  {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-charcoal text-cream text-xs uppercase tracking-widest font-semibold hover:bg-bronze hover:text-charcoal transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In as Atelier Admin'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('CHOICE')}
              className="w-full text-center text-xs text-charcoal/70 hover:text-charcoal hover:underline pt-1"
            >
              ← Back to Sign In Methods
            </button>
          </form>
        ) : (
          /* Phone OTP Flow */
          <div className="space-y-4">
            {step === 'SEND_OTP' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal mb-1">
                    Mobile Number (India)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98111 22334"
                    className="w-full px-3 py-2.5 bg-white border border-cream-border text-sm text-charcoal focus:border-bronze focus:outline-none"
                    required
                  />
                  <p className="text-[10px] text-charcoal/60 mt-1">
                    We will send a confidential 6-digit one-time verification passcode.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-charcoal text-cream text-xs uppercase tracking-widest hover:bg-charcoal-light transition-all flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Transmitting Code...' : 'Send Verification Code'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-bronze" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('CHOICE')}
                  className="w-full text-center text-xs text-charcoal/70 hover:text-charcoal underline"
                >
                  Back to Sign In Options
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {simulatedOtpNotice && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded flex items-center justify-between">
                    <span>Demo SMS code: <strong>{simulatedOtpNotice}</strong></span>
                    <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded">Simulated</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal mb-1">
                    Enter 6-Digit Passcode sent to {phoneNumber}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full text-center tracking-[0.5em] text-lg font-mono px-3 py-2.5 bg-white border border-cream-border text-charcoal focus:border-bronze focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal mb-1">
                    Your Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 bg-white border border-cream-border text-xs text-charcoal focus:border-bronze focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-bronze text-charcoal font-semibold text-xs uppercase tracking-widest hover:bg-bronze-dark transition-all"
                >
                  {loading ? 'Verifying...' : 'Verify & Enter'}
                </button>

                <div className="flex justify-between text-xs text-charcoal/70">
                  <button type="button" onClick={() => setStep('SEND_OTP')} className="hover:underline">
                    Edit Number
                  </button>
                  <button type="button" onClick={handleSendOtp} className="hover:underline text-bronze">
                    Resend Code
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-cream-border text-center">
          <p className="text-[10px] text-charcoal/60 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-bronze" />
            <span>256-bit encrypted • Atelier Patron Confidentiality</span>
          </p>
        </div>
      </div>
    </div>
  );
}
