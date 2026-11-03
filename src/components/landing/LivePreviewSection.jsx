import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function LivePreviewSection() {
  const [activeTab, setActiveTab] = useState('salon');
  const navigate = useNavigate();

  const presets = {
    salon: {
      title: 'Luxe Hair & Aesthetics Studio',
      revenue: '$14,850',
      change: '+18.4%',
      appointmentsToday: '24 Bookings',
      topService: 'Balayage & Hair Glossing',
      staffOnline: '4 Stylists Active',
      recent: [
        { name: 'Sophia Vance', service: 'Signature Cut & Style', time: '09:00 AM', price: '$65', status: 'Completed' },
        { name: 'Elena Rostova', service: 'Hydra-Infusion Facial', time: '11:30 AM', price: '$130', status: 'In Progress' },
        { name: 'Zoe Sterling', service: 'Balayage & Gloss Finish', time: '02:00 PM', price: '$195', status: 'Confirmed' },
      ],
    },
    fitness: {
      title: 'Apex Performance Gym & Boxing',
      revenue: '$22,400',
      change: '+24.1%',
      appointmentsToday: '38 Sessions',
      topService: '1-on-1 Functional Coaching',
      staffOnline: '6 Coaches Available',
      recent: [
        { name: 'Liam Gallagher', service: 'Functional Strength Assessment', time: '08:00 AM', price: '$90', status: 'Completed' },
        { name: 'Jordan Miller', service: 'HIIT Small Group Circuit', time: '10:00 AM', price: '$40', status: 'Completed' },
        { name: 'Ethan Brooks', service: 'Olympic Lifting Mechanics', time: '03:30 PM', price: '$90', status: 'Confirmed' },
      ],
    },
    consultant: {
      title: 'Vanguard Strategy & Growth Partners',
      revenue: '$38,900',
      change: '+31.2%',
      appointmentsToday: '12 Consults',
      topService: 'Executive Advisory Session',
      staffOnline: '3 Partners Live',
      recent: [
        { name: 'Marcus Chen', service: 'Executive Business Strategy', time: '11:00 AM', price: '$250', status: 'In Progress' },
        { name: 'Amina Al-Mansoor', service: 'European Retail Scale Review', time: '01:30 PM', price: '$250', status: 'Confirmed' },
        { name: 'David Reynolds', service: 'UX & Product Architecture Audit', time: '04:00 PM', price: '$320', status: 'Confirmed' },
      ],
    },
  };

  const current = presets[activeTab];

  return (
    <section id="preview" className="py-12 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Industry switcher tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <Badge variant="primary" size="sm" dot>
              Interactive Product Preview
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1.5">
              Tailored for your exact service model
            </h2>
          </div>

          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
            <button
              type="button"
              onClick={() => setActiveTab('salon')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'salon'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Salons & Spas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fitness')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'fitness'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Fitness & Gyms
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('consultant')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'consultant'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Advisory & Consultants
            </button>
          </div>
        </div>

        {/* Dashboard Preview Glass Frame */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Mock Browser Topbar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                https://app.bookly.io/dashboard/{activeTab}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success" size="xs">
                Real-Time Sync Active
              </Badge>
            </div>
          </div>

          {/* Inner Preview Content */}
          <div className="p-5 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {current.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Today's schedule, client flow, and gross revenue insights
                </p>
              </div>

              <Button
                variant="subtle"
                size="sm"
                iconRight={ArrowRight}
                onClick={() => navigate('/dashboard')}
              >
                Open Full Admin Console
              </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">Weekly Revenue</span>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {current.revenue}
                </p>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {current.change} vs last week
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">Scheduled Today</span>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {current.appointmentsToday}
                </p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  92% capacity filled
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">Top Service</span>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1 truncate">
                  {current.topService}
                </p>
                <span className="text-[11px] text-brand-600 dark:text-brand-400">
                  High demand
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">Staff Status</span>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
                  {current.staffOnline}
                </p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  All checked in
                </span>
              </div>
            </div>

            {/* Live Appointments Feed */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Upcoming Appointments for Today
                </span>
                <span className="text-xs text-slate-400">Auto-refreshing</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {current.recent.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.service}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-slate-900 dark:text-slate-100">{item.time}</p>
                        <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">{item.price}</p>
                      </div>
                      <Badge
                        variant={item.status === 'Completed' ? 'default' : item.status === 'In Progress' ? 'info' : 'success'}
                        size="xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

