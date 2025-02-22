// components/NvidiaOptimizationModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, ArrowRight, Check, X, RefreshCw } from 'lucide-react';
import { NvidiaOptimizer } from '@/lib/model/nvidia-optimizer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OptimizationResult } from '@/lib/model/types';

interface OptimizationStepProps {
  icon: typeof Activity;
  label: string;
  status: 'waiting' | 'in-progress' | 'complete';
}

function OptimizationStep({ icon: Icon, label, status }: OptimizationStepProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        status === 'waiting' ? "bg-gray-800 text-white/50" :
        status === 'in-progress' ? "bg-cyan-500/20 text-cyan-400 animate-pulse" :
        "bg-cyan-500 text-white"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className={cn(
        "text-sm font-medium",
        status === 'waiting' ? "text-white/50" :
        status === 'in-progress' ? "text-cyan-400" :
        "text-white"
      )}>
        {label}
        {status === 'in-progress' && (
          <span className="ml-2 text-xs text-cyan-400/50">
            In Progress...
          </span>
        )}
        {status === 'complete' && (
          <span className="ml-2 text-xs text-green-400">
            Complete
          </span>
        )}
      </span>
    </div>
  );
}

interface NvidiaOptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelId: string;
  currentMetrics: any; // Replace with your metrics type
  onOptimizationComplete?: (result: any) => void;
}

function getStepStatus(step: string, currentPhase: string): 'waiting' | 'in-progress' | 'complete' {
  const phases = ['analyzing', 'converting', 'optimizing', 'complete'];
  const stepIndex = phases.indexOf(step);
  const currentIndex = phases.indexOf(currentPhase);

  if (currentIndex > stepIndex) return 'complete';
  if (currentIndex === stepIndex) return 'in-progress';
  return 'waiting';
}

type ModelOptimizations = {
  [key: string]: {
    performance: {
      speedup: string;
      memory: string;
      latency: string;
    };
    optimizations: {
      tensorRTMode: 'FP16' | 'FP32';
      layerFusion: boolean;
      rapidsAcceleration: boolean;
    };
  };
};

