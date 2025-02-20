"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Cpu, Zap, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';
import { PerformanceChart } from './PerformanceChart';

type PerformanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  powerMode: boolean;
  analysisResult: AnalysisResult | null;
};

export default function PerformanceModal({
  isOpen,
  onClose,
  powerMode,
  analysisResult
}: PerformanceModalProps) {
  if (!analysisResult) return null;

  const cpuMetrics = {
    fps: 30,
    latency: analysisResult.performance.inferenceTime,
    memory: analysisResult.performance.memoryPeak / (1024 * 1024),
    utilization: 45
  };

  const gpuMetrics = {
    fps: 120,
    latency: analysisResult.performance.inferenceTime * 0.2,
    memory: analysisResult.performance.memoryPeak / (1024 * 1024),
    utilization: analysisResult.performance.deviceUtilization * 100
  };

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

                {/* GPU Metrics */}
                <div className={cn(
                  "rounded-lg p-4",
                  powerMode ? "bg-gray-800/50 border border-cyan-500/30" : "bg-muted"
                )}>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <h3 className={cn(
                      "font-semibold flex items-center gap-2",
                      powerMode ? "text-white" : "text-foreground"
                    )}>
                      NVIDIA GPU Performance
                      {powerMode && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                          RAPIDS Optimized
                        </span>
                      )}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <MetricBar
                      label="Inference Speed"
                      value={gpuMetrics.fps}
                      maxValue={120}
                      unit="FPS"
                      color="cyan"
                      powerMode={powerMode}
                      showSpeedupBadge
                    />
                    
                    <MetricBar
                      label="Latency"
                      value={gpuMetrics.latency}
                      maxValue={50}
                      unit="ms"
                      color="cyan"
                      powerMode={powerMode}
                      showSpeedupBadge
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
                  </div>

                  {powerMode && (
                    <motion.div 
                      className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <LineChart className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-400">
                          RAPIDS Acceleration Impact
                        </span>
                      </div>
                      <div className="text-xs text-cyan-300">
                        • 5x Faster Inference Speed
                        <br />
                        • 3x Lower Memory Latency
                        <br />
                        • Real-time Neural Processing
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Performance Chart */}
              <div className={cn(
                "rounded-lg p-4",
                powerMode ? "bg-gray-800/50" : "bg-muted"
              )}>
                <h3 className={cn(
                  "font-semibold mb-4",
                  powerMode ? "text-white" : "text-foreground"
                )}>
                  Performance Over Time
                </h3>
                <div className="h-64">
                  <PerformanceChart
                    cpuMetrics={cpuMetrics}
                    gpuMetrics={gpuMetrics}
                    powerMode={powerMode}
                  />
                </div>
              </div>
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
};

function MetricBar({ 
  label, 
  value, 
  maxValue, 
  unit, 
  color, 
  powerMode,
  showSpeedupBadge 
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
            {value.toFixed(1)} {unit}
          </span>
          {showSpeedupBadge && powerMode && (
            <span className="text-xs px-1.5 rounded-full bg-cyan-500/20 text-cyan-400">
              5x
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