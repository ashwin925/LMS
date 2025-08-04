// src/App.js
import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthProvider } from './context/AuthContext';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './index.css';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900">
        {!session ? (
          <Auth />
        ) : (
          <Dashboard session={session} />
        )}
      </div>
    </AuthProvider>
  );
}