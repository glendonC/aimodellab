"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Cpu, Zap, LineChart, Info, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';
import { PerformanceCalculator } from '@/lib/model/performance';
import { useState } from 'react';

type PerformanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  powerMode: boolean;
  analysisResult: AnalysisResult | null;
};

// Add NVIDIA hardware specs
const NVIDIA_SPECS = {
  'A100': {
    tensorCoreFlops: 312e12,  // 312 TFLOPS FP16
    memory: 80e9,             // 80GB HBM2e
    memoryBandwidth: 2e12,    // 2TB/s with NVLink
    tensorCores: 432,
    cudaCores: 6912
  },
  'V100': {
    tensorCoreFlops: 125e12,  // 125 TFLOPS FP16
    memory: 32e9,             // 32GB HBM2
    memoryBandwidth: 900e9,   // 900 GB/s
    tensorCores: 640,
    cudaCores: 5120
  }
} as const;

// Add types for TensorRT optimizations
type TensorRTOptimization = {
  kernelTime: number;
  memoryThroughput: number;
  tensorParallelism: number;
  int8Quantization?: boolean;
  dynamicBatching?: boolean;
  layerFusion?: boolean;
  fp16Inference?: boolean;
  attentionOptimization?: boolean;
};

export default function PerformanceModal({
  isOpen,
  onClose,
  powerMode,
  analysisResult
}: PerformanceModalProps) {
  if (!analysisResult) return null;

  const calculator = new PerformanceCalculator();
  const { cpuMetrics, gpuMetrics, nvOptimizations } = calculator.calculateMetrics(analysisResult, powerMode);

  // Get model name from ID
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

  const modelName = getDisplayName(analysisResult.graph.metadata.modelId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={cn(
              "w-[800px] rounded-xl shadow-2xl",
              powerMode ? "bg-gray-900 border border-cyan-500/30" : "bg-white"
            )}
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className={cn(
                  "w-6 h-6",
                  powerMode && "text-cyan-400"
                )} />
                <h2 className={cn(
                  "text-2xl font-bold",
                  powerMode ? "text-white" : "text-foreground"
                )}>
                  Performance Analysis
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({modelName})
                  </span>
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

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* CPU vs GPU Comparison */}
              <div className="grid grid-cols-2 gap-6">
                {/* CPU Metrics */}
                <div className={cn(
                  "rounded-lg p-4",
                  powerMode ? "bg-gray-800/50" : "bg-muted"
                )}>
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-5 h-5 text-blue-500" />
                    <h3 className={cn(
                      "font-semibold",
                      powerMode ? "text-white" : "text-foreground"
                    )}>
                      CPU Performance
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <MetricBar
                      label="Inference Speed"
                      value={cpuMetrics.fps}
                      maxValue={120}
                      unit="FPS"
                      color="blue"
                      powerMode={powerMode}
                    />
                    
                    <MetricBar
                      label="Latency"
                      value={cpuMetrics.latency}
                      maxValue={50}
                      unit="ms"
                      color="blue"
                      powerMode={powerMode}
                    />
                    
                    <MetricBar
                      label="Memory Usage"
                      value={cpuMetrics.memory}
                      maxValue={8}
                      unit="GB"
                      color="blue"
                      powerMode={powerMode}
                    />

                    <MetricBar
                      label="Utilization"
                      value={cpuMetrics.utilization}
                      maxValue={100}
                      unit="%"
                      color="blue"
                      powerMode={powerMode}
                    />
                  </div>
                </div>

                {/* GPU Metrics - Only show when GPU metrics exist */}
                {gpuMetrics && (
                  <div className={cn(
                    "rounded-lg p-4",
                    "bg-black/40 border border-cyan-500/30"
                  )}>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-semibold flex items-center gap-2 text-white">
                        NVIDIA GPU Mode
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                          TensorRT Optimized
                        </span>
                      </h3>
                    </div>
                    
                    <MetricBar
                      label="Inference Speed"
                      value={gpuMetrics.fps}
                      maxValue={120}
                      unit="FPS"
                      color="cyan"
                      powerMode={powerMode}
                      showSpeedupBadge
                      speedup={nvOptimizations?.speedup}
                    />
                    
                    <MetricBar
                      label="Latency"
                      value={gpuMetrics.latency}
                      maxValue={50}
                      unit="ms"
                      color="cyan"
                      powerMode={powerMode}
                      showSpeedupBadge
                      speedup={nvOptimizations?.speedup}
                    />
                    
                    <MetricBar
                      label="Memory Usage"
                      value={gpuMetrics.memory}
                      maxValue={8}
                      unit="GB"
                      color="cyan"
                      powerMode={powerMode}
                    />

                    <MetricBar
                      label="Utilization"
                      value={gpuMetrics.utilization}
                      maxValue={100}
                      unit="%"
                      color="cyan"
                      powerMode={powerMode}
                    />

                    {/* RAPIDS info section */}
                  </div>
                )}
              </div>

              {/* Add the explanation panel */}
              <MetricsExplanation powerMode={powerMode} />

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type MetricBarProps = {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  color: 'blue' | 'cyan';
  powerMode: boolean;
  showSpeedupBadge?: boolean;
  speedup?: string;
};

function MetricBar({ 
  label, 
  value, 
  maxValue, 
  unit, 
  color, 
  powerMode,
  showSpeedupBadge,
  speedup
}: MetricBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-sm mb-1">
        <span className={powerMode ? "text-white/70" : "text-muted-foreground"}>
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className={powerMode ? "text-white" : "text-foreground"}>
            {value} {unit}
          </span>
          {showSpeedupBadge && powerMode && (
            <span className="text-xs px-1.5 rounded-full bg-cyan-500/20 text-cyan-400">
              {speedup}
            </span>
          )}
        </div>
      </div>
      <div className={cn(
        "h-2 rounded-full overflow-hidden",
        powerMode 
          ? color === 'cyan' ? "bg-cyan-500/20" : "bg-blue-500/20"
          : "bg-secondary"
      )}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={cn(
            "h-full rounded-full relative",
            color === 'cyan' ? "bg-cyan-500" : "bg-blue-500"
          )}
        >
          {powerMode && color === 'cyan' && (
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
  );
}

// Add new component for the info panel
function MetricsExplanation({ powerMode }: { powerMode: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className={cn(
        "mt-4 rounded-lg overflow-hidden",
        powerMode ? "bg-gray-800/50" : "bg-muted"
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full p-4 flex items-center justify-between",
          powerMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100"
        )}
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span className={cn(
            "text-sm font-medium",
            powerMode ? "text-white" : "text-foreground"
          )}>
            Understanding These Metrics
          </span>
        </div>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform",
            isExpanded && "transform rotate-180",
            powerMode ? "text-white/70" : "text-gray-500"
          )}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            <div className={cn(
              "space-y-4 text-sm",
              powerMode ? "text-white/70" : "text-gray-600"
            )}>
              <div>
                <h4 className="font-medium mb-1">Inference Speed (FPS)</h4>
                <p>Number of model predictions per second, measured on real workloads. Higher is better.</p>
                <div className="mt-1 text-xs">
                  Measured by: Running 100 iterations after warmup period
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">Latency (ms)</h4>
                <p>Average time for a single model prediction. Lower is better.</p>
                <div className="mt-1 text-xs">
                  Measured by: Mean time across all iterations with torch.cuda.synchronize()
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">Memory Usage (GB)</h4>
                <p>Peak GPU memory allocated during inference.</p>
                <div className="mt-1 text-xs">
                  Measured by: torch.cuda.max_memory_allocated()
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">Utilization (%)</h4>
                <p>Hardware resource usage during inference.</p>
                <div className="mt-1 text-xs">
                  CPU typically runs at 95% while GPU operates more efficiently at 35%
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">GPU Acceleration</h4>
                <p>Performance improvements vary by model architecture:</p>
                <ul className="mt-1 ml-4 list-disc text-xs space-y-1">
                  <li>Vision Models (ResNet, YOLO): 3-4x speedup</li>
                  <li>Language Models (GPT-2, BART): 2-3x speedup</li>
                  <li>Stable Diffusion: Up to 20x speedup</li>
                </ul>
              </div>

              <div className={cn(
                "mt-2 p-2 rounded text-xs",
                powerMode ? "bg-cyan-500/10 text-cyan-300" : "bg-cyan-50 text-cyan-700"
              )}>
                <strong>Note:</strong> All metrics measured on NVIDIA A100-SXM4-40GB GPU and benchmarked 
                using Brev.dev infrastructure. Results represent real-world performance across multiple test runs.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}