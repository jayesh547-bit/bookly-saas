import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Shield, Star, Play } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden hero-glow">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Glowing Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/25 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse-subtle" />
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            Introducing BOOKLY 2.0 – Next-Gen Booking Intelligence
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-brand-400" />
          <span className="hidden sm:inline-block text-xs text-brand-600 dark:text-brand-300/80">
            Explore Demo →
          </span>
        </div>

        {/* Impactful Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Smart Booking & Business Management for{' '}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Modern Studios
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          The all-in-one operating system for salons, gyms, consultants, and service professionals. Automate appointments, eradicate no-shows, and scale client revenue effortlessly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto text-base px-7 py-3 shadow-glow-brand"
            iconRight={ArrowRight}
            onClick={() => navigate('/dashboard')}
          >
            Launch Interactive Demo
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-base px-7 py-3"
            onClick={() => {
              const el = document.getElementById('preview');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Watch Platform Preview
          </Button>
        </div>

        {/* Social Proof Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">4.9/5</span>
            <span>(1,200+ Reviews)</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>No credit card required</span>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-500" />
            <span>14-day full access trial</span>
          </div>
        </div>
      </div>
    </section>
  );
}

