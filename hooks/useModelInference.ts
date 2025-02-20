"use client";

import { useState, useCallback } from 'react';
import { ONNXInference } from '@/lib/inference/onnx';
import { TensorFlowInference } from '@/lib/inference/tensorflow';
import { ModelNode } from '@/lib/model/types';

type InferenceEngine = 'onnx' | 'tensorflow';

export function useModelInference() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [engine, setEngine] = useState<ONNXInference | TensorFlowInference | null>(null);

  const loadModel = useCallback(async (modelUrl: string, engineType: InferenceEngine = 'onnx') => {
    setIsLoading(true);
    setError(null);

    try {
      const inferenceEngine = engineType === 'onnx' 
        ? new ONNXInference()
        : new TensorFlowInference();

      const success = await inferenceEngine.loadModel(modelUrl);
      if (!success) {
        throw new Error('Failed to load model');
      }

      setEngine(inferenceEngine);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load model';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runInference = useCallback(async (input: number[]) => {
    if (!engine) {
      throw new Error('Model not loaded');
    }

    try {
      return await engine.runInference(input);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Inference failed';
      setError(message);
      throw new Error(message);
    }
  }, [engine]);

  const dispose = useCallback(() => {
    if (engine) {
      engine.dispose();
      setEngine(null);
    }
  }, [engine]);

  return {
    loadModel,
    runInference,
    dispose,
    isLoading,
    error
  };
}