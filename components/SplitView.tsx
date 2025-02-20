"use client";

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { cn } from '@/lib/utils';
import { Scene } from './model/Scene';
import { AnalysisResult } from '@/lib/model/types';

type SplitViewProps = {
  modelA: AnalysisResult;
  modelB: AnalysisResult;
  powerMode: boolean;
  controlsRef: React.RefObject<any>;
};

export default function SplitView({
  modelA,
  modelB,
  powerMode,
  controlsRef
}: SplitViewProps) {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Model A */}
      <div className={cn(
        "relative rounded-lg overflow-hidden",
        powerMode ? "border-2 border-cyan-500/30" : "border border-border"
      )}>
        <div className={cn(
          "absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-sm font-medium",
          powerMode ? "bg-cyan-500/20 text-cyan-400" : "bg-black/20 text-white"
        )}>
          Model A
        </div>
        <Canvas>
          <Scene
            highlightedSection={null}
            setHighlightedSection={() => {}}
            powerMode={powerMode}
            controlsRef={controlsRef}
            autoRotate={false}
            analysisResult={modelA}
          />
        </Canvas>
      </div>

      {/* Model B */}
      <div className={cn(
        "relative rounded-lg overflow-hidden",
        powerMode ? "border-2 border-cyan-500/30" : "border border-border"
      )}>
        <div className={cn(
          "absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-sm font-medium",
          powerMode ? "bg-cyan-500/20 text-cyan-400" : "bg-black/20 text-white"
        )}>
          Model B
        </div>
        <Canvas>
          <Scene
            highlightedSection={null}
            setHighlightedSection={() => {}}
            powerMode={powerMode}
            controlsRef={controlsRef}
            autoRotate={false}
            analysisResult={modelB}
          />
        </Canvas>
      </div>
    </div>
  );
}