// src/pages/TeacherPage.jsx


import { useState } from 'react';
import TeacherList from '../components/Teacher/TeacherList';
import StudentList from '../components/Student/StudentList';
import AddStudent from '../components/Student/AddStudent';

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState('teachers');
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        {activeTab === 'students' && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            {showAddForm ? 'Hide Form' : 'Add Student'}
          </button>
        )}
      </div>

      <div className="flex border-b border-gray-700 mb-6">
        {['teachers', 'students'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowAddForm(false);
            }}
            className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'teachers' ? (
        <TeacherList />
      ) : (
        <>
          {showAddForm && <AddStudent />}
          <StudentList />
        </>
      )}
    </div>
  );
}