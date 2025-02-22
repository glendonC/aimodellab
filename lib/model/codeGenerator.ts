"use client";

import { ModelNode } from './types';

export class CodeGenerator {
  generatePythonCode(nodes: ModelNode[]): string {
    const imports = this.generateImports();
    const modelDefinition = this.generateModelDefinition(nodes);
    const compilation = this.generateCompilation();
    
    return `${imports}\n\n${modelDefinition}\n\n${compilation}`;
  }

  private generateImports(): string {
    return `import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.layers import Layer, MultiHeadAttention, LayerNormalization`;
  }

  private generateModelDefinition(nodes: ModelNode[]): string {
    const layerDefinitions = nodes.map(node => this.generateLayerCode(node));
    
    return `model = models.Sequential([
    ${layerDefinitions.join(',\n    ')}
])`;
  }

  private generateLayerCode(node: ModelNode): string {
    const attrs = node.attributes || {};
    
    switch (node.type) {
      case 'input':
        return `layers.Input(shape=${attrs.shape || JSON.stringify(node.inputShapes[0].slice(1))})`;
      
      case 'cnn':
        return `layers.Conv2D(
          filters=${attrs.filters || 32},
          kernel_size=(${attrs.kernelSize || 3}, ${attrs.kernelSize || 3}),
          strides=(${attrs.strides || 1}, ${attrs.strides || 1}),
          padding='${attrs.padding || 'same'}',
          dilation_rate=(${attrs.dilationRate || 1}, ${attrs.dilationRate || 1}),
          activation='${attrs.activation || 'relu'}'
        )`;
      
      case 'pooling':
        return `layers.MaxPooling2D(
          pool_size=(${attrs.poolSize || 2}, ${attrs.poolSize || 2}),
          strides=(${attrs.strides || 2}, ${attrs.strides || 2}),
          padding='${attrs.padding || 'valid'}'
        )`;
      
      case 'flatten':
        return `layers.Flatten()`;
      
      case 'mlp':
        return `layers.Dense(
          units=${attrs.units || 128},
          activation='${attrs.activation || 'relu'}',
          use_bias=${attrs.useBias !== undefined ? attrs.useBias : true},
          kernel_initializer='${attrs.kernelInit || 'glorot_uniform'}',
          kernel_regularizer=tf.keras.regularizers.l2(${attrs.l2Reg || 0})
        )`;
      
      case 'dropout':
        return `layers.Dropout(
          rate=${attrs.rate || 0.5}${attrs.seed ? `,\n          seed=${attrs.seed}` : ''}
        )`;
      
      case 'embedding':
        return `layers.Embedding(
          input_dim=${attrs.inputDim || 10000},
          output_dim=${attrs.outputDim || 128},
          mask_zero=${attrs.maskZero !== undefined ? attrs.maskZero : true},
          embeddings_regularizer=tf.keras.regularizers.l2(${attrs.embeddingsRegularizer || 0})
        )`;

      case 'transformer':
        return `layers.TransformerEncoderLayer(
          d_model=${attrs.hiddenSize || 256},
          nhead=${attrs.numHeads || 8},
          dim_feedforward=${attrs.feedforwardSize || 1024},
          dropout=${attrs.dropoutRate || 0.1}
        )`;

      case 'output':
        return `layers.Dense(
          units=${attrs.units || 10},
          activation='${attrs.activation || 'softmax'}',
          kernel_initializer='${attrs.kernelInit || 'glorot_uniform'}'
        )`;

      default:
        console.warn(`Layer type not recognized: ${node.type}`);
        return `layers.Dense(${attrs.units || 64}, activation='relu')  # Fallback for ${node.type}`;
    }
  }

  private generateCompilation(): string {
    return `model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()`;
  }
}