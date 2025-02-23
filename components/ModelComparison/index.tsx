"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';
import { useModelAnalysis } from '@/hooks/useModelAnalysis';
import { useModelRace } from '@/hooks/useModelRace';
import { ModelSelector } from './ModelSelector';
import { RaceControls } from './RaceControls';

type ModelComparisonProps = {
  baseModel: AnalysisResult;
  onClose: () => void;
  onSelect: (modelId: string) => Promise<void>;
  powerMode: boolean;
};

export default function ModelComparison({
  baseModel,
  onClose,
  onSelect,
  powerMode
}: ModelComparisonProps) {
  const [modelAGpu, setModelAGpu] = useState(false);
  const [modelBGpu, setModelBGpu] = useState(false);
  const [comparisonModel, setComparisonModel] = useState<AnalysisResult | null>(null);
  const { analyzeModel } = useModelAnalysis();
  const { 
    startRace,
    isRacing,
    raceProgress,
    winner
  } = useModelRace();
  const [raceProgressState, setRaceProgress] = useState({ modelA: 0, modelB: 0 });

  const handleModelSelect = async (modelId: string) => {
    try {
      const result = await analyzeModel(modelId);
      setComparisonModel(result);
    } catch (error) {
      console.error('Failed to load model:', error);
    }
  };

  const handleStartRace = () => {
    if (!comparisonModel) return;
    startRace(baseModel, comparisonModel, modelAGpu, modelBGpu);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "fixed bottom-24 right-8 w-[600px] rounded-lg shadow-xl z-50",
        powerMode ? "bg-gray-900 border border-cyan-500/30" : "bg-white border border-border"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className={cn(
            "w-5 h-5",
            powerMode && "text-cyan-400"
          )} />
          <h2 className={cn(
            "text-lg font-semibold",
            powerMode ? "text-white" : "text-foreground"
          )}>
            Model Comparison
          </h2>
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "p-2 rounded-full hover:bg-gray-100/10",
            powerMode ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Model Selection */}
      <ModelSelector
        baseModel={baseModel}
        modelAGpu={modelAGpu}
        modelBGpu={modelBGpu}
        setModelAGpu={setModelAGpu}
        setModelBGpu={setModelBGpu}
        onModelSelect={handleModelSelect}
        powerMode={powerMode}
      />

      {/* Race Controls */}
      {comparisonModel && (
        <RaceControls
          baseModel={baseModel}
          comparisonModel={comparisonModel}
          isRacing={isRacing}
          raceProgress={raceProgress}
          setRaceProgress={setRaceProgress}
          winner={winner}
          onStartRace={handleStartRace}
          powerMode={powerMode}
          modelAGpu={modelAGpu}
          modelBGpu={modelBGpu}
        />
      )}
    </motion.div>
  );
}