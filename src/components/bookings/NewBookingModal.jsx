import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { useData } from '../../context/DataContext';
import { mockStaffList } from '../../data/mockBookings';
import { Calendar, Clock, DollarSign, User, Sparkles, CheckCircle2 } from 'lucide-react';

export function NewBookingModal({ isOpen, onClose, initialDate, initialTime }) {
  const { customers, services, addBooking } = useData();

  const [customerId, setCustomerId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('2026-11-03');
  const [time, setTime] = useState('10:00');
  const [staff, setStaff] = useState('Elena Gilbert');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Sync initial props
  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialTime) setTime(initialTime);
    if (customers.length > 0 && !customerId) setCustomerId(customers[0].id);
    if (services.length > 0 && !serviceId) setServiceId(services[0].id);
  }, [initialDate, initialTime, customers, services, isOpen]);

  const selectedService = services.find((s) => s.id === serviceId) || services[0];
  const selectedCustomer = customers.find((c) => c.id === customerId) || customers[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!customerId) {
      setError('Please select or specify a customer.');
      return;
    }
    if (!serviceId) {
      setError('Please select a service.');
      return;
    }
    if (!date || !time) {
      setError('Please select date and time.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addBooking({
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        customerEmail: selectedCustomer.email,
        customerPhone: selectedCustomer.phone,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        serviceCategory: selectedService.category,
        price: selectedService.price,
        duration: selectedService.duration,
        date: date,
        time: time,
        staff: staff,
        status: 'confirmed',
        paymentStatus: 'paid',
        notes: notes || 'Booked via admin scheduling panel.',
      });

      setIsSubmitting(false);
      onClose();
    }, 350);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule New Appointment"
      description="Book an appointment for an existing client or service."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Customer Select */}
        <div>
          <Select
            label="Client / Customer"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.email})
              </option>
            ))}
          </Select>
        </div>

        {/* Service Select */}
        <div>
          <Select
            label="Service"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} – ${s.price} ({s.duration} min)
              </option>
            ))}
          </Select>
          {selectedService && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
              {selectedService.description}
            </p>
          )}
        </div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Appointment Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            icon={Calendar}
            required
          />

          <Select
            label="Time Slot"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="08:30">08:30 AM</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:30">01:30 PM</option>
            <option value="14:30">02:30 PM</option>
            <option value="15:30">03:30 PM</option>
            <option value="16:30">04:30 PM</option>
            <option value="17:30">05:30 PM</option>
            <option value="18:30">06:30 PM</option>
          </Select>
        </div>

        {/* Staff Assignment */}
        <Select
          label="Staff Specialist"
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
        >
          {mockStaffList.map((st) => (
            <option key={st.id} value={st.name}>
              {st.name} – {st.role}
            </option>
          ))}
        </Select>

        {/* Appointment Notes */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
            Internal Notes & Client Requests
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="e.g. Client requested warm towel and consultation on skincare..."
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {/* Summary pricing ribbon */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-500 dark:text-slate-400">Total Booking Value:</span>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              ${selectedService?.price || 0}
            </p>
          </div>
          <div className="text-right space-y-0.5">
            <span className="text-slate-500 dark:text-slate-400">Duration:</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {selectedService?.duration || 0} minutes
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
            Confirm Appointment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

