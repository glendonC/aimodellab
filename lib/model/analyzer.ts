"use client";

import { getModelArchitecture } from '@/lib/huggingface';
import { ModelGraph, AnalysisProgress, AnalysisResult } from './types';

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
          opType: node.type,
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
    // Calculate realistic performance metrics
    const totalParams = Math.max(1, graph.metadata.totalParams);
    const totalFlops = Math.max(1, graph.metadata.totalFlops);
    const memoryPeak = Math.max(1024 * 1024, graph.metadata.totalMemory);

    // Estimate inference time based on model complexity
    const inferenceTime = Math.max(1, (totalFlops / 1e9) * 0.5);
    
    // Estimate device utilization based on model size
    const deviceUtilization = Math.min(Math.max(0.1, totalParams / 1e9), 0.95);

    return {
      inferenceTime,
      memoryPeak,
      deviceUtilization
    };
  }
}