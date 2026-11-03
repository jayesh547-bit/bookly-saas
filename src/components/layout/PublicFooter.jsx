import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, CheckCircle2, Github, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function PublicFooter() {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Invalid Email', 'Please provide a valid business email.');
      return;
    }
    toast.success('Subscribed!', 'Thanks for joining our product updates newsletter.');
    setEmail('');
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-dark-bg/90 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-brand">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                BOOKLY
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The intelligent appointment scheduling and client management operating system built for modern service businesses, salons, gyms, and independent consultants.
            </p>
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (99.98% SLA)</span>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-brand-600 dark:hover:text-white transition-colors">Smart Scheduling</a></li>
              <li><a href="#features" className="hover:text-brand-600 dark:hover:text-white transition-colors">Client CRM</a></li>
              <li><a href="#features" className="hover:text-brand-600 dark:hover:text-white transition-colors">Staff Management</a></li>
              <li><a href="#features" className="hover:text-brand-600 dark:hover:text-white transition-colors">Automated SMS/Email</a></li>
              <li><a href="#features" className="hover:text-brand-600 dark:hover:text-white transition-colors">Revenue Analytics</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#industries" className="hover:text-brand-600 dark:hover:text-white transition-colors">Salons & Spas</a></li>
              <li><a href="#industries" className="hover:text-brand-600 dark:hover:text-white transition-colors">Fitness & Gyms</a></li>
              <li><a href="#industries" className="hover:text-brand-600 dark:hover:text-white transition-colors">Executive Advisory</a></li>
              <li><a href="#industries" className="hover:text-brand-600 dark:hover:text-white transition-colors">Wellness Clinics</a></li>
              <li><a href="#pricing" className="hover:text-brand-600 dark:hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Stay in the loop
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Receive release updates, product guides, and growth tactics.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} BOOKLY Technologies Inc. Crafted for high-growth service businesses.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Privacy Policy</span>
            <span className="text-slate-400">Terms of Service</span>
            <span className="text-slate-400">Security & Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

