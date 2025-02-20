"use client";

import { motion } from 'framer-motion';
import { Maximize2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';

type VisualizationHeaderProps = {
  powerMode: boolean;
  controlsRef: React.RefObject<THREE.OrbitControls | null>;
  analysisResult?: AnalysisResult;
  isAnimating: boolean;
  startAnimation: () => void;
  progress: number;
};

export function VisualizationHeader({
  powerMode,
  controlsRef,
  analysisResult,
  isAnimating,
  startAnimation,
  progress
}: VisualizationHeaderProps) {
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.object.position.set(0, 2, 20);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
      <motion.button
        onClick={resetView}
        className={cn(
          "p-2 rounded-lg backdrop-blur-sm transition-all duration-300",
          powerMode
            ? "bg-black/60 text-white border border-white/20 hover:border-white/40"
            : "bg-black/40 text-white border border-white/20 hover:bg-black/60"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Maximize2 className="w-5 h-5" />
      </motion.button>

      {analysisResult && (
        <motion.button
          onClick={startAnimation}
          disabled={isAnimating}
          className={cn(
            "p-2 rounded-lg backdrop-blur-sm transition-all duration-300 relative overflow-hidden",
            powerMode
              ? "bg-black/60 text-white border border-white/20 hover:border-white/40"
              : "bg-black/40 text-white border border-white/20 hover:bg-black/60",
            isAnimating && "cursor-not-allowed"
          )}
          whileHover={isAnimating ? {} : { scale: 1.05 }}
          whileTap={isAnimating ? {} : { scale: 0.95 }}
        >
          <Play className={cn(
            "w-5 h-5 transition-transform",
            isAnimating && "animate-pulse"
          )} />
          
          {isAnimating && (
            <motion.div
              className={cn(
                "absolute bottom-0 left-0 h-0.5",
                powerMode ? "bg-cyan-500" : "bg-white"
              )}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>
      )}
    </div>
  );
}