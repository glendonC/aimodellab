"use client";

import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LAYER_STATS } from './constants';
import { LayerType } from './types';
import { ModelNode } from '@/lib/model/types';

type ModelType = 'resnet' | 'yolov8' | 'stable-diffusion' | 'llama2' | 'gpt2' | 'transformer';

type LayerStatsProps = {
  type: LayerType;
  powerMode: boolean;
  isHighlighted: boolean;
  analysisData?: ModelNode;
  modelId?: string; // Add this prop
};

export function LayerStats({ 
  type, 
  powerMode, 
  isHighlighted,
  analysisData,
  modelId  // Accept modelId prop
}: LayerStatsProps) {
  // Determine current model from modelId
  const getCurrentModel = (): ModelType => {
    if (!modelId) return 'resnet';
    
    const id = modelId.toLowerCase();
    if (id.includes('yolo')) return 'yolov8';
    if (id.includes('stable')) return 'stable-diffusion';
    if (id.includes('llama')) return 'llama2';
    if (id.includes('gpt')) return 'gpt2';
    if (id.includes('bart')) return 'transformer';
    return 'resnet';
  };

  const currentModel = getCurrentModel();

  const getStats = () => {
    if (analysisData) {
      return {
        neurons: analysisData.params || 1024,
        inferenceTime: 1.0,
        memoryUsage: analysisData.memoryUsage || 1.0,
        activations: 'ReLU'
      };
    }

    // Try to get model-specific stats
    const modelStats = LAYER_STATS[currentModel];
    if (modelStats && type in modelStats) {
      console.log(`Using ${currentModel} specific stats for ${type}`);
      return modelStats[type];
    }

    // Fallback to generic stats
    console.log(`Using generic stats for ${type}`);
    return LAYER_STATS[type] || {
      neurons: 1024,
      inferenceTime: 1.0,
      memoryUsage: 1.0,
      activations: 'ReLU'
    };
  };

  const stats = getStats();

  useEffect(() => {
    console.log('Layer Stats:', {
      modelId,
      currentModel,
      type,
      stats
    });
  }, [modelId, currentModel, type, stats]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        "fixed left-4 rounded-lg backdrop-blur-md w-72 transition-all duration-300",
        "z-50",
        powerMode 
          ? "bg-black/80 border border-white/20"
          : "bg-white/95 border border-border",
        isHighlighted && (powerMode ? "border-cyan-500/50" : "border-primary")
      )}
      style={{
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className={cn(
          "text-lg font-bold mb-1 flex items-center gap-2",
          powerMode ? "text-white" : "text-black"
        )}>
          <Layers className={cn(
            "w-5 h-5",
            powerMode && "text-cyan-400"
          )} />
          {type.charAt(0).toUpperCase() + type.slice(1)} Layer
        </h3>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-4">
        <StatBar
          label="Neurons"
          value={stats.neurons.toLocaleString()}
          percentage={(stats.neurons / 150528) * 100}
          powerMode={powerMode}
          color="cyan"
        />
        
        <StatBar
          label="Inference Time"
          value={`${stats.inferenceTime} ms`}
          percentage={(stats.inferenceTime / 3.5) * 100}
          powerMode={powerMode}
          color="yellow"
        />
        
        <StatBar
          label="Memory Usage"
          value={`${stats.memoryUsage} MB`}
          percentage={(stats.memoryUsage / 8.6) * 100}
          powerMode={powerMode}
          color="purple"
        />

        {/* Additional Details */}
        {(stats.type || stats.connections || stats.activations) && (
          <div className={cn(
            "mt-4 pt-4 border-t",
            powerMode ? "border-white/20" : "border-gray-200"
          )}>
            <h4 className={cn(
              "text-sm font-medium mb-2",
              powerMode ? "text-white/70" : "text-gray-600"
            )}>
              Additional Details
            </h4>
            <div className="space-y-2 text-sm">
              {stats.type && (
                <div className="flex justify-between">
                  <span className={powerMode ? "text-white/70" : "text-gray-600"}>Block Type</span>
                  <span className={powerMode ? "text-white" : "text-black"}>{stats.type}</span>
                </div>
              )}
              {stats.connections && (
                <div className="flex justify-between">
                  <span className={powerMode ? "text-white/70" : "text-gray-600"}>Connections</span>
                  <span className={powerMode ? "text-white" : "text-black"}>{stats.connections}</span>
                </div>
              )}
              {stats.activations && (
                <div className="flex justify-between">
                  <span className={powerMode ? "text-white/70" : "text-gray-600"}>Activation</span>
                  <span className={powerMode ? "text-white" : "text-black"}>{stats.activations}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StatBar({ label, value, percentage, powerMode, color }: {
  label: string;
  value: string;
  percentage: number;
  powerMode: boolean;
  color: 'cyan' | 'yellow' | 'purple';
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className={powerMode ? "text-white/70" : "text-gray-600"}>
          {label}
        </span>
        <span className={powerMode ? "text-white" : "text-black"}>
          {value}
        </span>
      </div>
      <div className={cn(
        "h-2 rounded-full overflow-hidden",
        powerMode ? `bg-${color}-500/20` : `bg-${color}-500/10`
      )}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`bg-${color}-500 h-full rounded-full`}
        />
      </div>
    </div>
  );
}