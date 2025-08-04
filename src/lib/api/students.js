// // src/lib/api/students.js
// import { supabase } from '../supabase';

// export const fetchTeacherStudents = async (teacherId) => {
//   const { data, error } = await supabase
//     .from('teacher_student_relationships')
//     .select(`
//       student:student_id(
//         id,
//         name,
//         email,
//         created_at,
//         quiz_sessions(
//           id,
//           created_at,
//           score
//         )
//       )
//     `)
//     .eq('teacher_id', teacherId);

//   if (error) throw error;
//   return data.map(item => item.student);
// };