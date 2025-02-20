"use client";

import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';

type PropertiesPanelProps = {
  powerMode: boolean;
  selectedNode: ModelNode | null;
  onNodeUpdate: (node: ModelNode) => void;
};

export function PropertiesPanel({
  powerMode,
  selectedNode,
  onNodeUpdate
}: PropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <div className="p-4">
        <p className={cn(
          "text-sm text-center",
          powerMode ? "text-white/50" : "text-gray-500"
        )}>
          Select a node to view its properties
        </p>
      </div>
    );
  }

  return (
    <div className="h-full p-4 space-y-6">
      {/* Node Info */}
      <div>
        <h3 className={cn(
          "text-sm font-medium mb-3",
          powerMode ? "text-white/70" : "text-gray-600"
        )}>
          Layer Properties
        </h3>

        <div className="space-y-4">
          {/* Layer-specific properties */}
          {selectedNode.type === 'cnn' && (
            <>
              <div>
                <label className={cn(
                  "block text-sm mb-1",
                  powerMode ? "text-white/50" : "text-gray-500"
                )}>
                  Filters
                </label>
                <input
                  type="number"
                  value={selectedNode.attributes?.filters || 32}
                  onChange={(e) => onNodeUpdate({
                    ...selectedNode,
                    attributes: {
                      ...selectedNode.attributes,
                      filters: parseInt(e.target.value)
                    }
                  })}
                  className={cn(
                    "w-full px-3 py-2 rounded-md",
                    powerMode
                      ? "bg-black/40 border border-white/10 text-white"
                      : "bg-gray-100 border border-transparent text-black",
                    "focus:outline-none focus:ring-2",
                    powerMode
                      ? "focus:ring-cyan-500/50"
                      : "focus:ring-black/20"
                  )}
                />
              </div>

              <div>
                <label className={cn(
                  "block text-sm mb-1",
                  powerMode ? "text-white/50" : "text-gray-500"
                )}>
                  Kernel Size
                </label>
                <select
                  value={selectedNode.attributes?.kernelSize || 3}
                  onChange={(e) => onNodeUpdate({
                    ...selectedNode,
                    attributes: {
                      ...selectedNode.attributes,
                      kernelSize: parseInt(e.target.value)
                    }
                  })}
                  className={cn(
                    "w-full px-3 py-2 rounded-md",
                    powerMode
                      ? "bg-black/40 border border-white/10 text-white"
                      : "bg-gray-100 border border-transparent text-black",
                    "focus:outline-none focus:ring-2",
                    powerMode
                      ? "focus:ring-cyan-500/50"
                      : "focus:ring-black/20"
                  )}
                >
                  <option value={1}>1x1</option>
                  <option value={3}>3x3</option>
                  <option value={5}>5x5</option>
                  <option value={7}>7x7</option>
                </select>
              </div>

              <div>
                <label className={cn(
                  "block text-sm mb-1",
                  powerMode ? "text-white/50" : "text-gray-500"
                )}>
                  Stride
                </label>
                <select
                  value={selectedNode.attributes?.stride || 1}
                  onChange={(e) => onNodeUpdate({
                    ...selectedNode,
                    attributes: {
                      ...selectedNode.attributes,
                      stride: parseInt(e.target.value)
                    }
                  })}
                  className={cn(
                    "w-full px-3 py-2 rounded-md",
                    powerMode
                      ? "bg-black/40 border border-white/10 text-white"
                      : "bg-gray-100 border border-transparent text-black",
                    "focus:outline-none focus:ring-2",
                    powerMode
                      ? "focus:ring-cyan-500/50"
                      : "focus:ring-black/20"
                  )}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </>
          )}

          {selectedNode.type === 'transformer' && (
            <>
              <div>
                <label className={cn(
                  "block text-sm mb-1",
                  powerMode ? "text-white/50" : "text-gray-500"
                )}>
                  Attention Heads
                </label>
                <input
                  type="number"
                  value={selectedNode.attributes?.heads || 8}
                  onChange={(e) => onNodeUpdate({
                    ...selectedNode,
                    attributes: {
                      ...selectedNode.attributes,
                      heads: parseInt(e.target.value)
                    }
                  })}
                  className={cn(
                    "w-full px-3 py-2 rounded-md",
                    powerMode
                      ? "bg-black/40 border border-white/10 text-white"
                      : "bg-gray-100 border border-transparent text-black",
                    "focus:outline-none focus:ring-2",
                    powerMode
                      ? "focus:ring-cyan-500/50"
                      : "focus:ring-black/20"
                  )}
                />
              </div>

              <div>
                <label className={cn(
                  "block text-sm mb-1",
                  powerMode ? "text-white/50" : "text-gray-500"
                )}>
                  Hidden Size
                </label>
                <input
                  type="number"
                  value={selectedNode.attributes?.hiddenSize || 512}
                  onChange={(e) => onNodeUpdate({
                    ...selectedNode,
                    attributes: {
                      ...selectedNode.attributes,
                      hiddenSize: parseInt(e.target.value)
                    }
                  })}
                  className={cn(
                    "w-full px-3 py-2 rounded-md",
                    powerMode
                      ? "bg-black/40 border border-white/10 text-white"
                      : "bg-gray-100 border border-transparent text-black",
                    "focus:outline-none focus:ring-2",
                    powerMode
                      ? "focus:ring-cyan-500/50"
                      : "focus:ring-black/20"
                  )}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h3 className={cn(
          "text-sm font-medium mb-3",
          powerMode ? "text-white/70" : "text-gray-600"
        )}>
          Performance Metrics
        </h3>
        
        <div className="space-y-2">
          <div className={cn(
            "flex justify-between text-sm p-2 rounded-md",
            powerMode ? "bg-black/40" : "bg-gray-100"
          )}>
            <span className={powerMode ? "text-white/50" : "text-gray-500"}>Parameters</span>
            <span className={powerMode ? "text-white" : "text-black"}>
              {selectedNode.params.toLocaleString()}
            </span>
          </div>

          <div className={cn(
            "flex justify-between text-sm p-2 rounded-md",
            powerMode ? "bg-black/40" : "bg-gray-100"
          )}>
            <span className={powerMode ? "text-white/50" : "text-gray-500"}>FLOPs</span>
            <span className={powerMode ? "text-white" : "text-black"}>
              {selectedNode.flops.toLocaleString()}
            </span>
          </div>

          <div className={cn(
            "flex justify-between text-sm p-2 rounded-md",
            powerMode ? "bg-black/40" : "bg-gray-100"
          )}>
            <span className={powerMode ? "text-white/50" : "text-gray-500"}>Memory</span>
            <span className={powerMode ? "text-white" : "text-black"}>
              {(selectedNode.memoryUsage / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}