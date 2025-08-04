// src/components/Student/StudentList.jsx

import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return; // Add this check

    const fetchStudents = async () => {
      try {
        let query = supabase
          .from('students')
          .select('*');

        // First check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('id')
          .eq('email', user.email)
          .single();

        if (!adminError && adminData) {
          // Admin can see all students
          const { data, error } = await query.order('created_at', { ascending: false });
          if (error) throw error;
          setStudents(data);
        } else {
          // Check if user is teacher
          const { data: teacherData, error: teacherError } = await supabase
            .from('teachers')
            .select('id')
            .eq('email', user.email)
            .single();

          if (!teacherError && teacherData) {
            // Teacher can only see their students
            const { data, error } = await query
              .eq('created_by', teacherData.id)
              .order('created_at', { ascending: false });
            if (error) throw error;
            setStudents(data);
          }
        }
      } catch (err) {
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [user]);

  if (loading) return <div>Loading students...</div>;

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
          {students.map((student) => (
            <tr key={student.id} className="border-t border-gray-700">
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.email}</td>
              <td className="px-4 py-2">{student.phone}</td>
              <td className="px-4 py-2">
                {new Date(student.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}