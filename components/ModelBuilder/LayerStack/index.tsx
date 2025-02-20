"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';
import { LayerList } from './LayerList';

type LayerStackProps = {
  nodes: ModelNode[];
  onNodesChange: (nodes: ModelNode[]) => void;
  powerMode: boolean;
  isSimulating?: boolean;
};

export function LayerStack({ nodes, onNodesChange, powerMode, isSimulating }: LayerStackProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleRemoveNode = (nodeId: string) => {
    onNodesChange(nodes.filter(node => node.id !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };

  return (
    <div className={cn(
      "h-full flex flex-col gap-4",
      powerMode ? "bg-gray-900/60" : "bg-white"
    )}>
      {/* Header */}
      <div className={cn(
        "p-4 pb-2 border-b",
        powerMode ? "border-white/10" : "border-gray-100"
      )}>
        <h3 className={cn(
          "text-sm font-medium",
          powerMode ? "text-white/70" : "text-gray-600"
        )}>
          Model Architecture
        </h3>
      </div>

      {/* Layer List with increased top padding */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        <div className="pt-12">
          <LayerList
            nodes={nodes}
            selectedNodeId={selectedNodeId}
            onNodeSelect={setSelectedNodeId}
            onNodesChange={onNodesChange}
            onRemoveNode={handleRemoveNode}
            powerMode={powerMode}
            isSimulating={isSimulating}
          />
        </div>
      </div>
    </div>
  );
}