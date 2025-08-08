// src/components/Sidebar.jsx

import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Sidebar({ activeTab, setActiveTab, session }) {
  const { user, signOut } = useAuth();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const determineUserRole = async () => {
      // Check if user is admin
      const { data: adminData } = await supabase
        .from('admins')
        .select('id')
        .eq('email', user.email)
        .single();

      if (adminData) {
        setUserRole('admin');
        return;
      }

      // Check if user is teacher
      const { data: teacherData } = await supabase
        .from('teachers')
        .select('id')
        .eq('email', user.email)
        .single();

      if (teacherData) {
        setUserRole('teacher');
        return;
      }

      // Otherwise, it's a student
      setUserRole('student');
    };

    if (user) {
      determineUserRole();
    }
  }, [user]);



  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-84 bg-gray-800 border-r border-gray-700">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-white">
              {userRole === 'admin' ? 'Admin' : userRole === 'teacher' ? 'Teacher' : 'Student'} Dashboard
            </h1>
          </div>
          <div className="px-4 py-4 border-b border-gray-700">
            <div className="text-sm font-medium text-gray-300">
              {session.user.email}
            </div>
          </div>
          <nav className="flex-1 mt-5 space-y-1 px-2">
          {userRole === 'admin' && (
            <>
              <button onClick={() => setActiveTab('admins')} className={`...`}>
                Admins
              </button>
              <button onClick={() => setActiveTab('teachers')} className={`...`}>
                Teacher
              </button>
              <button onClick={() => setActiveTab('students')} className={`...`}>
                Students
              </button>
            </>
          )}
          {userRole === 'teacher' && (
            <>
              <button onClick={() => setActiveTab('teachers')} className={`...`}>
                Teachers
              </button>
              <button onClick={() => setActiveTab('students')} className={`...`}>
                Students
              </button>
            </>
          )}
          {userRole === 'student' && (
            <>
              <button onClick={() => setActiveTab('teachers')} className={`...`}>
                Teachers
              </button>
              <button onClick={() => setActiveTab('students')} className={`...`}>
                Students
              </button>
            </>
          )}
        </nav>
        <div className="mt-auto p-4 border-t border-gray-700">
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
        </div>
      </div>
    </div>
  );
}