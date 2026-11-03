import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-subtle dark:shadow-card-dark transition-all duration-200',
        hover && 'hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-md dark:hover:bg-dark-cardHover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3
      className={cn(
        'text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p
      className={cn('text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('p-5 sm:p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'p-4 sm:p-6 pt-0 sm:pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

