"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResizableBox } from "react-resizable";
import { X, Copy, Download, Check, Code, Loader2, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModelNode } from "@/lib/model/types";
import { CodeGenerator } from "@/lib/model/codeGenerator";
import { useCodeRefactor } from '@/hooks/useCodeRefactor';
import "react-resizable/css/styles.css";

type CodeExportPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  powerMode: boolean;
  nodes: ModelNode[];
};

export function CodeExportPanel({ isOpen, onClose, powerMode, nodes }: CodeExportPanelProps) {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState("");
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isRefactorOpen, setIsRefactorOpen] = useState(false);
  const [refactorPrompt, setRefactorPrompt] = useState("");
  const [isRefactoring, setIsRefactoring] = useState(false);
  const [refactorExplanation, setRefactorExplanation] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const codeGenerator = new CodeGenerator();
  const { refactorCode, isRefactoring: isRefactorProcessing, error: refactorError } = useCodeRefactor();

  // Generate code when panel opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setTimeout(() => {
        const generatedCode = codeGenerator.generatePythonCode(nodes);
        setCode(generatedCode);
        setIsLoading(false);
      }, 1000);
    }
  }, [isOpen, nodes]);

  // Handle Copy
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Handle Download
  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "model.py";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Refactor
  const handleRefactor = async () => {
    if (!refactorPrompt.trim()) return;
    
    try {
      setIsRefactoring(true);
      const result = await refactorCode(code, refactorPrompt);
      
      if (result.code) {
        setCode(result.code);
        setRefactorExplanation(result.explanation);
      }
    } catch (err) {
      console.error('Refactor failed:', err);
      // Show error in the UI
      setRefactorExplanation(
        refactorError || 'Failed to refactor code. Please try again.'
      );
    } finally {
      setIsRefactoring(false);
      setIsRefactorOpen(false);
      setRefactorPrompt("");
    }
  };

  // Drag Start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Drag Move
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging.current) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  // Drag End
  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            position: "fixed",
            left: position.x,
            top: position.y,
            zIndex: 50,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn(
            "rounded-lg shadow-2xl",
            powerMode ? "bg-gray-900 border border-cyan-500/30" : "bg-white border border-border"
          )}
        >
          {/* Draggable Header */}
          <div
            className="p-4 border-b flex items-center justify-between cursor-move"
            onMouseDown={handleMouseDown}
            style={{ touchAction: "none" }}
          >
            <div className="flex items-center gap-2">
              <Code className={cn("w-5 h-5", powerMode && "text-cyan-400")} />
              <h2 className={cn("text-lg font-semibold", powerMode ? "text-white" : "text-foreground")}>
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

          {/* Resizable Content */}
          <ResizableBox
            width={dimensions.width}
            height={dimensions.height}
            minConstraints={[600, 400]}
            maxConstraints={[1000, 700]}
            onResizeStop={(event, { size }) => setDimensions(size)}
          >
            {/* Content container */}
            <div className="flex flex-col h-full">
              {/* Code Display Section */}
              <div className="flex-1 p-4 overflow-auto">
                <pre
                  className={cn(
                    "w-full h-full p-4 rounded-lg",
                    powerMode ? "bg-black/90 text-white" : "bg-white text-black border"
                  )}
                  style={{ minHeight: "100%", maxHeight: "100%", overflow: "auto" }}
                >
                  <code>{code}</code>
                </pre>
              </div>

              {/* Footer (Buttons) */}
              <div 
                className={cn("p-4 border-t flex items-center justify-between gap-2", 
                  powerMode ? "border-white/10" : "border-border"
                )}
                style={{ minHeight: "60px" }}
              >
                {/* Refactor Section */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsRefactorOpen(!isRefactorOpen)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                      powerMode 
                        ? "bg-cyan-500 text-white hover:bg-cyan-600" 
                        : "bg-black text-white hover:bg-gray-800"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Refactor with AI
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      isRefactorOpen && "transform rotate-180"
                    )} />
                  </motion.button>

                  <AnimatePresence>
                    {isRefactorOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                          "absolute left-0 right-0 mt-2 p-3 rounded-lg shadow-lg",
                          powerMode ? "bg-gray-800 border border-cyan-500/30" : "bg-white border border-gray-200"
                        )}
                      >
                        <input
                          type="text"
                          value={refactorPrompt}
                          onChange={(e) => setRefactorPrompt(e.target.value)}
                          placeholder="e.g., Optimize for inference speed"
                          className={cn(
                            "w-full px-3 py-2 rounded-md mb-2",
                            powerMode 
                              ? "bg-gray-900 text-white border border-white/10" 
                              : "bg-gray-100 text-black border border-gray-200"
                          )}
                        />
                        <motion.button
                          onClick={handleRefactor}
                          disabled={isRefactoring}
                          className={cn(
                            "w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            powerMode 
                              ? "bg-cyan-500 text-white hover:bg-cyan-600" 
                              : "bg-black text-white hover:bg-gray-800",
                            isRefactoring && "opacity-50 cursor-not-allowed"
                          )}
                          whileHover={isRefactoring ? {} : { scale: 1.02 }}
                          whileTap={isRefactoring ? {} : { scale: 0.98 }}
                        >
                          {isRefactoring ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Refactoring...
                            </div>
                          ) : (
                            "Apply Refactor"
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleCopyCode}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                      powerMode ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-foreground"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Code"}
                  </motion.button>
                  <motion.button
                    onClick={handleDownloadCode}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md",
                      powerMode ? "bg-cyan-500 text-white hover:bg-cyan-600" : "bg-black text-white hover:bg-gray-800"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Download Code
                  </motion.button>
                </div>
              </div>

              {/* Refactor Explanation */}
              <AnimatePresence>
                {refactorExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={cn(
                      "p-4 border-t",
                      powerMode ? "border-white/10 bg-cyan-500/10" : "border-border bg-blue-50"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className={cn(
                        "w-5 h-5 mt-0.5",
                        powerMode ? "text-cyan-400" : "text-blue-500"
                      )} />
                      <div>
                        <h4 className={cn(
                          "font-medium mb-1",
                          powerMode ? "text-white" : "text-black"
                        )}>
                          AI Refactor Applied
                        </h4>
                        <p className={cn(
                          "text-sm",
                          powerMode ? "text-white/70" : "text-gray-600"
                        )}>
                          {refactorExplanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ResizableBox>
        </motion.div>
      )}
    </AnimatePresence>
  );
}