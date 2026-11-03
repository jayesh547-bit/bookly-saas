import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { SignupPage } from '../pages/public/SignupPage';
import { ForgotPasswordPage } from '../pages/public/ForgotPasswordPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Dashboard Layout & Pages
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { OverviewPage } from '../pages/dashboard/OverviewPage';
import { BookingsPage } from '../pages/dashboard/BookingsPage';
import { CalendarPage } from '../pages/dashboard/CalendarPage';
import { CustomersPage } from '../pages/dashboard/CustomersPage';
import { ServicesPage } from '../pages/dashboard/ServicesPage';
import { AnalyticsPage } from '../pages/dashboard/AnalyticsPage';
import { SettingsPage } from '../pages/dashboard/SettingsPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

