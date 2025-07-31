// src/components/ui/Table.jsx
export const QuizTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader>Student</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader className="hidden sm:table-cell">Domain</TableHeader>
            <TableHeader>Score</TableHeader>
            <TableHeader className="hidden md:table-cell">Details</TableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((quiz) => (
            <TableRow key={quiz.id} quiz={quiz} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ quiz }) => {
  return (
    <tr className="hover:bg-gray-50">
      <TableCell>
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-900">
            {quiz.user?.name || 'Unknown'}
          </div>
        </div>
      </TableCell>
      <TableCell>
        {new Date(quiz.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell className="hidden sm:table-cell capitalize">
        {quiz.domain_id.replace('-', ' ')}
      </TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          quiz.score >= 70 ? 'bg-green-100 text-green-800' : 
          quiz.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {quiz.score}%
        </span>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Link href={`/dashboard/quizzes/${quiz.id}`} className="text-blue-600 hover:text-blue-800">
          View
        </Link>
      </TableCell>
    </tr>
  );
};