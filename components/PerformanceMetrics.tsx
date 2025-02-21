"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, LineChart, Activity, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

type PerformanceMetricsProps = {
  powerMode: boolean;
  inferenceTime?: number;
  memoryUsage?: number;
  deviceUtilization?: number;
};

export default function PerformanceMetrics({ 
  powerMode,
  inferenceTime = 0,
  memoryUsage = 0,
  deviceUtilization = 0
}: PerformanceMetricsProps) {
  const metrics = {
    cpu: {
      fps: 30,
      latency: inferenceTime || 33.3,
      memory: memoryUsage || 1.2,
      utilization: 45
    },
    gpu: {
      fps: 120,
      latency: inferenceTime ? inferenceTime * 0.2 : 8.3, // 5x faster with GPU
      memory: memoryUsage || 4.8,
      utilization: deviceUtilization || 75
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border p-6",
        powerMode ? "border-cyan-500/30 bg-black/40" : "border-border bg-card"
      )}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Activity className={cn(
          "w-6 h-6",
          powerMode && "text-cyan-400"
        )} />
        Real-time Performance
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* CPU Metrics */}
        <div className={cn(
          "rounded-lg p-4",
          powerMode ? "bg-black/40 border border-white/10" : "bg-muted"
        )}>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-blue-500" />
            <h3 className={cn(
              "font-semibold",
              powerMode ? "text-white" : "text-foreground"
            )}>
              CPU Mode
            </h3>
          </div>
          
          <MetricBar
            label="Inference Speed"
            value={metrics.cpu.fps}
            maxValue={120}
            unit="FPS"
            color="blue"
            powerMode={powerMode}
          />
          
          <MetricBar
            label="Latency"
            value={metrics.cpu.latency}
            maxValue={50}
            unit="ms"
            color="blue"
            powerMode={powerMode}
          />
          
          <MetricBar
            label="Memory Usage"
            value={metrics.cpu.memory}
            maxValue={8}
            unit="GB"
            color="blue"
            powerMode={powerMode}
          />

          <MetricBar
            label="Utilization"
            value={metrics.cpu.utilization}
            maxValue={100}
            unit="%"
            color="blue"
            powerMode={powerMode}
          />
        </div>

        {/* GPU Metrics - Only show when powerMode is true */}
        {powerMode && (
          <div className={cn(
            "rounded-lg p-4",
            "bg-black/40 border border-cyan-500/30"
          )}>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className={cn(
                "font-semibold flex items-center gap-2",
                powerMode ? "text-white" : "text-foreground"
              )}>
                NVIDIA GPU Mode
                {powerMode && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                    RAPIDS Optimized
                  </span>
                )}
              </h3>
            </div>
            
            <MetricBar
              label="Inference Speed"
              value={metrics.gpu.fps}
              maxValue={120}
              unit="FPS"
              color="cyan"
              powerMode={powerMode}
              showSpeedupBadge
            />
            
            <MetricBar
              label="Latency"
              value={metrics.gpu.latency}
              maxValue={50}
              unit="ms"
              color="cyan"
              powerMode={powerMode}
              showSpeedupBadge
            />
            
            <MetricBar
              label="Memory Usage"
              value={metrics.gpu.memory}
              maxValue={8}
              unit="GB"
              color="cyan"
              powerMode={powerMode}
            />

            <MetricBar
              label="Utilization"
              value={metrics.gpu.utilization}
              maxValue={100}
              unit="%"
              color="cyan"
              powerMode={powerMode}
            />

            {powerMode && (
              <motion.div 
                className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-4 h-4 text-cyan-400" />
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
        )}
      </div>
    </motion.div>
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
            {value} {unit}
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