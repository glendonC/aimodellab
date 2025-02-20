"use client";

import { cn } from '@/lib/utils';

type ModelInfoProps = {
  name: string;
  framework: string;
  params: number;
  powerMode: boolean;
};

export function ModelInfo({
  name,
  framework,
  params,
  powerMode
}: ModelInfoProps) {
  return (
    <div className={cn(
      "p-3 rounded-lg",
      powerMode ? "bg-gray-800" : "bg-muted"
    )}>
      <p className={cn(
        "font-medium mb-1",
        powerMode ? "text-white" : "text-foreground"
      )}>
        {name}
      </p>
      <p className={cn(
        "text-sm",
        powerMode ? "text-white/70" : "text-muted-foreground"
      )}>
        {framework} • {(params / 1e6).toFixed(1)}M params
      </p>
    </div>
  );
}