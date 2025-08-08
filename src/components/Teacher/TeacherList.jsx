// src/components/Teacher/TeacherList.jsx

import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import ConfirmationDialog from '../ui/ConfirmationDialog';


export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userRole } = useAuth();
  const [deleteId, setDeleteId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchTeachers = async () => {
    if (!user || !user.email) {
      setLoading(false);
      return;
    }
    let query = supabase
      .from('teachers')
      .select('*');

    // If user is not admin, only show teachers they created
    let adminData = null;
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id')
        .eq('email', user.email)
        .single();
      if (!error) adminData = data;
    } catch (err) {
      adminData = null;
    }

    if (!adminData) {
      let teacherData = null;
      try {
        const { data, error } = await supabase
          .from('teachers')
          .select('id')
          .eq('email', user.email)
          .single();
        if (!error) teacherData = data;
      } catch (err) {
        teacherData = null;
      }
      if (teacherData) {
        query = query.eq('created_by', teacherData.id);
      }
    }

    try {
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching teachers:', error);
      } else {
        setTeachers(data);
      }
    } catch (err) {
      console.error('Error fetching teachers:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDeleteClick = (teacherId) => {
    if (userRole !== 'admin') return;
    setDeleteId(teacherId);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (userRole !== 'admin') return;
    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;
      setTeachers(teachers.filter(t => t.id !== deleteId));
      setIsDialogOpen(false);
      setDeleteId(null);
      fetchTeachers();
    } catch (err) {
      alert('Error deleting teacher: ' + err.message);
      setIsDialogOpen(false);
      setDeleteId(null);
    }
  };

  // Remove duplicate useEffect and fetchTeachers2

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
            {userRole === 'admin' && <th className="px-4 py-2">Actions</th>}
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
              {userRole === 'admin' && (
                <td className="px-4 py-2">
                  <button 
                    onClick={() => handleDeleteClick(teacher.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Teacher"
        message="Are you sure you want to delete this teacher? This action cannot be undone."
      />
    </div>
  );
}