const MODEL_OPTIMIZATIONS: ModelOptimizations = {
  'resnet-50': {
    performance: {
      speedup: '2.2x',
      memory: '-15%',
      latency: '-55%'
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: true
    }
  },
  'yolov8': {
    performance: {
      speedup: '2.8x',
      memory: '-20%',
      latency: '-65%'
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: true
    }
  },
  'stable-diffusion': {
    performance: {
      speedup: '3.2x',
      memory: '-25%',
      latency: '-70%'
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
  'vit': {
    performance: {
      speedup: '2.4x',
      memory: '-18%',
      latency: '-60%'
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: true
    }
  },
  'gpt2': {
    performance: {
      speedup: '1.8x',
      memory: '-15%',
      latency: '-45%'
    },
    optimizations: {
      tensorRTMode: 'FP32',
      layerFusion: false,
      rapidsAcceleration: false
    }
  },
  'bart': {
    performance: {
      speedup: '2.0x',
      memory: '-15%',
      latency: '-50%'
    },
    optimizations: {
      tensorRTMode: 'FP32',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
  'biobert': {
    performance: {
      speedup: '2.1x',
      memory: '-15%',
      latency: '-52%'
    },
    optimizations: {
      tensorRTMode: 'FP32',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
  'whisper': {
    performance: {
      speedup: '2.3x',
      memory: '-18%',
      latency: '-58%'
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: true
    }
  }
};

export function NvidiaOptimizationModal({ 
  isOpen, 
  onClose, 
  modelId,
  currentMetrics,
  onOptimizationComplete 
}: NvidiaOptimizationModalProps) {
  const [optimizationPhase, setOptimizationPhase] = useState('initial');
  const [optimizer] = useState(() => new NvidiaOptimizer());
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modelType = getModelType(modelId);
  const optimizations = MODEL_OPTIMIZATIONS[modelType];

  useEffect(() => {
    if (isOpen && optimizationPhase === 'initial') {
      runOptimization();
    }
  }, [isOpen]);

  const runOptimization = async () => {
    try {
      setOptimizationPhase('analyzing');
      await simulateDelay(1000);

      setOptimizationPhase('converting');
      await simulateDelay(1500);

      setOptimizationPhase('optimizing');
      const optimizationResult = await optimizer.optimizeModel(modelId, currentMetrics);
      
      setOptimizationPhase('complete');
      setResult(optimizationResult);
      onOptimizationComplete?.(optimizationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Optimization failed');
      setOptimizationPhase('error');
    }
  };

  const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleClose = () => {
    onClose();
    // Reset state after animation completes
    setTimeout(() => {
      setOptimizationPhase('initial');
      setError(null);
      setResult(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[600px] bg-gray-900 rounded-xl border border-cyan-500/30 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">
                  NVIDIA Optimizations
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-800 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Progress Steps */}
              <div className="space-y-4">
                <OptimizationStep
                  icon={Activity}
                  label="Analyzing Model Architecture"
                  status={getStepStatus('analyzing', optimizationPhase)}
                />
                <OptimizationStep
                  icon={RefreshCw}
                  label="Converting to TensorRT Format"
                  status={getStepStatus('converting', optimizationPhase)}
                />
                <OptimizationStep
                  icon={Zap}
                  label="Applying NVIDIA Optimizations"
                  status={getStepStatus('optimizing', optimizationPhase)}
                />
              </div>

              {/* Results */}
              {optimizationPhase === 'complete' && result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white">
                    Optimization Results
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-white/70 mb-2">
                        Performance Improvements
                      </h4>
                      <div className="space-y-2 text-white">
                        <div className="flex justify-between">
                          <span>Speedup Factor</span>
                          <span className="text-cyan-400">
                            {result.optimizations.performance.speedupFactor.toFixed(1)}x
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Memory Reduction</span>
                          <span className="text-cyan-400">
                            {(result.optimizations.performance.memoryReduction * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Latency Improvement</span>
                          <span className="text-cyan-400">
                            {(result.optimizations.performance.latencyImprovement * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-white/70 mb-2">
                        Applied Optimizations
                      </h4>
                      <div className="space-y-2 text-white">
                        <div className="flex justify-between">
                          <span>TensorRT Mode</span>
                          <span className="text-cyan-400">
                            {result.optimizations.tensorRT.precisionMode}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Layer Fusion</span>
                          <span className="text-cyan-400">
                            {result.optimizations.tensorRT.layerFusion ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>RAPIDS Acceleration</span>
                          <span className="text-cyan-400">
                            {result.optimizations.rapids.enabled ? 'Enabled' : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Alert */}
                  <Alert className="bg-cyan-500/10 border-cyan-500/30 text-cyan-300">
                    <AlertDescription>
                      Optimization complete! The model is now running with NVIDIA TensorRT 
                      and hardware-specific optimizations. Performance metrics have been
                      updated to reflect these improvements.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {/* Error State */}
              {optimizationPhase === 'error' && (
                <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
                  <AlertDescription>
                    {error || 'An error occurred during optimization. Please try again.'}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-cyan-500/30 flex justify-end gap-3">
              {optimizationPhase === 'error' ? (
                <Button 
                  variant="default"
                  onClick={runOptimization}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Try Again
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleClose}
                  className="bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Close
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getModelType(modelId: string): string {
  const id = modelId.toLowerCase();
  if (id.includes('resnet')) return 'resnet-50';
  if (id.includes('yolo')) return 'yolov8';
  if (id.includes('stable')) return 'stable-diffusion';
  if (id.includes('vit')) return 'vit';
  if (id.includes('gpt')) return 'gpt2';
  if (id.includes('bart')) return 'bart';
  if (id.includes('whisper')) return 'whisper';
  if (id.includes('biobert')) return 'biobert';
  return 'resnet-50';
}

function getModelName(modelId: string): string {
  const id = modelId.toLowerCase();
  if (id.includes('resnet')) return 'ResNet-50';
  if (id.includes('yolo')) return 'YOLOv8';
  if (id.includes('stable')) return 'Stable Diffusion';
  if (id.includes('vit')) return 'ViT';
  if (id.includes('gpt')) return 'GPT-2';
  if (id.includes('bart')) return 'BART';
  if (id.includes('whisper')) return 'Whisper';
  if (id.includes('biobert')) return 'BioBERT';
  return 'ResNet-50';
}