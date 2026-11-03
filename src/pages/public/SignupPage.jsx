import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import {
  Calendar,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function SignupPage() {
  const { signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Hair & Styling');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !businessName) {
      setError('Please provide your name and business name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid work email.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!agreed) {
      setError('Please accept the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        fullName,
        businessName,
        category,
        email,
      });

      // Launch cheerful confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // silent fallback if canvas-confetti has restrictions
      }

      toast.success('Welcome to BOOKLY!', `Your workspace for ${businessName} is ready.`);
      navigate('/dashboard');
    } catch (err) {
      setError('Unable to complete registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100">
      {/* Left visual banner */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-tr from-brand-950 via-slate-900 to-indigo-950 p-12 flex-col justify-between overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-glow-brand">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">BOOKLY</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Start your 14-day free trial. Scale without scheduling limits.
          </h2>
          <div className="space-y-3.5 pt-2">
            {[
              'Unlimited client bookings and calendar management',
              'Automated multi-channel SMS and email reminders',
              'Custom booking link for website and Instagram',
              'Instant revenue analytics and service leaderboards',
              'Zero payment commission fees on client transactions',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-400">
          No credit card required. Cancel anytime.
        </div>
      </div>

      {/* Right form container */}
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
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Create your business account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Set up your smart booking studio in 60 seconds.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alexander Pierce"
              icon={User}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Input
                label="Business / Studio Name"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="LuxeStudio"
                icon={Building}
                required
              />

              <Select
                label="Industry Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Hair & Styling">Hair & Styling Salon</option>
                <option value="Skin & Spa">Skin & Spa Aesthetics</option>
                <option value="Fitness & Training">Fitness & Gym Studio</option>
                <option value="Consultation">Executive Advisory</option>
              </Select>
            </div>

            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alexander@luxestudio.com"
              icon={Mail}
              required
            />

            <Input
              label="Password (min 6 characters)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500 mt-0.5"
                />
                <span>
                  I agree to BOOKLY's{' '}
                  <span className="text-brand-600 dark:text-brand-400 font-medium">Terms of Service</span> and{' '}
                  <span className="text-brand-600 dark:text-brand-400 font-medium">Privacy Policy</span>.
                </span>
              </label>
            </div>

            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-full text-base py-2.5 mt-2 shadow-glow-brand"
              isLoading={isLoading}
              iconRight={ArrowRight}
            >
              Start Free 14-Day Trial
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Sign In here
            </Link>
          </p>
        </div>

        <div className="text-xs text-center text-slate-400">
          Fully functional demo storage. You can immediately access the platform.
        </div>
      </div>
    </div>
  );
}

