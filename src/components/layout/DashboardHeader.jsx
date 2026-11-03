import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Sparkles,
  RotateCcw,
  User,
  ShieldCheck,
  Check,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { Badge } from '../common/Badge';
import { cn } from '../../utils/cn';

export function DashboardHeader({ collapsed, setMobileOpen, onOpenNewBooking }) {
  const { user, demoAccounts, demoLogin, logout } = useAuth();
  const { resetToDemoData } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Business Overview';
    if (path.includes('/bookings')) return 'Appointments & Bookings';
    if (path.includes('/calendar')) return 'Interactive Schedule';
    if (path.includes('/customers')) return 'Customer CRM';
    if (path.includes('/services')) return 'Service Catalog';
    if (path.includes('/analytics')) return 'Revenue & Growth Analytics';
    if (path.includes('/settings')) return 'Platform Settings';
    return 'Dashboard';
  };

  const sampleNotifications = [
    {
      id: 1,
      title: 'New Booking Confirmed',
      desc: 'Maya Patel booked Hydra-Infusion Glow Facial for 2:30 PM.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Reschedule Request',
      desc: 'David Reynolds requested time adjustment on Signature Cut.',
      time: '1h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Monthly Revenue Record',
      desc: 'October gross booking revenue reached $46,200 (+16%).',
      time: 'Yesterday',
      unread: false,
    },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-20 h-16 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all duration-200',
        'px-4 sm:px-6 lg:px-8 flex items-center justify-between'
      )}
    >
      {/* Left title & hamburger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              {getPageTitle()}
            </h1>
            <Badge variant="success" size="xs" dot>
              Live
            </Badge>
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset Demo Data button */}
        <button
          type="button"
          onClick={resetToDemoData}
          title="Restore fresh sample dataset"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl transition-all border border-slate-200 dark:border-slate-700/60"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>

        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          title="Open Public Landing Page in new tab"
          className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUnreadCount(0);
            }}
            aria-label="View notifications"
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-dark-bg" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Notifications
                </span>
                <span className="text-[11px] text-brand-600 dark:text-brand-400 font-medium cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-72 overflow-y-auto mt-2">
                {sampleNotifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">
                        {n.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Persona Switcher Menu */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/20"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  {user?.role}
                </span>
              </div>

              {/* Persona Switcher */}
              <div className="py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                  Switch Demo Role
                </p>
                {demoAccounts.map((acc, index) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => {
                      demoLogin(index);
                      setProfileOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors',
                      user?.email === acc.email
                        ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    <span>{acc.role}</span>
                    {user?.email === acc.email && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                ))}
              </div>

              {/* Settings and Logout */}
              <div className="pt-2">
                <Link
                  to="/dashboard/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile & Settings</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

