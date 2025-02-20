"use client";

import { useMemo } from 'react';
import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type PerformanceChartProps = {
  cpuMetrics: {
    fps: number;
    latency: number;
    memory: number;
    utilization: number;
  };
  gpuMetrics: {
    fps: number;
    latency: number;
    memory: number;
    utilization: number;
  };
  powerMode: boolean;
};

export function PerformanceChart({
  cpuMetrics,
  gpuMetrics,
  powerMode
}: PerformanceChartProps) {
  const data = useMemo(() => {
    // Generate sample data points over time
    return Array.from({ length: 20 }, (_, i) => {
      const time = i * 0.5;
      const noise = Math.sin(i * 0.5) * 0.1;
      
      return {
        time: time.toFixed(1),
        cpuLatency: cpuMetrics.latency * (1 + noise),
        gpuLatency: gpuMetrics.latency * (1 + noise * 0.5),
        cpuMemory: cpuMetrics.memory * (1 + noise),
        gpuMemory: gpuMetrics.memory * (1 + noise * 0.5),
        cpuUtilization: cpuMetrics.utilization * (1 + noise),
        gpuUtilization: gpuMetrics.utilization * (1 + noise * 0.5)
      };
    });
  }, [cpuMetrics, gpuMetrics]);

  const axisStyle = {
    stroke: powerMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    fill: powerMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={powerMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
        />
        <XAxis 
          dataKey="time"
          {...axisStyle}
          axisLine={{ stroke: axisStyle.stroke }}
          tickLine={{ stroke: axisStyle.stroke }}
          tick={{ fill: axisStyle.fill }}
          label={{ 
            value: 'Time (s)', 
            position: 'bottom',
            fill: axisStyle.fill,
            offset: 15
          }}
        />
        <YAxis
          {...axisStyle}
          axisLine={{ stroke: axisStyle.stroke }}
          tickLine={{ stroke: axisStyle.stroke }}
          tick={{ fill: axisStyle.fill }}
          label={{ 
            value: 'Performance Metrics', 
            angle: -90, 
            position: 'insideLeft',
            fill: axisStyle.fill,
            offset: 0
          }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: powerMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.9)",
            border: powerMode ? "1px solid rgba(6, 182, 212, 0.3)" : "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "0.5rem",
            color: powerMode ? "white" : "black"
          }}
        />
        <Legend 
          wrapperStyle={{
            color: powerMode ? "white" : "black"
          }}
        />
        
        {/* CPU Metrics */}
        <Line 
          type="monotone" 
          dataKey="cpuLatency" 
          name="CPU Latency" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="cpuMemory" 
          name="CPU Memory" 
          stroke="#60a5fa" 
          strokeWidth={2}
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="cpuUtilization" 
          name="CPU Utilization" 
          stroke="#93c5fd" 
          strokeWidth={2}
          dot={false}
        />
        
        {/* GPU Metrics */}
        <Line 
          type="monotone" 
          dataKey="gpuLatency" 
          name="GPU Latency" 
          stroke="#06b6d4" 
          strokeWidth={2}
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="gpuMemory" 
          name="GPU Memory" 
          stroke="#22d3ee" 
          strokeWidth={2}
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="gpuUtilization" 
          name="GPU Utilization" 
          stroke="#67e8f9" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}