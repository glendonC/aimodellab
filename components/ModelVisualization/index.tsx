"use client";

import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnalysisResult, LayerType } from '@/lib/model/types';
import { VisualizationHeader } from './VisualizationHeader';
import { VisualizationOverlay } from './VisualizationOverlay';
import { VisualizationCanvas } from './VisualizationCanvas';
import { useModelAnimation } from '@/hooks/useModelAnimation';

type ModelVisualizationProps = {
  modelFile: any;
  powerMode: boolean;
  analysisResult?: AnalysisResult | null;
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
  const controlsRef = useRef<THREE.OrbitControls | null>(null);
  
  const {
    isAnimating,
    animatedGraph,
    startAnimation,
    currentLayerIndex,
    progress
  } = useModelAnimation(analysisResult?.graph || null, powerMode);

  return (
    <div className="relative w-full h-[calc(100vh-20rem)] min-h-[600px] rounded-xl overflow-hidden">
      <VisualizationHeader
        powerMode={powerMode}
        controlsRef={controlsRef}
        analysisResult={analysisResult}
        isAnimating={isAnimating}
        startAnimation={startAnimation}
        progress={progress}
      />

      <VisualizationOverlay
        highlightedSection={highlightedSection}
        powerMode={powerMode}
        isLoading={isLoading}
      />

      <VisualizationCanvas
        powerMode={powerMode}
        controlsRef={controlsRef}
        autoRotate={autoRotate}
        analysisResult={animatedGraph || analysisResult}
        highlightedSection={highlightedSection}
        setHighlightedSection={setHighlightedSection}
        currentLayerIndex={currentLayerIndex}
        isAnimating={isAnimating}
      />
    </div>
  );
}