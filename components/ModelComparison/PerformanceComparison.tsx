"use client";

import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';
import { ComparisonMetric } from './ComparisonMetric';

type PerformanceComparisonProps = {
  baseModel: AnalysisResult;
  comparisonModel: AnalysisResult;
  powerMode: boolean;
  modelAGpu: boolean;
  modelBGpu: boolean;
};

export function PerformanceComparison({
  baseModel,
  comparisonModel,
  powerMode,
  modelAGpu,
  modelBGpu
}: PerformanceComparisonProps) {
  // Calculate GPU-accelerated metrics if GPU mode is enabled
  const getGpuAdjustedMetrics = (model: AnalysisResult, useGpu: boolean) => {
    if (!useGpu) return model.performance;

    const modelType = model.graph.metadata.modelId?.toLowerCase() || '';
    let speedupFactor = 2; // Default GPU speedup

    if (modelType.includes('transformer')) speedupFactor = 4;
    else if (modelType.includes('cnn')) speedupFactor = 3;
    else if (modelType.includes('yolo')) speedupFactor = 2.8;

    return {
      inferenceTime: model.performance.inferenceTime / speedupFactor,
      memoryPeak: model.performance.memoryPeak * 1.2, // GPU typically uses more memory
      deviceUtilization: model.performance.deviceUtilization * (useGpu ? 0.8 : 1) // GPU usually more efficient
    };
  };

  const modelAMetrics = getGpuAdjustedMetrics(baseModel, modelAGpu);
  const modelBMetrics = getGpuAdjustedMetrics(comparisonModel, modelBGpu);

  return (
    <div className="p-4 space-y-4 border-t">
      <ComparisonMetric
        label="Inference Time"
        valueA={modelAMetrics.inferenceTime}
        valueB={modelBMetrics.inferenceTime}
        unit="ms"
        powerMode={powerMode}
      />
      <ComparisonMetric
        label="Memory Usage"
        valueA={modelAMetrics.memoryPeak / (1024 * 1024)}
        valueB={modelBMetrics.memoryPeak / (1024 * 1024)}
        unit="MB"
        powerMode={powerMode}
      />
      {/* Only show GPU utilization if at least one model is using GPU */}
      {(modelAGpu || modelBGpu) && (
        <ComparisonMetric
          label="GPU Utilization"
          valueA={modelAGpu ? modelAMetrics.deviceUtilization * 100 : 0}
          valueB={modelBGpu ? modelBMetrics.deviceUtilization * 100 : 0}
          unit="%"
          powerMode={powerMode}
        />
      )}
    </div>
  );
}