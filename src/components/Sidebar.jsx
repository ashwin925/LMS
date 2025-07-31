// src/components/Sidebar.jsx
import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, session }) {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-gray-800 border-r border-gray-700">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-white">Teacher Dashboard</h1>
          </div>
          <div className="px-4 py-4 border-b border-gray-700">
            <div className="text-sm font-medium text-gray-300">
              {session.user.email}
            </div>
          </div>
          <nav className="flex-1 mt-5 space-y-1 px-2">
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                activeTab === 'quizzes' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Quiz Analytics
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                activeTab === 'students' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              My Students
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}