// src/app/auth/callback/page.jsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard');
      }
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Processing authentication...</p>
    </div>
  );
}