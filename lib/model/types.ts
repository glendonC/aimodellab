"use client";

import { LayerType } from '@/components/model/types';

export type ModelNode = {
  id: string;
  type: LayerType;
  name: string;
  opType: string;
  params: number;
  flops: number;
  memoryUsage: number;
  inputShapes: number[][];
  outputShapes: number[][];
  attributes: Record<string, any>;
  activationLevel?: number;
  inferenceState?: 'idle' | 'processing' | 'complete';
};

export type ModelEdge = {
  id: string;
  from: string;
  to: string;
  tensorShape: number[];
  dataFlow?: number;
};

export type ModelGraph = {
  nodes: ModelNode[];
  edges: ModelEdge[];
  metadata: {
    framework: string;
    version: string;
    totalParams: number;
    totalFlops: number;
    totalMemory: number;
    modelId?: string;
  };
  layers: LayerMetrics[];
};

export type AnalysisProgress = {
  stage: 'loading' | 'parsing' | 'analyzing' | 'complete';
  progress: number;
  message: string;
};

export type AnalysisResult = {
  graph: ModelGraph;
  performance: {
    inferenceTime: number;
    memoryPeak: number;
    deviceUtilization: number;
  };
  validation: {
    errors: string[];
    bottlenecks: string[];
  };
};

export type ComparisonMode = 'side-by-side' | 'overlay';

export type ModelComparison = {
  modelA: AnalysisResult;
  modelB: AnalysisResult;
  mode: ComparisonMode;
};

export type InferenceAnimation = {
  isRunning: boolean;
  currentLayer: string | null;
  progress: number;
  startTime: number;
  duration: number;
};

export interface LayerMetrics {
  flops: number;
  parameters: number;
  memory: number;
}