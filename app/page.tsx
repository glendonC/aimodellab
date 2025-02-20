"use client";

import { useState } from "react";
import { Search, Zap, Menu, ArrowLeftRight, Activity, Box, LayoutGrid, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ModelPresets from '@/components/ModelPresets';
import ModelVisualization from '@/components/ModelVisualization';
import ModelSearch from '@/components/ModelSearch';
import ModelComparison from '@/components/ModelComparison';
import PerformanceModal from '@/components/PerformanceModal';
import ModelBuilder from '@/components/ModelBuilder';
import { useModelAnalysis } from '@/hooks/useModelAnalysis';

type ViewMode = '3d-analysis' | 'model-builder';

export default function ModelDebugger() {
  const [powerMode, setPowerMode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('3d-analysis');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const { analyzeModel, isAnalyzing, result: analysisResult } = useModelAnalysis();

  const handleModelSelect = async (modelId: string) => {
    try {
      await analyzeModel(modelId);
      setIsPresetsOpen(false);
    } catch (error) {
      console.error('Failed to load model:', error);
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-all duration-1000",
      powerMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gray-100"
    )}>
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className={cn(
            "text-4xl font-bold tracking-tight mb-4",
            powerMode ? "text-white" : "text-black"
          )}>
            Model Intelligence Lab
          </h1>
          <p className={cn(
            powerMode ? "text-gray-300" : "text-gray-600"
          )}>
            Explore, analyze, and optimize AI models in 3D with real-time NVIDIA performance insights
          </p>

          {/* View Mode Toggle */}
          <div className="flex justify-center mt-6">
            <div className={cn(
              "inline-flex rounded-lg p-1",
              powerMode ? "bg-gray-800" : "bg-white shadow-sm"
            )}>
              <button
                onClick={() => setViewMode('3d-analysis')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
                  viewMode === '3d-analysis'
                    ? powerMode
                      ? "bg-cyan-500 text-white"
                      : "bg-black text-white"
                    : powerMode
                      ? "text-white/70 hover:text-white"
                      : "text-gray-600 hover:text-black"
                )}
              >
                <Box className="w-4 h-4" />
                3D Analysis
              </button>
              <button
                onClick={() => setViewMode('model-builder')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
                  viewMode === 'model-builder'
                    ? powerMode
                      ? "bg-cyan-500 text-white"
                      : "bg-black text-white"
                    : powerMode
                      ? "text-white/70 hover:text-white"
                      : "text-gray-600 hover:text-black"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
                Model Builder
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          {viewMode === '3d-analysis' ? (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-10"
            >
              <ModelVisualization 
                modelFile={analysisResult ? { name: 'model', size: 100, type: 'huggingface' } : null}
                powerMode={powerMode} 
                analysisResult={analysisResult}
                isLoading={isAnalyzing}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-10"
            >
              <ModelBuilder powerMode={powerMode} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex items-center gap-4 z-50">
        {analysisResult && viewMode === '3d-analysis' && (
          <motion.button
            onClick={() => setIsPerformanceOpen(true)}
            className={cn(
              "p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300",
              powerMode
                ? "bg-cyan-500 text-white hover:bg-cyan-600"
                : "bg-black text-white hover:bg-gray-800"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium">View Performance</span>
          </motion.button>
        )}

        {/* GPU Acceleration Button */}
        <motion.button
          onClick={() => setPowerMode(!powerMode)}
          className={cn(
            "p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300",
            powerMode
              ? "bg-cyan-500 text-white hover:bg-cyan-600"
              : "bg-black text-white hover:bg-gray-800"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className={cn(
            "w-5 h-5",
            powerMode && "text-yellow-400"
          )} />
          <span className="font-medium">
            {powerMode ? "GPU Acceleration ON" : "Enable GPU Acceleration"}
          </span>
        </motion.button>

        {/* NVIDIA Optimization Button */}
        {powerMode && (
          <motion.button
            onClick={() => {
              // Add NVIDIA optimization logic here
            }}
            className="p-4 rounded-full shadow-lg flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Optimize with NVIDIA</span>
          </motion.button>
        )}

        {analysisResult && viewMode === '3d-analysis' && (
          <motion.button
            onClick={() => setIsComparisonOpen(true)}
            className={cn(
              "p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300",
              powerMode
                ? "bg-cyan-500 text-white hover:bg-cyan-600"
                : "bg-black text-white hover:bg-gray-800"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftRight className="w-5 h-5" />
            <span className="font-medium">Compare Models</span>
          </motion.button>
        )}

        <motion.button
          onClick={() => setIsPresetsOpen(true)}
          className={cn(
            "p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300",
            powerMode
              ? "bg-cyan-500 text-white hover:bg-cyan-600"
              : "bg-black text-white hover:bg-gray-800"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5" />
          <span className="font-medium">Browse Models</span>
        </motion.button>

        <motion.button
          onClick={() => setIsSearchOpen(true)}
          className={cn(
            "p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300",
            powerMode
              ? "bg-cyan-500 text-white hover:bg-cyan-600"
              : "bg-black text-white hover:bg-gray-800"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-5 h-5" />
          <span className="font-medium">Search Models</span>
        </motion.button>
      </div>

      {/* Model Presets Side Panel */}
      <AnimatePresence>
        {isPresetsOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className={cn(
              "fixed top-0 right-0 w-[600px] h-full z-50 overflow-y-auto",
              powerMode ? "bg-gray-900/95" : "bg-white",
              "backdrop-blur-md shadow-2xl"
            )}
          >
            <ModelPresets 
              onSelect={handleModelSelect} 
              powerMode={powerMode} 
              selectedModelId={null}
              onClose={() => setIsPresetsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Panel */}
      <ModelSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleModelSelect}
        powerMode={powerMode}
      />

      {/* Model Comparison Panel */}
      {isComparisonOpen && analysisResult && (
        <ModelComparison
          baseModel={analysisResult}
          onClose={() => setIsComparisonOpen(false)}
          onSelect={handleModelSelect}
          powerMode={powerMode}
        />
      )}

      {/* Performance Modal */}
      <PerformanceModal
        isOpen={isPerformanceOpen}
        onClose={() => setIsPerformanceOpen(false)}
        powerMode={powerMode}
        analysisResult={analysisResult}
      />
    </div>
  );
}