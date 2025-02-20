"use client";

import { cn } from '@/lib/utils';

type ComparisonMetricProps = {
  label: string;
  valueA: number;
  valueB: number;
  unit: string;
  powerMode: boolean;
};

export function ComparisonMetric({
  label,
  valueA,
  valueB,
  unit,
  powerMode
}: ComparisonMetricProps) {
  const difference = valueB - valueA;
  const percentChange = ((valueB - valueA) / valueA) * 100;
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className={powerMode ? "text-white/70" : "text-muted-foreground"}>
          {label}
        </span>
        <div className="flex items-center gap-4">
          <span className={powerMode ? "text-white" : "text-foreground"}>
            Model A: {valueA.toFixed(2)} {unit}
          </span>
          <span className={powerMode ? "text-white" : "text-foreground"}>
            Model B: {valueB.toFixed(2)} {unit}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-sm",
          difference < 0
            ? "text-red-500"
            : difference > 0
              ? "text-green-500"
              : powerMode ? "text-white/50" : "text-muted-foreground"
        )}>
          {difference < 0 ? '↓' : difference > 0 ? '↑' : '='} {Math.abs(percentChange).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}