import React from 'react';
import Sidebar from './Sidebar';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children, title }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Only Sidebar instance in the entire app */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;