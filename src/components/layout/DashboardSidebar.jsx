import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck2,
  CalendarDays,
  Users2,
  Sparkles,
  BarChart3,
  Settings,
  PlusCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { cn } from '../../utils/cn';

export function DashboardSidebar({
  collapsed,
  setCollapsed,
  onOpenNewBooking,
  mobileOpen,
  setMobileOpen,
}) {
  const { user, logout } = useAuth();
  const { businessProfile } = useData();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, end: true },
    { name: 'Bookings', href: '/dashboard/bookings', icon: CalendarCheck2 },
    { name: 'Calendar', href: '/dashboard/calendar', icon: CalendarDays },
    { name: 'Customers', href: '/dashboard/customers', icon: Users2 },
    { name: 'Services', href: '/dashboard/services', icon: Sparkles },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between">
      {/* Top Header & Brand */}
      <div>
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100 dark:border-slate-800">
          <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-brand shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white truncate">
                  BOOKLY
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {businessProfile.name}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse button */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-3">
          <button
            type="button"
            onClick={onOpenNewBooking}
            className={cn(
              'w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-sm font-semibold transition-all shadow-sm',
              'bg-brand-600 hover:bg-brand-500 text-white hover:shadow-glow-brand active:scale-[0.98]'
            )}
            title="Create New Appointment"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            {!collapsed && <span>New Booking</span>}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.end}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group',
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-semibold shadow-sm border border-brand-200/50 dark:border-brand-800/50'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Logout */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60',
            collapsed && 'justify-center p-1.5'
          )}
        >
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User avatar'}
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-brand-500/30"
          />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                {user?.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {user?.role}
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={logout}
          aria-label="Sign out"
          className={cn(
            'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          'hidden lg:block fixed inset-y-0 left-0 z-30 bg-white dark:bg-dark-bg border-r border-slate-200/80 dark:border-slate-800 transition-all duration-200',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Off-canvas Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-dark-bg border-r border-slate-200 dark:border-slate-800 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

