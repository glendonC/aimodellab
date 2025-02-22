"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';
import { LayerConfigFields } from './LayerConfigFields';

type LayerConfigurationProps = {
  node: ModelNode;
  onUpdate: (nodeId: string, updates: Partial<ModelNode>) => void;
  onClose: () => void;
  powerMode: boolean;
};

export function LayerConfiguration({
  node,
  onUpdate,
  onClose,
  powerMode
}: LayerConfigurationProps) {
  const [activeTab, setActiveTab] = useState<'parameters' | 'advanced'>('parameters');

  const handleParameterChange = (key: string, value: any) => {
    onUpdate(node.id, {
      attributes: {
        ...node.attributes,
        [key]: value
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "fixed right-4 top-24 w-80 rounded-lg shadow-2xl z-50",
        powerMode ? "bg-gray-900 border border-cyan-500/30" : "bg-white border border-border"
      )}
      style={{
        maxHeight: 'calc(100vh - 96px)', // Ensure it doesn't overflow viewport
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div className="sticky top-0 p-4 border-b flex items-center justify-between bg-inherit z-10">
        <div className="flex items-center gap-2">
          <Settings2 className={cn(
            "w-5 h-5",
            powerMode && "text-cyan-400"
          )} />
          <h3 className={cn(
            "font-semibold",
            powerMode ? "text-white" : "text-foreground"
          )}>
            Configure {node.name}
          </h3>
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "p-2 rounded-full hover:bg-gray-100/10",
            powerMode ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Tabs */}
      <div className={cn(
        "sticky top-[73px] p-4 border-b flex gap-2 bg-inherit z-10",
        powerMode ? "border-white/10" : "border-border"
      )}>
        <button
          onClick={() => setActiveTab('parameters')}
          className={cn(
            "flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            activeTab === 'parameters'
              ? powerMode
                ? "bg-cyan-500 text-white"
                : "bg-black text-white"
              : powerMode
                ? "text-white/70 hover:text-white hover:bg-white/5"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
          )}
        >
          Parameters
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          className={cn(
            "flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            activeTab === 'advanced'
              ? powerMode
                ? "bg-cyan-500 text-white"
                : "bg-black text-white"
              : powerMode
                ? "text-white/70 hover:text-white hover:bg-white/5"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
          )}
        >
          Advanced
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <LayerConfigFields
          type={node.type}
          attributes={node.attributes}
          onChange={handleParameterChange}
          powerMode={powerMode}
          tab={activeTab}
        />
      </div>
    </motion.div>
  );
}