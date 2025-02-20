"use client";

import { Reorder } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LAYER_COLORS } from '../../model/constants';
import { ModelNode } from '@/lib/model/types';
import { motion } from 'framer-motion';

type LayerItemProps = {
  node: ModelNode;
  isSelected: boolean;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onClick: () => void;
  onRemove: () => void;
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
  powerMode,
  isSimulating,
  simulationDelay
}: LayerItemProps) {
  return (
    <Reorder.Item
      value={node}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
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
        </button>
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
  );
}