"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LAYER_COLORS } from '../model/constants';
import { LayerType } from '../model/types';
import { ModelNode } from '@/lib/model/types';

type LayerStackProps = {
  nodes: ModelNode[];
  onNodesChange: (nodes: ModelNode[]) => void;
  powerMode: boolean;
};

const LAYER_RULES: Record<LayerType, LayerType[]> = {
  input: ['cnn', 'mlp', 'transformer', 'rnn', 'embedding'],
  cnn: ['cnn', 'pooling', 'flatten'],
  pooling: ['cnn', 'pooling', 'flatten'],
  flatten: ['mlp', 'dropout'],
  mlp: ['mlp', 'dropout', 'output'],
  transformer: ['transformer', 'attention', 'dropout', 'output'],
  attention: ['transformer', 'mlp', 'dropout', 'output'],
  rnn: ['rnn', 'dropout', 'output'],
  dropout: ['mlp', 'transformer', 'rnn', 'output'],
  embedding: ['transformer', 'rnn'],
  output: []
};

export function LayerStack({ nodes, onNodesChange, powerMode }: LayerStackProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleRemoveNode = (nodeId: string) => {
    onNodesChange(nodes.filter(node => node.id !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  return (
    <div className={cn(
      "h-full p-4 flex flex-col gap-4",
      powerMode ? "bg-gray-900/60" : "bg-white"
    )}>
      <h3 className={cn(
        "text-sm font-medium",
        powerMode ? "text-white/70" : "text-gray-600"
      )}>
        Model Architecture
      </h3>

      <Reorder.Group
        axis="y"
        values={nodes}
        onReorder={onNodesChange}
        className="flex-1 space-y-2"
      >
        <AnimatePresence>
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;

            return (
              <Reorder.Item
                key={node.id}
                value={node}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                className={cn(
                  "p-3 rounded-lg select-none transition-all duration-200",
                  powerMode ? "bg-black/40" : "bg-gray-100",
                  "border",
                  isSelected && powerMode && "border-cyan-500 ring-2 ring-cyan-500",
                  isSelected && !powerMode && "border-black ring-2 ring-black",
                  !isSelected && powerMode && "border-white/10",
                  !isSelected && !powerMode && "border-transparent",
                  !isDragging && "group cursor-grab active:cursor-grabbing"
                )}
                onClick={() => handleNodeClick(node.id)}
              >
                <div className="flex items-center gap-3">
                  {/* Layer indicator */}
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: LAYER_COLORS[node.type] }}
                  />

                  {/* Layer info */}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      powerMode ? "text-white" : "text-black"
                    )}>
                      {node.name}
                    </p>
                    <p className={cn(
                      "text-xs truncate",
                      powerMode ? "text-white/50" : "text-gray-500"
                    )}>
                      {node.type}
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveNode(node.id);
                    }}
                    className={cn(
                      "p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
                      powerMode
                        ? "hover:bg-white/10 text-white/70 hover:text-white"
                        : "hover:bg-gray-300/50 text-gray-600 hover:text-black"
                    )}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>

      {nodes.length === 0 && (
        <div className={cn(
          "flex-1 flex items-center justify-center text-sm",
          powerMode ? "text-white/50" : "text-gray-500"
        )}>
          Drag layers from the library to start building
        </div>
      )}
    </div>
  );
}