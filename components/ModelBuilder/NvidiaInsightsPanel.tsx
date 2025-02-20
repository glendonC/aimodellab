"use client";

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Gauge, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';
import { SimulationResult } from '@/lib/model/simulator';

interface NvidiaInsightsPanelProps {
  powerMode: boolean;
  nodes: ModelNode[];
  simulationResults: SimulationResult | null;
  isSimulating: boolean;
}

export function NvidiaInsightsPanel({ 
  powerMode, 
  nodes, 
  simulationResults,
  isSimulating 
}: NvidiaInsightsPanelProps) {
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<{[key: string]: boolean}>({});
  const [showFinalInsights, setShowFinalInsights] = useState(false);

  useEffect(() => {
    if (isSimulating && simulationResults?.details) {
      setShowFinalInsights(false);
      setAnalysisSteps([]);
      setCompletedSteps({});

      simulationResults.details.forEach((detail, index) => {
        setTimeout(() => {
          setAnalysisSteps(prev => [...prev, detail]);

          // Mark step as completed after a delay
          setTimeout(() => {
            setCompletedSteps(prev => ({
              ...prev,
              [detail]: true
            }));

            // If this is the last detail, show final insights
            if (index === simulationResults.details.length - 1) {
              setTimeout(() => setShowFinalInsights(true), 1000);
            }
          }, 1500);
        }, index * 800);
      });
    }
  }, [isSimulating, simulationResults]);

  const getStepColor = (step: string) => {
    if (!completedSteps[step]) return powerMode ? "text-white" : "text-black";
    if (step.includes("FLOPS") || step.includes("Memory") || step.includes("latency")) {
      return "text-green-500";
    }
    return "text-red-500 line-through";
  };

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
        <AnimatePresence mode="wait">
          {!showFinalInsights ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              className="p-4 font-mono text-sm"
            >
              <div 
                className={cn(
                  "rounded-lg p-4 max-h-[60vh] overflow-y-auto",
                  powerMode ? "bg-black/40" : "bg-gray-50"
                )}
                ref={(el) => {
                  if (el) {
                    el.scrollTop = el.scrollHeight;
                  }
                }}
              >
                {analysisSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                      "mb-2 transition-colors duration-300",
                      getStepColor(step)
                    )}
                  >
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }
              }}
              className="p-4 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2 }
                }}
                className="absolute top-4 right-4 text-sm text-cyan-400"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
              </motion.div>
              {/* Performance Summary */}
              <div className={cn(
                "rounded-lg p-4",
                powerMode ? "bg-black/40" : "bg-white shadow-sm"
              )}>
                <h4 className={cn(
                  "text-sm font-medium mb-4 flex items-center gap-2",
                  powerMode ? "text-white" : "text-gray-900"
                )}>
                  <Gauge className="w-4 h-4" />
                  Performance Overview
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {simulationResults?.metrics.map((metric, index) => (
                    <div key={index} className={cn(
                      "p-3 rounded-lg",
                      powerMode ? "bg-black/20" : "bg-gray-50"
                    )}>
                      <div className="text-xs text-gray-500 mb-1">{metric.name}</div>
                      <div className={cn(
                        "text-lg font-semibold",
                        powerMode ? "text-white" : "text-gray-900"
                      )}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization Tips */}
              {simulationResults?.optimizationTips && (
                <div className={cn(
                  "rounded-lg p-4",
                  powerMode ? "bg-black/40" : "bg-white shadow-sm"
                )}>
                  <h4 className={cn(
                    "text-sm font-medium mb-4 flex items-center gap-2",
                    powerMode ? "text-white" : "text-gray-900"
                  )}>
                    <Sparkles className="w-4 h-4" />
                    Optimization Tips
                  </h4>
                  <div className="space-y-3">
                    {simulationResults.optimizationTips.map((tip, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-3 rounded-lg",
                          powerMode ? "bg-black/20" : "bg-gray-50"
                        )}
                      >
                        <div className={cn(
                          "font-medium mb-1",
                          powerMode ? "text-white" : "text-gray-900"
                        )}>
                          {tip.title}
                        </div>
                        <div className={cn(
                          "text-sm",
                          powerMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          {tip.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

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
  const gpuOptimizationScore = useMemo(async () => {
    const scores = await Promise.all(nodes.map(async node => {
      const isOptimized = await analyzer.checkGpuOptimization(node);
      const tensorCoreEfficiency = await analyzer.measureTensorCoreEfficiency(node);
      return isOptimized ? (tensorCoreEfficiency > 1000 ? 15 : 10) : 5;
    }));
    return Math.min(scores.reduce((a, b) => a + b, 0), 100);
  }, [nodes]);

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

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  powerMode: boolean;
}