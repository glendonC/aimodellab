import { ModelNode } from './types';

export type SimulationResult = {
  layerResults: LayerSimResult[];
  performance: PerformanceMetrics;
  warnings: SimulationWarning[];
  optimizationTips: OptimizationTip[];
  metrics: Array<{
    name: string;
    value: number | string;
  }>;
  details: string[]; // Added to store simulation details
};

type LayerSimResult = {
  layerId: string;
  inputShape: number[];
  outputShape: number[];
  memoryUsage: number;
  flops: number;
  inferenceTime: number;
  isBottleneck: boolean;
};

type PerformanceMetrics = {
  totalMemory: number;
  totalFlops: number;
  estimatedFps: number;
  gpuUtilization: number;
};

type SimulationWarning = {
  layerId: string;
  type: 'shape_mismatch' | 'performance_issue' | 'architecture_warning';
  message: string;
  suggestion: string;
};

type OptimizationTip = {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'memory' | 'architecture';
};

export class ModelSimulator {
  async runSimulation(nodes: ModelNode[]): Promise<SimulationResult> {
    const layerResults: LayerSimResult[] = [];
    const warnings: SimulationWarning[] = [];
    let currentShape = nodes[0]?.inputShapes[0] || [1, 224, 224, 3];
    const details: string[] = []; // Added to store simulation details

    details.push('Initializing model simulation...');
    details.push(`Analyzing ${nodes.length} layers for performance characteristics`);

    // Simulate forward pass
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const nextNode = nodes[i + 1];
      details.push(`Simulating layer ${node.id}: ${node.name}`);

      const result = this.simulateLayer(node, currentShape, details);
      layerResults.push(result);
      currentShape = result.outputShape;

      // Check for incompatibilities
      if (nextNode && !this.areShapesCompatible(result.outputShape, nextNode)) {
        warnings.push({
          layerId: nextNode.id,
          type: 'shape_mismatch',
          message: `Shape mismatch between ${node.name} and ${nextNode.name}`,
          suggestion: this.generateShapeMismatchSuggestion(result.outputShape, nextNode)
        });
      }
    }

    // Generate performance metrics
    const performance = this.calculatePerformanceMetrics(layerResults);

    // Generate optimization tips
    const optimizationTips = this.generateOptimizationTips(nodes, layerResults);

    // Placeholder for metrics -  Needs further definition based on the animation requirements.
    const metrics = [{name: "Total FLOPS", value: performance.totalFlops}, {name: "Total Memory", value: performance.totalMemory}];


    return {
      layerResults,
      performance,
      warnings,
      optimizationTips,
      metrics,
      details
    };
  }

  private simulateLayer(node: ModelNode, inputShape: number[], details: string[]): LayerSimResult {
    // Simulate layer computation and shape transformation
    details.push(`  Input shape: ${inputShape}`);
    const outputShape = this.calculateOutputShape(node, inputShape);
    const flops = this.calculateLayerFlops(node, inputShape);
    const memoryUsage = this.calculateMemoryUsage(node, inputShape, outputShape);
    const inferenceTime = this.estimateInferenceTime(flops);
    details.push(`  Output shape: ${outputShape}`);
    details.push(`  FLOPS: ${flops}`);
    details.push(`  Memory Usage: ${memoryUsage}`);
    details.push(`  Inference Time: ${inferenceTime}`);


    return {
      layerId: node.id,
      inputShape,
      outputShape,
      memoryUsage,
      flops,
      inferenceTime,
      isBottleneck: flops > 1000000 || memoryUsage > 1000000
    };
  }

  private calculateOutputShape(node: ModelNode, inputShape: number[]): number[] {
    switch (node.type) {
      case 'cnn':
        return [
          inputShape[0],
          inputShape[1] - 2,
          inputShape[2] - 2,
          node.attributes?.filters || 32
        ];
      case 'pooling':
        return [
          inputShape[0],
          Math.floor(inputShape[1] / 2),
          Math.floor(inputShape[2] / 2),
          inputShape[3]
        ];
      case 'flatten':
        return [inputShape[0], inputShape.slice(1).reduce((a, b) => a * b, 1)];
      case 'mlp':
        return [inputShape[0], node.attributes?.units || 128];
      default:
        return inputShape;
    }
  }

  private calculateLayerFlops(node: ModelNode, inputShape: number[]): number {
    // Simplified FLOP calculations
    switch (node.type) {
      case 'cnn':
        const filters = node.attributes?.filters || 32;
        const kernelSize = node.attributes?.kernelSize || 3;
        return inputShape[1] * inputShape[2] * inputShape[3] * filters * kernelSize * kernelSize;
      case 'mlp':
        const units = node.attributes?.units || 128;
        return inputShape[1] * units;
      default:
        return 1000; // Base cost
    }
  }

  private calculateMemoryUsage(node: ModelNode, inputShape: number[], outputShape: number[]): number {
    // Calculate memory in bytes (simplified)
    const inputSize = inputShape.reduce((a, b) => a * b, 1) * 4; // 4 bytes per float
    const outputSize = outputShape.reduce((a, b) => a * b, 1) * 4;
    return inputSize + outputSize;
  }

  private estimateInferenceTime(flops: number): number {
    // Simplified estimation: assume 1 TFLOP/s GPU
    return flops / 1000000000;
  }

  private areShapesCompatible(outputShape: number[], nextNode: ModelNode): boolean {
    // Check if shapes are compatible between layers
    if (nextNode.type === 'flatten') return true;
    return outputShape.length === nextNode.inputShapes[0].length;
  }

  private generateShapeMismatchSuggestion(outputShape: number[], node: ModelNode): string {
    return `Add a reshape layer to convert ${outputShape.join('x')} to match ${node.type} input requirements`;
  }

  private calculatePerformanceMetrics(results: LayerSimResult[]): PerformanceMetrics {
    const totalFlops = results.reduce((sum, r) => sum + r.flops, 0);
    const totalMemory = results.reduce((sum, r) => sum + r.memoryUsage, 0);

    return {
      totalFlops,
      totalMemory,
      estimatedFps: 1000 / Math.max(...results.map(r => r.inferenceTime)),
      gpuUtilization: Math.min(totalFlops / 1000000000 * 100, 100)
    };
  }

  private generateOptimizationTips(nodes: ModelNode[], results: LayerSimResult[]): OptimizationTip[] {
    const tips: OptimizationTip[] = [];

    // Check for common optimization opportunities
    if (!nodes.some(n => n.type === 'normalization')) {
      tips.push({
        title: 'Add Batch Normalization',
        description: 'Consider adding BatchNorm layers after convolutions to improve training stability',
        impact: 'high',
        category: 'architecture'
      });
    }

    const bottlenecks = results.filter(r => r.isBottleneck);
    if (bottlenecks.length > 0) {
      tips.push({
        title: 'Performance Bottlenecks Detected',
        description: `${bottlenecks.length} layers showing high computation time`,
        impact: 'high',
        category: 'performance'
      });
    }

    return tips;
  }
}