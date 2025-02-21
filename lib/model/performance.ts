import { MODEL_BENCHMARKS } from './constants';
import type { AnalysisResult } from './types';

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
  };
  nvOptimizations: {
    tensorCoreUsage: string;
    memoryBandwidth: string;
    speedup: string;
  };
}

export class PerformanceCalculator {
  calculateMetrics(analysisResult: AnalysisResult | null, gpuEnabled: boolean): PerformanceMetrics {
    if (!analysisResult?.graph?.metadata?.modelId) {
      return this.getDefaultMetrics();
    }

    // Get the model type from the ID
    const modelType = this.getModelType(analysisResult.graph.metadata.modelId);
    const benchmarks = MODEL_BENCHMARKS[modelType];

    if (!benchmarks) {
      return this.getDefaultMetrics();
    }

    // Get CPU metrics
    const cpuMetrics = {
      fps: benchmarks.cpu.inferenceSpeed,
      latency: benchmarks.cpu.latency,
      memory: benchmarks.cpu.memoryUsage / 1024, // Convert to GB
      utilization: benchmarks.cpu.utilization
    };

    // If GPU is not enabled, return only CPU metrics
    if (!gpuEnabled) {
      return {
        cpuMetrics,
        gpuMetrics: null,
        nvOptimizations: {
          tensorCoreUsage: benchmarks.gpu.tensorCoreUsage,
          memoryBandwidth: benchmarks.gpu.memoryBandwidth,
          speedup: benchmarks.gpu.speedup
        }
      };
    }

    // Get GPU metrics
    const gpuMetrics = {
      fps: benchmarks.gpu.inferenceSpeed,
      latency: benchmarks.gpu.latency,
      memory: benchmarks.gpu.memoryUsage / 1024, // Convert to GB
      utilization: benchmarks.gpu.utilization
    };

    return {
      cpuMetrics,
      gpuMetrics,
      nvOptimizations: {
        tensorCoreUsage: benchmarks.gpu.tensorCoreUsage,
        memoryBandwidth: benchmarks.gpu.memoryBandwidth,
        speedup: benchmarks.gpu.speedup
      }
    };
  }

  private getModelType(modelId: string): string {
    modelId = modelId.toLowerCase();
    
    if (modelId.includes('resnet')) return 'resnet-50';
    if (modelId.includes('yolo')) return 'yolov8';
    if (modelId.includes('stable')) return 'stable-diffusion';
    if (modelId.includes('llama')) return 'llama2';
    if (modelId.includes('gpt')) return 'gpt2';
    if (modelId.includes('bart')) return 'bart';
    if (modelId.includes('whisper')) return 'whisper';
    if (modelId.includes('vit')) return 'vit';
    if (modelId.includes('biobert')) return 'biobert';
    if (modelId.includes('dino')) return 'dinov2';
    
    // Default to resnet if no match
    return 'resnet-50';
  }

  private getDefaultMetrics(): PerformanceMetrics {
    // Use ResNet-50 as default
    return this.calculateMetrics({
      graph: {
        metadata: { modelId: 'resnet-50' },
        layers: []
      }
    }, false);
  }
}