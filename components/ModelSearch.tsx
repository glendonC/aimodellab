"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HFModel, searchModels } from '@/lib/huggingface';
import { useDebounce } from '@/hooks/useDebounce';

type ModelSearchProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (modelId: string) => void;
  powerMode: boolean;
};

export default function ModelSearch({ 
  isOpen, 
  onClose, 
  onSelect,
  powerMode 
}: ModelSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<HFModel[]>([]);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const searchHuggingFaceModels = useCallback(async (query: string) => {
    if (!query) {
      setModels([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const results = await searchModels(query);
      setModels(results);
    } catch (error) {
      console.error('Failed to search models:', error);
      setError(error instanceof Error ? error.message : 'Failed to search models');
      setModels([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    searchHuggingFaceModels(debouncedQuery);
  }, [debouncedQuery, searchHuggingFaceModels]);

  const handleModelSelect = async (modelId: string) => {
    setIsLoading(true);
    try {
      await onSelect(modelId);
      onClose();
    } catch (error) {
      console.error('Failed to load model:', error);
      setError(error instanceof Error ? error.message : 'Failed to load model');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn(
            "fixed bottom-24 right-8 w-96 rounded-lg shadow-xl z-50",
            powerMode ? "bg-gray-900/95" : "bg-background/95",
            "backdrop-blur-md"
          )}
        >
          {/* Header */}
          <div className={cn(
            "p-4 border-b flex items-center gap-3",
            powerMode ? "border-white/20" : "border-border"
          )}>
            <Search className={cn(
              "w-5 h-5",
              powerMode && "text-cyan-400"
            )} />
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground",
                powerMode && "text-white placeholder:text-white/50"
              )}
              autoFocus
            />
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "p-1 rounded-full hover:bg-gray-100/10",
                powerMode && "text-white/80 hover:text-white"
              )}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {models.map((model) => (
              <motion.div
                key={model.id}
                className={cn(
                  "p-4 border-b cursor-pointer transition-colors",
                  powerMode 
                    ? "border-white/10 hover:bg-white/5" 
                    : "border-border hover:bg-muted"
                )}
                onClick={() => handleModelSelect(model.id)}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={cn(
                      "font-medium mb-1",
                      powerMode ? "text-white" : "text-foreground"
                    )}>
                      {model.name}
                    </h3>
                    <p className={cn(
                      "text-sm mb-2",
                      powerMode ? "text-white/70" : "text-muted-foreground"
                    )}>
                      {model.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {model.tags.map(tag => (
                        <span
                          key={tag}
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            powerMode
                              ? "bg-white/10 text-white/70"
                              : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`https://huggingface.co/${model.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "p-1 rounded-full hover:bg-gray-100/10",
                      powerMode ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Error State */}
            {error && (
              <div className="p-4 text-center">
                <p className={cn(
                  "text-sm text-red-500",
                  powerMode && "text-red-400"
                )}>
                  {error}
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && searchQuery && models.length === 0 && (
              <div className="p-4 text-center">
                <p className={cn(
                  "text-sm",
                  powerMode ? "text-white/50" : "text-muted-foreground"
                )}>
                  No models found matching your search
                </p>
              </div>
            )}
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center backdrop-blur-sm",
              powerMode ? "bg-black/50" : "bg-white/50"
            )}>
              <Loader2 className={cn(
                "w-8 h-8 animate-spin",
                powerMode ? "text-cyan-400" : "text-primary"
              )} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}