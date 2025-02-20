"use client";

import { useState, useCallback } from 'react';
import { ModelComparison, ComparisonMode, AnalysisResult } from '@/lib/model/types';

export function useModelComparison() {
  const [comparison, setComparison] = useState<ModelComparison | null>(null);
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('side-by-side');

  const compareModels = useCallback((modelA: AnalysisResult, modelB: AnalysisResult) => {
    setComparison({
      modelA,
      modelB,
      mode: comparisonMode
    });
  }, [comparisonMode]);

  const toggleComparisonMode = useCallback(() => {
    setComparisonMode(prev => prev === 'side-by-side' ? 'overlay' : 'side-by-side');
    if (comparison) {
      setComparison(prev => prev ? {
        ...prev,
        mode: comparisonMode === 'side-by-side' ? 'overlay' : 'side-by-side'
      } : null);
    }
  }, [comparison, comparisonMode]);

  const clearComparison = useCallback(() => {
    setComparison(null);
  }, []);

  return {
    comparison,
    comparisonMode,
    compareModels,
    toggleComparisonMode,
    clearComparison
  };
}