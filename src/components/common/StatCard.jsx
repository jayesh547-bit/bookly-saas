import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  changePeriod = 'vs last month',
  icon: Icon,
  iconColor = 'text-brand-500 bg-brand-50 dark:bg-brand-950/50',
  className,
}) {
  return (
    <Card className={cn('p-5 sm:p-6 relative overflow-hidden', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2 tracking-tight">
            {value}
          </h3>
        </div>
        {Icon && (
          <div
            className={cn(
              'p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shrink-0',
              iconColor
            )}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-md',
              isPositive
                ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{change}</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">{changePeriod}</span>
        </div>
      )}
    </Card>
  );
}

