"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, AlertTriangle, Gauge, LineChart, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';
import { SimulationResult } from '@/lib/model/simulator';

type NvidiaInsightsPanelProps = {
  powerMode: boolean;
  nodes: ModelNode[];
  simulationResults: SimulationResult | null;
  isSimulating: boolean;
};

export function NvidiaInsightsPanel({ 
  powerMode, 
  nodes, 
  simulationResults,
  isSimulating 
}: NvidiaInsightsPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className={cn(
        "p-4 border-b flex items-center gap-2 bg-inherit",
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

      <div className="flex-1 min-h-0 overflow-y-auto">
        {isSimulating ? (
          <div className="flex items-center justify-center h-full p-4">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : simulationResults ? (
          <div className="p-4 space-y-6">
            {/* Performance Metrics */}
            <div className="space-y-2">
              <h4 className={cn(
                "text-sm font-medium",
                powerMode ? "text-white" : "text-black"
              )}>
                Performance Metrics
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <MetricCard
                  label="GPU Utilization"
                  value={`${simulationResults.performance.gpuUtilization.toFixed(1)}%`}
                  icon={Cpu}
                  powerMode={powerMode}
                />
                <MetricCard
                  label="Estimated FPS"
                  value={`${simulationResults.performance.estimatedFps.toFixed(1)}`}
                  icon={LineChart}
                  powerMode={powerMode}
                />
              </div>
            </div>

            {/* Warnings */}
            {simulationResults.warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className={cn(
                  "text-sm font-medium",
                  powerMode ? "text-white" : "text-black"
                )}>
                  Warnings
                </h4>
                <div className="space-y-2">
                  {simulationResults.warnings.map((warning, i) => (
                    <div
                      key={i}
                      className={cn(
                        "p-3 rounded-lg",
                        powerMode ? "bg-red-500/20" : "bg-red-50"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <div>
                          <p className={cn(
                            "text-sm font-medium",
                            powerMode ? "text-white" : "text-black"
                          )}>
                            {warning.message}
                          </p>
                          <p className={cn(
                            "text-xs mt-1",
                            powerMode ? "text-white/70" : "text-gray-600"
                          )}>
                            {warning.suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Tips */}
            <div className="space-y-2">
              <h4 className={cn(
                "text-sm font-medium",
                powerMode ? "text-white" : "text-black"
              )}>
                Optimization Tips
              </h4>
              <div className="space-y-2">
                {simulationResults.optimizationTips.map((tip, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-3 rounded-lg",
                      powerMode ? "bg-black/40" : "bg-gray-50"
                    )}
                  >
                    <p className={cn(
                      "text-sm font-medium",
                      powerMode ? "text-white" : "text-black"
                    )}>
                      {tip.title}
                    </p>
                    <p className={cn(
                      "text-xs mt-1",
                      powerMode ? "text-white/70" : "text-gray-600"
                    )}>
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-4 text-sm text-gray-500">
            Run simulation to see insights
          </div>
        )}
      </div>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  icon: React.ElementType;
  powerMode: boolean;
};

function MetricCard({ label, value, icon: Icon, powerMode }: MetricCardProps) {
  return (
    <div className={cn(
      "p-3 rounded-lg",
      powerMode ? "bg-black/40" : "bg-gray-50"
    )}>
      <div className="flex items-center gap-2">
        <Icon className={cn(
          "w-4 h-4",
          powerMode ? "text-cyan-400" : "text-black"
        )} />
        <div>
          <p className={cn(
            "text-xs",
            powerMode ? "text-white/70" : "text-gray-600"
          )}>
            {label}
          </p>
          <p className={cn(
            "text-sm font-medium",
            powerMode ? "text-white" : "text-black"
          )}>
            {value}
          </p>
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