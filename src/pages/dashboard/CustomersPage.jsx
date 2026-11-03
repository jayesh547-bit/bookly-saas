import React, { useState, useMemo } from 'react';
import {
  Users2,
  Search,
  PlusCircle,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Tag,
  Eye,
  Edit,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function CustomersPage() {
  const { customers, bookings, addCustomer, updateCustomer, deleteCustomer } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [detailCustomer, setDetailCustomer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tag: 'New',
    notes: '',
  });

  const tags = ['All', 'VIP', 'Regular', 'New'];

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (selectedTag !== 'All' && c.tag !== selectedTag) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name?.toLowerCase().includes(q);
        const matchesEmail = c.email?.toLowerCase().includes(q);
        const matchesPhone = c.phone?.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone) return false;
      }
      return true;
    });
  }, [customers, selectedTag, searchQuery]);

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      tag: 'New',
      notes: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditCustomer(c);
    setFormData({
      name: c.name,
      email: c.email,
      phone: c.phone,
      tag: c.tag || 'Regular',
      notes: c.notes || '',
    });
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (editCustomer) {
      updateCustomer(editCustomer.id, formData);
      setEditCustomer(null);
    } else {
      addCustomer(formData);
      setIsAddModalOpen(false);
    }
  };

  // Get customer's booking history
  const customerHistory = detailCustomer
    ? bookings.filter((b) => b.customerId === detailCustomer.id || b.customerEmail === detailCustomer.email)
    : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Customer Directory & CRM
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your client profiles, track lifetime spend, and record personalized preferences.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={PlusCircle}
          onClick={handleOpenAdd}
          className="shadow-glow-brand self-start sm:self-auto"
        >
          Add Customer
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tag filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  selectedTag === t
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, phone..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      {filteredCustomers.length === 0 ? (
        <EmptyState
          icon={Users2}
          title="No clients found"
          description="Adjust your search query or add a new customer to your studio roster."
          actionLabel="Add Customer"
          actionIcon={PlusCircle}
          onAction={handleOpenAdd}
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Tier Tag</th>
                  <th className="py-3 px-4">Visits</th>
                  <th className="py-3 px-4">Lifetime Spend</th>
                  <th className="py-3 px-4">Last Visit</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Client Avatar & Name */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/20 shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {c.name}
                          </p>
                          <span className="text-[11px] text-slate-400">
                            Client since {c.createdAt}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="text-slate-800 dark:text-slate-200">{c.email}</p>
                      <p className="text-xs text-slate-400">{c.phone}</p>
                    </td>

                    {/* Tag */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge
                        variant={
                          c.tag === 'VIP' ? 'purple' : c.tag === 'Regular' ? 'primary' : 'success'
                        }
                        size="xs"
                        dot
                      >
                        {c.tag}
                      </Badge>
                    </td>

                    {/* Visits */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {c.totalVisits || 0} visits
                    </td>

                    {/* Lifetime Spend */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {formatCurrency(c.totalSpent)}
                    </td>

                    {/* Last Visit */}
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {c.lastVisit === 'None' ? 'None' : formatDate(c.lastVisit)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDetailCustomer(c)}
                          title="View customer profile & history"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(c)}
                          title="Edit customer details"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(c.id)}
                          title="Delete customer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add / Edit Customer Modal */}
      {(isAddModalOpen || editCustomer) && (
        <Modal
          isOpen={isAddModalOpen || !!editCustomer}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditCustomer(null);
          }}
          title={editCustomer ? 'Edit Customer' : 'Add New Customer'}
          description="Enter the client contact information and studio notes."
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSaveCustomer} className="space-y-3.5">
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Sophia Vance"
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sophia@example.com"
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              required
            />

            <Select
              label="Client Category Tag"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            >
              <option value="VIP">VIP Client</option>
              <option value="Regular">Regular</option>
              <option value="New">New Client</option>
            </Select>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Client Notes, Formulas & Preferences
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="e.g. Prefers organic hair oil, allergic to synthetic fragranced soaps..."
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditCustomer(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editCustomer ? 'Save Changes' : 'Create Customer'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Customer Detail Drawer / Modal */}
      {detailCustomer && (
        <Modal
          isOpen={!!detailCustomer}
          onClose={() => setDetailCustomer(null)}
          title={detailCustomer.name}
          description="Complete client dossier and previous appointment history."
          maxWidth="max-w-xl"
        >
          <div className="space-y-5">
            {/* Top profile card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
              <img
                src={detailCustomer.avatar}
                alt={detailCustomer.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-500/30"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {detailCustomer.name}
                  </h4>
                  <Badge variant={detailCustomer.tag === 'VIP' ? 'purple' : 'primary'} size="xs">
                    {detailCustomer.tag}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>{detailCustomer.email}</span>
                  <span>{detailCustomer.phone}</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs text-slate-400 block">Total Visits</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {detailCustomer.totalVisits}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs text-slate-400 block">Total Spend</span>
                <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                  {formatCurrency(detailCustomer.totalSpent)}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs text-slate-400 block">Last Visit</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {formatDate(detailCustomer.lastVisit)}
                </span>
              </div>
            </div>

            {/* Notes */}
            {detailCustomer.notes && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-[10px] text-amber-700 dark:text-amber-400">
                  Client Notes & Preferences
                </span>
                <p>{detailCustomer.notes}</p>
              </div>
            )}

            {/* Booking History */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Past & Upcoming Appointments ({customerHistory.length})
              </span>
              {customerHistory.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No historical appointments on record.</p>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                  {customerHistory.map((h) => (
                    <div key={h.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{h.serviceName}</p>
                        <p className="text-slate-500">{formatDate(h.date)} at {h.time} • {h.staff}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(h.price)}</p>
                        <Badge variant="default" size="xs">{h.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" size="sm" onClick={() => setDetailCustomer(null)}>
                Close Dossier
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
          title="Delete Customer Profile?"
          description="Are you sure you want to remove this client from your CRM?"
          maxWidth="max-w-sm"
        >
          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                deleteCustomer(deleteConfirmId);
                setDeleteConfirmId(null);
              }}
            >
              Confirm Remove
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

