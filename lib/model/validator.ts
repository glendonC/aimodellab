"use client";

import { ModelNode } from './types';

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
};

type ValidationError = {
  type: 'structure' | 'compatibility' | 'parameter';
  message: string;
  nodeId?: string;
  fix?: () => Partial<ModelNode>;
};

type ValidationWarning = {
  type: 'performance' | 'architecture';
  message: string;
  nodeId?: string;
};

type ValidationSuggestion = {
  message: string;
  nodeId?: string;
  improvement: string;
};

const VALID_CONNECTIONS: Record<string, string[]> = {
  input: ['cnn', 'mlp', 'transformer', 'rnn', 'embedding', 'attention', 'graph', 'gru'],
  cnn: ['cnn', 'pooling', 'flatten', 'dropout', 'normalization', 'mlp', 'globalavgpool1d'],
  pooling: ['cnn', 'pooling', 'flatten', 'dropout', 'mlp', 'globalavgpool1d'],
  flatten: ['mlp', 'dropout', 'dense', 'output'],
  mlp: ['mlp', 'dropout', 'output', 'transformer', 'attention', 'graph', 'gru'],
  transformer: ['transformer', 'attention', 'dropout', 'output', 'mlp', 'globalavgpool1d'],
  attention: ['transformer', 'mlp', 'dropout', 'output', 'attention', 'globalavgpool1d'],
  rnn: ['rnn', 'dropout', 'output', 'mlp', 'attention', 'graph', 'gru', 'globalavgpool1d'],
  dropout: ['mlp', 'transformer', 'rnn', 'output', 'attention', 'graph', 'gru'],
  embedding: ['transformer', 'rnn', 'attention', 'mlp', 'graph', 'gru', 'globalavgpool1d'],
  normalization: ['cnn', 'mlp', 'transformer', 'rnn', 'attention', 'graph', 'gru'],
  graph: ['graph', 'mlp', 'dropout', 'output', 'gru'],
  gru: ['gru', 'mlp', 'dropout', 'output', 'graph'],
  globalavgpool1d: ['mlp', 'dropout', 'output'],
  output: []
};

