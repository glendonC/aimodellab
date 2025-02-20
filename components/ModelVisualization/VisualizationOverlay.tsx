"use client";

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LayerStats } from '../model/LayerStats';
import { AIExplanation } from '../model/AIExplanation';
import { LayerType } from '../model/types';

type VisualizationOverlayProps = {
  highlightedSection: LayerType | null;
  powerMode: boolean;
  isLoading?: boolean;
};

export function VisualizationOverlay({
  highlightedSection,
  powerMode,
  isLoading
}: VisualizationOverlayProps) {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-40">
        {highlightedSection && (
          <>
            <LayerStats
              type={highlightedSection}
              powerMode={powerMode}
              isHighlighted={true}
            />
            <AIExplanation
              type={highlightedSection}
              powerMode={powerMode}
            />
          </>
        )}
      </div>

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
    </>
  );
}