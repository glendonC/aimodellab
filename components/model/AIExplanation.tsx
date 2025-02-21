"use client";

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { cn } from '@/lib/utils';
import { LAYER_EXPLANATIONS } from './constants';
import { LayerType } from './types';

type AIExplanationProps = {
  type: LayerType;
  powerMode: boolean;
};

export function AIExplanation({ type, powerMode }: AIExplanationProps) {
  // Add fallback explanation
  const defaultExplanation = {
    title: 'Neural Network Layer',
    description: 'This is a processing unit in the neural network.',
    technical: ['Processes input data', 'Applies transformations', 'Passes results to next layer']
  };

  const explanation = LAYER_EXPLANATIONS[type] || defaultExplanation;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        "fixed right-4 rounded-lg backdrop-blur-md w-80 transition-all duration-300",
        "z-50",
        powerMode 
          ? "bg-black/80 border border-white/20"
          : "bg-white/95 border border-border"
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
            ? "rgba(255, 255, 255, 0.2)"
            : ""
        }}
      >
        <div className="flex items-start gap-3">
          <Bot className={cn(
            "w-5 h-5 mt-1 shrink-0",
            powerMode ? "text-cyan-400" : "text-black"
          )} />
          <div>
            <h3 className={cn(
              "text-lg font-bold",
              powerMode ? "text-white" : "text-black"
            )}>
              {explanation.title}
            </h3>
            <TypeAnimation
              sequence={[explanation.description]}
              wrapper="p"
              speed={50}
              cursor={false}
              className={cn(
                "text-sm mt-1",
                powerMode ? "text-white/80" : "text-gray-600"
              )}
            />
          </div>
        </div>
      </motion.div>

      {/* Technical Details */}
      <div className="p-4">
        <h4 className={cn(
          "text-sm font-semibold mb-3",
          powerMode ? "text-white/90" : "text-black"
        )}>
          Technical Details
        </h4>
        
        <div className={cn(
          "space-y-2",
          powerMode ? "text-white/70" : "text-gray-600"
        )}>
          {explanation.technical.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0",
                powerMode ? "bg-cyan-400" : "bg-black"
              )} />
              <span className="text-sm">{detail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}