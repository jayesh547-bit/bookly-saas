export const initialBusinessProfile = {
  name: 'LuxeStudio & Advisory Hub',
  tagline: 'Premium Grooming, Wellness & Strategic Growth',
  category: 'Multi-Service Studio',
  slug: 'luxestudio',
  email: 'hello@luxestudio.com',
  phone: '+1 (555) 789-0123',
  address: '450 Lexington Avenue, Suite 1800, New York, NY 10017',
  website: 'https://luxestudio.example.com',
  currency: 'USD',
  currencySymbol: '$',
  timezone: 'America/New_York (EST)',
  autoConfirmBookings: true,
  cancellationNoticeHours: 24,
  bufferMinutes: 15,
};

export const initialOperatingHours = [
  { day: 'Monday', enabled: true, open: '08:00', close: '19:00' },
  { day: 'Tuesday', enabled: true, open: '08:00', close: '19:00' },
  { day: 'Wednesday', enabled: true, open: '08:00', close: '19:00' },
  { day: 'Thursday', enabled: true, open: '08:00', close: '20:00' },
  { day: 'Friday', enabled: true, open: '08:00', close: '20:00' },
  { day: 'Saturday', enabled: true, open: '09:00', close: '18:00' },
  { day: 'Sunday', enabled: false, open: '10:00', close: '16:00' },
];

export const initialNotificationSettings = {
  emailAlerts: true,
  smsReminders: true,
  newBookingNotification: true,
  cancellationAlerts: true,
  dailySummaryDigest: true,
  marketingEmails: false,
};

export const demoAccounts = [
  {
    role: 'Business Owner',
    email: 'alexander@bookly.com',
    name: 'Alexander Pierce',
    title: 'Founder & Managing Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    role: 'Staff Specialist',
    email: 'elena@bookly.com',
    name: 'Elena Gilbert',
    title: 'Lead Stylist & Educator',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    role: 'Studio Receptionist',
    email: 'reception@bookly.com',
    name: 'Claire Beauchamp',
    title: 'Client Experience Coordinator',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  }
];

