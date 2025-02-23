"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';
import { RaceProgress } from './RaceProgress';
import { useEffect } from 'react';
import { MODEL_METRICS } from '@/lib/model/metrics';

type RaceControlsProps = {
  baseModel: AnalysisResult;
  comparisonModel: AnalysisResult;
  isRacing: boolean;
  raceProgress: { modelA: number; modelB: number };
  setRaceProgress: (progress: { modelA: number; modelB: number } | ((prev: { modelA: number; modelB: number }) => { modelA: number; modelB: number })) => void;
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
  setRaceProgress,
  winner,
  onStartRace,
  powerMode,
  modelAGpu,
  modelBGpu
}: RaceControlsProps) {
  const baseModelName = baseModel.graph.metadata.modelId?.split('/').pop() || 'Model A';
  const comparisonModelName = comparisonModel.graph.metadata.modelId?.split('/').pop() || 'Model B';


  const getModelSpeed = (model: AnalysisResult, useGpu: boolean) => {
    const modelId = model.graph.metadata.modelId?.toLowerCase() || '';
    // Extract base model name and remove any formatting
    const baseModelId = modelId.split('/').pop()?.replace('-', '') || '';
    
    const metrics = MODEL_METRICS[baseModelId];
    if (!metrics) {
      console.warn(`No metrics found for model: ${baseModelId}`);
      return 1; // Default fallback speed
    }
  
    // Use actual inference speeds from our benchmarks
    return useGpu ? metrics.gpu.inferenceSpeed : metrics.cpu.inferenceSpeed;
  };
  
  useEffect(() => {
    if (isRacing) {
      const speedA = getModelSpeed(baseModel, modelAGpu);
      const speedB = getModelSpeed(comparisonModel, modelBGpu);
      
      const maxSpeed = Math.max(speedA, speedB);
      const normalizedSpeedA = (speedA / maxSpeed) * 0.4;
      const normalizedSpeedB = (speedB / maxSpeed) * 0.4;

      const interval = setInterval(() => {
        setRaceProgress(prev => ({
          modelA: Math.min(1, prev.modelA + normalizedSpeedA),
          modelB: Math.min(1, prev.modelB + normalizedSpeedB)
        }));
      }, 16);

      return () => clearInterval(interval);
    }
  }, [isRacing, baseModel, comparisonModel, modelAGpu, modelBGpu]);

  console.log({
    baseModelName,
    baseModelMetrics: MODEL_METRICS[baseModelName.toLowerCase()],
    comparisonModelName,
    comparisonModelMetrics: MODEL_METRICS[comparisonModelName.toLowerCase()]
  });

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
              speed={getModelSpeed(baseModel, modelAGpu)}
              metrics={MODEL_METRICS[baseModelName.toLowerCase().replace('-', '')]}
            />
            <RaceProgress
              label="Model B"
              progress={raceProgress.modelB}
              isWinner={winner === 'modelB'}
              powerMode={powerMode}
              useGpu={modelBGpu}
              speed={getModelSpeed(comparisonModel, modelBGpu)}
              metrics={MODEL_METRICS[comparisonModelName.toLowerCase().replace('-', '')]}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}