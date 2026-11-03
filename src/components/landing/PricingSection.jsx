import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      desc: 'Ideal for solo practitioners and independent specialists.',
      monthlyPrice: 29,
      annualPrice: 23,
      popular: false,
      features: [
        '1 Staff Specialist',
        'Up to 150 bookings / month',
        'Email booking confirmations',
        'Client CRM & visit notes',
        'Day & Week calendar views',
        'Standard business hours setup',
      ],
      cta: 'Start 14-Day Free Trial',
      variant: 'outline',
    },
    {
      name: 'Professional',
      desc: 'Everything growing salons, gyms, and advisory practices need.',
      monthlyPrice: 79,
      annualPrice: 63,
      popular: true,
      features: [
        'Up to 6 Staff Specialists',
        'Unlimited monthly bookings',
        'Automated SMS & email reminders',
        'Advanced revenue & retention analytics',
        'Custom buffer times & service tags',
        'Multi-service checkout',
        'Priority support (24/7)',
      ],
      cta: 'Get Started with Pro',
      variant: 'primary',
    },
    {
      name: 'Studio Enterprise',
      desc: 'For multi-location franchises, fitness hubs, and agencies.',
      monthlyPrice: 199,
      annualPrice: 159,
      popular: false,
      features: [
        'Unlimited Staff Specialists',
        'Multi-location studio management',
        'White-label client booking domain',
        'Custom intake forms & medical waivers',
        'Dedicated onboarding manager',
        'Custom API & webhook integrations',
        '99.99% uptime SLA guarantee',
      ],
      cta: 'Contact Enterprise Sales',
      variant: 'outline',
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 relative bg-slate-50/60 dark:bg-slate-900/20 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="primary" size="sm" dot>
            Predictable Pricing
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 mb-4">
            Transparent plans that scale with you
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            No surprise add-ons. No hidden booking commission fees. Keep 100% of your earnings.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm mt-8">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                !annual
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                annual
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p, idx) => {
            const price = annual ? p.annualPrice : p.monthlyPrice;
            return (
              <Card
                key={idx}
                hover
                className={`p-8 flex flex-col justify-between relative ${
                  p.popular
                    ? 'ring-2 ring-brand-500 dark:ring-brand-400 shadow-glow-brand'
                    : ''
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-brand-600 text-white shadow-md">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                    {p.desc}
                  </p>

                  <div className="flex items-baseline gap-1 my-6">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      / month {annual ? '(billed annually)' : ''}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Included Capabilities:
                    </p>
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant={p.popular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                    iconRight={ArrowRight}
                    onClick={() => navigate('/signup')}
                  >
                    {p.cta}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

