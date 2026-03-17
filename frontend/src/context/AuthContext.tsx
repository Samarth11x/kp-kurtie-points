'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { API_BASE, fetchJson } from '@/lib/api';

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type AuthContextValue = {
  user: UserInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserInfo>;
  register: (name: string, email: string, password: string) => Promise<UserInfo>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_INFO_KEY = 'kp_kurtie_point_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(USER_INFO_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(USER_INFO_KEY);
      }
    }
    setLoading(false);
  }, []);

  const updateUser = (userInfo: UserInfo | null) => {
    setUser(userInfo);
    if (userInfo) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    } else {
      localStorage.removeItem(USER_INFO_KEY);
    }
  };

  const login = async (email: string, password: string) => {
    const data = await fetchJson(`${API_BASE}/api/users/auth`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    updateUser(data);
    return data;
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await fetchJson(`${API_BASE}/api/users`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    updateUser(data);
    return data;
  };

  const logout = async () => {
    try {
      await fetchJson(`${API_BASE}/api/users/logout`, { method: 'POST' });
    } catch {
      // Ignore errors during logout
    }
    updateUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
