import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Clara Montgomery',
      role: 'Founder & Head Stylist',
      business: 'Atelier Bloom Hair Studio (Brooklyn, NY)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      text: 'BOOKLY completely revolutionized our studio operations. Our client no-shows dropped by over 80% in the first two weeks thanks to automated SMS reminders, and our stylists love having their schedules on their phones.',
      rating: 5,
    },
    {
      name: 'Julian Henderson',
      role: 'Performance Director',
      business: 'Kinetic Movement & Strength (Austin, TX)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: 'Managing 6 trainers and 200+ personal training clients was chaos before BOOKLY. The client profile history and revenue analytics give us the clarity we needed to open our second location.',
      rating: 5,
    },
    {
      name: 'Seraphina Vance',
      role: 'Principal Consultant',
      business: 'Vance Executive Advisory (London / Remote)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      text: 'The interface is stunning. My high-net-worth advisory clients appreciate the polished, white-glove booking experience. I save at least 4 hours every single week that used to go into scheduling emails.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" size="sm" dot>
            Loved By Industry Leaders
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 mb-4">
            Trusted by over 1,200+ businesses worldwide
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            See how modern service providers elevate their client experience with BOOKLY.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} hover className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {t.role}
                  </p>
                  <p className="text-[11px] text-brand-600 dark:text-brand-400 truncate font-medium">
                    {t.business}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

