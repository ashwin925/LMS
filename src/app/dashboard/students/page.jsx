// src/app/dashboard/students/page.jsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { StudentTable } from '../../../components/dashboard/students';
import { fetchTeacherStudents } from '../../../lib/api/students';

export default function StudentsPage() {
  const { user } = useAuth();
  
  const { data: students, isLoading } = useQuery({
    queryKey: ['teacher-students', user?.id],
    queryFn: () => fetchTeacherStudents(user?.id),
    enabled: !!user?.id
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
      <StudentTable students={students || []} />
    </div>
  );
}