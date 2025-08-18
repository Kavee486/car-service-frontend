// Sidebar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { USER_ROLES } from '../constants';
import { 
  Home, 
  Calendar,
  ClipboardList,
  Package,
  User,
  LogOut,
  Clock,
  Wrench
} from 'lucide-react';

const Sidebar = () => {
  const user = authService.getCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const getMenuItems = () => {
    switch (user?.role) {
      case USER_ROLES.ADMIN:
        return [
          { icon: Home, label: 'Dashboard', path: '/admin' },
          { icon: Calendar, label: 'Appointments', path: '/admin/appointments' },
          { icon: User, label: 'Customers', path: '/admin/customers' },
          { icon: ClipboardList, label: 'Services', path: '/admin/services' },
          { icon: Package, label: 'Parts Inventory', path: '/admin/parts' },
          { icon: User, label: 'Profile', path: '/profile' },
        ];
case USER_ROLES.TECHNICIAN:
  return [
    { icon: Home, label: 'Dashboard', path: '/technician' },
    { icon: Clock, label: 'My Schedule', path: '/technician/schedule' },
    { icon: Calendar, label: 'Appointments', path: '/technician/appointments' },
    { icon: Wrench, label: 'Job Cards', path: '/technician/job-cards' },
    { icon: Package, label: 'Parts Inventory', path: '/technician/parts' }, // Changed label
    { icon: User, label: 'Profile', path: '/profile' },
  ];
      case USER_ROLES.CUSTOMER:
        return [
          { icon: Home, label: 'Dashboard', path: '/customer' },
          { icon: Calendar, label: 'Appointments', path: '/customer/appointments' },
          { icon: User, label: 'Profile', path: '/profile' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="bg-blue-500 p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold">AutoMech</h1>
          <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;