"use client";

import * as Comlink from 'comlink';
import { ModelNode } from '@/lib/model/types';

class ComputeWorker {
  async calculateModelMetrics(nodes: ModelNode[]) {
    // Heavy computation in worker thread
    const totalParams = nodes.reduce((sum, node) => sum + node.params, 0);
    const totalFlops = nodes.reduce((sum, node) => sum + node.flops, 0);
    const totalMemory = nodes.reduce((sum, node) => sum + node.memoryUsage, 0);

    // Simulate complex calculations
    const metrics = {
      inferenceTime: this.estimateInferenceTime(totalFlops),
      memoryUsage: this.estimateMemoryUsage(totalMemory),
      deviceUtilization: this.estimateDeviceUtilization(totalParams)
    };

    return metrics;
  }

  private estimateInferenceTime(flops: number): number {
    // Realistic inference time estimation based on FLOPs
    const baseLatency = 0.1; // Base latency in ms
    const flopsPerMs = 1e6; // Assumed FLOPs per millisecond
    return baseLatency + (flops / flopsPerMs);
  }

  private estimateMemoryUsage(bytes: number): number {
    // Memory usage estimation with overhead
    const overhead = 1.2; // 20% overhead
    return bytes * overhead;
  }

  private estimateDeviceUtilization(params: number): number {
    // Device utilization based on model size
    const maxParams = 1e9; // 1 billion parameters as reference
    return Math.min(0.95, params / maxParams);
  }
}

Comlink.expose(new ComputeWorker());