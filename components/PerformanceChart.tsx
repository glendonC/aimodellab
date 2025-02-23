"use client";

import { useMemo } from 'react';
import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LegendProps } from 'recharts';
import { cn } from '@/lib/utils';

type PerformanceChartProps = {
  data: {
    time: number;
    cpuLatency: number;
    cpuMemory: number;
    cpuUtilization: number;
    gpuLatency: number;
    gpuMemory: number;
    gpuUtilization: number;
  }[];
  powerMode: boolean;
  modelId: string;
};

export function PerformanceChart({ data, powerMode, modelId }: PerformanceChartProps) {
  const axisStyle = {
    stroke: powerMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    fill: powerMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"
  };

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: powerMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.9)",
      border: powerMode ? "1px solid rgba(6, 182, 212, 0.3)" : "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "0.5rem",
      color: powerMode ? "white" : "black"
    },
    formatter: (value: number, name: string) => {
      if (name.includes('Latency')) {
        return [`${value.toFixed(2)} ms`, name];
      }
      if (name.includes('Memory')) {
        return [`${value.toFixed(2)} GB`, name];
      }
      if (name.includes('Utilization')) {
        return [`${value.toFixed(1)}%`, name];
      }
      return [value, name];
    },
    labelFormatter: (label: string) => `Time: ${label}s`
  };

  const legendStyle = {
    layout: 'horizontal' as const,
    verticalAlign: 'bottom' as const,
    align: 'center' as const,
    formatter: (value: string) => {
      const [device, metric] = value.split(" ");
      return (
        <span className="text-xs">
          {device === "CPU" ? "CPU " : "GPU "}
          {metric}
        </span>
      );
    },
    wrapperStyle: {
      color: powerMode ? "white" : "black",
      paddingTop: "20px",
      padding: "0 10px",
      marginRight: "10px",
      display: "flex",
      justifyContent: "center",
      gap: "1rem"
    }
  } as const;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data} 
        margin={{ 
          top: 5, 
          right: 45,  // Even more space for right label
          left: 20, 
          bottom: 35  // Reduced even further
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis 
          {...axisStyle} 
          dataKey="time" 
          label={{ value: 'Time (s)', position: 'bottom' }} 
        />
        
        {/* Primary Y-axis for latency */}
        <YAxis 
          {...axisStyle}
          yAxisId="left"
          label={{ 
            value: 'Latency (ms)', 
            angle: -90, 
            position: 'insideLeft' 
          }}
        />

        {/* Secondary Y-axis */}
        <YAxis 
          {...axisStyle}
          yAxisId="right"
          orientation="right"
          label={{ 
            value: 'Memory (GB) / Utilization (%)', 
            angle: 90, 
            position: 'insideRight',
            offset: 10,
            dy: 100
          }}
        />

        <Tooltip {...tooltipStyle} />
        <Legend 
          {...legendStyle}
          wrapperStyle={{
            ...legendStyle.wrapperStyle,
            paddingTop: "5px",
            bottom: -15,
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem"
          }}
        />

        {/* CPU Lines - always show */}
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="cpuLatency" 
          name="CPU Latency" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={false}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="cpuMemory" 
          name="CPU Memory" 
          stroke="#60a5fa" 
          strokeWidth={2}
          dot={false}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="cpuUtilization" 
          name="CPU Utilization" 
          stroke="#93c5fd" 
          strokeWidth={2}
          dot={false}
        />

        {/* GPU Lines - only show when GPU metrics exist */}
        {data.some(d => d.gpuLatency) && (
          <>
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="gpuLatency" 
              name="GPU Latency" 
              stroke="#06b6d4" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="gpuMemory" 
              name="GPU Memory" 
              stroke="#22d3ee" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="gpuUtilization" 
              name="GPU Utilization" 
              stroke="#67e8f9" 
              strokeWidth={2}
              dot={false}
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}