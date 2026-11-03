import React from 'react';
import { Button } from './Button';
import { CalendarX } from 'lucide-react';
import { cn } from '../../utils/cn';

export function EmptyState({
  icon: Icon = CalendarX,
  title = 'No records found',
  description = 'There are no items matching your criteria. Try adjusting filters or create a new entry.',
  actionLabel,
  onAction,
  actionIcon,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 shadow-sm border border-brand-200/50 dark:border-brand-800/40">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1.5 mb-5">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" icon={actionIcon} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

