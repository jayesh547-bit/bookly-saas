import React, { useState } from 'react';
import {
  Building2,
  Clock,
  Bell,
  Users2,
  ShieldAlert,
  RotateCcw,
  Save,
  CheckCircle2,
  PlusCircle,
  Trash2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { mockStaffList } from '../../data/mockBookings';

export function SettingsPage() {
  const {
    businessProfile,
    operatingHours,
    notificationSettings,
    updateBusinessProfile,
    updateOperatingHours,
    updateNotificationSettings,
    resetToDemoData,
  } = useData();
  const { user } = useAuth();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Local form states
  const [profileForm, setProfileForm] = useState({ ...businessProfile });
  const [hoursForm, setHoursForm] = useState([...operatingHours]);
  const [notifForm, setNotifForm] = useState({ ...notificationSettings });

  // Handle Profile save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateBusinessProfile(profileForm);
  };

  // Handle Hours toggle & update
  const handleToggleDay = (index) => {
    const updated = [...hoursForm];
    updated[index].enabled = !updated[index].enabled;
    setHoursForm(updated);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...hoursForm];
    updated[index][field] = value;
    setHoursForm(updated);
  };

  const handleSaveHours = (e) => {
    e.preventDefault();
    updateOperatingHours(hoursForm);
  };

  // Handle Notification toggle
  const handleToggleNotif = (key) => {
    const updated = { ...notifForm, [key]: !notifForm[key] };
    setNotifForm(updated);
    updateNotificationSettings(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Platform & Business Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure business metadata, hours of operation, alerts, and system data.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px">
        {[
          { id: 'profile', label: 'Business Profile', icon: Building2 },
          { id: 'hours', label: 'Operating Hours', icon: Clock },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'staff', label: 'Team Specialists', icon: Users2 },
          { id: 'danger', label: 'Data Management', icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BUSINESS PROFILE */}
      {activeTab === 'profile' && (
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Studio Information</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              These details appear on your public booking page and email confirmations.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Business Name"
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  required
                />

                <Input
                  label="Category / Industry"
                  type="text"
                  value={profileForm.category}
                  onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Tagline & Headline"
                type="text"
                value={profileForm.tagline}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Physical Studio Address"
                type="text"
                value={profileForm.address}
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Default Currency"
                  value={profileForm.currency}
                  onChange={(e) => setProfileForm({ ...profileForm, currency: e.target.value })}
                >
                  <option value="USD">USD ($ - United States Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                  <option value="CAD">CAD ($ - Canadian Dollar)</option>
                </Select>

                <Select
                  label="Studio Timezone"
                  value={profileForm.timezone}
                  onChange={(e) => setProfileForm({ ...profileForm, timezone: e.target.value })}
                >
                  <option value="America/New_York (EST)">America/New_York (EST)</option>
                  <option value="America/Chicago (CST)">America/Chicago (CST)</option>
                  <option value="America/Denver (MST)">America/Denver (MST)</option>
                  <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                  <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                </Select>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button variant="primary" size="sm" type="submit" icon={Save}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: OPERATING HOURS */}
      {activeTab === 'hours' && (
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Weekly Working Hours</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify open and close hours for client appointments each day.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveHours} className="space-y-3">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {hoursForm.map((dayObj, idx) => (
                  <div
                    key={dayObj.day}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-3 w-32">
                      <input
                        type="checkbox"
                        checked={dayObj.enabled}
                        onChange={() => handleToggleDay(idx)}
                        className="rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500"
                        id={`check-${dayObj.day}`}
                      />
                      <label
                        htmlFor={`check-${dayObj.day}`}
                        className={`font-semibold cursor-pointer ${
                          dayObj.enabled
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-400 dark:text-slate-500 line-through'
                        }`}
                      >
                        {dayObj.day}
                      </label>
                    </div>

                    {dayObj.enabled ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={dayObj.open}
                          onChange={(e) => handleTimeChange(idx, 'open', e.target.value)}
                          className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                        <span className="text-slate-400">to</span>
                        <input
                          type="time"
                          value={dayObj.close}
                          onChange={(e) => handleTimeChange(idx, 'close', e.target.value)}
                          className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-md">
                        Closed All Day
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button variant="primary" size="sm" type="submit" icon={Save}>
                  Save Schedule
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Notification & Reminder Channels</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Control when staff and clients receive automated notifications.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: 'emailAlerts',
                title: 'Email Confirmations & Receipts',
                desc: 'Send instant email confirmation receipts when appointments are booked.',
              },
              {
                key: 'smsReminders',
                title: 'Multi-Channel SMS Reminders',
                desc: 'Send automated text reminders 24 hours prior to scheduled appointment.',
              },
              {
                key: 'newBookingNotification',
                title: 'Staff Push Notification',
                desc: 'Notify specialist immediately upon new booking or rescheduling.',
              },
              {
                key: 'cancellationAlerts',
                title: 'Cancellation & Reschedule Notices',
                desc: 'Notify administration when a client cancels or reschedules.',
              },
              {
                key: 'dailySummaryDigest',
                title: 'Daily Morning Schedule Digest',
                desc: 'Receive a consolidated summary of daily appointments every morning at 7:00 AM.',
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 dark:border-slate-800"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-md">
                    {item.desc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm[item.key]}
                  onChange={() => handleToggleNotif(item.key)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* TAB 4: STAFF */}
      {activeTab === 'staff' && (
        <Card className="max-w-3xl">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Active Team Specialists</CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Staff members assigned to client services and calendars.
              </p>
            </div>
            <Button
              variant="outline"
              size="xs"
              icon={PlusCircle}
              onClick={() => toast.info('Staff Invitation', 'Simulated invite email sent to new specialist.')}
            >
              Invite Specialist
            </Button>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockStaffList.map((st) => (
              <div key={st.id} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {st.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{st.role}</p>
                  </div>
                </div>
                <Badge variant="success" size="xs" dot>
                  Active
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* TAB 5: DATA MANAGEMENT & DANGER ZONE */}
      {activeTab === 'danger' && (
        <div className="max-w-3xl space-y-6">
          <Card className="border-amber-200/80 dark:border-amber-900/60 p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-500" />
              Reset Platform Demo Data
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
              Restores all appointments, customers, services, and revenue records to the original demonstration seed dataset. Perfect for showcasing the platform during interviews or portfolio presentations.
            </p>
            <div className="mt-4">
              <Button
                variant="primary"
                size="sm"
                icon={RotateCcw}
                onClick={() => setResetConfirmOpen(true)}
              >
                Reset Demo Data
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <Modal
          isOpen={resetConfirmOpen}
          onClose={() => setResetConfirmOpen(false)}
          title="Restore Demo State?"
          description="This will reload the default set of bookings, services, and customer records."
          maxWidth="max-w-sm"
        >
          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setResetConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                resetToDemoData();
                setResetConfirmOpen(false);
              }}
            >
              Confirm Reset
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

