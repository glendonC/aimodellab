"use client";

import { useState, useEffect, useCallback } from 'react';
import { ModelGraph } from '@/lib/model/types';

export function useModelAnimation(graph: ModelGraph | null, powerMode: boolean) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLayerIndex, setCurrentLayerIndex] = useState(-1);
  const [animatedGraph, setAnimatedGraph] = useState<ModelGraph | null>(null);
  const [progress, setProgress] = useState(0);

  // Reset animation state when graph changes
  useEffect(() => {
    setIsAnimating(false);
    setCurrentLayerIndex(-1);
    setAnimatedGraph(null);
    setProgress(0);
  }, [graph]);

  const startAnimation = useCallback(() => {
    if (!graph || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentLayerIndex(0);
    setProgress(0);
    
    // Initialize animation state
    setAnimatedGraph({
      ...graph,
      nodes: graph.nodes.map(node => ({
        ...node,
        activationLevel: 0,
        inferenceState: 'idle'
      })),
      edges: graph.edges.map(edge => ({
        ...edge,
        dataFlow: 0
      }))
    });
  }, [graph, isAnimating]);

  useEffect(() => {
    if (!isAnimating || !animatedGraph || currentLayerIndex === -1) return;

    const baseDelay = powerMode ? 400 : 800;
    const edgeDelay = powerMode ? 200 : 400;
    
    const nodeTimer = setTimeout(() => {
      setAnimatedGraph(prev => {
        if (!prev) return null;

        // Calculate overall progress
        const totalNodes = prev.nodes.length;
        setProgress((currentLayerIndex / totalNodes) * 100);

        return {
          ...prev,
          nodes: prev.nodes.map((node, idx) => ({
            ...node,
            activationLevel: idx === currentLayerIndex ? 1 
              : idx < currentLayerIndex ? 0.8 
              : 0,
            inferenceState: idx === currentLayerIndex ? 'processing' 
              : idx < currentLayerIndex ? 'complete' 
              : 'idle',
            isGpuAccelerated: powerMode && Math.random() > 0.5
          }))
        };
      });

      const edgeTimer = setTimeout(() => {
        setAnimatedGraph(prev => {
          if (!prev) return null;

          return {
            ...prev,
            edges: prev.edges.map(edge => {
              const fromIndex = prev.nodes.findIndex(n => n.id === edge.from);
              const toIndex = prev.nodes.findIndex(n => n.id === edge.to);
              
              const isActive = fromIndex === currentLayerIndex && toIndex === currentLayerIndex + 1;
              return {
                ...edge,
                dataFlow: isActive ? 1 : 0,
                isGpuAccelerated: powerMode && Math.random() > 0.5
              };
            })
          };
        });

        setCurrentLayerIndex(i => {
          if (i >= (animatedGraph.nodes.length - 1)) {
            // Final animation state
            setProgress(100);
            setTimeout(() => {
              setIsAnimating(false);
              setCurrentLayerIndex(-1);
              setProgress(0);
            }, 500);
            return -1;
          }
          return i + 1;
        });
      }, edgeDelay);

      return () => clearTimeout(edgeTimer);
    }, baseDelay);

    return () => clearTimeout(nodeTimer);
  }, [isAnimating, currentLayerIndex, animatedGraph, powerMode]);

  // Add visual effects for active nodes
  useEffect(() => {
    if (!animatedGraph || !isAnimating) return;

    const interval = setInterval(() => {
      setAnimatedGraph(prev => {
        if (!prev) return null;

        return {
          ...prev,
          nodes: prev.nodes.map((node, idx) => ({
            ...node,
            activationLevel: idx === currentLayerIndex 
              ? 0.8 + Math.sin(Date.now() / 200) * 0.2 
              : node.activationLevel,
            emitParticles: powerMode && idx === currentLayerIndex
          }))
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating, currentLayerIndex, animatedGraph, powerMode]);

  return {
    isAnimating,
    animatedGraph,
    startAnimation,
    currentLayerIndex,
    progress
  };
}