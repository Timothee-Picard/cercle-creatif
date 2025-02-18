'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => listener?.subscription.unsubscribe();
  }, []);

  const loginWithEmail = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const loginWithOAuth = async (provider) => {
    return await supabase.auth.signInWithOAuth({ provider });
  };

  const signUp = async (email, password) => {
    return await supabase.auth.signUp({ email, password });
  };

  const logout = async () => {
    return await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, loginWithEmail, loginWithOAuth, signUp, logout }}
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
