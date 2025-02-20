"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, AlertTriangle, Gauge, LineChart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';

type NvidiaInsightsPanelProps = {
  powerMode: boolean;
  nodes: ModelNode[];
};

export function NvidiaInsightsPanel({ powerMode, nodes }: NvidiaInsightsPanelProps) {
  const insights = useMemo(() => analyzeModel(nodes), [nodes]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={cn(
        "p-4 border-b flex items-center gap-2",
        powerMode ? "border-white/10" : "border-gray-100"
      )}>
        <Zap className={cn(
          "w-5 h-5",
          powerMode ? "text-cyan-400" : "text-black"
        )} />
        <h3 className={cn(
          "font-medium",
          powerMode ? "text-white" : "text-black"
        )}>
          NVIDIA AI Insights
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* GPU Optimization Status */}
        <div>
          <h4 className={cn(
            "text-sm font-medium mb-3 flex items-center gap-2",
            powerMode ? "text-white/70" : "text-gray-600"
          )}>
            <Cpu className="w-4 h-4" />
            GPU Optimization Status
          </h4>

          <div className={cn(
            "p-3 rounded-lg",
            powerMode ? "bg-black/40" : "bg-gray-100"
          )}>
            <div className="flex items-center justify-between mb-2">
              <span className={cn(
                "text-sm font-medium",
                powerMode ? "text-white" : "text-black"
              )}>
                CUDA Acceleration
              </span>
              <div className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                insights.isGpuOptimized
                  ? powerMode
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-green-100 text-green-600"
                  : powerMode
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-yellow-100 text-yellow-600"
              )}>
                {insights.isGpuOptimized ? "Optimized" : "Needs Optimization"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={cn(
                "flex-1 h-2 rounded-full",
                powerMode ? "bg-gray-800" : "bg-gray-200"
              )}>
                <motion.div
                  className={cn(
                    "h-full rounded-full relative",
                    insights.isGpuOptimized
                      ? powerMode
                        ? "bg-cyan-500"
                        : "bg-green-500"
                      : powerMode
                        ? "bg-yellow-500"
                        : "bg-yellow-500"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${insights.gpuOptimizationScore}%` }}
                  transition={{ duration: 0.5 }}
                >
                  {powerMode && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    />
                  )}
                </motion.div>
              </div>
              <span className={cn(
                "text-sm",
                powerMode ? "text-white" : "text-black"
              )}>
                {insights.gpuOptimizationScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Performance Predictions */}
        <div>
          <h4 className={cn(
            "text-sm font-medium mb-3 flex items-center gap-2",
            powerMode ? "text-white/70" : "text-gray-600"
          )}>
            <Gauge className="w-4 h-4" />
            Performance Predictions
          </h4>

          <div className="space-y-3">
            <MetricCard
              label="Estimated Inference Speed"
              value={insights.inferenceSpeed}
              unit="FPS"
              powerMode={powerMode}
            />
            <MetricCard
              label="Memory Usage"
              value={insights.memoryUsage}
              unit="GB"
              powerMode={powerMode}
            />
            <MetricCard
              label="GPU Utilization"
              value={insights.gpuUtilization}
              unit="%"
              powerMode={powerMode}
            />
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div>
          <h4 className={cn(
            "text-sm font-medium mb-3 flex items-center gap-2",
            powerMode ? "text-white/70" : "text-gray-600"
          )}>
            <Sparkles className="w-4 h-4" />
            Optimization Suggestions
          </h4>

          <div className="space-y-2">
            {insights.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 rounded-lg",
                  powerMode ? "bg-black/40" : "bg-gray-100"
                )}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className={cn(
                    "w-4 h-4 shrink-0 mt-0.5",
                    powerMode ? "text-yellow-400" : "text-yellow-600"
                  )} />
                  <div>
                    <p className={cn(
                      "text-sm font-medium mb-1",
                      powerMode ? "text-white" : "text-black"
                    )}>
                      {suggestion.title}
                    </p>
                    <p className={cn(
                      "text-xs",
                      powerMode ? "text-white/70" : "text-gray-600"
                    )}>
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TensorRT Optimizations */}
        <div>
          <h4 className={cn(
            "text-sm font-medium mb-3 flex items-center gap-2",
            powerMode ? "text-white/70" : "text-gray-600"
          )}>
            <LineChart className="w-4 h-4" />
            TensorRT Optimizations
          </h4>

          <div className={cn(
            "p-3 rounded-lg",
            powerMode ? "bg-black/40" : "bg-gray-100"
          )}>
            <div className="space-y-2">
              {insights.tensorrtOptimizations.map((opt, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    opt.enabled
                      ? powerMode
                        ? "bg-cyan-400"
                        : "bg-green-500"
                      : powerMode
                        ? "bg-white/20"
                        : "bg-gray-300"
                  )} />
                  <span className={cn(
                    "text-sm",
                    powerMode ? "text-white" : "text-black"
                  )}>
                    {opt.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: number;
  unit: string;
  powerMode: boolean;
};

function MetricCard({ label, value, unit, powerMode }: MetricCardProps) {
  return (
    <div className={cn(
      "p-3 rounded-lg",
      powerMode ? "bg-black/40" : "bg-gray-100"
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className={cn(
          "text-sm",
          powerMode ? "text-white/70" : "text-gray-600"
        )}>
          {label}
        </span>
        <span className={cn(
          "text-sm font-medium",
          powerMode ? "text-white" : "text-black"
        )}>
          {value} {unit}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className={cn(
          "flex-1 h-2 rounded-full",
          powerMode ? "bg-gray-800" : "bg-gray-200"
        )}>
          <motion.div
            className={cn(
              "h-full rounded-full relative",
              powerMode ? "bg-cyan-500" : "bg-blue-500"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${(value / getMaxValue(unit)) * 100}%` }}
            transition={{ duration: 0.5 }}
          >
            {powerMode && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function getMaxValue(unit: string): number {
  switch (unit) {
    case 'FPS':
      return 120;
    case 'GB':
      return 16;
    case '%':
      return 100;
    default:
      return 100;
  }
}

function analyzeModel(nodes: ModelNode[]) {
  // Calculate GPU optimization score based on layer composition
  const gpuOptimizationScore = Math.min(
    nodes.reduce((score, node) => {
      switch (node.type) {
        case 'cnn':
        case 'transformer':
          return score + 15;
        case 'rnn':
        case 'attention':
          return score + 10;
        default:
          return score + 5;
      }
    }, 0),
    100
  );

  // Estimate performance metrics
  const inferenceSpeed = Math.max(30, Math.min(120, gpuOptimizationScore));
  const memoryUsage = nodes.length * 0.5;
  const gpuUtilization = Math.min(95, gpuOptimizationScore * 0.9);

  // Generate optimization suggestions
  const suggestions = [];
  
  if (nodes.filter(n => n.type === 'mlp').length > 2) {
    suggestions.push({
      title: 'High Dense Layer Count',
      description: 'Consider adding BatchNorm layers between dense layers to improve training stability and performance.'
    });
  }

  if (!nodes.some(n => n.type === 'dropout')) {
    suggestions.push({
      title: 'Missing Regularization',
      description: 'Add dropout layers to prevent overfitting and improve model generalization.'
    });
  }

  if (nodes.filter(n => n.type === 'cnn').length > 3) {
    suggestions.push({
      title: 'Complex CNN Architecture',
      description: 'Consider using residual connections to improve gradient flow in deep CNN networks.'
    });
  }

  // TensorRT optimization opportunities
  const tensorrtOptimizations = [
    { name: 'FP16 Precision', enabled: gpuOptimizationScore > 70 },
    { name: 'Layer Fusion', enabled: nodes.length > 3 },
    { name: 'Kernel Auto-Tuning', enabled: true },
    { name: 'Dynamic Batching', enabled: gpuOptimizationScore > 80 }
  ];

  return {
    isGpuOptimized: gpuOptimizationScore >= 80,
    gpuOptimizationScore,
    inferenceSpeed,
    memoryUsage,
    gpuUtilization,
    suggestions,
    tensorrtOptimizations
  };
}