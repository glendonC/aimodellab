import { NVIDIA_BENCHMARKS, CPU_BENCHMARKS } from './constants';
import type { AnalysisResult } from './types';

export class PerformanceCalculator {
  private getScalingFactors(modelId: string, totalParams: number, totalFlops: number) {
    // Get baseline model for comparison
    const baselineModel = 'resnet50';
    const baselineParams = 23e6;  // ResNet-50 params
    const baselineFlops = 8e9;    // ResNet-50 FLOPs

    // Calculate scaling factors
    const paramScale = Math.sqrt(totalParams / baselineParams);
    const flopsScale = Math.cbrt(totalFlops / baselineFlops);
    
    // Model-specific adjustments
    const modelType = modelId.toLowerCase();
    if (modelType.includes('stable')) {
      return { paramScale: paramScale * 1.5, flopsScale: flopsScale * 2 };
    }
    if (modelType.includes('llama') || modelType.includes('gpt')) {
      return { paramScale: paramScale * 1.2, flopsScale: flopsScale * 1.3 };
    }
    return { paramScale, flopsScale };
  }

  calculateMetrics(analysisResult: AnalysisResult) {
    const { totalParams, totalFlops, modelId } = analysisResult.graph.metadata;
    const { paramScale, flopsScale } = this.getScalingFactors(modelId, totalParams, totalFlops);

    // Get baseline benchmarks
    const gpuBaseline = NVIDIA_BENCHMARKS.resnet50.a100.batchSize1;
    const cpuBaseline = CPU_BENCHMARKS['xeon-8380'].resnet50.batchSize1;

    // Calculate GPU metrics
    const gpuMetrics = {
      fps: gpuBaseline.fps / flopsScale,
      latency: gpuBaseline.latency * flopsScale,
      memory: (gpuBaseline.memory * paramScale) / 1024, // Convert to GB
      utilization: Math.min(95, (totalFlops / 1e12) * 30)
    };

    // Calculate CPU metrics
    const cpuMetrics = {
      fps: cpuBaseline.fps / flopsScale,
      latency: cpuBaseline.latency * flopsScale,
      memory: (cpuBaseline.memory * paramScale) / 1024,
      utilization: Math.min(100, (totalFlops / 1e12) * 45)
    };

    return {
      cpuMetrics,
      gpuMetrics,
      nvOptimizations: {
        tensorCoreUsage: `${Math.min(95, (totalFlops / 1e12) * 25).toFixed(1)}%`,
        memoryBandwidth: `${(totalFlops / 1e12).toFixed(1)} TB/s`,
        speedup: `${(cpuMetrics.latency / gpuMetrics.latency).toFixed(1)}x`
      }
    };
  }
} 