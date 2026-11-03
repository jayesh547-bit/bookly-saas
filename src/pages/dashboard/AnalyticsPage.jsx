import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Users2,
  CalendarCheck2,
  ArrowUpRight,
  Download,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatCurrency } from '../../utils/formatters';
import {
  revenueDataWeekly,
  revenueDataMonthly,
  customerGrowthData,
  peakHoursData,
} from '../../data/mockAnalytics';

export function AnalyticsPage() {
  const { bookings, services } = useData();
  const { isDark } = useTheme();
  const toast = useToast();

  const [timeframe, setTimeframe] = useState('30d');

  const topServicesLeaderboard = [
    { name: 'Signature Haircut & Style', count: 165, revenue: 10725, share: 28 },
    { name: 'Executive Business Strategy', count: 42, revenue: 10500, share: 27 },
    { name: 'Balayage & Gloss Finish', count: 48, revenue: 9360, share: 24 },
    { name: 'Hydra-Infusion Glow Facial', count: 64, revenue: 8320, share: 21 },
  ];

  const handleExport = () => {
    toast.success('Analytics Exported', 'Full metrics workbook downloaded as CSV.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Revenue & Growth Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Deep dive into studio earnings, booking cadence, and client retention patterns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80">
            {['7d', '30d', '90d', '1y'].map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg uppercase transition-all ${
                  timeframe === tf
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" icon={Download} onClick={handleExport} className="text-xs">
            Export Data
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Average Ticket Size"
          value="$119.70"
          change="+$14.20"
          isPositive={true}
          changePeriod="vs last month"
          icon={DollarSign}
          iconColor="text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
        />

        <StatCard
          title="Client Retention"
          value="74.2%"
          change="+6.1%"
          isPositive={true}
          changePeriod="vs industry avg"
          icon={Users2}
          iconColor="text-brand-500 bg-brand-50 dark:bg-brand-950/40"
        />

        <StatCard
          title="No-Show Rate"
          value="3.1%"
          change="-11.4%"
          isPositive={true}
          changePeriod="since SMS alerts"
          icon={CalendarCheck2}
          iconColor="text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
        />

        <StatCard
          title="Repeat Booking Velocity"
          value="24.8 days"
          change="3.2 days faster"
          isPositive={true}
          changePeriod="re-booking cycle"
          icon={TrendingUp}
          iconColor="text-amber-500 bg-amber-50 dark:bg-amber-950/40"
        />
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-7 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Gross Revenue Progression</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Monthly gross volume (USD)
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueDataMonthly} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                  />
                  <XAxis dataKey="month" stroke={isDark ? '#64748B' : '#94A3B8'} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={isDark ? '#64748B' : '#94A3B8'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                      borderColor: isDark ? '#1E293B' : '#E2E8F0',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`$${val.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2.5} fill="url(#areaRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Day-of-Week Volume Bar Chart */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Bookings by Day of Week</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Appointment volume distribution
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueDataWeekly} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                  />
                  <XAxis dataKey="day" stroke={isDark ? '#64748B' : '#94A3B8'} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={isDark ? '#64748B' : '#94A3B8'} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                      borderColor: isDark ? '#1E293B' : '#E2E8F0',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [val, 'Bookings']}
                  />
                  <Bar dataKey="bookings" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Customer Growth Line Chart */}
        <Card className="lg:col-span-6 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Client Acquisition vs Retention</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              New clients vs returning visits monthly
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowthData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                  />
                  <XAxis dataKey="month" stroke={isDark ? '#64748B' : '#94A3B8'} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={isDark ? '#64748B' : '#94A3B8'} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                      borderColor: isDark ? '#1E293B' : '#E2E8F0',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Line type="monotone" dataKey="returningCustomers" name="Returning" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="newCustomers" name="New Clients" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Services Leaderboard */}
        <Card className="lg:col-span-6 flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Revenue Generating Services</CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Ranked by gross revenue and appointment demand
                </p>
              </div>
              <Badge variant="primary" size="xs">
                Leaderboard
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {topServicesLeaderboard.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 dark:text-slate-400">
                      {item.count} bookings
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-600 dark:bg-brand-500"
                    style={{ width: `${item.share * 3.5}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

