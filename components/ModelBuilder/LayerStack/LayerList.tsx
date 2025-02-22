"use client";

import { useState } from 'react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';
import { LayerItem } from './LayerItem';

type LayerListProps = {
  nodes: ModelNode[];
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
  onNodesChange: (nodes: ModelNode[]) => void;
  onRemoveNode: (nodeId: string) => void;
  powerMode: boolean;
  isSimulating?: boolean;
};

export function LayerList({
  nodes,
  selectedNodeId,
  onNodeSelect,
  onNodesChange,
  onRemoveNode,
  powerMode,
  isSimulating
}: LayerListProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleNodeUpdate = (nodeId: string, updates: Partial<ModelNode>) => {
    onNodesChange(
      nodes.map(node => 
        node.id === nodeId 
          ? { ...node, ...updates }
          : node
      )
    );
  };

  if (nodes.length === 0) {
    return (
      <div className={cn(
        "flex-1 flex items-center justify-center text-sm",
        powerMode ? "text-white/50" : "text-gray-500"
      )}>
        Drag layers from the library to start building
      </div>
    );
  }

  return (
    <Reorder.Group
      axis="y"
      values={nodes}
      onReorder={onNodesChange}
      className="flex-1 space-y-2"
    >
      <AnimatePresence>
        {nodes.map((node, index) => (
          <LayerItem
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            isDragging={isDragging}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onClick={() => onNodeSelect(node.id)}
            onRemove={() => onRemoveNode(node.id)}
            onUpdate={handleNodeUpdate}
            powerMode={powerMode}
            isSimulating={isSimulating}
            simulationDelay={index * 0.2}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}