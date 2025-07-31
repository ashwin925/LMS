// src/app/dashboard/quizzes/page.jsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { fetchTeacherQuizzes } from '../../../lib/api/quizzes';

export default function QuizAnalyticsPage() {
  const { user } = useAuth();
  
  const { data: quizData, isLoading } = useQuery({
    queryKey: ['teacher-quizzes', user?.id],
    queryFn: () => fetchTeacherQuizzes(user?.id),
    enabled: !!user?.id
  });



  // Calculate aggregated stats
  const stats = calculateQuizStats(quizData || []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Student Quiz Analytics</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Quizzes Taken" 
          value={stats.totalQuizzes} 
          icon={<BarChart2 className="h-6 w-6" />}
        />
        {/* Other stat cards... */}
      </div>
      
      {/* Quiz Sessions Table */}
      <QuizTable data={quizData || []} />
    </div>
  );
}

// Helper function to calculate stats
function calculateQuizStats(sessions) {
  // Similar to your SCB implementation but aggregated for all students
}