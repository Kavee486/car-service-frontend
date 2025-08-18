// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import authService from './services/authService';
import { USER_ROLES } from './constants';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import DashboardLayout from './components/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Profile from './pages/Profile';
import PartsInventory from './pages/PartsInventory';
import Services from './pages/Services';
import Appointments from './pages/Appointments';
import TechnicianSchedule from './pages/TechnicianSchedule';
import Customers from './pages/Customers'; // Add this import

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <DashboardLayout title="Admin Dashboard">
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <DashboardLayout title="Customers Management">
                <Customers />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/parts"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <DashboardLayout title="Parts Inventory">
                <PartsInventory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <DashboardLayout title="Services Management">
                <Services />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <DashboardLayout title="Appointments Management">
                <Appointments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Technician Routes */}
        <Route
          path="/technician"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.TECHNICIAN}>
              <DashboardLayout title="Technician Dashboard">
                <TechnicianDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician/schedule"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.TECHNICIAN}>
              <DashboardLayout title="My Schedule">
                <TechnicianSchedule />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician/parts"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.TECHNICIAN}>
              <DashboardLayout title="Parts Inventory">
                <PartsInventory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician/appointments"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.TECHNICIAN}>
              <DashboardLayout title="My Appointments">
                <Appointments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.CUSTOMER}>
              <DashboardLayout title="Customer Dashboard">
                <CustomerDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/appointments"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.CUSTOMER}>
              <DashboardLayout title="My Appointments">
                <Appointments />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout title="My Profile">
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;