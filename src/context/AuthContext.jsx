// src/context/AuthContext.jsx

import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

// src/context/AuthContext.jsx
const syncUserWithDatabase = async (user) => {
  if (!user) return;
  
  try {
    // Check admin first
    const { data: adminData } = await supabase
      .from('admins')
      .select('id')
      .eq('email', user.email)
      .single();

    if (adminData) {
      setUserRole('admin');
      return;
    }

    // Then check teacher
    const { data: teacherData } = await supabase
      .from('teachers')
      .select('id')
      .eq('email', user.email)
      .single();

    if (teacherData) {
      setUserRole('teacher');
      return;
    }

    // Finally check student
    const { data: studentData } = await supabase
      .from('students')
      .select('id')
      .eq('email', user.email)
      .single();

    setUserRole(studentData ? 'student' : null);
  } catch (err) {
    console.error('Error syncing user role:', err);
    setUserRole(null);
  }
};

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          setUser(session.user);
          await syncUserWithDatabase(session.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error getting session:', err);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await syncUserWithDatabase(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    userRole,
signInWithOAuth: async (provider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: import.meta.env.DEV 
        ? 'http://localhost:5173/auth/callback' 
        : 'https://lms-je3h8lw5k-ashwin-sundars-projects.vercel.app/auth/callback'
    }
  });
  if (error) throw error;
},
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Export the hook properly
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};