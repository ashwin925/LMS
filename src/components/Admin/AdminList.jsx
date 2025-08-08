// src/components/Admin/AdminList.jsx

import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import ConfirmationDialog from '../ui/ConfirmationDialog';


export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admins:', error);
      } else {
        setAdmins(data);
      }
      setLoading(false);
    };

    fetchAdmins();
  }, []);

  if (loading) return <div>Loading admins...</div>;


return (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-gray-800 text-white">
      <thead className="hidden md:table-header-group">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Phone</th>
          <th className="px-4 py-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((admin) => (
          <tr key={admin.id} className="border-t border-gray-700 block md:table-row">
            <td className="block md:table-cell px-4 py-2" data-label="Name">
              <span className="md:hidden font-bold mr-2">Name:</span>
              {admin.name}
            </td>
            <td className="block md:table-cell px-4 py-2" data-label="Email">
              <span className="md:hidden font-bold mr-2">Email:</span>
              {admin.email}
            </td>
            <td className="block md:table-cell px-4 py-2" data-label="Phone">
              <span className="md:hidden font-bold mr-2">Phone:</span>
              {admin.phone}
            </td>
            <td className="block md:table-cell px-4 py-2" data-label="Created At">
              <span className="md:hidden font-bold mr-2">Created At:</span>
              {new Date(admin.created_at).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}