// src/hooks/useUsers.js

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async (adminData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admins')
        .insert([adminData])
        .select();

      if (error) throw error;
      setAdmins([data[0], ...admins]);
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { admins, loading, error, fetchAdmins, addAdmin };
}

// Similar hooks for teachers and students...