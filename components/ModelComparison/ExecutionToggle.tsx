"use client";

import { Cpu, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type ExecutionToggleProps = {
  isGpu: boolean;
  onChange: (value: boolean) => void;
  powerMode: boolean;
};

export function ExecutionToggle({
  isGpu,
  onChange,
  powerMode
}: ExecutionToggleProps) {
  return (
    <button
      onClick={() => onChange(!isGpu)}
      className={cn(
        "mt-2 w-full p-2 rounded-lg flex items-center justify-center gap-2 transition-colors",
        isGpu
          ? powerMode
            ? "bg-cyan-500 text-white"
            : "bg-primary text-primary-foreground"
          : powerMode
            ? "bg-gray-800 text-white/70 hover:text-white"
            : "bg-secondary text-secondary-foreground"
      )}
    >
      {isGpu ? (
        <>
          <Zap className="w-4 h-4" />
          GPU Execution
        </>
      ) : (
        <>
          <Cpu className="w-4 h-4" />
          CPU Execution
        </>
      )}
    </button>
  );
}