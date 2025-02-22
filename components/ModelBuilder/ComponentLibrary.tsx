"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LAYER_COLORS } from '../model/constants';
import { LayerType } from '../model/types';
import { ModelNode } from '@/lib/model/types';
import { ModelTemplates } from './ModelTemplates';

type ComponentLibraryProps = {
  powerMode: boolean;
  onAddNode: (node: ModelNode) => void;
  onSelectTemplate: (nodes: ModelNode[]) => void;
};

const COMPONENTS = [
  // Basic Layers
  { type: 'input' as LayerType, name: 'Input', category: 'Basic', description: 'Starting point for data flow' },
  { type: 'output' as LayerType, name: 'Output', category: 'Basic', description: 'Final layer for predictions' },
  { type: 'mlp' as LayerType, name: 'Dense', category: 'Basic', description: 'Fully connected layer' },
  
  // Convolutional
  { type: 'cnn' as LayerType, name: 'Conv2D', category: 'CNN', description: 'Convolutional layer for feature extraction' },
  { type: 'pooling' as LayerType, name: 'MaxPool', category: 'CNN', description: 'Downsampling using max values' },
  { type: 'pooling' as LayerType, name: 'AvgPool', category: 'CNN', description: 'Downsampling using averages' },
  { type: 'flatten' as LayerType, name: 'Flatten', category: 'CNN', description: 'Converts 2D features to 1D' },
  
  // Attention & Embedding
  { type: 'transformer' as LayerType, name: 'Transformer', category: 'Attention', description: 'Self-attention mechanism' },
  { type: 'attention' as LayerType, name: 'Attention', category: 'Attention', description: 'Attention layer' },
  { type: 'embedding' as LayerType, name: 'Embedding', category: 'Attention', description: 'Word/token embeddings' },
  { type: 'globalavgpool1d' as LayerType, name: 'Global Avg Pool', category: 'Attention', description: 'Global average pooling' },
  
  // Recurrent
  { type: 'rnn' as LayerType, name: 'RNN', category: 'Recurrent', description: 'Simple recurrent layer' },
  { type: 'graph' as LayerType, name: 'GRU', category: 'Recurrent', description: 'Gated recurrent unit' },
  
  // Regularization
  { type: 'dropout' as LayerType, name: 'Dropout', category: 'Regularization', description: 'Prevents overfitting' },
  { type: 'normalization' as LayerType, name: 'BatchNorm', category: 'Regularization', description: 'Normalizes activations' },
  { type: 'residual' as LayerType, name: 'ResBlock', category: 'Regularization', description: 'Residual connections' }
];

type Tab = 'components' | 'templates';

export function ComponentLibrary({ powerMode, onAddNode, onSelectTemplate }: ComponentLibraryProps) {
  const [activeTab, setActiveTab] = useState<Tab>('templates');

  const handleAddComponent = (component: typeof COMPONENTS[0]) => {
    const newNode: ModelNode = {
      id: `${component.type}-${Date.now()}`,
      type: component.type,
      name: component.name,
      opType: component.type,
      params: 0,
      flops: 0,
      memoryUsage: 0,
      inputShapes: [[1, 1]],
      outputShapes: [[1, 1]],
      attributes: {}
    };
    onAddNode(newNode);
  };

  const handleSelectTemplate = (nodes: ModelNode[]) => {
    // Pass the template nodes directly to the parent component
    onSelectTemplate(nodes.map(node => ({
      ...node,
      id: `${node.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    })));
  };

  const groupedComponents = COMPONENTS.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof COMPONENTS>);

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className={cn(
        "p-4 border-b flex gap-2 sticky top-0 z-10 bg-inherit",
        powerMode ? "border-white/10" : "border-gray-100"
      )}>
        <button
          onClick={() => setActiveTab('templates')}
          className={cn(
            "flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'templates'
              ? powerMode
                ? "bg-cyan-500 text-white"
                : "bg-black text-white"
              : powerMode
                ? "text-white/70 hover:text-white hover:bg-white/5"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
          )}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={cn(
            "flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === 'components'
              ? powerMode
                ? "bg-cyan-500 text-white"
                : "bg-black text-white"
              : powerMode
                ? "text-white/70 hover:text-white hover:bg-white/5"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
          )}
        >
          Components
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'templates' ? (
          <div className="p-4">
            <ModelTemplates
              powerMode={powerMode}
              onSelectTemplate={handleSelectTemplate}
            />
          </div>
        ) : (
          <div className="p-4">
            {Object.entries(groupedComponents).map(([category, components]) => (
              <div key={category} className="mb-6 last:mb-0">
                <h3 className={cn(
                  "text-sm font-medium mb-3",
                  powerMode ? "text-white/70" : "text-gray-600"
                )}>
                  {category}
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {components.map((component) => (
                    <motion.button
                      key={`${component.category}-${component.name}`}
                      onClick={() => handleAddComponent(component)}
                      className={cn(
                        "p-3 rounded-lg relative group",
                        powerMode
                          ? "bg-black/40 hover:bg-black/60"
                          : "bg-gray-100 hover:bg-gray-200",
                        "border",
                        powerMode ? "border-white/10" : "border-transparent",
                        "transition-colors"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: LAYER_COLORS[component.type]
                          }}
                        />
                        <span className={cn(
                          "text-xs font-medium text-center",
                          powerMode ? "text-white" : "text-black"
                        )}>
                          {component.name}
                        </span>

                        {/* Add button */}
                        <div className={cn(
                          "absolute top-1 right-1 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
                          powerMode
                            ? "bg-white/10 text-white"
                            : "bg-gray-200 text-black"
                        )}>
                          <Plus className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Tooltip */}
                      <div className={cn(
                        "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 rounded-lg",
                        "opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                        "w-48 z-50",
                        powerMode ? "bg-black text-white" : "bg-white text-black shadow-lg",
                        "border",
                        powerMode ? "border-white/10" : "border-gray-200"
                      )}>
                        <p className="text-xs">{component.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}