"use client";

import * as tf from '@tensorflow/tfjs';

export class TensorFlowInference {
  private model: tf.LayersModel | null = null;

  async loadModel(modelUrl: string) {
    try {
      this.model = await tf.loadLayersModel(modelUrl);
      return true;
    } catch (error) {
      console.error('Failed to load TensorFlow.js model:', error);
      return false;
    }
  }

  async runInference(input: number[]) {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    try {
      const tensor = tf.tensor2d([input], [1, input.length]);
      const prediction = await this.model.predict(tensor);
      
      if (Array.isArray(prediction)) {
        return await prediction[0].data();
      }
      return await prediction.data();
    } catch (error) {
      console.error('Inference failed:', error);
      throw error;
    }
  }

  dispose() {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
  }
}