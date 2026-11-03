import React, { useState } from 'react';
import { Scissors, Dumbbell, Briefcase, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const solutions = [
    {
      id: 'salons',
      label: 'Salons & Hair Studios',
      icon: Scissors,
      title: 'Keep chairs filled and clients raving',
      desc: 'Simplify multi-stylist schedules, store custom hair formulas and photos per client, and automatically send re-booking nudges.',
      bullets: [
        'Multi-chair & stylist roster synchronisation',
        'Detailed client color formulas & allergy notes',
        'Add-on service upsells during checkout',
        'Automated 6-week haircut reminder SMS',
      ],
      metric: '+34%',
      metricLabel: 'Average Re-booking Rate',
    },
    {
      id: 'fitness',
      label: 'Gyms & Fitness Trainers',
      icon: Dumbbell,
      title: 'Pack training slots and group bootcamps',
      desc: 'Seamlessly schedule 1-on-1 personal training, manage group class capacity limits, and monitor client attendance streaks.',
      bullets: [
        'Cap class sizes with automated waitlists',
        'Client fitness goals and body metric tracking',
        'Recurring weekly training reservations',
        'Fast mobile self-check-in for members',
      ],
      metric: '94%',
      metricLabel: 'Session Attendance Rate',
    },
    {
      id: 'consultants',
      label: 'Advisors & Consultants',
      icon: Briefcase,
      title: 'Monetize your expertise without scheduling friction',
      desc: 'Share frictionless booking links for paid strategy calls, automatically generate calendar invites, and eliminate back-and-forth emails.',
      bullets: [
        'Custom client onboarding intake questionnaires',
        'Automatic timezone conversion for global clients',
        'Direct calendar sync with buffer intervals',
        'Flexible retainers and single strategy sessions',
      ],
      metric: '4.2 hrs',
      metricLabel: 'Saved Per Week On Admin Work',
    },
    {
      id: 'spas',
      label: 'Spas & Wellness Studios',
      icon: HeartHandshake,
      title: 'Provide serene, five-star guest experiences',
      desc: 'Coordinate treatment rooms, specialized equipment, aesthetician shifts, and pre-arrival intake health waivers.',
      bullets: [
        'Treatment room and specialized equipment allocation',
        'Digital intake waivers signed prior to arrival',
        'Therapist preference notes and allergy history',
        'Gift card and treatment bundle packages',
      ],
      metric: '2.4x',
      metricLabel: 'Higher Treatment Bundle Sales',
    },
  ];

  const current = solutions[activeTab];

  return (
    <section id="industries" className="py-20 sm:py-28 bg-slate-50/70 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="primary" size="sm" dot>
            Targeted Solutions
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 mb-4">
            Built purposefully for your industry
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Every business model has unique operational needs. BOOKLY adapts to your workflow with tailored tools.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {solutions.map((sol, idx) => {
            const Icon = sol.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={sol.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-glow-brand'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sol.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Content Card */}
        <Card className="p-8 sm:p-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {current.desc}
              </p>
              <div className="space-y-3 pt-2">
                {current.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-center text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
                Proven Impact
              </span>
              <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                {current.metric}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                {current.metricLabel}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

