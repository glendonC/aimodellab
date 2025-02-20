"use client";

import * as ort from 'onnxruntime-web';

export class ONNXInference {
  private session: ort.InferenceSession | null = null;

  async loadModel(modelUrl: string) {
    try {
      this.session = await ort.InferenceSession.create(modelUrl, {
        executionProviders: ['webgl'],
        graphOptimizationLevel: 'all',
        enableCpuMemArena: true,
        enableMemPattern: true,
        executionMode: 'parallel'
      });
      return true;
    } catch (error) {
      console.error('Failed to load ONNX model:', error);
      return false;
    }
  }

  async runInference(input: number[]) {
    if (!this.session) {
      throw new Error('Model not loaded');
    }

    try {
      const tensor = new ort.Tensor('float32', input, [1, input.length]);
      const results = await this.session.run({ input: tensor });
      return results.output.data;
    } catch (error) {
      console.error('Inference failed:', error);
      throw error;
    }
  }

  dispose() {
    if (this.session) {
      this.session.dispose();
      this.session = null;
    }
  }
}