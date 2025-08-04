// src/components/Teacher/AddTeacher.jsx

import React from 'react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function AddTeacher() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if current user is admin or teacher
      const { data: adminData } = await supabase
        .from('admins')
        .select('id')
        .eq('email', user.email)
        .single();

      const { data: teacherData } = await supabase
        .from('teachers')
        .select('id')
        .eq('email', user.email)
        .single();

      if (!adminData && !teacherData) {
        throw new Error('Only admins or teachers can add teachers');
      }

      const creatorId = adminData?.id || teacherData?.id;

      const { data, error } = await supabase
        .from('teachers') // or 'students'
        .insert([{
          name,
          email,
          phone,
          created_by: creatorId
        }])
        .select();

      if (error) throw error;

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Teacher</h2>
      {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}
      {success && <div className="mb-4 p-2 bg-green-500 text-white rounded">Teacher added successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Adding...' : 'Add Teacher'}
        </button>
      </form>
    </div>
  );
}