"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentLibrary } from './ComponentLibrary';
import { LayerStack } from './LayerStack/index';
import { NvidiaInsightsPanel } from './NvidiaInsightsPanel';
import { CodeExportPanel } from './CodeExportPanel';
import { ModelNode } from '@/lib/model/types';
import { ModelSimulator } from '@/lib/model/simulator';
import { SimulationResult } from '@/lib/model/types';

type ModelBuilderProps = {
  powerMode: boolean;
};

export default function ModelBuilder({ powerMode }: ModelBuilderProps) {
  const [selectedNode, setSelectedNode] = useState<ModelNode | null>(null);
  const [nodes, setNodes] = useState<ModelNode[]>([]);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);
  const simulator = new ModelSimulator();

  const handleAddNode = (node: ModelNode) => {
    setNodes(prev => [...prev, node]);
  };

  const handleTemplateSelect = (templateNodes: ModelNode[]) => {
    setNodes(templateNodes);
    setSelectedNode(null);
  };

  const handleRunSimulation = async () => {
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
            disabled={isSimulating}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors",
              powerMode
                ? "bg-cyan-500 text-white hover:bg-cyan-600"
                : "bg-black text-white hover:bg-gray-800",
              isSimulating && "opacity-50 cursor-not-allowed"
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
        />

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
    </div>
  );
}