import React, { createContext, useContext, useState } from 'react';
import { storage } from '../utils/storage';
import { demoAccounts } from '../data/mockBusiness';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check for saved user; default to demo owner so the dashboard is easily previewed
  const [user, setUser] = useState(() => {
    const saved = storage.get('bookly_user', null);
    if (saved) return saved;
    // Default logged in as demo owner for instant recruiter/portfolio exploration
    return demoAccounts[0];
  });

  const login = async (email, password) => {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Check if matches any demo account
    const foundDemo = demoAccounts.find((acc) => acc.email.toLowerCase() === email.toLowerCase());
    const authenticatedUser = foundDemo || {
      role: 'Business Owner',
      email: email,
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
      title: 'Studio Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    setUser(authenticatedUser);
    storage.set('bookly_user', authenticatedUser);
    return authenticatedUser;
  };

  const demoLogin = (roleIndex = 0) => {
    const selected = demoAccounts[roleIndex] || demoAccounts[0];
    setUser(selected);
    storage.set('bookly_user', selected);
    return selected;
  };

  const signup = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = {
      role: 'Business Owner',
      email: formData.email,
      name: formData.fullName || 'Business Owner',
      businessName: formData.businessName || 'My Studio',
      title: 'Founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    };
    setUser(newUser);
    storage.set('bookly_user', newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    storage.remove('bookly_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        demoLogin,
        signup,
        logout,
        demoAccounts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

