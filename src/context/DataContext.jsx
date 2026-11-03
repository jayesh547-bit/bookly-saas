import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { initialBookings } from '../data/mockBookings';
import { initialCustomers } from '../data/mockCustomers';
import { initialServices } from '../data/mockServices';
import {
  initialBusinessProfile,
  initialOperatingHours,
  initialNotificationSettings,
} from '../data/mockBusiness';
import { useToast } from './ToastContext';

const DataContext = createContext();

const STORAGE_KEYS = {
  BOOKINGS: 'bookly_data_bookings',
  CUSTOMERS: 'bookly_data_customers',
  SERVICES: 'bookly_data_services',
  BUSINESS: 'bookly_data_business',
  HOURS: 'bookly_data_hours',
  NOTIFICATIONS: 'bookly_data_notifications',
};

export function DataProvider({ children }) {
  const toast = useToast();

  const [bookings, setBookings] = useState(() =>
    storage.get(STORAGE_KEYS.BOOKINGS, initialBookings)
  );

  const [customers, setCustomers] = useState(() =>
    storage.get(STORAGE_KEYS.CUSTOMERS, initialCustomers)
  );

  const [services, setServices] = useState(() =>
    storage.get(STORAGE_KEYS.SERVICES, initialServices)
  );

  const [businessProfile, setBusinessProfile] = useState(() =>
    storage.get(STORAGE_KEYS.BUSINESS, initialBusinessProfile)
  );

  const [operatingHours, setOperatingHours] = useState(() =>
    storage.get(STORAGE_KEYS.HOURS, initialOperatingHours)
  );

  const [notificationSettings, setNotificationSettings] = useState(() =>
    storage.get(STORAGE_KEYS.NOTIFICATIONS, initialNotificationSettings)
  );

  // Sync to localStorage
  useEffect(() => {
    storage.set(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.CUSTOMERS, customers);
  }, [customers]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.SERVICES, services);
  }, [services]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.BUSINESS, businessProfile);
  }, [businessProfile]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.HOURS, operatingHours);
  }, [operatingHours]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.NOTIFICATIONS, notificationSettings);
  }, [notificationSettings]);

  // BOOKING CRUD
  const addBooking = (bookingData) => {
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newId,
      createdAt: new Date().toISOString(),
      status: bookingData.status || 'confirmed',
      paymentStatus: bookingData.paymentStatus || 'paid',
      ...bookingData,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update customer stats if customer exists
    if (bookingData.customerId) {
      setCustomers((prev) =>
        prev.map((c) => {
          if (c.id === bookingData.customerId) {
            return {
              ...c,
              totalVisits: (c.totalVisits || 0) + 1,
              totalSpent: (c.totalSpent || 0) + Number(bookingData.price || 0),
              lastVisit: bookingData.date,
            };
          }
          return c;
        })
      );
    }

    toast.success('Appointment Scheduled', `Booking ${newId} has been successfully registered.`);
    return newBooking;
  };

  const updateBooking = (id, updatedFields) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    toast.success('Booking Updated', `Booking ${id} was successfully saved.`);
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    toast.info('Status Changed', `Booking ${id} is now ${newStatus}.`);
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    toast.warning('Booking Removed', `Booking ${id} was removed.`);
  };

  // CUSTOMER CRUD
  const addCustomer = (customerData) => {
    const newId = `cust-${Date.now()}`;
    const newCustomer = {
      id: newId,
      avatar:
        customerData.avatar ||
        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      totalVisits: 0,
      totalSpent: 0,
      lastVisit: 'None',
      status: 'active',
      tag: customerData.tag || 'New',
      createdAt: new Date().toISOString().split('T')[0],
      ...customerData,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    toast.success('Customer Created', `${newCustomer.name} was added to your client roster.`);
    return newCustomer;
  };

  const updateCustomer = (id, updatedFields) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    toast.success('Customer Updated', 'Client profile changes saved.');
  };

  const deleteCustomer = (id) => {
    const cust = customers.find((c) => c.id === id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast.warning('Customer Removed', `${cust ? cust.name : 'Customer'} has been removed.`);
  };

  // SERVICE CRUD
  const addService = (serviceData) => {
    const newId = `srv-${Date.now()}`;
    const newService = {
      id: newId,
      active: true,
      popular: false,
      color: serviceData.color || '#6366F1',
      ...serviceData,
    };
    setServices((prev) => [...prev, newService]);
    toast.success('Service Created', `${newService.name} is now available in your catalog.`);
    return newService;
  };

  const updateService = (id, updatedFields) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    toast.success('Service Updated', 'Service details were successfully updated.');
  };

  const toggleServiceActive = (id) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextActive = !s.active;
          toast.info(
            nextActive ? 'Service Activated' : 'Service Deactivated',
            `${s.name} is ${nextActive ? 'now visible to clients' : 'hidden from online bookings'}.`
          );
          return { ...s, active: nextActive };
        }
        return s;
      })
    );
  };

  const deleteService = (id) => {
    const srv = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.warning('Service Deleted', `${srv ? srv.name : 'Service'} has been deleted.`);
  };

  // BUSINESS & SETTINGS
  const updateBusinessProfile = (fields) => {
    setBusinessProfile((prev) => ({ ...prev, ...fields }));
    toast.success('Profile Saved', 'Business information updated.');
  };

  const updateOperatingHours = (hours) => {
    setOperatingHours(hours);
    toast.success('Hours Saved', 'Operating hours have been updated.');
  };

  const updateNotificationSettings = (settings) => {
    setNotificationSettings((prev) => ({ ...prev, ...settings }));
    toast.success('Preferences Updated', 'Notification preferences saved.');
  };

  // RESET ALL DATA
  const resetToDemoData = () => {
    setBookings(initialBookings);
    setCustomers(initialCustomers);
    setServices(initialServices);
    setBusinessProfile(initialBusinessProfile);
    setOperatingHours(initialOperatingHours);
    setNotificationSettings(initialNotificationSettings);

    storage.set(STORAGE_KEYS.BOOKINGS, initialBookings);
    storage.set(STORAGE_KEYS.CUSTOMERS, initialCustomers);
    storage.set(STORAGE_KEYS.SERVICES, initialServices);
    storage.set(STORAGE_KEYS.BUSINESS, initialBusinessProfile);
    storage.set(STORAGE_KEYS.HOURS, initialOperatingHours);
    storage.set(STORAGE_KEYS.NOTIFICATIONS, initialNotificationSettings);

    toast.info('Demo Data Reset', 'Platform restored to initial demonstration state.');
  };

  return (
    <DataContext.Provider
      value={{
        bookings,
        customers,
        services,
        businessProfile,
        operatingHours,
        notificationSettings,
        addBooking,
        updateBooking,
        updateBookingStatus,
        deleteBooking,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addService,
        updateService,
        toggleServiceActive,
        deleteService,
        updateBusinessProfile,
        updateOperatingHours,
        updateNotificationSettings,
        resetToDemoData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

