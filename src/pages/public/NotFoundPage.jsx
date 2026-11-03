import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarX, Home, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 shadow-sm border border-brand-200/50 dark:border-brand-800/40">
        <CalendarX className="w-8 h-8" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">404</h1>
      <h2 className="text-xl sm:text-2xl font-bold mb-3">Page Not Found</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8">
        The route you are looking for might have been moved, renamed, or does not exist on this demo platform.
      </p>
      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="outline" size="md" icon={Home}>
            Back to Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="primary" size="md" icon={LayoutDashboard}>
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

