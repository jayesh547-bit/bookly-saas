import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '../common/Badge';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the 14-day free trial work?',
      a: 'You get immediate access to all Pro features with zero limitations. No credit card is required to sign up. If you decide not to continue, your account simply downgrades with no penalty or charges.',
    },
    {
      q: 'Can I add multiple staff members with individual calendars?',
      a: 'Yes! On the Professional and Enterprise plans, you can invite your team members. Each specialist receives their own calendar, working hours, and custom services list.',
    },
    {
      q: 'How do automated SMS and email reminders work?',
      a: 'When an appointment is booked, BOOKLY immediately sends a branded email confirmation. Automated SMS reminders are dispatched 24 hours and 2 hours before the appointment, allowing clients to confirm or request a reschedule.',
    },
    {
      q: 'Can I embed the booking widget into my existing website or Instagram?',
      a: 'Absolutely. You receive a personalized booking link (e.g., bookly.io/luxestudio) that can be embedded into WordPress, Webflow, Squarespace, Shopify, or added directly to your Instagram and TikTok bios.',
    },
    {
      q: 'Do you charge transaction fees on appointments?',
      a: 'Never. Unlike other scheduling platforms, BOOKLY does not take a percentage cut of your bookings. You only pay your flat monthly or annual software subscription fee.',
    },
    {
      q: 'How can I migrate my existing client list and past appointments?',
      a: 'You can easily import your clients and past service records via CSV file with 1-click in the Settings panel, or let our support team assist you with a seamless migration.',
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-slate-50/60 dark:bg-slate-900/20 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge variant="primary" size="sm" dot>
            Got Questions?
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Have questions before making the switch? Here is everything you need to know.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-dark-card overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="text-base font-semibold text-slate-900 dark:text-white pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600 dark:text-brand-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

