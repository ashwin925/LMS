// src/components/auth/AuthButton.jsx
import { useAuth } from '../../context/AuthContext';

export const AuthButton = () => {
  const { signInWithOAuth, signOut, user } = useAuth();

  return user ? (
    <button
      onClick={signOut}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Sign Out
    </button>
  ) : (
    <button
      onClick={() => signInWithOAuth('google')}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Google icon SVG */}
      </svg>
      Sign in with Google
    </button>
  );
};