"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download, Check, Code, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelNode } from '@/lib/model/types';
import { CodeGenerator } from '@/lib/model/codeGenerator';

type CodeExportPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  powerMode: boolean;
  nodes: ModelNode[];
};

export function CodeExportPanel({
  isOpen,
  onClose,
  powerMode,
  nodes
}: CodeExportPanelProps) {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState('');
  
  const codeGenerator = new CodeGenerator();

  // Generate code when panel opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        const generatedCode = codeGenerator.generatePythonCode(nodes);
        setCode(generatedCode);
        setIsLoading(false);
      }, 1000);
    }
  }, [isOpen, nodes]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[800px] rounded-lg shadow-2xl z-50",
            powerMode ? "bg-gray-900 border border-cyan-500/30" : "bg-white border border-border"
          )}
        >
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className={cn(
                "w-5 h-5",
                powerMode && "text-cyan-400"
              )} />
              <h2 className={cn(
                "text-lg font-semibold",
                powerMode ? "text-white" : "text-foreground"
              )}>
                Export Model Code
              </h2>
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
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 flex flex-col items-center justify-center"
              >
                <Loader2 className={cn(
                  "w-8 h-8 animate-spin mb-4",
                  powerMode ? "text-cyan-400" : "text-black"
                )} />
                <p className={cn(
                  "text-sm font-medium",
                  powerMode ? "text-white" : "text-black"
                )}>
                  Generating Code...
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Code Editor */}
                <div className={cn(
                  "p-4 font-mono text-sm overflow-x-auto",
                  powerMode ? "bg-black/40" : "bg-gray-50"
                )}>
                  <pre className={cn(
                    "p-4 rounded-lg",
                    powerMode ? "bg-black/60 text-white" : "bg-white text-black border"
                  )}>
                    <code>{code}</code>
                  </pre>
                </div>

                {/* Actions */}
                <div className={cn(
                  "p-4 border-t flex items-center justify-end gap-2",
                  powerMode ? "border-white/10" : "border-border"
                )}>
                  <motion.button
                    onClick={handleCopyCode}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                      powerMode
                        ? "hover:bg-white/10 text-white"
                        : "hover:bg-gray-100 text-foreground"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy Code"}
                  </motion.button>
                  <motion.button
                    onClick={handleDownloadCode}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md",
                      powerMode
                        ? "bg-cyan-500 text-white hover:bg-cyan-600"
                        : "bg-black text-white hover:bg-gray-800"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Download Code
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}