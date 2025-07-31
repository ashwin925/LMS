// src/components/dashboard/Sidebar.jsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'Students', href: '/dashboard/students', icon: <Users className="h-5 w-5" /> },
    { name: 'Quizzes', href: '/dashboard/quizzes', icon: <ClipboardList className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-4 h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-8">Teacher Dashboard</h2>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};