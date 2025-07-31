// src/components/Auth.jsx
import { supabase } from '../lib/supabase';
import React from 'react';


export default function Auth() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/auth/callback',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      console.error('Google OAuth error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button 
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center"
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google logo" 
          className="w-5 h-5 mr-2"
        />
        Sign in with Google
      </button>
    </div>
  );
}