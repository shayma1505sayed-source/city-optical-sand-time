import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, Address } from '../types';

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  login: (emailOrPhone: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updated: Partial<UserAccount>) => void;
  saveAddress: (address: Omit<Address, 'id'>) => void;
  setDefaultAddress: (addressId: string) => void;
}

const STORAGE_KEY = 'cot_luxury_user_account';
const DISMISSED_KEY = 'cot_auth_onboarding_dismissed';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  // Load from localStorage on mount & prompt onboarding if first visit
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // App opening requirement: "when opening app ask email, phone no, name etc"
        const dismissed = sessionStorage.getItem(DISMISSED_KEY);
        if (!dismissed) {
          // Open onboarding auth modal automatically on app opening
          const timer = setTimeout(() => {
            setIsAuthModalOpen(true);
            setAuthMode('signup');
          }, 800);
          return () => clearTimeout(timer);
        }
      }
    } catch (e) {
      console.error('Error restoring session', e);
    }
  }, []);

  const saveUserToState = (account: UserAccount) => {
    setUser(account);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    sessionStorage.setItem(DISMISSED_KEY, 'true');
  };

  const register = async (name: string, email: string, phone: string, _pass: string) => {
    // Generate unique membership token
    const newAccount: UserAccount = {
      id: 'usr_' + Date.now().toString(36),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      membershipId: 'COT-' + Math.floor(100000 + Math.random() * 900000),
      memberTier: 'Privileged Horology & Optometry Member',
      createdAt: new Date().toISOString(),
      addresses: [
        {
          id: 'addr_' + Date.now(),
          fullName: name.trim(),
          phone: phone.trim(),
          streetAddress: '42 Regent Boulevard, Suite 501',
          landmark: 'Opposite Heritage Clocktower',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
          isDefault: true,
        },
      ],
    };

    saveUserToState(newAccount);
    setIsAuthModalOpen(false);
    sessionStorage.setItem(DISMISSED_KEY, 'true');
    return { success: true };
  };

  const login = async (emailOrPhone: string, _pass: string) => {
    // Try to restore or match existing, else create session
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: UserAccount = JSON.parse(stored);
      if (
        parsed.email.toLowerCase() === emailOrPhone.toLowerCase() ||
        parsed.phone.includes(emailOrPhone)
      ) {
        setUser(parsed);
        setIsAuthModalOpen(false);
        return { success: true };
      }
    }

    // Default friendly login handler if not matched
    const isEmail = emailOrPhone.includes('@');
    const existingName = isEmail ? emailOrPhone.split('@')[0] : 'Valued Patron';
    const fallbackAccount: UserAccount = {
      id: 'usr_' + Date.now().toString(36),
      name: existingName.charAt(0).toUpperCase() + existingName.slice(1),
      email: isEmail ? emailOrPhone.toLowerCase() : `${emailOrPhone}@client.cityoptical.in`,
      phone: !isEmail ? emailOrPhone : '+91 98200 44521',
      membershipId: 'COT-' + Math.floor(100000 + Math.random() * 900000),
      memberTier: 'Gold Patron Member',
      createdAt: new Date().toISOString(),
      addresses: [],
    };

    saveUserToState(fallbackAccount);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (updated: Partial<UserAccount>) => {
    if (!user) return;
    const next = { ...user, ...updated };
    saveUserToState(next);
  };

  const saveAddress = (addr: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...addr,
      id: 'addr_' + Date.now(),
    };
    const updated = {
      ...user,
      addresses: [...user.addresses, newAddress],
    };
    saveUserToState(updated);
  };

  const setDefaultAddress = (addressId: string) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      })),
    };
    saveUserToState(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        saveAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
