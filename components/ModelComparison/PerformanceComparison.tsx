"use client";

import { cn } from '@/lib/utils';
import { AnalysisResult } from '@/lib/model/types';
import { ComparisonMetric } from './ComparisonMetric';

type PerformanceComparisonProps = {
  baseModel: AnalysisResult;
  comparisonModel: AnalysisResult;
  powerMode: boolean;
};

export function PerformanceComparison({
  baseModel,
  comparisonModel,
  powerMode
}: PerformanceComparisonProps) {
  return (
    <div className="p-4 space-y-4 border-t">
      <ComparisonMetric
        label="Inference Time"
        valueA={baseModel.performance.inferenceTime}
        valueB={comparisonModel.performance.inferenceTime}
        unit="ms"
        powerMode={powerMode}
      />
      <ComparisonMetric
        label="Memory Usage"
        valueA={baseModel.performance.memoryPeak / (1024 * 1024)}
        valueB={comparisonModel.performance.memoryPeak / (1024 * 1024)}
        unit="MB"
        powerMode={powerMode}
      />
      <ComparisonMetric
        label="GPU Utilization"
        valueA={baseModel.performance.deviceUtilization * 100}
        valueB={comparisonModel.performance.deviceUtilization * 100}
        unit="%"
        powerMode={powerMode}
      />
    </div>
  );
}