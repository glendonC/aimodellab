"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LAYER_STATS } from './constants';
import { LayerType } from './types';
import { ModelNode } from '@/lib/model/types';

type LayerStatsProps = {
  type: LayerType;
  powerMode: boolean;
  isHighlighted: boolean;
  analysisData?: ModelNode;
};

export function LayerStats({ 
  type, 
  powerMode, 
  isHighlighted,
  analysisData 
}: LayerStatsProps) {
  const defaultStats = LAYER_STATS[type];
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Use analysis data if available, otherwise fall back to default stats
  const stats = analysisData || defaultStats;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        "fixed left-4 rounded-lg backdrop-blur-md w-72 transition-all duration-300",
        "z-50",
        powerMode 
          ? "bg-black/80 border border-white/20"
          : "bg-white/95 border border-border",
        isHighlighted && (powerMode ? "border-cyan-500/50" : "border-primary")
      )}
      style={{
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    >
      {/* Header */}
      <motion.div 
        className="p-4 border-b transition-colors duration-300"
        initial={false}
        animate={{
          borderColor: powerMode 
            ? isHighlighted 
              ? "rgba(6, 182, 212, 0.5)" 
              : "rgba(255, 255, 255, 0.2)"
            : ""
        }}
      >
        <h3 className={cn(
          "text-lg font-bold mb-1 flex items-center gap-2",
          powerMode ? "text-white" : "text-black"
        )}>
          <Layers className={cn(
            "w-5 h-5",
            powerMode && "text-cyan-400"
          )} />
          {type.charAt(0).toUpperCase() + type.slice(1)} Layer
        </h3>
        <p className={cn(
          "text-sm",
          powerMode ? "text-white/70" : "text-gray-600"
        )}>
          Layer-specific performance metrics and configuration
        </p>
      </motion.div>

      {/* Main Stats */}
      <div className="p-4 space-y-4">
        {analysisData ? (
          <>
            <StatBar
              label="Parameters"
              value={stats.params.toLocaleString()}
              percentage={(stats.params / 150528) * 100}
              powerMode={powerMode}
              color="cyan"
            />
            
            <StatBar
              label="FLOPs"
              value={`${(stats.flops / 1e6).toFixed(1)}M`}
              percentage={(stats.flops / 1e9) * 100}
              powerMode={powerMode}
              color="yellow"
            />
            
            <StatBar
              label="Memory"
              value={`${(stats.memoryUsage / (1024 * 1024)).toFixed(1)} MB`}
              percentage={(stats.memoryUsage / (1024 * 1024 * 100)) * 100}
              powerMode={powerMode}
              color="purple"
            />
          </>
        ) : (
          <>
            <StatBar
              label="Neurons"
              value={defaultStats.neurons.toLocaleString()}
              percentage={(defaultStats.neurons / 150528) * 100}
              powerMode={powerMode}
              color="cyan"
            />
            
            <StatBar
              label="Inference Time"
              value={`${defaultStats.inferenceTime} ms`}
              percentage={(defaultStats.inferenceTime / 3.5) * 100}
              powerMode={powerMode}
              color="yellow"
            />
            
            <StatBar
              label="Memory Usage"
              value={`${defaultStats.memoryUsage} MB`}
              percentage={(defaultStats.memoryUsage / 8.6) * 100}
              powerMode={powerMode}
              color="purple"
            />
          </>
        )}

        {/* Expandable Section */}
        <motion.div
          className="space-y-3"
          animate={{ height: isExpanded ? 'auto' : 0 }}
          initial={false}
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2 pt-2"
              >
                {analysisData ? (
                  <>
                    {stats.inputShapes && (
                      <StatRow 
                        label="Input Shape" 
                        value={stats.inputShapes[0].join('×')} 
                        powerMode={powerMode} 
                      />
                    )}
                    {stats.outputShapes && (
                      <StatRow 
                        label="Output Shape" 
                        value={stats.outputShapes[0].join('×')} 
                        powerMode={powerMode} 
                      />
                    )}
                    {stats.attributes && Object.entries(stats.attributes).map(([key, value]) => (
                      <StatRow
                        key={key}
                        label={key}
                        value={value.toString()}
                        powerMode={powerMode}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {defaultStats.filters && (
                      <StatRow label="Filters" value={defaultStats.filters} powerMode={powerMode} />
                    )}
                    {defaultStats.heads && (
                      <StatRow label="Attention Heads" value={defaultStats.heads.toString()} powerMode={powerMode} />
                    )}
                    {defaultStats.hiddenUnits && (
                      <StatRow label="Hidden Units" value={defaultStats.hiddenUnits.toString()} powerMode={powerMode} />
                    )}
                    {defaultStats.layers && (
                      <StatRow label="Layers" value={defaultStats.layers} powerMode={powerMode} />
                    )}
                    {defaultStats.aggregation && (
                      <StatRow label="Aggregation" value={defaultStats.aggregation} powerMode={powerMode} />
                    )}
                    {defaultStats.connections && (
                      <StatRow label="Connections" value={defaultStats.connections} powerMode={powerMode} />
                    )}
                    {defaultStats.type && (
                      <StatRow label="Type" value={defaultStats.type} powerMode={powerMode} />
                    )}
                    {defaultStats.momentum && (
                      <StatRow label="Momentum" value={defaultStats.momentum.toString()} powerMode={powerMode} />
                    )}
                    <StatRow label="Activation" value={defaultStats.activations} powerMode={powerMode} />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expand/Collapse Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-full py-2 rounded-md flex items-center justify-center gap-2 transition-colors",
            powerMode
              ? "text-white/70 hover:text-white hover:bg-white/10"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm">
            {isExpanded ? "Show Less" : "Show More"}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              isExpanded && "transform rotate-180"
            )}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}

type StatBarProps = {
  label: string;
  value: string;
  percentage: number;
  powerMode: boolean;
  color: 'cyan' | 'yellow' | 'purple';
};

function StatBar({ label, value, percentage, powerMode, color }: StatBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between text-sm mb-1">
        <span className={powerMode ? "text-white/70" : "text-gray-600"}>
          {label}
        </span>
        <span className={powerMode ? "text-white" : "text-black"}>
          {value}
        </span>
      </div>
      <div className={cn(
        "h-2 rounded-full overflow-hidden",
        powerMode ? `bg-${color}-500/20` : `bg-${color}-500/10`
      )}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            `bg-${color}-500`
          )}
        />
      </div>
    </motion.div>
  );
}

type StatRowProps = {
  label: string;
  value: string;
  powerMode: boolean;
};

function StatRow({ label, value, powerMode }: StatRowProps) {
  return (
    <motion.div
      className="flex justify-between text-sm py-1 px-2 rounded-md transition-colors duration-200"
      whileHover={{
        backgroundColor: powerMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
      }}
    >
      <span className={powerMode ? "text-white/70" : "text-gray-600"}>
        {label}
      </span>
      <span className={powerMode ? "text-white" : "text-black"}>
        {value}
      </span>
    </motion.div>
  );
}