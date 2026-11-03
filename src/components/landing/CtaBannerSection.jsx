import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export function CtaBannerSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-brand-900 via-brand-700 to-indigo-600 p-8 sm:p-14 lg:p-16 text-center text-white shadow-2xl overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Start Scaling Today
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to modernize your appointment business?
            </h2>

            <p className="text-base sm:text-lg text-brand-100 max-w-2xl mx-auto leading-relaxed">
              Join over 1,200+ salons, fitness studios, and advisors who manage appointments and scale revenue with BOOKLY.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-3.5 shadow-xl"
                iconRight={ArrowRight}
                onClick={() => navigate('/dashboard')}
              >
                Experience Live Demo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 px-8 py-3.5"
                onClick={() => navigate('/signup')}
              >
                Sign Up for Free Trial
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-brand-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free 14-day trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant setup
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

