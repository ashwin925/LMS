// src/components/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import AdminPage from '../pages/AdminPage';
import TeacherPage from '../pages/TeacherPage';
import StudentPage from '../pages/StudentPage';

export default function Dashboard({ session }) {
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = React.useState('students');

  return (
    <div className="flex h-screen w-[1239px] bg-gray-900 text-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} session={session} />
      
      <main className="flex-1 overflow-y-auto p-4">
        {activeTab === 'admins' && <AdminPage />}
        {activeTab === 'teachers' && <TeacherPage />}
        {activeTab === 'students' && <StudentPage />}
      </main>
    </div>
  );
}