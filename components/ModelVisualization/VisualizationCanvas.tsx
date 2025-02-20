"use client";

import { Canvas } from '@react-three/fiber';
import { cn } from '@/lib/utils';
import { Scene } from '../model/Scene';
import { LayerType } from '../model/types';
import { AnalysisResult } from '@/lib/model/types';

type VisualizationCanvasProps = {
  powerMode: boolean;
  controlsRef: React.RefObject<any>;
  autoRotate: boolean;
  analysisResult?: AnalysisResult | null;
  highlightedSection: LayerType | null;
  setHighlightedSection: (section: LayerType | null) => void;
  currentLayerIndex: number;
  isAnimating: boolean;
};

export function VisualizationCanvas({
  powerMode,
  controlsRef,
  autoRotate,
  analysisResult,
  highlightedSection,
  setHighlightedSection,
  currentLayerIndex,
  isAnimating
}: VisualizationCanvasProps) {
  return (
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
          analysisResult={analysisResult}
          currentLayerIndex={currentLayerIndex}
          isAnimating={isAnimating}
        />
      </Canvas>
    </div>
  );
}