"use client";

import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FEATURED_MODELS } from '@/lib/huggingface';

type ModelPresetsProps = {
  onSelect: (modelId: string) => Promise<void>;
  powerMode: boolean;
  selectedModelId?: string | null;
  onClose: () => void;
};

export default function ModelPresets({ onSelect, powerMode, selectedModelId, onClose }: ModelPresetsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className={cn(
          "text-2xl font-bold",
          powerMode ? "text-white" : "text-black"
        )}>
          Featured Models
        </h2>
        
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "p-2 rounded-full hover:bg-gray-100/10",
            powerMode ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-black"
          )}
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="px-6 space-y-4">
        {FEATURED_MODELS.map((model) => (
          <motion.button
            key={model.id}
            onClick={() => onSelect(model.id)}
            className={cn(
              "w-full p-6 text-left rounded-lg transition-all duration-200",
              powerMode 
                ? "bg-gray-800 text-white hover:bg-gray-700" 
                : "bg-white text-black hover:bg-gray-50",
              "border",
              selectedModelId === model.id
                ? powerMode 
                  ? "border-cyan-500" 
                  : "border-black"
                : powerMode
                  ? "border-white/20"
                  : "border-gray-200"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">
                {model.name}
              </h3>
              
              <p className={cn(
                "text-sm",
                powerMode ? "text-gray-300" : "text-gray-600"
              )}>
                {model.description}
              </p>

              <div className="flex items-center gap-4 mt-2">
                <div>
                  <p className={cn(
                    "text-sm font-medium",
                    powerMode ? "text-white" : "text-black"
                  )}>
                    {model.size}
                  </p>
                  <p className={cn(
                    "text-xs",
                    powerMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Size
                  </p>
                </div>

                <div>
                  <p className={cn(
                    "text-sm font-medium",
                    powerMode ? "text-white" : "text-black"
                  )}>
                    {formatNumber(model.downloads)}
                  </p>
                  <p className={cn(
                    "text-xs",
                    powerMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Downloads
                  </p>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}