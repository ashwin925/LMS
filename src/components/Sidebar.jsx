// src/components/Sidebar.jsx

import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Sidebar({ activeTab, setActiveTab, session }) {
  const { user } = useAuth();
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
      <div className="flex flex-col w-64 bg-gray-800 border-r border-gray-700">
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
                <button
                  onClick={() => setActiveTab('admins')}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'admins' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Admins
                </button>
                <button
                  onClick={() => setActiveTab('teachers')}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'teachers' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Teachers
                </button>
              </>
            )}
            
            {(userRole === 'admin' || userRole === 'teacher') && (
              <button
                onClick={() => setActiveTab('students')}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === 'students' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Students
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}