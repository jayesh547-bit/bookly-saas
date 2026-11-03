import React, { useState, useMemo } from 'react';
import {
  CalendarCheck2,
  Search,
  Filter,
  PlusCircle,
  MoreVertical,
  Calendar,
  Clock,
  DollarSign,
  User,
  Phone,
  Mail,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import {
  formatCurrency,
  formatDate,
  formatTime,
  formatDuration,
  getStatusConfig,
} from '../../utils/formatters';
import { NewBookingModal } from '../../components/bookings/NewBookingModal';

export function BookingsPage() {
  const { bookings, updateBookingStatus, deleteBooking } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const [detailBooking, setDetailBooking] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const statuses = [
    { id: 'all', label: 'All Bookings' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'pending', label: 'Pending' },
  ];

  // Filtering
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Status filter
      if (selectedStatus !== 'all' && b.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = b.customerName?.toLowerCase().includes(query);
        const matchesService = b.serviceName?.toLowerCase().includes(query);
        const matchesId = b.id?.toLowerCase().includes(query);
        const matchesStaff = b.staff?.toLowerCase().includes(query);
        if (!matchesName && !matchesService && !matchesId && !matchesStaff) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, selectedStatus, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Booking & Appointment Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor, reschedule, update statuses, and create client bookings.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={PlusCircle}
          onClick={() => setNewBookingModalOpen(true)}
          className="shadow-glow-brand self-start sm:self-auto"
        >
          Create Booking
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {statuses.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  selectedStatus === st.id
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Search Input & View Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search client, service, ID..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* View Switcher */}
            <div className="hidden sm:flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                aria-label="Table view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Bookings Display */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          title="No bookings match your filter"
          description="Try selecting a different status, clearing the search query, or create a brand new appointment."
          actionLabel="Schedule Appointment"
          actionIcon={PlusCircle}
          onAction={() => setNewBookingModalOpen(true)}
        />
      ) : viewMode === 'table' ? (
        /* Table View */
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Booking ID & Client</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Schedule</th>
                  <th className="py-3 px-4">Specialist</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredBookings.map((b) => {
                  const statusCfg = getStatusConfig(b.status);
                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Customer & ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center shrink-0">
                            {b.customerName ? b.customerName.charAt(0) : 'C'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {b.customerName}
                            </p>
                            <span className="text-[11px] font-mono text-slate-400">
                              {b.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          {b.serviceName}
                        </p>
                        <span className="text-xs text-slate-400">
                          {formatDuration(b.duration)}
                        </span>
                      </td>

                      {/* Schedule */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatTime(b.time)}</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {formatDate(b.date)}
                        </span>
                      </td>

                      {/* Specialist */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {b.staff}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(b.price)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusCfg.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                          {statusCfg.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setDetailBooking(b)}
                            title="View appointment details"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {b.status === 'confirmed' && (
                            <button
                              type="button"
                              onClick={() => updateBookingStatus(b.id, 'completed')}
                              title="Mark as completed"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {b.status !== 'cancelled' && (
                            <button
                              type="button"
                              onClick={() => updateBookingStatus(b.id, 'cancelled')}
                              title="Cancel booking"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(b.id)}
                            title="Delete booking"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBookings.map((b) => {
            const statusCfg = getStatusConfig(b.status);
            return (
              <Card key={b.id} hover className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusCfg.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                      {statusCfg.label}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{b.id}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {b.serviceName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {formatDuration(b.duration)} • {formatCurrency(b.price)}
                  </p>

                  <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium">{b.customerName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {formatDate(b.date)} at {formatTime(b.time)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Specialist: {b.staff}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setDetailBooking(b)}
                  >
                    View Details
                  </Button>

                  <div className="flex items-center gap-1">
                    {b.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => updateBookingStatus(b.id, 'completed')}
                        className="px-2 py-1 rounded-lg text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100"
                      >
                        Complete
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => updateBookingStatus(b.id, 'cancelled')}
                        className="px-2 py-1 rounded-lg text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Booking Detail Modal */}
      {detailBooking && (
        <Modal
          isOpen={!!detailBooking}
          onClose={() => setDetailBooking(null)}
          title={`Booking ${detailBooking.id}`}
          description="Detailed appointment record and client information."
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Status</span>
                <Badge
                  variant={
                    detailBooking.status === 'completed'
                      ? 'default'
                      : detailBooking.status === 'in-progress'
                      ? 'info'
                      : detailBooking.status === 'cancelled'
                      ? 'danger'
                      : 'success'
                  }
                  size="xs"
                  dot
                >
                  {detailBooking.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900 dark:text-white">
                  {detailBooking.serviceName}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatCurrency(detailBooking.price)}
                </span>
              </div>
            </div>

            {/* Client Section */}
            <div className="space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400">
                Client Profile
              </span>
              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">
                  {detailBooking.customerName}
                </p>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{detailBooking.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{detailBooking.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* Timing & Staff */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">Date & Time</span>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {formatDate(detailBooking.date)}
                </p>
                <p className="text-slate-500">{formatTime(detailBooking.time)}</p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">Staff Specialist</span>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {detailBooking.staff}
                </p>
                <p className="text-slate-500">{detailBooking.duration} mins</p>
              </div>
            </div>

            {/* Notes */}
            {detailBooking.notes && (
              <div className="text-xs space-y-1">
                <span className="font-bold uppercase tracking-wider text-slate-400">
                  Appointment Notes
                </span>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  {detailBooking.notes}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" size="sm" onClick={() => setDetailBooking(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Delete Booking Record?"
          description="Are you sure you want to remove this booking permanently?"
          maxWidth="max-w-sm"
        >
          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
              Keep Booking
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                deleteBooking(deleteConfirmId);
                setDeleteConfirmId(null);
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </Modal>
      )}

      <NewBookingModal
        isOpen={newBookingModalOpen}
        onClose={() => setNewBookingModalOpen(false)}
      />
    </div>
  );
}

