import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { Calendar, Mail, KeyRound, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

export function ForgotPasswordPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid account email.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast.info('Code Sent', 'Simulated verification code is 849201.');
    }, 500);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (!code || code.length < 4) {
      setError('Please enter the verification code sent to your email.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 400);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password Reset', 'Your password has been updated. Please sign in.');
      navigate('/login');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 max-w-lg mx-auto w-full bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-lg text-slate-900 dark:text-white">BOOKLY</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="my-auto py-8">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium mb-5">
            {error}
          </div>
        )}

        {/* Step 1: Request Email */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Reset your password
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Enter the email address associated with your BOOKLY account, and we'll send you a password reset code.
            </p>
            <form onSubmit={handleSendCode} className="space-y-4">
              <Input
                label="Account Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alexander@luxestudio.com"
                icon={Mail}
                required
              />
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="w-full"
                isLoading={isLoading}
                iconRight={ArrowRight}
              >
                Send Reset Code
              </Button>
            </form>
          </div>
        )}

        {/* Step 2: Verification Code */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Enter verification code
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              We dispatched a 6-digit verification code to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>. (Demo code: <strong>849201</strong>)
            </p>
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <Input
                label="6-Digit Verification Code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="849201"
                icon={KeyRound}
                required
              />
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Verify Code
              </Button>
            </form>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Choose a new password
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Your identity has been verified. Create a secure password for your account.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                icon={KeyRound}
                required
              />
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="w-full"
                isLoading={isLoading}
                iconRight={CheckCircle2}
              >
                Update Password & Sign In
              </Button>
            </form>
          </div>
        )}
      </div>

      <div className="text-xs text-center text-slate-400">
        Need assistance? Reach our customer support team at support@bookly.io
      </div>
    </div>
  );
}

