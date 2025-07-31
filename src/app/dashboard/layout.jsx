// src/app/dashboard/layout.jsx
import { Sidebar } from '../../components/dashboard/Sidebar';
import { MobileHeader } from '../../components/dashboard/MobileHeader';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header with hamburger menu */}
        <MobileHeader />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}