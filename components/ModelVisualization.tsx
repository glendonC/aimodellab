"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Maximize2, Loader2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Scene } from './model/Scene';
import { LayerStats } from './model/LayerStats';
import { AIExplanation } from './model/AIExplanation';
import { LayerType } from './model/types';
import { AnalysisResult } from '@/lib/model/types';
import { useModelAnimation } from '@/hooks/useModelAnimation';

type ModelVisualizationProps = {
  modelFile: any;
  powerMode: boolean;
  analysisResult?: AnalysisResult;
  isLoading?: boolean;
};

export default function ModelVisualization({ 
  modelFile, 
  powerMode,
  analysisResult,
  isLoading
}: ModelVisualizationProps) {
  const [highlightedSection, setHighlightedSection] = useState<LayerType | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();
  
  const {
    isAnimating,
    animatedGraph,
    startAnimation,
    currentLayerIndex,
    progress
  } = useModelAnimation(analysisResult?.graph || null, powerMode);

  useEffect(() => {
    if (analysisResult) {
      setAutoRotate(false);
    }
  }, [analysisResult]);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.object.position.set(0, 2, 20);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-20rem)] min-h-[600px] rounded-xl overflow-hidden">
      {/* Info Cards Container */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {highlightedSection && (
          <>
            <LayerStats
              type={highlightedSection}
              powerMode={powerMode}
              isHighlighted={true}
              analysisData={analysisResult?.graph.nodes.find(
                node => node.type === highlightedSection
              )}
            />
            <AIExplanation
              type={highlightedSection}
              powerMode={powerMode}
            />
          </>
        )}
      </div>

      {/* Control Buttons */}
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
            
            {/* Progress Indicator */}
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

      {powerMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 right-4 z-50 flex items-center gap-2 text-white bg-black/80 px-4 py-2 rounded-lg border border-white/20"
        >
          <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span className="font-bold tracking-wider">NVIDIA POWERED</span>
        </motion.div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className={cn(
          "absolute inset-0 z-50 flex flex-col items-center justify-center",
          powerMode ? "bg-black/80" : "bg-white/80",
          "backdrop-blur-sm"
        )}>
          <Loader2 className={cn(
            "w-12 h-12 mb-4 animate-spin",
            powerMode ? "text-cyan-400" : "text-primary"
          )} />
          <p className={cn(
            "text-lg font-semibold",
            powerMode ? "text-white" : "text-black"
          )}>
            Analyzing Model Architecture...
          </p>
        </div>
      )}

      {/* Main Visualization Area */}
      <div className={cn(
        "w-full h-full transition-all duration-300 relative z-0",
        powerMode 
          ? "border-2 border-cyan-500/30 bg-black/40"
          : "border border-border bg-black/20"
      )}>
        <Canvas>
          <Scene
            highlightedSection={highlightedSection}
            setHighlightedSection={setHighlightedSection}
            powerMode={powerMode}
            controlsRef={controlsRef}
            autoRotate={autoRotate}
            analysisResult={animatedGraph || analysisResult}
            currentLayerIndex={currentLayerIndex}
            isAnimating={isAnimating}
          />
        </Canvas>
      </div>
    </div>
  );
}