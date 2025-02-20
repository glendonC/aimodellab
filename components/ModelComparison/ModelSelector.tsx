"use client";

import { Cpu, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';
import { FEATURED_MODELS } from '@/lib/huggingface';
import { ExecutionToggle } from './ExecutionToggle';
import { ModelInfo } from './ModelInfo';

type ModelSelectorProps = {
  baseModel: AnalysisResult;
  modelAGpu: boolean;
  modelBGpu: boolean;
  setModelAGpu: (value: boolean) => void;
  setModelBGpu: (value: boolean) => void;
  onModelSelect: (modelId: string) => void;
  powerMode: boolean;
};

export function ModelSelector({
  baseModel,
  modelAGpu,
  modelBGpu,
  setModelAGpu,
  setModelBGpu,
  onModelSelect,
  powerMode
}: ModelSelectorProps) {
  const baseModelName = FEATURED_MODELS.find(
    model => model.id === baseModel.graph.metadata.modelId
  )?.name || 'Custom Model';

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {/* Model A */}
      <div>
        <h3 className={cn(
          "text-sm font-medium mb-2",
          powerMode ? "text-white/70" : "text-muted-foreground"
        )}>
          Model A (Base)
        </h3>
        <ModelInfo
          name={baseModelName}
          framework={baseModel.graph.metadata.framework}
          params={baseModel.graph.metadata.totalParams}
          powerMode={powerMode}
        />
        <ExecutionToggle
          isGpu={modelAGpu}
          onChange={setModelAGpu}
          powerMode={powerMode}
        />
      </div>

      {/* Model B */}
      <div>
        <h3 className={cn(
          "text-sm font-medium mb-2",
          powerMode ? "text-white/70" : "text-muted-foreground"
        )}>
          Model B
        </h3>
        <select
          onChange={(e) => onModelSelect(e.target.value)}
          className={cn(
            "w-full p-3 rounded-lg border transition-colors",
            powerMode
              ? "bg-gray-800 text-white border-cyan-500/30 focus:border-cyan-500"
              : "bg-background text-foreground border-input focus:border-primary"
          )}
        >
          <option value="">Select a model...</option>
          {FEATURED_MODELS.filter(model => model.id !== baseModel.graph.metadata.modelId).map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} ({model.size})
            </option>
          ))}
        </select>
        <ExecutionToggle
          isGpu={modelBGpu}
          onChange={setModelBGpu}
          powerMode={powerMode}
        />
      </div>
    </div>
  );
}