"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Code, Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentLibrary } from './ComponentLibrary';
import { LayerStack } from './LayerStack/index';
import { NvidiaInsightsPanel } from './NvidiaInsightsPanel';
import { CodeExportPanel } from './CodeExportPanel';
import { ModelNode } from '@/lib/model/types';
import { ModelSimulator, SimulationResult } from '@/lib/model/simulator';
import { ModelValidator, ValidationResult } from '@/lib/model/validator';
import { VisualizationOverlay } from '@/components/ModelVisualization/VisualizationOverlay';

type ModelBuilderProps = {
  powerMode: boolean;
};

export default function ModelBuilder({ powerMode }: ModelBuilderProps) {
  const [selectedNode, setSelectedNode] = useState<ModelNode | null>(null);
  const [nodes, setNodes] = useState<ModelNode[]>([]);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);
  const [currentModel, setCurrentModel] = useState<'resnet' | 'yolov8' | 'stable-diffusion' | 'llama2' | 'gpt2' | 'transformer'>('resnet');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const simulator = new ModelSimulator();
  const validator = new ModelValidator();

  useEffect(() => {
    const result = validator.validate(nodes);
    setValidationResult(result);
  }, [nodes]);

  const handleAddNode = (node: ModelNode) => {
    setNodes(prev => [...prev, node]);
  };

  const handleTemplateSelect = (templateNodes: ModelNode[]) => {
    setNodes(templateNodes);
    setSelectedNode(null);
  };

  const handleRunSimulation = async () => {
    const validation = validator.validate(nodes);
    if (!validation.isValid) {
      setValidationResult(validation);
      return;
    }

    setIsSimulating(true);
    try {
      const result = await simulator.runSimulation(nodes);
      setSimulationResults(result);
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className={cn(
      "h-[calc(100vh-20rem)] min-h-[600px] rounded-xl overflow-hidden",
      "grid grid-cols-[300px_1fr_300px] gap-4"
    )}>
      {/* Component Library */}
      <div className={cn(
        "rounded-lg h-full overflow-hidden",
        powerMode ? "bg-gray-900/60 border border-cyan-500/30" : "bg-white border border-border"
      )}>
        <ComponentLibrary 
          powerMode={powerMode}
          onAddNode={handleAddNode}
          onSelectTemplate={handleTemplateSelect}
        />
      </div>

      {/* Layer Stack */}
      <div className={cn(
        "rounded-lg relative",
        powerMode ? "bg-gray-900/60 border border-cyan-500/30" : "bg-white border border-border"
      )}>
        {/* Toolbar */}
        <div className={cn(
          "absolute top-4 left-4 right-4 flex items-center justify-end gap-2 z-10 rounded-lg px-4 py-2",
          powerMode ? "bg-black/40 border border-white/10" : "bg-gray-100"
        )}>
          <motion.button
            onClick={handleRunSimulation}
            disabled={isSimulating || (validationResult && !validationResult.isValid)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors",
              powerMode
                ? "bg-cyan-500 text-white hover:bg-cyan-600"
                : "bg-black text-white hover:bg-gray-800",
              (isSimulating || (validationResult && !validationResult.isValid)) && "opacity-50 cursor-not-allowed"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSimulating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run Simulation
          </motion.button>
          <motion.button
            onClick={() => setIsExportPanelOpen(true)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors",
              powerMode
                ? "hover:bg-white/10 text-white/70 hover:text-white"
                : "hover:bg-gray-200 text-gray-600 hover:text-black"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Code className="w-4 h-4" />
            Export Code
          </motion.button>
        </div>

        <LayerStack
          nodes={nodes}
          onNodesChange={setNodes}
          powerMode={powerMode}
          isSimulating={isSimulating}
          validationResult={validationResult}
        />

        {/* Validation Errors Panel */}
        <AnimatePresence>
          {validationResult && validationResult.errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={cn(
                "fixed top-1/2 -translate-y-1/2 right-8 w-80 rounded-lg shadow-xl z-50",
                powerMode ? "bg-gray-900/95 border border-red-500/30" : "bg-white/95 border border-red-200",
                "backdrop-blur-md"
              )}
            >
              <div className="p-4 border-b flex items-center gap-2">
                <AlertTriangle className={cn(
                  "w-5 h-5",
                  powerMode ? "text-red-400" : "text-red-500"
                )} />
                <h3 className={cn(
                  "font-semibold",
                  powerMode ? "text-white" : "text-red-900"
                )}>
                  Validation Issues
                </h3>
              </div>
              
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <ul className="space-y-3">
                  {validationResult.errors.map((error, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "p-3 rounded-lg",
                        powerMode 
                          ? "bg-red-500/10 border border-red-500/20" 
                          : "bg-red-50 border border-red-100"
                      )}
                    >
                      <p className={cn(
                        "text-sm",
                        powerMode ? "text-red-200" : "text-red-700"
                      )}>
                        {error.message}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Code Export Panel */}
        <CodeExportPanel
          isOpen={isExportPanelOpen}
          onClose={() => setIsExportPanelOpen(false)}
          powerMode={powerMode}
          nodes={nodes}
        />
      </div>

      {/* NVIDIA Insights Panel */}
      <div className={cn(
        "rounded-lg",
        powerMode ? "bg-gray-900/60 border border-cyan-500/30" : "bg-white border border-border"
      )}>
        <NvidiaInsightsPanel
          powerMode={powerMode}
          nodes={nodes}
          simulationResults={simulationResults}
          isSimulating={isSimulating}
        />
      </div>

      <VisualizationOverlay
        currentModel={currentModel}
        highlightedSection={selectedNode?.type || null}
        powerMode={powerMode}
      />
    </div>
  );
}