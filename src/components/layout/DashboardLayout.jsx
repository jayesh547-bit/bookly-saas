import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { NewBookingModal } from '../bookings/NewBookingModal';
import { cn } from '../../utils/cn';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-dark-bg text-slate-900 dark:text-slate-100 flex">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onOpenNewBooking={() => setNewBookingModalOpen(true)}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-all duration-200',
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        <DashboardHeader
          collapsed={collapsed}
          setMobileOpen={setMobileOpen}
          onOpenNewBooking={() => setNewBookingModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global New Booking Modal */}
      <NewBookingModal
        isOpen={newBookingModalOpen}
        onClose={() => setNewBookingModalOpen(false)}
      />
    </div>
  );
}

