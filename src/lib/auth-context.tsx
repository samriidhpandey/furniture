'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  defaultAddress?: {
    id: string;
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  loginAsUser: (name: string, email?: string, phone?: string) => Promise<UserProfile>;
  loginAsAdmin: (adminId: string, password: string) => Promise<UserProfile>;
  loginWithGoogle: (email?: string, name?: string) => Promise<UserProfile>;
  sendPhoneOtp: (phone: string) => Promise<{ success: boolean; message: string; demoOtp?: string }>;
  verifyPhoneOtp: (phone: string, otp: string, name?: string) => Promise<UserProfile>;
  logout: () => void;
  switchUserRole: (role: 'CUSTOMER' | 'ADMIN') => void;
  setQuickDemoUser: (type: 'VIP_CUSTOMER' | 'ADMIN' | 'REGULAR_CLIENT') => Promise<UserProfile>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage only if the user previously logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem('a1_user_session');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Start as guest (not logged in) so multiple real users can sign in with their own details
        setUser(null);
      }
    } catch (e) {
      console.error('Session load error', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('a1_user_session', JSON.stringify(u));
    } else {
      localStorage.removeItem('a1_user_session');
    }
  };

  // Sign in / Sign up any user with custom name, email, or phone
  const loginAsUser = async (name: string, email?: string, phone?: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    saveUser(data.user);
    return data.user;
  };

  // Admin login strictly with Admin ID & Password
  const loginAsAdmin = async (adminId: string, password: string) => {
    const res = await fetch('/api/auth/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid Admin Credentials');
    saveUser(data.user);
    return data.user;
  };

  const loginWithGoogle = async (email = 'patron@atelier.in', name = 'Guest Patron') => {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Google login failed');
    saveUser(data.user);
    return data.user;
  };

  const sendPhoneOtp = async (phone: string) => {
    const res = await fetch('/api/auth/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, action: 'SEND' }),
    });
    return await res.json();
  };

  const verifyPhoneOtp = async (phone: string, otp: string, name?: string) => {
    const res = await fetch('/api/auth/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp, action: 'VERIFY', name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Verification failed');
    saveUser(data.user);
    return data.user;
  };

  const logout = () => {
    saveUser(null);
  };

  const switchUserRole = (role: 'CUSTOMER' | 'ADMIN') => {
    if (user) {
      const updated: UserProfile = { ...user, role };
      saveUser(updated);
    }
  };

  const setQuickDemoUser = async (type: 'VIP_CUSTOMER' | 'ADMIN' | 'REGULAR_CLIENT') => {
    if (type === 'VIP_CUSTOMER') {
      return await loginAsUser('Vikramaditya Singhania', 'vikram.singhania@heritage.in', '+91 98200 12345');
    } else if (type === 'REGULAR_CLIENT') {
      return await loginAsUser('Priya Sharma', 'priya.sharma@design.co', '+91 98111 22334');
    } else {
      return await loginAsAdmin('admin@a1furniture.com', 'admin123');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginAsUser,
        loginAsAdmin,
        loginWithGoogle,
        sendPhoneOtp,
        verifyPhoneOtp,
        logout,
        switchUserRole,
        setQuickDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
