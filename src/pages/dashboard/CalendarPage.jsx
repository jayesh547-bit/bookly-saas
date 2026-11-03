import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  PlusCircle,
  User,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  formatDate,
  formatTime,
  formatCurrency,
  formatDuration,
  getStatusConfig,
} from '../../utils/formatters';
import { NewBookingModal } from '../../components/bookings/NewBookingModal';

export function CalendarPage() {
  const { bookings } = useData();

  const [viewMode, setViewMode] = useState('week'); // 'month', 'week', 'day'
  const [selectedDate, setSelectedDate] = useState('2026-11-03');
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const [slotPrefill, setSlotPrefill] = useState({ date: '2026-11-03', time: '10:00' });
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Time slots for Day and Week views
  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ];

  // Week days around 2026-11-03 (Tue)
  const weekDays = [
    { date: '2026-11-02', day: 'Mon', dayNum: '02' },
    { date: '2026-11-03', day: 'Tue', dayNum: '03', isToday: true },
    { date: '2026-11-04', day: 'Wed', dayNum: '04' },
    { date: '2026-11-05', day: 'Thu', dayNum: '05' },
    { date: '2026-11-06', day: 'Fri', dayNum: '06' },
    { date: '2026-11-07', day: 'Sat', dayNum: '07' },
    { date: '2026-11-08', day: 'Sun', dayNum: '08' },
  ];

  // Month days for November 2026 (Nov 1 is Sunday)
  const monthDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-11-${day < 10 ? '0' + day : day}`;
    return {
      day,
      date: dateStr,
      isToday: dateStr === '2026-11-03',
      bookings: bookings.filter((b) => b.date === dateStr),
    };
  });

  const handleSlotClick = (date, time) => {
    setSlotPrefill({ date, time });
    setNewBookingModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interactive Calendar & Schedule
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Click any empty slot to book instantly or click an appointment to inspect.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80">
            {['month', 'week', 'day'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  viewMode === mode
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => {
              setSlotPrefill({ date: '2026-11-03', time: '10:00' });
              setNewBookingModalOpen(true);
            }}
            className="shadow-glow-brand"
          >
            New Slot
          </Button>
        </div>
      </div>

      {/* Navigation Sub-header */}
      <Card className="p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setSelectedDate('2026-11-03')}
          >
            Today
          </Button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              aria-label="Previous period"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              aria-label="Next period"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="text-sm font-bold text-slate-900 dark:text-white ml-2">
            November 2026
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Confirmed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Completed</span>
          </div>
        </div>
      </Card>

      {/* WEEK VIEW */}
      {viewMode === 'week' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* Day headers */}
              <div className="grid grid-cols-8 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
                <div className="p-3 text-xs font-semibold text-slate-400 uppercase text-center border-r border-slate-200/80 dark:border-slate-800">
                  Time
                </div>
                {weekDays.map((d) => (
                  <div
                    key={d.date}
                    className={`p-3 text-center border-r border-slate-200/80 dark:border-slate-800 last:border-r-0 ${
                      d.isToday ? 'bg-brand-50/60 dark:bg-brand-950/30' : ''
                    }`}
                  >
                    <p className="text-[11px] font-semibold text-slate-500 uppercase">
                      {d.day}
                    </p>
                    <p
                      className={`text-base font-extrabold mt-0.5 inline-block px-2 py-0.5 rounded-full ${
                        d.isToday
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {d.dayNum}
                    </p>
                  </div>
                ))}
              </div>

              {/* Time rows */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {timeSlots.map((slotTime) => (
                  <div key={slotTime} className="grid grid-cols-8 min-h-[58px]">
                    {/* Time Label */}
                    <div className="p-2 text-xs font-mono text-slate-400 text-center border-r border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
                      {slotTime}
                    </div>

                    {/* Columns for each day */}
                    {weekDays.map((d) => {
                      // Find bookings in this day and roughly this slot
                      const appts = bookings.filter(
                        (b) =>
                          b.date === d.date &&
                          b.time.split(':')[0] === slotTime.split(':')[0]
                      );

                      return (
                        <div
                          key={d.date + slotTime}
                          onClick={() => {
                            if (appts.length === 0) {
                              handleSlotClick(d.date, slotTime);
                            }
                          }}
                          className={`p-1.5 border-r border-slate-100 dark:border-slate-800/60 last:border-r-0 transition-colors cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/40 relative group ${
                            d.isToday ? 'bg-brand-50/10 dark:bg-brand-950/10' : ''
                          }`}
                        >
                          {appts.map((appt) => {
                            const statusCfg = getStatusConfig(appt.status);
                            return (
                              <div
                                key={appt.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBooking(appt);
                                }}
                                className={`p-2 rounded-xl text-xs font-medium border shadow-xs transition-transform hover:scale-[1.02] cursor-pointer ${statusCfg.bg}`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold truncate">
                                    {appt.customerName}
                                  </span>
                                  <span className="text-[10px] opacity-80">
                                    {formatTime(appt.time)}
                                  </span>
                                </div>
                                <p className="text-[11px] truncate opacity-90 mt-0.5">
                                  {appt.serviceName}
                                </p>
                              </div>
                            );
                          })}

                          {appts.length === 0 && (
                            <span className="opacity-0 group-hover:opacity-100 text-[10px] text-brand-600 dark:text-brand-400 font-semibold flex items-center justify-center h-full">
                              + Book
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* MONTH VIEW */}
      {viewMode === 'month' && (
        <Card className="p-4 sm:p-6 overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div
                key={d}
                className="bg-slate-50 dark:bg-slate-900/90 p-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                {d}
              </div>
            ))}

            {monthDays.map((m) => (
              <div
                key={m.date}
                onClick={() => handleSlotClick(m.date, '10:00')}
                className={`bg-white dark:bg-dark-card p-2 min-h-[96px] transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex flex-col justify-between ${
                  m.isToday ? 'ring-2 ring-inset ring-brand-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      m.isToday
                        ? 'bg-brand-600 text-white'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {m.day}
                  </span>
                  {m.bookings.length > 0 && (
                    <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400">
                      {m.bookings.length} appts
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  {m.bookings.slice(0, 2).map((b) => (
                    <div
                      key={b.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(b);
                      }}
                      className="px-1.5 py-0.5 text-[10px] font-medium rounded truncate bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/50 dark:border-brand-800/40"
                    >
                      {formatTime(b.time)} {b.customerName}
                    </div>
                  ))}
                  {m.bookings.length > 2 && (
                    <span className="text-[9px] text-slate-400 block pl-1">
                      +{m.bookings.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* DAY VIEW */}
      {viewMode === 'day' && (
        <Card className="divide-y divide-slate-100 dark:divide-slate-800">
          <CardHeader>
            <CardTitle>Schedule for Tuesday, Nov 3, 2026</CardTitle>
          </CardHeader>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/70">
            {timeSlots.map((time) => {
              const dayAppts = bookings.filter(
                (b) => b.date === '2026-11-03' && b.time.split(':')[0] === time.split(':')[0]
              );
              return (
                <div
                  key={time}
                  onClick={() => {
                    if (dayAppts.length === 0) handleSlotClick('2026-11-03', time);
                  }}
                  className="flex items-start gap-4 p-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  <span className="w-16 text-xs font-mono text-slate-400 pt-1 shrink-0">
                    {time}
                  </span>

                  <div className="flex-1 min-w-0">
                    {dayAppts.length === 0 ? (
                      <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        + Click to schedule appointment at {time}
                      </span>
                    ) : (
                      <div className="space-y-2">
                        {dayAppts.map((appt) => {
                          const statusCfg = getStatusConfig(appt.status);
                          return (
                            <div
                              key={appt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBooking(appt);
                              }}
                              className={`p-3 rounded-xl border flex items-center justify-between ${statusCfg.bg}`}
                            >
                              <div>
                                <p className="font-bold text-sm">{appt.customerName}</p>
                                <p className="text-xs opacity-90">
                                  {appt.serviceName} • Specialist: {appt.staff}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-sm">
                                  {formatCurrency(appt.price)}
                                </p>
                                <span className="text-xs">{appt.duration} min</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Appointment Detail Popup */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Booking ${selectedBooking.id}`}
          description={`${selectedBooking.customerName} – ${selectedBooking.serviceName}`}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">Date & Time</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {formatDate(selectedBooking.date)}
                </p>
                <p className="text-slate-500">{formatTime(selectedBooking.time)}</p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">Fee & Duration</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {formatCurrency(selectedBooking.price)}
                </p>
                <p className="text-slate-500">{selectedBooking.duration} mins</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-slate-400 block mb-1">Specialist</span>
              <p className="font-semibold text-slate-900 dark:text-white">
                {selectedBooking.staff}
              </p>
            </div>

            {selectedBooking.notes && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                {selectedBooking.notes}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button variant="primary" size="sm" onClick={() => setSelectedBooking(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* New Booking Modal with prefill */}
      <NewBookingModal
        isOpen={newBookingModalOpen}
        onClose={() => setNewBookingModalOpen(false)}
        initialDate={slotPrefill.date}
        initialTime={slotPrefill.time}
      />
    </div>
  );
}

