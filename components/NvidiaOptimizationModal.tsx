"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, ArrowRight, Check, X, RefreshCw } from 'lucide-react';
import { NvidiaOptimizer } from '@/lib/model/nvidia-optimizer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OptimizationResult } from '@/lib/model/types';
import { PerformanceChart } from './PerformanceChart';

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
  currentMetrics: any;
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
  'resnet': {
    performance: {
      speedup: '4.0x',   
      memory: '0%',       
      latency: '74.8%'    
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
  'yolov8': {
    performance: {
      speedup: '3.6x',    
      memory: '0%',       
      latency: '72.5%'   
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
'stable-diffusion': {
    performance: {
      speedup: '20.5x',         
      memory: '0%',            
      latency: '95.1%'          
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: true
    }
  },
  'vit': {
    performance: {
      speedup: '3.6x',
      memory: '0%',
      latency: '72.4%'
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
  'gpt2': {
    performance: {
      speedup: '1.8x',
      memory: '0%',
      latency: '43.2%'
    },
    optimizations: {
      tensorRTMode: 'FP32',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
  'bart': {
    performance: {
      speedup: '2.6x',
      memory: '0%',
      latency: '60.9%'
    },
    optimizations: {
      tensorRTMode: 'FP32',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
  'biobert': {
    performance: {
      speedup: '3.1x',
      memory: '0%',
      latency: '68.1%'
    },
    optimizations: {
      tensorRTMode: 'FP32',
      layerFusion: true,
      rapidsAcceleration: false
    }
  },
  'whisper': {
    performance: {
      speedup: '4.5x',
      memory: '0%',
      latency: '77.9%'
    },
    optimizations: {
      tensorRTMode: 'FP16',
      layerFusion: true,
      rapidsAcceleration: false
    }
  }
};

type PerformanceMetrics = {
  fps: number;
  latency: number;
  memory: number;
  utilization: number;
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
  const currentModel = modelType.split('-')[0];

  console.log("Model ID received:", modelId);
  console.log("Model type detected:", modelType);
  console.log("Optimizations found:", optimizations);
  console.log("Current model:", currentModel);

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

  const calculateGPUMetrics = (cpuMetrics: PerformanceMetrics, optimizations: any): PerformanceMetrics => {
    // Extract speedup factor from string (e.g., "3.6x" -> 3.6)
    const speedupFactor = parseFloat(optimizations.performance.speedup);
    
    return {
      fps: cpuMetrics.fps * speedupFactor,
      latency: cpuMetrics.latency / speedupFactor,
      memory: cpuMetrics.memory,
      utilization: 35
    };
  };

  const formatChartData = (cpuMetrics: PerformanceMetrics, gpuMetrics: PerformanceMetrics) => {
    const speedupFactor = parseFloat(optimizations.performance.speedup);
    
    return Array.from({ length: 20 }, (_, i) => {
      // More realistic fluctuations based on model characteristics
      const timeVariance = Math.sin(i / 3) * 0.05; // Smoother variations
      return {
        time: i,
        // CPU metrics with realistic load patterns
        cpuLatency: cpuMetrics.latency * (1 + timeVariance),
        cpuMemory: cpuMetrics.memory,  // Memory stays more stable
        cpuUtilization: Math.min(100, cpuMetrics.utilization * (1 + timeVariance * 0.5)),
        
        // GPU metrics show optimization benefits
        gpuLatency: cpuMetrics.latency / speedupFactor * (1 + timeVariance * 0.3), // Less variance on GPU
        gpuMemory: gpuMetrics.memory,  // Same memory usage
        gpuUtilization: Math.min(100, gpuMetrics.utilization * (1 + timeVariance * 0.2))
      };
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex items-start gap-6">
            {/* Main Modal */}
            <motion.div 
              className="w-[600px] bg-gray-900 rounded-xl border border-cyan-500/30 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      NVIDIA Optimizations
                    </h2>
                    <p className="text-sm text-white/70">
                      {getModelName(modelId)}
                    </p>
                  </div>
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

                {/* Results and Chart */}
                {optimizationPhase === 'complete' && result && (
                  <>
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
                              <span className="text-white/70">Speedup Factor</span>
                              <span className="text-cyan-400">{optimizations.performance.speedup}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Latency Improvement</span>
                              <span className="text-cyan-400">{optimizations.performance.latency}</span>
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
                                {optimizations.optimizations.tensorRTMode}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Layer Fusion</span>
                              <span className="text-cyan-400">
                                {optimizations.optimizations.layerFusion ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>RAPIDS Acceleration</span>
                              <span className="text-cyan-400">
                                {optimizations.optimizations.rapidsAcceleration ? 'Enabled' : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info Alert */}
                      <Alert className="bg-cyan-500/10 border-cyan-500/30 text-cyan-300">
                        <AlertDescription>
                        Analysis complete! These are the model's performance metrics when optimized with NVIDIA TensorRT 
                        and hardware-specific optimizations based on A100 GPU benchmarks via Brev.dev.
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  </>
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

            {/* Performance Chart Panel - Now on the right */}
            {optimizationPhase === 'complete' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-[600px] bg-gray-900 rounded-xl border border-cyan-500/30 shadow-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold text-white">Performance Forecast</h3>
                  <span className="text-sm text-white/70">
                    {getModelName(modelId)}
                  </span>
                </div>
                <div className="h-[400px]">
                  <PerformanceChart
                    data={formatChartData(
                      {
                        fps: currentMetrics.fps || 30.58,
                        latency: currentMetrics.latency || 32.69,
                        memory: currentMetrics.memory || 5.51,
                        utilization: currentMetrics.utilization || 95
                      },
                      calculateGPUMetrics(currentMetrics, optimizations)
                    )}
                    powerMode={true}
                    modelId={modelId}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getModelType(modelId: string): string {
  const id = modelId.toLowerCase();
  if (id.includes('resnet')) return 'resnet';
  if (id.includes('yolo')) return 'yolov8';
  if (id.includes('stable')) return 'stable-diffusion';
  if (id.includes('vit')) return 'vit';
  if (id.includes('gpt')) return 'gpt2';
  if (id.includes('bart')) return 'bart';
  if (id.includes('whisper')) return 'whisper';
  if (id.includes('biobert')) return 'biobert';
  return 'resnet';
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