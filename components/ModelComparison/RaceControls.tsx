"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';
import { RaceProgress } from './RaceProgress';

type RaceControlsProps = {
  baseModel: AnalysisResult;
  comparisonModel: AnalysisResult;
  isRacing: boolean;
  raceProgress: { modelA: number; modelB: number };
  winner: 'modelA' | 'modelB' | null;
  onStartRace: () => void;
  powerMode: boolean;
  modelAGpu: boolean;
  modelBGpu: boolean;
};

export function RaceControls({
  baseModel,
  comparisonModel,
  isRacing,
  raceProgress,
  winner,
  onStartRace,
  powerMode,
  modelAGpu,
  modelBGpu
}: RaceControlsProps) {
  const baseModelName = baseModel.graph.metadata.modelId?.split('/').pop() || 'Model A';
  const comparisonModelName = comparisonModel.graph.metadata.modelId?.split('/').pop() || 'Model B';

  return (
    <div className="p-4 border-t">
      <motion.button
        onClick={onStartRace}
        disabled={isRacing}
        className={cn(
          "w-full p-3 rounded-lg flex items-center justify-center gap-2 transition-colors",
          powerMode
            ? "bg-cyan-500 text-white hover:bg-cyan-600"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          isRacing && "opacity-50 cursor-not-allowed"
        )}
        whileHover={isRacing ? {} : { scale: 1.02 }}
        whileTap={isRacing ? {} : { scale: 0.98 }}
      >
        <Play className="w-5 h-5" />
        {isRacing ? "Race in Progress..." : "Start Race"}
      </motion.button>

      {/* Race Progress */}
      <AnimatePresence>
        {isRacing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4 overflow-hidden"
          >
            <RaceProgress
              label="Model A"
              progress={raceProgress.modelA}
              isWinner={winner === 'modelA'}
              powerMode={powerMode}
              useGpu={modelAGpu}
            />
            <RaceProgress
              label="Model B"
              progress={raceProgress.modelB}
              isWinner={winner === 'modelB'}
              powerMode={powerMode}
              useGpu={modelBGpu}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Winner Announcement */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "mt-4 p-3 rounded-lg text-center",
              powerMode
                ? "bg-cyan-500/20 border border-cyan-500/30"
                : "bg-primary/10 border border-primary/20"
            )}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flag className={cn(
                "w-5 h-5",
                powerMode ? "text-cyan-400" : "text-primary"
              )} />
              <span className={cn(
                "font-semibold",
                powerMode ? "text-white" : "text-foreground"
              )}>
                {winner === 'modelA' ? baseModelName : comparisonModelName} Wins!
              </span>
            </div>
            <p className={cn(
              "text-sm",
              powerMode ? "text-white/70" : "text-muted-foreground"
            )}>
              {winner === 'modelA' ? baseModelName : comparisonModelName} completed inference{' '}
              {Math.abs(baseModel.performance.inferenceTime - comparisonModel.performance.inferenceTime).toFixed(1)}ms faster
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}