"use client";

import { useState, useCallback } from 'react';
import { ModelAnalyzer } from '@/lib/model/analyzer';
import { AnalysisProgress, AnalysisResult } from '@/lib/model/types';

export function useModelAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<AnalysisProgress | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeModel = useCallback(async (modelId: string) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Debug to verify we're getting called with different modelIds
      console.log('Analyzing model:', modelId);
      
      const analyzer = new ModelAnalyzer();
      const analysisResult = await analyzer.analyzeModel(modelId, (progress) => {
        setProgress(progress);
      });
      
      // Debug the analysis result
      console.log('Analysis result:', analysisResult);
      
      // Add animation states
      const enhancedResult = {
        ...analysisResult,
        graph: {
          ...analysisResult.graph,
          nodes: analysisResult.graph.nodes.map(node => ({
            ...node,
            activationLevel: 0,
            inferenceState: 'idle'
          })),
          edges: analysisResult.graph.edges.map(edge => ({
            ...edge,
            dataFlow: 0
          }))
        }
      };
      
      setResult(enhancedResult);
      return enhancedResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze model';
      console.error('Analysis failed:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return {
    analyzeModel,
    isAnalyzing,
    progress,
    result,
    error
  };
}