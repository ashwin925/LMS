// src/pages/TeacherPage.jsx

import React from 'react';
;import { useState } from 'react';
import TeacherList from '../components/Teacher/TeacherList';
import AddTeacher from '../components/Teacher/AddTeacher';

export default function StudentPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            {showAddForm ? 'Hide Form' : 'Add New Student'}
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Refresh
          </button>
        </div>
      </div>
      
      {showAddForm && <AddTeacher onSuccess={handleRefresh} />}
      <div className="mt-8">
        <TeacherList key={refreshKey} />
      </div>
    </div>
  );
}