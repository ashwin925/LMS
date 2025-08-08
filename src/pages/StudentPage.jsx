// src/pages/StudentPage.jsx


import TeacherList from '../components/Teacher/TeacherList';
import StudentList from '../components/Student/StudentList';
import { useState } from 'react';



export default function StudentPage() {
  const [activeTab, setActiveTab] = useState('teachers');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <div className="flex border-b border-gray-700 mb-6">
        {['teachers', 'students'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'teachers' ? <TeacherList /> : <StudentList />}
    </div>
  );
}