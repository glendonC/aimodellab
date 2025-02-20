"use client";

import { useState, useCallback } from 'react';
import { AnalysisResult } from '@/lib/model/types';

type RaceProgress = {
  modelA: number;
  modelB: number;
};

export function useModelRace() {
  const [isRacing, setIsRacing] = useState(false);
  const [raceProgress, setRaceProgress] = useState<RaceProgress>({ modelA: 0, modelB: 0 });
  const [winner, setWinner] = useState<'modelA' | 'modelB' | null>(null);

  const startRace = useCallback((
    modelA: AnalysisResult,
    modelB: AnalysisResult,
    modelAGpu: boolean,
    modelBGpu: boolean
  ) => {
    if (isRacing) return;

    setIsRacing(true);
    setRaceProgress({ modelA: 0, modelB: 0 });
    setWinner(null);

    // Calculate race durations based on inference time and GPU acceleration
    const durationA = modelA.performance.inferenceTime * (modelAGpu ? 0.2 : 1);
    const durationB = modelB.performance.inferenceTime * (modelBGpu ? 0.2 : 1);
    
    // Normalize durations to 2-6 seconds for better visualization
    const maxDuration = Math.max(durationA, durationB);
    const normalizedDurationA = (durationA / maxDuration) * 4000 + 2000;
    const normalizedDurationB = (durationB / maxDuration) * 4000 + 2000;

    let startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      // Add easing for smoother progress
      const easeProgress = (t: number) => {
        return t < 0.5 
          ? 4 * t * t * t 
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const progressA = Math.min(1, easeProgress(elapsed / normalizedDurationA));
      const progressB = Math.min(1, easeProgress(elapsed / normalizedDurationB));
      
      setRaceProgress({ modelA: progressA, modelB: progressB });

      // Check for winner
      if (progressA === 1 && progressB === 1) {
        setIsRacing(false);
        setWinner(durationA <= durationB ? 'modelA' : 'modelB');
        return;
      }
      
      if (progressA < 1 || progressB < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRacing]);

  return {
    startRace,
    isRacing,
    raceProgress,
    winner
  };
}