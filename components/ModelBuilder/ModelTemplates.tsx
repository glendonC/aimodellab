"use client";

import { motion } from 'framer-motion';
import { Box, Brain, MessageSquare, Mic, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';

type ModelTemplate = {
  id: string;
  name: string;
  description: string;
  icon: typeof Box;
  nodes: ModelNode[];
};

const MODEL_TEMPLATES: ModelTemplate[] = [
  {
    id: 'image-classifier',
    name: 'Image Classifier',
    description: 'CNN-based model optimized for image recognition tasks',
    icon: Camera,
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        name: 'Input Layer',
        opType: 'input',
        params: 0,
        flops: 0,
        memoryUsage: 150528,
        inputShapes: [[1, 3, 224, 224]],
        outputShapes: [[1, 3, 224, 224]],
        attributes: {}
      },
      {
        id: 'conv-1',
        type: 'cnn',
        name: 'Conv2D (32 filters)',
        opType: 'conv2d',
        params: 896,
        flops: 115605504,
        memoryUsage: 401408,
        inputShapes: [[1, 3, 224, 224]],
        outputShapes: [[1, 32, 222, 222]],
        attributes: {
          filters: 32,
          kernelSize: 3,
          activation: 'relu'
        }
      },
      {
        id: 'pool-1',
        type: 'pooling',
        name: 'MaxPool2D',
        opType: 'maxpool2d',
        params: 0,
        flops: 172800,
        memoryUsage: 100352,
        inputShapes: [[1, 32, 222, 222]],
        outputShapes: [[1, 32, 111, 111]],
        attributes: {
          poolSize: 2,
          stride: 2
        }
      },
      {
        id: 'conv-2',
        type: 'cnn',
        name: 'Conv2D (64 filters)',
        opType: 'conv2d',
        params: 18496,
        flops: 57153536,
        memoryUsage: 200704,
        inputShapes: [[1, 32, 111, 111]],
        outputShapes: [[1, 64, 109, 109]],
        attributes: {
          filters: 64,
          kernelSize: 3,
          activation: 'relu'
        }
      },
      {
        id: 'pool-2',
        type: 'pooling',
        name: 'MaxPool2D',
        opType: 'maxpool2d',
        params: 0,
        flops: 86400,
        memoryUsage: 50176,
        inputShapes: [[1, 64, 109, 109]],
        outputShapes: [[1, 64, 54, 54]],
        attributes: {
          poolSize: 2,
          stride: 2
        }
      },
      {
        id: 'flatten-1',
        type: 'flatten',
        name: 'Flatten',
        opType: 'flatten',
        params: 0,
        flops: 186624,
        memoryUsage: 186624,
        inputShapes: [[1, 64, 54, 54]],
        outputShapes: [[1, 186624]],
        attributes: {}
      },
      {
        id: 'dense-1',
        type: 'mlp',
        name: 'Dense (128 neurons)',
        opType: 'dense',
        params: 23887872,
        flops: 23887872,
        memoryUsage: 512,
        inputShapes: [[1, 186624]],
        outputShapes: [[1, 128]],
        attributes: {
          units: 128,
          activation: 'relu'
        }
      },
      {
        id: 'dropout-1',
        type: 'dropout',
        name: 'Dropout (0.5)',
        opType: 'dropout',
        params: 0,
        flops: 128,
        memoryUsage: 512,
        inputShapes: [[1, 128]],
        outputShapes: [[1, 128]],
        attributes: {
          rate: 0.5
        }
      },
      {
        id: 'output-1',
        type: 'output',
        name: 'Output (10 classes)',
        opType: 'dense',
        params: 1290,
        flops: 1290,
        memoryUsage: 40,
        inputShapes: [[1, 128]],
        outputShapes: [[1, 10]],
        attributes: {
          units: 10,
          activation: 'softmax'
        }
      }
    ]
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'RNN-based model for text sentiment classification',
    icon: MessageSquare,
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        name: 'Input Layer',
        opType: 'input',
        params: 0,
        flops: 0,
        memoryUsage: 1000,
        inputShapes: [[1, 100]],
        outputShapes: [[1, 100]],
        attributes: {}
      },
      {
        id: 'embedding-1',
        type: 'embedding',
        name: 'Embedding (128 dim)',
        opType: 'embedding',
        params: 1280000,
        flops: 12800,
        memoryUsage: 12800,
        inputShapes: [[1, 100]],
        outputShapes: [[1, 100, 128]],
        attributes: {
          vocabSize: 10000,
          embedDim: 128
        }
      },
      {
        id: 'rnn-1',
        type: 'rnn',
        name: 'RNN (128 units)',
        opType: 'rnn',
        params: 32896,
        flops: 3289600,
        memoryUsage: 512,
        inputShapes: [[1, 100, 128]],
        outputShapes: [[1, 128]],
        attributes: {
          units: 128,
          activation: 'tanh'
        }
      },
      {
        id: 'dense-1',
        type: 'mlp',
        name: 'Dense (64 neurons)',
        opType: 'dense',
        params: 8256,
        flops: 8256,
        memoryUsage: 256,
        inputShapes: [[1, 128]],
        outputShapes: [[1, 64]],
        attributes: {
          units: 64,
          activation: 'relu'
        }
      },
      {
        id: 'dropout-1',
        type: 'dropout',
        name: 'Dropout (0.3)',
        opType: 'dropout',
        params: 0,
        flops: 64,
        memoryUsage: 256,
        inputShapes: [[1, 64]],
        outputShapes: [[1, 64]],
        attributes: {
          rate: 0.3
        }
      },
      {
        id: 'output-1',
        type: 'output',
        name: 'Output (Binary)',
        opType: 'dense',
        params: 65,
        flops: 65,
        memoryUsage: 4,
        inputShapes: [[1, 64]],
        outputShapes: [[1, 1]],
        attributes: {
          units: 1,
          activation: 'sigmoid'
        }
      }
    ]
  },
  {
    id: 'speech-recognition',
    name: 'Speech Recognition',
    description: 'GRU-based model for speech-to-text processing',
    icon: Mic,
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        name: 'Input Layer',
        opType: 'input',
        params: 0,
        flops: 0,
        memoryUsage: 16000,
        inputShapes: [[1, 100, 160]],
        outputShapes: [[1, 100, 160]],
        attributes: {}
      },
      {
        id: 'gru-1',
        type: 'graph',
        name: 'GRU (256 units)',
        opType: 'gru',
        params: 319488,
        flops: 31948800,
        memoryUsage: 102400,
        inputShapes: [[1, 100, 160]],
        outputShapes: [[1, 100, 256]],
        attributes: {
          units: 256,
          returnSequences: true
        }
      },
      {
        id: 'gru-2',
        type: 'graph',
        name: 'GRU (128 units)',
        opType: 'gru',
        params: 147456,
        flops: 14745600,
        memoryUsage: 51200,
        inputShapes: [[1, 100, 256]],
        outputShapes: [[1, 128]],
        attributes: {
          units: 128,
          returnSequences: false
        }
      },
      {
        id: 'dense-1',
        type: 'mlp',
        name: 'Dense (64 neurons)',
        opType: 'dense',
        params: 8256,
        flops: 8256,
        memoryUsage: 256,
        inputShapes: [[1, 128]],
        outputShapes: [[1, 64]],
        attributes: {
          units: 64,
          activation: 'relu'
        }
      },
      {
        id: 'dropout-1',
        type: 'dropout',
        name: 'Dropout (0.3)',
        opType: 'dropout',
        params: 0,
        flops: 64,
        memoryUsage: 256,
        inputShapes: [[1, 64]],
        outputShapes: [[1, 64]],
        attributes: {
          rate: 0.3
        }
      },
      {
        id: 'output-1',
        type: 'output',
        name: 'Output (1000 classes)',
        opType: 'dense',
        params: 65000,
        flops: 65000,
        memoryUsage: 4000,
        inputShapes: [[1, 64]],
        outputShapes: [[1, 1000]],
        attributes: {
          units: 1000,
          activation: 'softmax'
        }
      }
    ]
  },
  {
    id: 'text-generator',
    name: 'Text Generator',
    description: 'Transformer-based model for text generation',
    icon: Brain,
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        name: 'Input Layer',
        opType: 'input',
        params: 0,
        flops: 0,
        memoryUsage: 1000,
        inputShapes: [[1, 100]],
        outputShapes: [[1, 100]],
        attributes: {}
      },
      {
        id: 'embedding-1',
        type: 'embedding',
        name: 'Embedding (256 dim)',
        opType: 'embedding',
        params: 2560000,
        flops: 25600,
        memoryUsage: 25600,
        inputShapes: [[1, 100]],
        outputShapes: [[1, 100, 256]],
        attributes: {
          vocabSize: 10000,
          embedDim: 256
        }
      },
      {
        id: 'transformer-1',
        type: 'transformer',
        name: 'Transformer Block 1',
        opType: 'transformer',
        params: 526336,
        flops: 52633600,
        memoryUsage: 102400,
        inputShapes: [[1, 100, 256]],
        outputShapes: [[1, 100, 256]],
        attributes: {
          heads: 8,
          dimModel: 256
        }
      },
      {
        id: 'transformer-2',
        type: 'transformer',
        name: 'Transformer Block 2',
        opType: 'transformer',
        params: 526336,
        flops: 52633600,
        memoryUsage: 102400,
        inputShapes: [[1, 100, 256]],
        outputShapes: [[1, 100, 256]],
        attributes: {
          heads: 8,
          dimModel: 256
        }
      },
      {
        id: 'dense-1',
        type: 'mlp',
        name: 'Dense (256 neurons)',
        opType: 'dense',
        params: 65792,
        flops: 65792,
        memoryUsage: 1024,
        inputShapes: [[1, 100, 256]],
        outputShapes: [[1, 100, 256]],
        attributes: {
          units: 256,
          activation: 'relu'
        }
      },
      {
        id: 'dropout-1',
        type: 'dropout',
        name: 'Dropout (0.2)',
        opType: 'dropout',
        params: 0,
        flops: 25600,
        memoryUsage: 102400,
        inputShapes: [[1, 100, 256]],
        outputShapes: [[1, 100, 256]],
        attributes: {
          rate: 0.2
        }
      },
      {
        id: 'output-1',
        type: 'output',
        name: 'Output (10000 tokens)',
        opType: 'dense',
        params: 2570000,
        flops: 2570000,
        memoryUsage: 40000,
        inputShapes: [[1, 100, 256]],
        outputShapes: [[1, 100, 10000]],
        attributes: {
          units: 10000,
          activation: 'softmax'
        }
      }
    ]
  }
];

