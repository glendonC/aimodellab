"use client";

import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnalysisResult, LayerType } from '@/lib/model/types';
import { VisualizationHeader } from './VisualizationHeader';
import { VisualizationOverlay } from './VisualizationOverlay';
import { VisualizationCanvas } from './VisualizationCanvas';
import { useModelAnimation } from '@/hooks/useModelAnimation';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

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

  const getDisplayName = (modelId: string = '') => {
    const id = modelId.toLowerCase();
    if (id.includes('resnet')) return 'ResNet-50';
    if (id.includes('yolo')) return 'YOLOv8';
    if (id.includes('stable')) return 'Stable Diffusion';
    if (id.includes('llama')) return 'LLaMA 2';
    if (id.includes('gpt')) return 'GPT-2';
    if (id.includes('bart')) return 'BART';
    if (id.includes('whisper')) return 'Whisper';
    if (id.includes('vit')) return 'ViT';
    if (id.includes('biobert')) return 'BioBERT';
    if (id.includes('dino')) return 'DINOv2';
    return 'ResNet-50';
  };

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] rounded-xl overflow-hidden">
      {/* Model name badge */}
      {analysisResult?.graph?.metadata?.modelId && (
        <div className="absolute top-4 right-4 z-50">
          <div className={cn(
            "px-3 py-1.5 rounded-full font-medium text-sm backdrop-blur-sm",
            powerMode 
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
              : "bg-white/80 text-gray-600 border border-gray-200/50"
          )}>
            {getDisplayName(analysisResult.graph.metadata.modelId)}
          </div>
        </div>
      )}

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
        analysisResult={analysisResult}
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