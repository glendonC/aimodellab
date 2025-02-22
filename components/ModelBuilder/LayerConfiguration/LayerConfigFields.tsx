"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LayerType } from '@/components/model/types';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type LayerConfigFieldsProps = {
  type: LayerType;
  attributes: Record<string, any>;
  onChange: (key: string, value: any) => void;
  powerMode: boolean;
  tab: 'parameters' | 'advanced';
};

export function LayerConfigFields({
  type,
  attributes,
  onChange,
  powerMode,
  tab
}: LayerConfigFieldsProps) {
  const fields = getConfigFields(type, tab);

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          <label className={cn(
            "text-sm font-medium",
            powerMode ? "text-white/70" : "text-gray-600"
          )}>
            {field.label}
          </label>

          {field.type === 'number' && (
            <Input
              type="number"
              value={attributes[field.key] || field.default}
              min={field.min}
              max={field.max}
              step={field.step}
              onChange={(e) => onChange(field.key, parseFloat(e.target.value))}
              className={cn(
                powerMode && "bg-gray-800 border-white/10 text-white"
              )}
            />
          )}

          {field.type === 'text' && (
            <Input
              type="text"
              value={attributes[field.key] || field.default}
              onChange={(e) => onChange(field.key, e.target.value)}
              className={cn(
                powerMode && "bg-gray-800 border-white/10 text-white"
              )}
            />
          )}

          {field.type === 'slider' && (
            <Slider
              value={[attributes[field.key] || field.default]}
              min={field.min}
              max={field.max}
              step={field.step}
              onValueChange={([value]) => onChange(field.key, value)}
              className={powerMode ? "bg-gray-800" : undefined}
            />
          )}

          {field.type === 'select' && (
            <Select
              value={attributes[field.key] || field.default}
              onValueChange={(value) => onChange(field.key, value)}
              options={field.options || []}
              className={cn(
                powerMode && "bg-gray-800 border-white/10 text-white"
              )}
            />
          )}

          {field.type === 'toggle' && (
            <Switch
              checked={attributes[field.key] ?? field.default}
              onCheckedChange={(checked) => onChange(field.key, checked)}
              className={cn(
                powerMode && "bg-gray-800"
              )}
            />
          )}

          <p className={cn(
            "text-xs",
            powerMode ? "text-white/50" : "text-gray-500"
          )}>
            {field.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function getConfigFields(type: LayerType, tab: 'parameters' | 'advanced') {
  const configs: Record<LayerType, Record<'parameters' | 'advanced', any[]>> = {
    input: {
      parameters: [
        {
          key: 'shape',
          label: 'Input Shape',
          type: 'text',
          default: '(None, 224, 224, 3)',
          description: 'Shape of the input tensor (batch_size, height, width, channels)'
        },
        {
          key: 'batchSize',
          label: 'Batch Size',
          type: 'number',
          default: 32,
          min: 1,
          max: 512,
          step: 1,
          description: 'Number of samples per batch'
        }
      ],
      advanced: [
        {
          key: 'dataType',
          label: 'Data Type',
          type: 'select',
          default: 'float32',
          options: ['float16', 'float32', 'float64'],
          description: 'Precision of input data'
        }
      ]
    },
    mlp: {
      parameters: [
        {
          key: 'units',
          label: 'Units',
          type: 'number',
          default: 128,
          min: 1,
          max: 4096,
          step: 1,
          description: 'Number of output dimensions'
        },
        {
          key: 'activation',
          label: 'Activation',
          type: 'select',
          default: 'relu',
          options: ['relu', 'sigmoid', 'tanh', 'softmax', 'linear'],
          description: 'Activation function to use'
        },
        {
          key: 'useBias',
          label: 'Use Bias',
          type: 'toggle',
          default: true,
          description: 'Whether to include a bias vector'
        }
      ],
      advanced: [
        {
          key: 'kernelInit',
          label: 'Kernel Initializer',
          type: 'select',
          default: 'glorot_uniform',
          options: ['glorot_uniform', 'glorot_normal', 'he_uniform', 'he_normal'],
          description: 'Weight initialization method'
        },
        {
          key: 'l2Reg',
          label: 'L2 Regularization',
          type: 'slider',
          default: 0,
          min: 0,
          max: 0.1,
          step: 0.001,
          description: 'L2 regularization strength'
        }
      ]
    },
    cnn: {
      parameters: [
        {
          key: 'filters',
          label: 'Filters',
          type: 'number',
          default: 32,
          min: 1,
          max: 512,
          step: 1,
          description: 'Number of output filters'
        },
        {
          key: 'kernelSize',
          label: 'Kernel Size',
          type: 'number',
          default: 3,
          min: 1,
          max: 11,
          step: 2,
          description: 'Size of the convolution kernel'
        },
        {
          key: 'strides',
          label: 'Strides',
          type: 'number',
          default: 1,
          min: 1,
          max: 4,
          step: 1,
          description: 'Stride of the convolution'
        }
      ],
      advanced: [
        {
          key: 'padding',
          label: 'Padding',
          type: 'select',
          default: 'same',
          options: ['valid', 'same'],
          description: 'Padding method to use'
        },
        {
          key: 'dilationRate',
          label: 'Dilation Rate',
          type: 'number',
          default: 1,
          min: 1,
          max: 4,
          step: 1,
          description: 'Dilation rate for dilated convolution'
        }
      ]
    },
    pooling: {
      parameters: [
        {
          key: 'poolSize',
          label: 'Pool Size',
          type: 'number',
          default: 2,
          min: 1,
          max: 4,
          step: 1,
          description: 'Size of the pooling window'
        },
        {
          key: 'strides',
          label: 'Strides',
          type: 'number',
          default: 2,
          min: 1,
          max: 4,
          step: 1,
          description: 'Stride of the pooling operation'
        }
      ],
      advanced: [
        {
          key: 'padding',
          label: 'Padding',
          type: 'select',
          default: 'valid',
          options: ['valid', 'same'],
          description: 'Padding method to use'
        }
      ]
    },
    dropout: {
      parameters: [
        {
          key: 'rate',
          label: 'Dropout Rate',
          type: 'slider',
          default: 0.5,
          min: 0,
          max: 1,
          step: 0.1,
          description: 'Fraction of units to drop'
        }
      ],
      advanced: [
        {
          key: 'seed',
          label: 'Random Seed',
          type: 'number',
          default: null,
          min: 0,
          max: 1000000,
          step: 1,
          description: 'Random seed for reproducibility'
        }
      ]
    },
    embedding: {
      parameters: [
        {
          key: 'inputDim',
          label: 'Input Dimension',
          type: 'number',
          default: 10000,
          min: 100,
          max: 100000,
          step: 100,
          description: 'Size of the vocabulary'
        },
        {
          key: 'outputDim',
          label: 'Output Dimension',
          type: 'number',
          default: 128,
          min: 32,
          max: 1024,
          step: 32,
          description: 'Size of the dense embedding'
        }
      ],
      advanced: [
        {
          key: 'maskZero',
          label: 'Mask Zero',
          type: 'toggle',
          default: true,
          description: 'Whether to mask padding tokens'
        },
        {
          key: 'embeddingsRegularizer',
          label: 'Regularization',
          type: 'slider',
          default: 0,
          min: 0,
          max: 0.1,
          step: 0.001,
          description: 'Regularization factor'
        }
      ]
    },
    transformer: {
      parameters: [
        {
          key: 'hiddenSize',
          label: 'Hidden Size',
          type: 'number',
          default: 256,
          min: 64,
          max: 1024,
          step: 64,
          description: 'Size of transformer hidden state'
        },
        {
          key: 'numHeads',
          label: 'Number of Heads',
          type: 'number',
          default: 8,
          min: 1,
          max: 16,
          step: 1,
          description: 'Number of attention heads'
        }
      ],
      advanced: [
        {
          key: 'feedforwardSize',
          label: 'Feedforward Size',
          type: 'number',
          default: 1024,
          min: 256,
          max: 4096,
          step: 256,
          description: 'Size of feedforward layer'
        },
        {
          key: 'dropoutRate',
          label: 'Dropout Rate',
          type: 'slider',
          default: 0.1,
          min: 0,
          max: 0.5,
          step: 0.1,
          description: 'Dropout probability'
        }
      ]
    },
    output: {
      parameters: [
        {
          key: 'units',
          label: 'Output Units',
          type: 'number',
          default: 10,
          min: 1,
          max: 1000,
          step: 1,
          description: 'Number of output classes'
        },
        {
          key: 'activation',
          label: 'Activation',
          type: 'select',
          default: 'softmax',
          options: ['softmax', 'sigmoid', 'linear'],
          description: 'Final activation function'
        }
      ],
      advanced: [
        {
          key: 'kernelInit',
          label: 'Kernel Initializer',
          type: 'select',
          default: 'glorot_uniform',
          options: ['glorot_uniform', 'glorot_normal', 'zeros'],
          description: 'Weight initialization method'
        }
      ]
    },
    // Add empty configs for other layer types
    flatten: { parameters: [], advanced: [] },
    graph: { parameters: [], advanced: [] },
    residual: { parameters: [], advanced: [] },
    normalization: { parameters: [], advanced: [] },
    attention: { parameters: [], advanced: [] },
    rnn: { parameters: [], advanced: [] }
  };

  return configs[type][tab] || [];
}