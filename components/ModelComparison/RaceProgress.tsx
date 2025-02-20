"use client";

import { motion } from 'framer-motion';
import { Flag, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type RaceProgressProps = {
  label: string;
  progress: number;
  isWinner: boolean;
  powerMode: boolean;
  useGpu: boolean;
};

export function RaceProgress({
  label,
  progress,
  isWinner,
  powerMode,
  useGpu
}: RaceProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm font-medium",
            powerMode ? "text-white" : "text-foreground"
          )}>
            {label}
          </span>
          {useGpu && (
            <Zap className={cn(
              "w-4 h-4",
              powerMode ? "text-cyan-400" : "text-primary"
            )} />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm",
            powerMode ? "text-white/70" : "text-muted-foreground"
          )}>
            {(progress * 100).toFixed(0)}%
          </span>
          {isWinner && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              powerMode ? "bg-cyan-500/20 text-cyan-400" : "bg-primary/20 text-primary"
            )}>
              <Flag className="w-3 h-3" />
              Winner
            </div>
          )}
        </div>
      </div>
      <div className={cn(
        "h-3 rounded-full overflow-hidden",
        powerMode ? "bg-gray-800" : "bg-secondary"
      )}>
        <motion.div
          className={cn(
            "h-full rounded-full relative",
            powerMode ? "bg-cyan-500" : "bg-primary"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3 }}
        >
          {powerMode && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}