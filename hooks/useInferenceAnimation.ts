"use client";

import { useState, useEffect, useCallback } from 'react';
import { ModelGraph } from '@/lib/model/types';

export function useInferenceAnimation(graph: ModelGraph | null, powerMode: boolean) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLayerIndex, setCurrentLayerIndex] = useState(-1);
  const [animatedGraph, setAnimatedGraph] = useState<ModelGraph | null>(null);

  const startAnimation = useCallback(() => {
    if (!graph) return;
    
    setIsAnimating(true);
    setCurrentLayerIndex(0);
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
  }, [graph]);

  useEffect(() => {
    if (!isAnimating || !animatedGraph || currentLayerIndex === -1) return;

    // Faster animation in power mode
    const baseDelay = powerMode ? 400 : 800;
    const edgeDelay = powerMode ? 200 : 400;
    
    // First, animate the current node activation
    const nodeTimer = setTimeout(() => {
      setAnimatedGraph(prev => {
        if (!prev) return null;

        return {
          ...prev,
          nodes: prev.nodes.map((node, idx) => ({
            ...node,
            // Smooth activation level transition
            activationLevel: idx === currentLayerIndex ? 1 
              : idx < currentLayerIndex ? 0.8 
              : 0,
            inferenceState: idx === currentLayerIndex ? 'processing' 
              : idx < currentLayerIndex ? 'complete' 
              : 'idle',
            // Add GPU acceleration flag if in power mode
            isGpuAccelerated: powerMode && Math.random() > 0.5
          }))
        };
      });

      // Then, animate the edges after a short delay
      const edgeTimer = setTimeout(() => {
        setAnimatedGraph(prev => {
          if (!prev) return null;

          return {
            ...prev,
            edges: prev.edges.map(edge => {
              const fromIndex = prev.nodes.findIndex(n => n.id === edge.from);
              const toIndex = prev.nodes.findIndex(n => n.id === edge.to);
              
              // Animate data flow along edges
              const isActive = fromIndex === currentLayerIndex && toIndex === currentLayerIndex + 1;
              return {
                ...edge,
                dataFlow: isActive ? 1 : 0,
                isGpuAccelerated: powerMode && Math.random() > 0.5
              };
            })
          };
        });

        // Move to next layer
        setCurrentLayerIndex(i => {
          if (i >= (animatedGraph.nodes.length - 1)) {
            setIsAnimating(false);
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
            // Add pulsing effect to active nodes
            activationLevel: idx === currentLayerIndex 
              ? 0.8 + Math.sin(Date.now() / 200) * 0.2 
              : node.activationLevel,
            // Add particle effects in power mode
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
    currentLayerIndex
  };
}