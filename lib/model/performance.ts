import { MODEL_BENCHMARKS } from './constants';
import type { AnalysisResult, ModelGraph } from './types';

interface PerformanceMetrics {
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
  } | null;
  nvOptimizations: {
    tensorCoreUsage: string;
    memoryBandwidth: string;
    speedup: string;
  } | null;
}

type ModelBenchmarkKey = keyof typeof MODEL_BENCHMARKS;

export class PerformanceCalculator {
  calculateMetrics(analysisResult: AnalysisResult | null, gpuEnabled: boolean): PerformanceMetrics {
    if (!analysisResult?.graph?.metadata?.modelId) {
      return this.getDefaultMetrics();
    }

    const modelType = this.getModelType(analysisResult.graph.metadata.modelId);
    const benchmarks = MODEL_BENCHMARKS[modelType as ModelBenchmarkKey];

    if (!benchmarks) {
      return this.getDefaultMetrics();
    }

    const cpuMetrics = {
      fps: benchmarks.cpu.inferenceSpeed,
      latency: benchmarks.cpu.latency,
      memory: benchmarks.cpu.memoryUsage,
      utilization: benchmarks.cpu.utilization
    };

    if (!gpuEnabled) {
      return {
        cpuMetrics,
        gpuMetrics: null,
        nvOptimizations: null
      };
    }

    const gpuMetrics = {
      fps: benchmarks.gpu.inferenceSpeed,
      latency: benchmarks.gpu.latency,
      memory: benchmarks.gpu.memoryUsage,
      utilization: benchmarks.gpu.utilization
    };

    // Calculate actual speedup from benchmark data
    const speedup = (gpuMetrics.fps / cpuMetrics.fps).toFixed(1) + 'x';

    return {
      cpuMetrics,
      gpuMetrics,
      nvOptimizations: {
        tensorCoreUsage: benchmarks.gpu.tensorCoreUsage,
        memoryBandwidth: benchmarks.gpu.memoryBandwidth,
        speedup: speedup
      }
    };
  }

  private getModelType(modelId: string): ModelBenchmarkKey {
    const id = modelId.toLowerCase();
    
    if (id.includes('resnet')) return 'resnet-50';
    if (id.includes('yolo')) return 'yolov8';
    if (id.includes('stable')) return 'stable-diffusion';
    if (id.includes('whisper')) return 'whisper';
    if (id.includes('vit')) return 'vit';
    if (id.includes('gpt')) return 'gpt2';
    if (id.includes('bart')) return 'bart';
    if (id.includes('biobert')) return 'biobert';
    
    // Default to resnet if no match
    return 'resnet-50';
  }

  private getDefaultMetrics(): PerformanceMetrics {
    return {
      cpuMetrics: {
        fps: 0,
        latency: 0,
        memory: 0,
        utilization: 0
      },
      gpuMetrics: null,
      nvOptimizations: null
    };
  }
}