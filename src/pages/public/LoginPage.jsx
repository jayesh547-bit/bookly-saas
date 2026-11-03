import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import {
  Calendar,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';

export function LoginPage() {
  const { login, demoLogin, demoAccounts } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('alexander@bookly.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome Back!', 'Signed in successfully.');
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please verify your details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (index) => {
    const account = demoLogin(index);
    toast.info('Demo Mode Active', `Logged in as ${account.role} (${account.name})`);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100">
      {/* Left visual column */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-tr from-brand-950 via-slate-900 to-indigo-950 p-12 flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-glow-brand">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">BOOKLY</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> High Performance Booking Hub
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Elevate your appointment business to enterprise standards.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            "Switching to BOOKLY saved us over 15 hours of manual scheduling each month and lowered our appointment no-shows to near zero."
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Elena Gilbert"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-400"
            />
            <div>
              <p className="text-sm font-bold text-white">Alexander Pierce</p>
              <p className="text-xs text-slate-400">Founder, LuxeStudio NYC</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-400">
          © {new Date().getFullYear()} BOOKLY Technologies Inc.
        </div>
      </div>

      {/* Right form column */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">BOOKLY</span>
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="my-auto py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Sign in to manage your bookings, clients, and revenue.
            </p>
          </div>

          {/* 1-Click Fast Demo Login Buttons */}
          <div className="mb-6 p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/40">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> 1-Click Demo Login
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Instant Access</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {demoAccounts.map((acc, idx) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleQuickDemo(idx)}
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-brand-200/70 dark:border-brand-900/60 text-slate-800 dark:text-slate-200 hover:border-brand-500 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 transition-all text-xs font-semibold text-center shadow-xs"
                >
                  {acc.role.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
              Or sign in with email
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alexander@bookly.com"
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500"
                />
                <span>Remember this device</span>
              </label>

              <Link
                to="/forgot-password"
                className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-full text-base py-2.5 mt-2 shadow-glow-brand"
              isLoading={isLoading}
              iconRight={ArrowRight}
            >
              Sign In to BOOKLY
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-8">
            Don't have an account yet?{' '}
            <Link
              to="/signup"
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Start 14-day free trial
            </Link>
          </p>
        </div>

        <div className="text-xs text-center text-slate-400">
          Simulated security environment. You can test freely with the demo accounts above.
        </div>
      </div>
    </div>
  );
}

