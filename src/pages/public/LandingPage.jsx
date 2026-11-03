import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { HeroSection } from '../../components/landing/HeroSection';
import { LivePreviewSection } from '../../components/landing/LivePreviewSection';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import { SolutionsSection } from '../../components/landing/SolutionsSection';
import { HowItWorksSection } from '../../components/landing/HowItWorksSection';
import { PricingSection } from '../../components/landing/PricingSection';
import { TestimonialsSection } from '../../components/landing/TestimonialsSection';
import { FaqSection } from '../../components/landing/FaqSection';
import { CtaBannerSection } from '../../components/landing/CtaBannerSection';

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle reveal for feature cards
      gsap.from('#features .group', {
        scrollTrigger: {
          trigger: '#features',
          start: 'top 80%',
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100">
      <PublicNavbar />
      <main className="flex-1">
        <HeroSection />
        <LivePreviewSection />
        <FeaturesSection />
        <SolutionsSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaBannerSection />
      </main>
      <PublicFooter />
    </div>
  );
}

