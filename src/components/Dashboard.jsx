// src/components/Dashboard.jsx

import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import QuizAnalytics from './QuizAnalytics';
import Students from './Students';

export default function Dashboard({ session }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('quizzes');

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} session={session} />
      
      <main className="flex-1 overflow-hidden">
        {activeTab === 'quizzes' && <QuizAnalytics user={user} />}
        {activeTab === 'students' && <Students />}
      </main>
    </div>
  );
}