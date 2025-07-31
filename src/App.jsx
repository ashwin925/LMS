import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthProvider } from './context/AuthContext';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import QuizAnalytics from './components/QuizAnalytics';
import './index.css';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900">
        {!session ? (
          <Auth />
        ) : (
          <>
            <Dashboard session={session} />
            <QuizAnalytics />
          </>
        )}
      </div>
    </AuthProvider>
  );
}