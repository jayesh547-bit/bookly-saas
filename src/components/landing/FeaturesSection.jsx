import React from 'react';
import {
  CalendarCheck,
  BellRing,
  Users,
  BarChart4,
  Clock4,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export function FeaturesSection() {
  const features = [
    {
      icon: CalendarCheck,
      title: 'Frictionless Online Booking',
      desc: 'Give clients a branded, mobile-optimized booking link. Real-time availability checks eliminate double bookings forever.',
      badge: 'Zero Friction',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      icon: BellRing,
      title: 'Automated Reminders & Alerts',
      desc: 'Send multi-channel SMS and email confirmations and reminders that slash costly client no-shows by up to 87%.',
      badge: '87% Fewer No-Shows',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      icon: Users,
      title: 'Intelligent Client CRM',
      desc: 'Track complete client visit history, lifetime spend, service notes, formulas, allergies, and VIP tags in one unified view.',
      badge: '360° Profiles',
      color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40',
    },
    {
      icon: Clock4,
      title: 'Adaptive Calendar & Buffer Times',
      desc: 'Switch fluidly between Day, Week, and Month views. Automatic buffer times give your staff room to breathe between appointments.',
      badge: 'Smart Schedules',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
    },
    {
      icon: BarChart4,
      title: 'Revenue & Occupancy Analytics',
      desc: 'Uncover your highest-margin services, peak booking hours, client retention trends, and monthly growth trajectory.',
      badge: 'Real-time Metrics',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40',
    },
    {
      icon: CreditCard,
      title: 'Service Catalog & Dynamic Pricing',
      desc: 'Configure flexible service duration, buffer intervals, custom pricing, staff assignment, and category grouping in seconds.',
      badge: 'Flexible Setup',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" size="sm" dot>
            Engineered For Growth
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 mb-4">
            Everything your business needs to operate at scale
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Ditch messy spreadsheets, lost sticky notes, and clunky legacy software. BOOKLY handles the busywork so you can focus on your craft.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card
                key={idx}
                hover
                className="p-6 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${feat.color} transition-transform group-hover:scale-110 duration-200`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="default" size="xs">
                      {feat.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