export class ModelValidator {
  validate(nodes: ModelNode[]): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];

    // 1. Basic Structure Validation
    this.validateBasicStructure(nodes, errors);

    // 2. Layer Connections
    this.validateLayerConnections(nodes, errors);

    // 3. Shape Compatibility
    this.validateShapeCompatibility(nodes, errors);

    // 4. Parameter Validation
    this.validateParameters(nodes, errors);

    // 5. Architecture Best Practices
    this.validateArchitectureBestPractices(nodes, warnings, suggestions);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };
  }

  private validateBasicStructure(nodes: ModelNode[], errors: ValidationError[]) {
    // Check for empty model
    if (nodes.length === 0) {
      errors.push({
        type: 'structure',
        message: 'Model must contain at least one layer'
      });
      return;
    }

    // Check input layer
    const inputLayers = nodes.filter(n => n.type === 'input');
    if (inputLayers.length === 0) {
      errors.push({
        type: 'structure',
        message: 'Model must have an input layer',
        fix: () => ({
          type: 'input',
          name: 'Input Layer',
          attributes: {
            shape: [null, 224, 224, 3]
          }
        })
      });
    } else if (inputLayers.length > 1) {
      errors.push({
        type: 'structure',
        message: 'Model cannot have multiple input layers'
      });
    }

    // Check output layer
    const outputLayers = nodes.filter(n => n.type === 'output');
    if (outputLayers.length === 0) {
      errors.push({
        type: 'structure',
        message: 'Model must have an output layer',
        fix: () => ({
          type: 'output',
          name: 'Output Layer',
          attributes: {
            units: 10,
            activation: 'softmax'
          }
        })
      });
    } else if (outputLayers.length > 1) {
      errors.push({
        type: 'structure',
        message: 'Model cannot have multiple output layers'
      });
    }

    // Update isolated layer check to handle GRU and graph layers
    nodes.forEach((node, i) => {
      if (i > 0 && i < nodes.length - 1) {
        // Special case for GRU and graph layers which can have self-connections
        if (node.type === 'gru' || node.type === 'graph') {
          const hasConnection = nodes.some((n, j) => {
            if (j === i) return false; // Skip self
            return this.isValidConnection(n.type, node.type) || 
                   this.isValidConnection(node.type, n.type);
          });
          
          if (!hasConnection) {
            errors.push({
              type: 'structure',
              message: `Layer "${node.name}" is isolated`,
              nodeId: node.id
            });
          }
        } else {
          // Original isolated layer check for other layer types
          const hasIncoming = nodes.some((n, j) => j < i && this.isValidConnection(n.type, node.type));
          const hasOutgoing = nodes.some((n, j) => j > i && this.isValidConnection(node.type, n.type));
          
          if (!hasIncoming || !hasOutgoing) {
            errors.push({
              type: 'structure',
              message: `Layer "${node.name}" is isolated`,
              nodeId: node.id
            });
          }
        }
      }
    });
  }

  private validateLayerConnections(nodes: ModelNode[], errors: ValidationError[]) {
    nodes.forEach((node, i) => {
      if (i < nodes.length - 1) {
        const nextNode = nodes[i + 1];
        
        // Special case for GRU and graph layers which can connect to themselves
        if ((node.type === 'gru' && nextNode.type === 'gru') || 
            (node.type === 'graph' && nextNode.type === 'graph')) {
          return; // Allow these connections
        }
        
        if (!this.isValidConnection(node.type, nextNode.type)) {
          errors.push({
            type: 'compatibility',
            message: `Invalid connection from ${node.type} to ${nextNode.type}`,
            nodeId: nextNode.id,
            fix: () => this.suggestIntermediateLayer(node.type, nextNode.type)
          });
        }
      }
    });
  }

  private validateShapeCompatibility(nodes: ModelNode[], errors: ValidationError[]) {
    nodes.forEach((node, i) => {
      if (i < nodes.length - 1) {
        const nextNode = nodes[i + 1];
        
        // Check shape compatibility
        if (!this.areShapesCompatible(node, nextNode)) {
          errors.push({
            type: 'compatibility',
            message: `Shape mismatch between ${node.name} and ${nextNode.name}`,
            nodeId: nextNode.id,
            fix: () => this.suggestShapeFix(node, nextNode)
          });
        }
      }
    });
  }

  private validateParameters(nodes: ModelNode[], errors: ValidationError[]) {
    nodes.forEach(node => {
      const attrs = node.attributes || {};

      switch (node.type) {
        case 'dropout':
          if (attrs.rate < 0 || attrs.rate > 1) {
            errors.push({
              type: 'parameter',
              message: 'Dropout rate must be between 0 and 1',
              nodeId: node.id,
              fix: () => ({
                attributes: { ...attrs, rate: 0.5 }
              })
            });
          }
          break;

        case 'cnn':
          if (attrs.filters <= 0) {
            errors.push({
              type: 'parameter',
              message: 'Number of filters must be positive',
              nodeId: node.id,
              fix: () => ({
                attributes: { ...attrs, filters: 32 }
              })
            });
          }
          break;

        case 'mlp':
          if (attrs.units <= 0) {
            errors.push({
              type: 'parameter',
              message: 'Number of units must be positive',
              nodeId: node.id,
              fix: () => ({
                attributes: { ...attrs, units: 128 }
              })
            });
          }
          break;
      }
    });
  }

  private validateArchitectureBestPractices(
    nodes: ModelNode[],
    warnings: ValidationWarning[],
    suggestions: ValidationSuggestion[]
  ) {
    // Check for BatchNorm after Conv layers
    nodes.forEach((node, i) => {
      if (node.type === 'cnn' && i < nodes.length - 1) {
        const nextNode = nodes[i + 1];
        if (nextNode.type !== 'normalization') {
          suggestions.push({
            message: 'Consider adding BatchNorm after Conv2D',
            nodeId: node.id,
            improvement: 'Improves training stability and reduces internal covariate shift'
          });
        }
      }
    });

    // Check for Dropout between Dense layers
    let lastDenseIndex = -1;
    nodes.forEach((node, i) => {
      if (node.type === 'mlp') {
        if (lastDenseIndex !== -1 && i - lastDenseIndex === 1) {
          suggestions.push({
            message: 'Consider adding Dropout between Dense layers',
            nodeId: node.id,
            improvement: 'Reduces overfitting and improves generalization'
          });
        }
        lastDenseIndex = i;
      }
    });

    // Check model depth
    if (nodes.length > 20) {
      warnings.push({
        type: 'architecture',
        message: 'Model is very deep, consider using residual connections'
      });
    }

    // Check for potential vanishing gradients
    let consecutiveNonLinear = 0;
    nodes.forEach(node => {
      if (['mlp', 'cnn', 'rnn'].includes(node.type)) {
        consecutiveNonLinear++;
        if (consecutiveNonLinear > 4) {
          warnings.push({
            type: 'architecture',
            message: 'Potential vanishing gradient issue',
            nodeId: node.id
          });
        }
      } else {
        consecutiveNonLinear = 0;
      }
    });
  }

  private isValidConnection(fromType: string, toType: string): boolean {
    return VALID_CONNECTIONS[fromType]?.includes(toType) || false;
  }

  private areShapesCompatible(fromNode: ModelNode, toNode: ModelNode): boolean {
    // Special cases where shape compatibility is guaranteed
    if (toNode.type === 'flatten') return true;
    if (fromNode.type === 'flatten' && toNode.type === 'mlp') return true;
    
    // Special case for transformer to dense connection
    if (fromNode.type === 'transformer' && toNode.type === 'mlp') {
      // Transformer outputs [batch, seq_len, hidden_dim]
      // Dense expects [batch, features]
      // This is valid as long as seq_len * hidden_dim matches the Dense input
      const fromShape = fromNode.outputShapes?.[0];
      const toShape = toNode.inputShapes?.[0];
      
      if (!fromShape || !toShape) return true; // Skip check if shapes aren't defined
      
      // Calculate total features from transformer output
      const totalFeatures = fromShape[1] * fromShape[2]; // seq_len * hidden_dim
      return totalFeatures === toShape[1]; // Compare with Dense input features
    }

    const fromShape = fromNode.outputShapes?.[0];
    const toShape = toNode.inputShapes?.[0];

    if (!fromShape || !toShape) return true; // Skip check if shapes aren't defined

    // Check shape compatibility based on layer types
    switch (toNode.type) {
      case 'cnn':
        return fromShape.length === 4; // Expects [batch, height, width, channels]
      case 'mlp':
        return fromShape.length === 2; // Expects [batch, features]
      case 'rnn':
        return fromShape.length === 3; // Expects [batch, timesteps, features]
      case 'transformer':
        return fromShape.length === 3; // Expects [batch, seq_len, features]
      case 'attention':
        return fromShape.length === 3; // Expects [batch, seq_len, features]
      default:
        return true;
    }
  }

  private suggestIntermediateLayer(fromType: string, toType: string): Partial<ModelNode> {
    if (fromType === 'cnn' && toType === 'mlp') {
      return {
        type: 'flatten',
        name: 'Flatten',
        attributes: {}
      };
    }

    if (fromType === 'embedding' && toType === 'mlp') {
      return {
        type: 'rnn',
        name: 'LSTM',
        attributes: {
          units: 128,
          returnSequences: false
        }
      };
    }

    return {};
  }

  private suggestShapeFix(fromNode: ModelNode, toNode: ModelNode): Partial<ModelNode> {
    if (fromNode.type === 'cnn' && toNode.type === 'mlp') {
      return {
        type: 'flatten',
        name: 'Flatten',
        attributes: {}
      };
    }

    return {};
  }
}