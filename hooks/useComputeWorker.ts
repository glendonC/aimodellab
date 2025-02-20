"use client";

import { useState, useCallback } from 'react';
import * as Comlink from 'comlink';
import { ModelNode } from '@/lib/model/types';

// Worker type definition
type ComputeWorker = {
  calculateModelMetrics: (nodes: ModelNode[]) => Promise<{
    inferenceTime: number;
    memoryUsage: number;
    deviceUtilization: number;
  }>;
};

export function useComputeWorker() {
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateMetrics = useCallback(async (nodes: ModelNode[]) => {
    setIsComputing(true);
    setError(null);

    try {
      // Create worker and wrap with Comlink
      const worker = new Worker(new URL('../workers/compute.worker.ts', import.meta.url));
      const workerApi = Comlink.wrap<ComputeWorker>(worker);

      // Run computation in worker
      const metrics = await workerApi.calculateModelMetrics(nodes);

      // Clean up
      worker.terminate();

      return metrics;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Computation failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsComputing(false);
    }
  }, []);

  return {
    calculateMetrics,
    isComputing,
    error
  };
}