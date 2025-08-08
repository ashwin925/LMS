
// src/pages/AdminPage.jsx
import { useState } from 'react';
import AdminList from '../components/Admin/AdminList';
import AddAdmin from '../components/Admin/AddAdmin';
import TeacherList from '../components/Teacher/TeacherList';
import AddTeacher from '../components/Teacher/AddTeacher';
import StudentList from '../components/Student/StudentList';
import AddStudent from '../components/Student/AddStudent';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('admins');
  const [showAddForm, setShowAddForm] = useState(false);
  

  const renderContent = () => {
    switch (activeTab) {
      case 'admins':
        return (
          <>
            {showAddForm && <AddAdmin />}
            <AdminList />
          </>
        );
      case 'teachers':
        return (
          <>
            {showAddForm && <AddTeacher />}
            <TeacherList />
          </>
        );
      case 'students':
        return (
          <>
            {showAddForm && <AddStudent />}
            <StudentList />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          {showAddForm ? 'Hide Form' : `Add ${activeTab.slice(0, -1)}`}
        </button>
      </div>

      <div className="flex border-b border-gray-700 mb-6">
        {['admins', 'teachers', 'students'].map((tab) => (
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

      {renderContent()}
    </div>
  );
}