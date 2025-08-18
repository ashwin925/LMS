// src/components/Leaderboard.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('scb_users')
          .select('user_id, user_email, name, credits')
          .order('credits', { ascending: false })
          .limit(100);

        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="p-4 text-white">Loading leaderboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-white">Rank</th>
              <th className="px-4 py-3 text-left text-white">User</th>
              <th className="px-4 py-3 text-left text-white">Credits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((userData, index) => (
              <tr 
                key={userData.user_id} 
                className={`${user?.id === userData.user_id ? 'bg-blue-900 bg-opacity-30' : ''}`}
              >
                <td className="px-4 py-3 text-white">#{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {userData.name || userData.user_email}
                      </div>
                      <div className="text-sm text-gray-400">
                        {userData.user_email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-white">{userData.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}