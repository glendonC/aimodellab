"use client";

import { useState, useCallback } from 'react';
import { ModelConverter } from '@/lib/inference/model-converter';
import { WebGLAccelerator } from '@/lib/inference/webgl-accelerator';
import * as tf from '@tensorflow/tfjs';

export function useModelOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const converter = new ModelConverter();
  const accelerator = new WebGLAccelerator();

  const optimizeModel = useCallback(async (model: tf.LayersModel) => {
    setIsOptimizing(true);
    setError(null);

    try {
      // Initialize WebGL acceleration
      const accelerationEnabled = await accelerator.initialize();
      
      if (!accelerationEnabled) {
        console.warn('WebGL acceleration not available, falling back to CPU');
      }

      // Optimize model
      const optimizedModel = await accelerator.optimizeModel(model);

      // Get acceleration info
      const accelerationInfo = accelerator.getAccelerationInfo();

      return {
        model: optimizedModel,
        accelerationInfo
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Optimization failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsOptimizing(false);
    }
  }, [accelerator]);

  const convertModel = useCallback(async (
    model: tf.LayersModel | ArrayBuffer,
    targetFormat: 'onnx' | 'tensorflow'
  ) => {
    setIsOptimizing(true);
    setError(null);

    try {
      if (targetFormat === 'onnx') {
        if (!(model instanceof tf.LayersModel)) {
          throw new Error('Input must be a TensorFlow.js model');
        }
        return await converter.convertToONNX(model);
      } else {
        if (model instanceof tf.LayersModel) {
          throw new Error('Input must be an ONNX model buffer');
        }
        return await converter.convertToTensorFlow(model);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsOptimizing(false);
    }
  }, [converter]);

  return {
    optimizeModel,
    convertModel,
    isOptimizing,
    error
  };
}