// src/components/Teacher/TeacherList.jsx

import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTeachers = async () => {
      let query = supabase
        .from('teachers')
        .select('*');

      // If user is not admin, only show teachers they created
      const { data: adminData } = await supabase
        .from('admins')
        .select('id')
        .eq('email', user.email)
        .single();

      if (!adminData) {
        const { data: teacherData } = await supabase
          .from('teachers')
          .select('id')
          .eq('email', user.email)
          .single();

        if (teacherData) {
          query = query.eq('created_by', teacherData.id);
        }
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching teachers:', error);
      } else {
        setTeachers(data);
      }
      setLoading(false);
    };

    fetchTeachers();
  }, [user]);

  if (loading) return <div>Loading teachers...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="border-t border-gray-700">
              <td className="px-4 py-2">{teacher.name}</td>
              <td className="px-4 py-2">{teacher.email}</td>
              <td className="px-4 py-2">{teacher.phone}</td>
              <td className="px-4 py-2">
                {new Date(teacher.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}