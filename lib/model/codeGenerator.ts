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
from tensorflow.keras import layers, models`;
  }

  private generateModelDefinition(nodes: ModelNode[]): string {
    const layerDefinitions = nodes.map(node => this.generateLayerCode(node));
    
    return `model = models.Sequential([
    ${layerDefinitions.join(',\n    ')}
])`;
  }

  private generateLayerCode(node: ModelNode): string {
    switch (node.type) {
      case 'input':
        return `layers.Input(shape=${JSON.stringify(node.inputShapes[0].slice(1))})`;
      
      case 'cnn':
        return `layers.Conv2D(${node.attributes?.filters || 32}, (${node.attributes?.kernelSize || 3}, ${node.attributes?.kernelSize || 3}), activation='relu')`;
      
      case 'pooling':
        return `layers.MaxPooling2D(${node.attributes?.poolSize || 2}, ${node.attributes?.poolSize || 2})`;
      
      case 'flatten':
        return `layers.Flatten()`;
      
      case 'mlp':
        return `layers.Dense(${node.attributes?.units || 128}, activation='relu')`;
      
      case 'dropout':
        return `layers.Dropout(${node.attributes?.rate || 0.5})`;
      
      case 'output':
        return `layers.Dense(${node.attributes?.units || 10}, activation='softmax')`;
      
      default:
        return `# Unsupported layer type: ${node.type}`;
    }
  }

  private generateCompilation(): string {
    return `model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.summary()`;
  }
} 