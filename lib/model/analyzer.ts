"use client";

import { getModelArchitecture } from '@/lib/huggingface';
import { ModelGraph, AnalysisProgress, AnalysisResult } from './types';
import { MODEL_BENCHMARKS } from './constants';

export class ModelAnalyzer {
  async analyzeModel(
    modelId: string,
    onProgress: (progress: AnalysisProgress) => void
  ): Promise<AnalysisResult> {
    try {
      // Loading stage
      onProgress({
        stage: 'loading',
        progress: 0,
        message: 'Loading model information...'
      });

      // Skip API call and use local architecture directly
      const architecture = await getModelArchitecture(modelId);

      // Analysis stage
      onProgress({
        stage: 'analyzing',
        progress: 75,
        message: 'Generating visualization...'
      });

      const graph: ModelGraph = {
        nodes: architecture.nodes.map(node => ({
          id: node.id,
          type: node.type as any,
          name: node.name,
          opType: modelId,
          params: node.params,
          flops: node.flops,
          memoryUsage: node.memoryUsage,
          inputShapes: [[1, 3, 224, 224]],
          outputShapes: [[1, 1000]],
          attributes: {}
        })),
        edges: architecture.edges.map(edge => ({
          id: `${edge.source}-${edge.target}`,
          from: edge.source,
          to: edge.target,
          tensorShape: [1, 1000]
        })),
        metadata: {
          framework: 'pytorch',
          version: '2.0',
          totalParams: architecture.nodes.reduce((sum, node) => sum + node.params, 0),
          totalFlops: architecture.nodes.reduce((sum, node) => sum + node.flops, 0),
          totalMemory: architecture.nodes.reduce((sum, node) => sum + node.memoryUsage, 0),
          modelId: modelId
        }
      };

      // Complete
      onProgress({
        stage: 'complete',
        progress: 100,
        message: 'Analysis complete'
      });

      return {
        graph,
        performance: this.analyzePerformance(graph)
      };

    } catch (error) {
      console.error('Model analysis failed:', error);
      throw error;
    }
  }

  private analyzePerformance(graph: ModelGraph) {
    const modelId = graph.metadata.modelId?.toLowerCase() || '';
    let benchmarkKey = 'resnet-50'; // default
  
    // Map model ID to benchmark key
    if (modelId.includes('yolo')) benchmarkKey = 'yolov8';
    if (modelId.includes('stable')) benchmarkKey = 'stable-diffusion';
    if (modelId.includes('llama')) benchmarkKey = 'llama2';
    if (modelId.includes('gpt')) benchmarkKey = 'gpt2';
    if (modelId.includes('bart')) benchmarkKey = 'bart';
    if (modelId.includes('whisper')) benchmarkKey = 'whisper';
    if (modelId.includes('vit')) benchmarkKey = 'vit';
    if (modelId.includes('biobert')) benchmarkKey = 'biobert';
    if (modelId.includes('dino')) benchmarkKey = 'dinov2';
  
    const benchmarks = MODEL_BENCHMARKS[benchmarkKey];
    
    return {
      inferenceTime: benchmarks.cpu.latency,
      memoryPeak: benchmarks.cpu.memoryUsage * 1024 * 1024 * 1024,
      deviceUtilization: benchmarks.cpu.utilization / 100,
      gpuMetrics: benchmarks.gpu
    };
  }
}