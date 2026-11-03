import React from 'react';
import { Sliders, Share2, Rocket } from 'lucide-react';
import { Badge } from '../common/Badge';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: Sliders,
      title: 'Configure Services & Hours',
      desc: 'Add your treatments or coaching sessions, set pricing and duration, and define your staff operating availability.',
    },
    {
      num: '02',
      icon: Share2,
      title: 'Share Your Booking Link',
      desc: 'Embed our sleek widget onto your website or drop your link directly into your Instagram bio, Google Maps, and emails.',
    },
    {
      num: '03',
      icon: Rocket,
      title: 'Automate Bookings & Grow',
      desc: 'Clients book 24/7 without phone calls. Automated SMS reminders prevent no-shows while analytics reveal your top growth drivers.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" size="sm" dot>
            Simple Onboarding
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 mb-4">
            Get up and running in under 5 minutes
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            No technical skills or complicated setup required. Start accepting reservations today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 shadow-subtle group hover:border-brand-500/50 transition-all duration-200"
              >
                {/* Step badge */}
                <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full mb-6 border border-brand-200/40 dark:border-brand-800/40">
                  STEP {step.num}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-slate-800 dark:text-slate-100 mb-5 group-hover:scale-110 group-hover:text-brand-500 transition-all duration-200">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