type ModelTemplatesProps = {
  powerMode: boolean;
  onSelectTemplate: (nodes: ModelNode[]) => void;
};

export function ModelTemplates({ powerMode, onSelectTemplate }: ModelTemplatesProps) {
  return (
    <div className="p-4">
      <h3 className={cn(
        "text-sm font-medium mb-3",
        powerMode ? "text-white/70" : "text-gray-600"
      )}>
        Model Templates
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {MODEL_TEMPLATES.map((template) => {
          const Icon = template.icon;
          
          return (
            <motion.button
              key={template.id}
              onClick={() => onSelectTemplate(template.nodes)}
              className={cn(
                "p-4 rounded-lg text-left transition-colors relative group",
                powerMode
                  ? "bg-black/40 hover:bg-black/60 border border-white/10"
                  : "bg-gray-100 hover:bg-gray-200 border border-transparent",
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={cn(
                  "w-5 h-5",
                  powerMode ? "text-cyan-400" : "text-blue-500"
                )} />
                <h4 className={cn(
                  "font-medium",
                  powerMode ? "text-white" : "text-black"
                )}>
                  {template.name}
                </h4>
              </div>
              <p className={cn(
                "text-sm",
                powerMode ? "text-white/70" : "text-gray-600"
              )}>
                {template.description}
              </p>

              {/* Layer count badge */}
              <div className={cn(
                "absolute top-3 right-3 px-2 py-1 rounded-full text-xs max-w-[60px] truncate",
                powerMode
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-blue-100 text-blue-600"
              )}>
                {template.nodes.length} layers
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}