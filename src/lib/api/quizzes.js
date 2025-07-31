// src/lib/api/quizzes.js
import { supabase } from '../supabase';

export const fetchTeacherQuizzes = async (teacherId) => {
  // First get all student IDs for this teacher
  const { data: studentData, error: studentError } = await supabase
    .from('teacher_student_relationships')
    .select('student_id')
    .eq('teacher_id', teacherId);

  if (studentError) throw studentError;
  
  const studentIds = studentData.map(item => item.student_id);
  
  if (studentIds.length === 0) return [];

  // Then get all quizzes for these students
  const { data: quizData, error: quizError } = await supabase
    .from('quiz_sessions')
    .select(`
      id,
      created_at,
      domain_id,
      difficulty,
      score,
      completed,
      user_id,
      user:user_id(name, email),
      questions:quiz_questions(count),
      responses:quiz_responses(
        is_correct,
        response_time
      )
    `)
    .in('user_id', studentIds)
    .order('created_at', { ascending: false });

  if (quizError) throw quizError;
  
  return quizData || [];
};