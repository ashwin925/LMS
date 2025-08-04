// // src/components/QuizAnalytics.jsx
// import React, { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';
// import { useAuth } from '../context/AuthContext';
// import { BarChart2, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

// const QuizAnalytics = () => {
//   const { user } = useAuth();
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeRange, setTimeRange] = useState('month'); // week, month, all

//   useEffect(() => {
//     fetchQuizData();
//   }, [user, timeRange]);

//   const fetchQuizData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       let query = supabase
//         .from('quiz_sessions')
//         .select(`
//           id,
//           created_at,
//           domain_id,
//           difficulty,
//           score,
//           completed,
//           questions:quiz_questions(count),
//           responses:quiz_responses(
//             is_correct,
//             response_time
//           )
//         `)
//         .eq('user_id', user.id)
//         .order('created_at', { ascending: false });

//       if (timeRange === 'week') {
//         query = query.gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
//       } else if (timeRange === 'month') {
//         query = query.gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
//       }

//       const { data, error: fetchError } = await query;

//       if (fetchError) throw fetchError;

//       setSessions(data || []);
//     } catch (err) {
//       console.error('Error fetching quiz data:', err);
//       setError(err.message || 'Failed to load quiz data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate statistics
//   const calculateStats = () => {
//     if (sessions.length === 0) return null;

//     const totalQuizzes = sessions.length;
//     const totalQuestions = sessions.reduce((sum, session) => sum + (session.questions?.count || 0), 0);
//     const correctAnswers = sessions.reduce((sum, session) => {
//       return sum + (session.responses?.filter(r => r.is_correct).length || 0);
//     }, 0);
//     const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
//     const avgResponseTime = sessions.reduce((sum, session) => {
//       const validResponses = session.responses?.filter(r => r.response_time) || [];
//       const sessionAvg = validResponses.reduce((s, r) => s + r.response_time, 0) / validResponses.length || 0;
//       return sum + sessionAvg;
//     }, 0) / sessions.length;

//     return {
//       totalQuizzes,
//       totalQuestions,
//       correctAnswers,
//       accuracy,
//       avgResponseTime: Math.round(avgResponseTime)
//     };
//   };

//   const stats = calculateStats();

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
//           onClick={fetchQuizData}
//           className="absolute top-0 bottom-0 right-0 px-4 py-3"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-6xl mx-auto h-full overflow-y-auto">
//       <h1 className="text-2xl font-bold mb-6 text-white">Quiz Performance Analytics</h1>
      
//       {/* Time Range Filter */}
//       <div className="flex gap-4 mb-6">
//         <select 
//           value={timeRange}
//           onChange={(e) => setTimeRange(e.target.value)}
//           className="border border-gray-600 rounded p-2 bg-gray-700 text-white"
//         >
//           <option value="week" className="bg-gray-800">Last Week</option>
//           <option value="month" className="bg-gray-800">Last Month</option>
//           <option value="all" className="bg-gray-800">All Time</option>
//         </select>
//       </div>

//       {/* Summary Stats */}
//       {stats && (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
//             <h3 className="font-medium text-gray-300">Total Quizzes</h3>
//             <p className="text-2xl font-bold text-white">{stats.totalQuizzes}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
//             <h3 className="font-medium text-gray-300">Questions Answered</h3>
//             <p className="text-2xl font-bold text-white">{stats.totalQuestions}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
//             <h3 className="font-medium text-gray-300">Correct Answers</h3>
//             <p className="text-2xl font-bold text-white">
//               {stats.correctAnswers} <span className="text-blue-400">({stats.accuracy}%)</span>
//             </p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
//             <h3 className="font-medium text-gray-300">Avg Response Time</h3>
//             <p className="text-2xl font-bold text-white">{stats.avgResponseTime}ms</p>
//           </div>
//         </div>
//       )}

//       {/* Quiz Sessions Table */}
//       <div className="bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-700">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-700">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Domain
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Difficulty
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Questions
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Score
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-gray-800 divide-y divide-gray-700">
//               {sessions.map((session) => (
//                 <tr key={session.id} className="hover:bg-gray-700/50">
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-300">
//                     {new Date(session.created_at).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white capitalize">
//                     {session.domain_id.replace('-', ' ')}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-300">
//                     {session.difficulty}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {session.questions?.count || 0}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {session.score || 0}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {session.completed ? (
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/30 text-green-400 border border-green-700">
//                         Completed
//                       </span>
//                     ) : (
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-700">
//                         Incomplete
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {sessions.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-400 text-lg">No quiz sessions found</p>
//           <button
//             onClick={fetchQuizData}
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//           >
//             Refresh
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizAnalytics;