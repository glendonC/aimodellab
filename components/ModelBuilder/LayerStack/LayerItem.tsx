"use client";

import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { X, Settings2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LAYER_COLORS } from '../../model/constants';
import { ModelNode } from '@/lib/model/types';
import { motion } from 'framer-motion';
import { LayerConfiguration } from '../LayerConfiguration';

type LayerItemProps = {
  node: ModelNode;
  isSelected: boolean;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onClick: () => void;
  onRemove: () => void;
  onUpdate: (nodeId: string, updates: Partial<ModelNode>) => void;
  powerMode: boolean;
  isSimulating?: boolean;
  simulationDelay?: number;
};

export function LayerItem({
  node,
  isSelected,
  isDragging,
  onDragStart,
  onDragEnd,
  onClick,
  onRemove,
  onUpdate,
  powerMode,
  isSimulating,
  simulationDelay
}: LayerItemProps) {
  const [showConfig, setShowConfig] = useState(false);
  
  // Only show custom badge if the layer has been manually configured
  const hasCustomConfig = node.attributes?.isCustomized === true;

  return (
    <>
      <Reorder.Item
        value={node}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={cn(
          "p-3 rounded-lg select-none transition-all duration-200 relative",
          powerMode ? "bg-black/40" : "bg-gray-100",
          "border",
          isSelected && powerMode && "border-cyan-500 ring-2 ring-cyan-500",
          isSelected && !powerMode && "border-black ring-2 ring-black",
          !isSelected && powerMode && "border-white/10",
          !isSelected && !powerMode && "border-transparent",
          !isDragging && "group cursor-grab active:cursor-grabbing",
          hasCustomConfig && powerMode && "border-cyan-500/50",
          hasCustomConfig && !powerMode && "border-blue-500/50"
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          {/* Layer indicator */}
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: LAYER_COLORS[node.type] }}
          />

          {/* Layer info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={cn(
                "text-sm font-medium truncate",
                powerMode ? "text-white" : "text-black"
              )}>
                {node.name}
              </p>
              {hasCustomConfig && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1",
                    powerMode
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-blue-100 text-blue-600"
                  )}
                >
                  <Sparkles className="w-3 h-3" />
                  Custom
                </motion.div>
              )}
            </div>
            <p className={cn(
              "text-xs truncate",
              powerMode ? "text-white/50" : "text-gray-500"
            )}>
              {node.type}
            </p>
          </div>

          {/* Configure button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfig(true);
            }}
            className={cn(
              "p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
              powerMode
                ? "hover:bg-white/10 text-white/70 hover:text-white"
                : "hover:bg-gray-300/50 text-gray-600 hover:text-black"
            )}
          >
            <Settings2 className="w-4 h-4" />
          </motion.button>

          {/* Remove button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              "p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
              powerMode
                ? "hover:bg-white/10 text-white/70 hover:text-white"
                : "hover:bg-gray-300/50 text-gray-600 hover:text-black"
            )}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {isSimulating && (
          <motion.div
            className={cn(
              "absolute inset-0",
              powerMode ? "bg-cyan-500/20" : "bg-blue-500/20"
            )}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 0.8,
              delay: simulationDelay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </Reorder.Item>

      {showConfig && (
        <LayerConfiguration
          node={node}
          onUpdate={(nodeId, updates) => {
            // Mark the layer as customized when parameters are changed
            onUpdate(nodeId, {
              ...updates,
              attributes: {
                ...updates.attributes,
                isCustomized: true
              }
            });
          }}
          onClose={() => setShowConfig(false)}
          powerMode={powerMode}
        />
      )}
    </>
  );
}