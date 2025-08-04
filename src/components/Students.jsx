// // src/components/Students.jsx
// import React, { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';
// import { useAuth } from '../context/AuthContext';

// const Students = () => {
//   const { user } = useAuth();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, [user]);

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const { data, error } = await supabase
//         .from('teacher_student_relationships')
//         .select(`
//           student:student_id(
//             id,
//             name,
//             email,
//             created_at,
//             quiz_sessions(
//               id,
//               created_at,
//               score
//             )
//           )
//         `)
//         .eq('teacher_id', user.id);

//       if (error) throw error;

//       setStudents(data.map(item => item.student));
//     } catch (err) {
//       console.error('Error fetching students:', err);
//       setError(err.message || 'Failed to load students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Error!</strong>
//         <span className="block sm:inline"> {error}</span>
//         <button 
//           onClick={fetchStudents}
//           className="absolute top-0 bottom-0 right-0 px-4 py-3"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 h-full overflow-y-auto bg-gray-900">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6 text-white">My Students</h1>
        
//         <div className="bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-700">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Quizzes Taken
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Avg Score
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-800 divide-y divide-gray-700">
//                 {students.map((student) => {
//                   const quizCount = student.quiz_sessions?.length || 0;
//                   const avgScore = quizCount > 0 
//                     ? Math.round(student.quiz_sessions.reduce((sum, quiz) => sum + quiz.score, 0) / quizCount)
//                     : 0;

//                   return (
//                     <tr key={student.id} className="hover:bg-gray-700/50">
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-white">
//                           {student.name}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
//                         {student.email}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
//                         {quizCount}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
//                         {quizCount > 0 ? `${avgScore}%` : 'N/A'}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {students.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-lg">No students assigned to you yet</p>
//             <button
//               onClick={fetchStudents}
//               className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//             >
//               Refresh
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Students;