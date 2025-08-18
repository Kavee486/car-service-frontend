import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronLeft, Save, Edit } from 'lucide-react';
import authService from '../services/authService';

const Profile = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@example.com'
  });

  // Default user data if not available
  const userData = user || {
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'guest',
    joinDate: new Date().toLocaleDateString()
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically call an API to update the user data
    console.log('Saved data:', formData);
    setIsEditing(false);
    // Update the user in authService if needed
    if (user) {
      authService.updateUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 text-base"
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="ml-1">Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="bg-gray-100 p-4 rounded-full">
            <User className="h-12 w-12 text-gray-600" />
          </div>
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-3xl font-bold border border-gray-300 rounded px-2 py-1 w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="text-lg border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{formData.name}</h1>
                <p className="text-gray-600 text-lg">{formData.email}</p>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-base text-gray-500">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="font-medium text-lg border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="font-medium text-lg">{formData.name}</p>
                )}
              </div>
              <div>
                <p className="text-base text-gray-500">Email Address</p>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="font-medium text-lg border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="font-medium text-lg">{formData.email}</p>
                )}
              </div>
              <div>
                <p className="text-base text-gray-500">Role</p>
                <p className="font-medium text-lg capitalize">{userData.role}</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-base text-gray-500">Member Since</p>
                <p className="font-medium text-lg">
                  {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-500">Last Login</p>
                <p className="font-medium text-lg">
                  {userData.loginTime ? new Date(userData.loginTime).toLocaleString() : 'Today'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base flex items-center"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base flex items-center"
            >
              <Edit className="h-5 w-5 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;