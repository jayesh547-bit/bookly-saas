import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  CalendarCheck2,
  Users2,
  Percent,
  PlusCircle,
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  TrendingUp,
  MoreVertical,
  CheckCircle,
  XCircle,
  Play,
  FileDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  formatCurrency,
  formatDate,
  formatTime,
  getStatusConfig,
} from '../../utils/formatters';
import { revenueDataWeekly, revenueDataMonthly, servicePopularity } from '../../data/mockAnalytics';
import { NewBookingModal } from '../../components/bookings/NewBookingModal';

export function OverviewPage() {
  const { bookings, customers, services, updateBookingStatus } = useData();
  const { isDark } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();

  const [timeRange, setTimeRange] = useState('weekly');
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  // Derive today's appointments (current date is 2026-11-03)
  const todayDateString = '2026-11-03';
  const todaysAppointments = bookings.filter((b) => b.date === todayDateString);

  // Compute stats
  const totalRevenue = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + Number(b.price || 0) : sum), 0);
  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'in-progress').length;
  const totalClientsCount = customers.length;

  const chartData = timeRange === 'weekly' ? revenueDataWeekly : revenueDataMonthly;

  const handleExportSummary = () => {
    toast.success('Report Exported', 'Overview summary downloaded as CSV.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Welcome Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Studio Performance & Live Queue
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time pulse of your bookings, clients, and revenue generation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={FileDown}
            onClick={handleExportSummary}
            className="text-xs"
          >
            Export Report
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setNewBookingModalOpen(true)}
            className="text-xs shadow-glow-brand"
          >
            New Booking
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue || 52100)}
          change="+18.4%"
          isPositive={true}
          changePeriod="vs last month"
          icon={DollarSign}
          iconColor="text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
        />

        <StatCard
          title="Active Bookings"
          value={bookings.length.toString()}
          change="+12.2%"
          isPositive={true}
          changePeriod="vs last month"
          icon={CalendarCheck2}
          iconColor="text-brand-500 bg-brand-50 dark:bg-brand-950/40"
        />

        <StatCard
          title="Total Clients"
          value={totalClientsCount.toString()}
          change="+24.0%"
          isPositive={true}
          changePeriod="vs last month"
          icon={Users2}
          iconColor="text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40"
        />

        <StatCard
          title="Occupancy Rate"
          value="91.4%"
          change="+4.8%"
          isPositive={true}
          changePeriod="vs last month"
          icon={Percent}
          iconColor="text-purple-500 bg-purple-50 dark:bg-purple-950/40"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Overview Chart (8 cols) */}
        <Card className="lg:col-span-8 flex flex-col justify-between">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle>Revenue Velocity & Bookings</CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Gross booking revenue trajectory over time
              </p>
            </div>

            {/* Timeframe Pill Switcher */}
            <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setTimeRange('weekly')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  timeRange === 'weekly'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                7-Day Run
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('monthly')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  timeRange === 'monthly'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                6 Months
              </button>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="h-[280px] sm:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                  />
                  <XAxis
                    dataKey={timeRange === 'weekly' ? 'day' : 'month'}
                    stroke={isDark ? '#64748B' : '#94A3B8'}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke={isDark ? '#64748B' : '#94A3B8'}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                      borderColor: isDark ? '#1E293B' : '#E2E8F0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`$${val}`, 'Gross Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366F1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Service Category Breakdown (4 cols) */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Service Demand Share</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Distribution of bookings by category
            </p>
          </CardHeader>

          <CardContent className="pt-2 flex flex-col items-center justify-center">
            <div className="h-[210px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={servicePopularity}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {servicePopularity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                      borderColor: isDark ? '#1E293B' : '#E2E8F0',
                      borderRadius: '10px',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`${val}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-2 w-full mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              {servicePopularity.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 dark:text-slate-400 truncate">
                    {item.name}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200 ml-auto">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid: Today's Schedule & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule Table (8 cols) */}
        <Card className="lg:col-span-8">
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Today's Schedule</CardTitle>
                <Badge variant="primary" size="xs">
                  {todaysAppointments.length} Appointments
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tuesday, November 3, 2026
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              iconRight={ArrowRight}
              onClick={() => navigate('/dashboard/bookings')}
              className="text-xs"
            >
              View All
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            {todaysAppointments.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No appointments scheduled for today.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 overflow-x-auto">
                {todaysAppointments.map((appt) => {
                  const statusCfg = getStatusConfig(appt.status);
                  return (
                    <div
                      key={appt.id}
                      className="flex items-center justify-between p-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors text-xs sm:text-sm min-w-[500px]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center shrink-0 border border-brand-200/50 dark:border-brand-800/40">
                          {appt.customerName ? appt.customerName.charAt(0) : 'C'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {appt.customerName}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              {appt.id}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {appt.serviceName} • {appt.staff}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {formatTime(appt.time)}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            ${appt.price} ({appt.duration} min)
                          </p>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusCfg.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                          {statusCfg.label}
                        </span>

                        {/* Quick 1-click status actions */}
                        <div className="flex items-center gap-1">
                          {appt.status !== 'completed' && (
                            <button
                              type="button"
                              onClick={() => updateBookingStatus(appt.id, 'completed')}
                              title="Mark as Completed"
                              className="p-1 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {appt.status === 'confirmed' && (
                            <button
                              type="button"
                              onClick={() => updateBookingStatus(appt.id, 'in-progress')}
                              title="Check In / Start Appointment"
                              className="p-1 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                            <button
                              type="button"
                              onClick={() => updateBookingStatus(appt.id, 'cancelled')}
                              title="Cancel Booking"
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Operations & Activity Feed (4 cols) */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Recent Activity Stream</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live notifications & client updates
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {[
              {
                title: 'New Online Appointment',
                desc: 'Maya Patel reserved Hydra-Infusion Glow Facial for 2:30 PM.',
                time: '14 min ago',
                dot: 'bg-emerald-500',
              },
              {
                title: 'Payment Confirmed',
                desc: 'Received $250.00 from Marcus Chen for Advisory Session.',
                time: '42 min ago',
                dot: 'bg-indigo-500',
              },
              {
                title: 'Appointment Completed',
                desc: 'Elena Gilbert completed Signature Haircut for Sophia Vance.',
                time: '2 hours ago',
                dot: 'bg-slate-400',
              },
              {
                title: 'Client Profile Updated',
                desc: 'Added organic color formula notes for Zoe Sterling.',
                time: '3 hours ago',
                dot: 'bg-amber-500',
              },
            ].map((act, index) => (
              <div key={index} className="flex items-start gap-3 text-xs">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {act.title}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {act.desc}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <NewBookingModal
        isOpen={newBookingModalOpen}
        onClose={() => setNewBookingModalOpen(false)}
      />
    </div>
  );
}

