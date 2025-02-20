"use client";

import * as tf from '@tensorflow/tfjs';

export class WebGLAccelerator {
  private isEnabled: boolean = false;
  private device: tf.webgl.WebGLDevice | null = null;

  async initialize() {
    try {
      // Check WebGL support
      if (!tf.env().getBool('WEBGL_VERSION')) {
        throw new Error('WebGL not supported');
      }

      // Configure WebGL backend
      await tf.setBackend('webgl');
      
      // Enable float textures
      tf.env().set('WEBGL_FORCE_F16_TEXTURES', false);
      tf.env().set('WEBGL_VERSION', 2);
      tf.env().set('WEBGL_PACK', true);
      
      // Initialize device
      this.device = await this.setupWebGLDevice();
      this.isEnabled = true;
      
      return true;
    } catch (error) {
      console.error('Failed to initialize WebGL acceleration:', error);
      this.isEnabled = false;
      return false;
    }
  }

  async optimizeModel(model: tf.LayersModel): Promise<tf.LayersModel> {
    if (!this.isEnabled) {
      return model;
    }

    try {
      // Apply WebGL optimizations
      const optimizedModel = await this.applyOptimizations(model);
      
      // Warm up the model
      await this.warmupModel(optimizedModel);
      
      return optimizedModel;
    } catch (error) {
      console.error('Failed to optimize model:', error);
      return model;
    }
  }

  getAccelerationInfo() {
    if (!this.isEnabled || !this.device) {
      return null;
    }

    return {
      isEnabled: this.isEnabled,
      backend: tf.getBackend(),
      device: {
        vendor: this.device.gl.getParameter(this.device.gl.VENDOR),
        renderer: this.device.gl.getParameter(this.device.gl.RENDERER),
        version: this.device.gl.getParameter(this.device.gl.VERSION)
      },
      capabilities: {
        maxTextureSize: this.device.gl.getParameter(this.device.gl.MAX_TEXTURE_SIZE),
        maxRenderBufferSize: this.device.gl.getParameter(this.device.gl.MAX_RENDERBUFFER_SIZE),
        floatTextureSupport: this.checkFloatTextureSupport()
      }
    };
  }

  private async setupWebGLDevice(): Promise<tf.webgl.WebGLDevice> {
    // Get WebGL context
    const gl = await tf.backend().getGPGPUContext().gl;
    
    // Create WebGL device
    return new tf.webgl.WebGLDevice(gl);
  }

  private async applyOptimizations(model: tf.LayersModel): Promise<tf.LayersModel> {
    // Clone model for optimization
    const optimizedModel = await tf.models.cloneModel(model);
    
    // Apply WebGL-specific optimizations
    await tf.tidy(() => {
      // Fuse operations where possible
      this.fuseOperations(optimizedModel);
      
      // Optimize memory layout
      this.optimizeMemoryLayout(optimizedModel);
      
      // Enable WebGL packing
      this.enablePacking(optimizedModel);
    });
    
    return optimizedModel;
  }

  private async warmupModel(model: tf.LayersModel) {
    // Create dummy input matching model's input shape
    const inputShape = model.inputs[0].shape;
    const dummyInput = tf.zeros([1, ...inputShape.slice(1)]);
    
    // Warm up with multiple runs
    for (let i = 0; i < 3; i++) {
      await model.predict(dummyInput);
    }
    
    // Clean up
    dummyInput.dispose();
  }

  private fuseOperations(model: tf.LayersModel) {
    // Fuse consecutive operations that can be combined
    // This is a placeholder - actual implementation would be more complex
    return model;
  }

  private optimizeMemoryLayout(model: tf.LayersModel) {
    // Optimize tensor memory layout for WebGL
    // This is a placeholder - actual implementation would be more complex
    return model;
  }

  private enablePacking(model: tf.LayersModel) {
    // Enable tensor packing for WebGL
    // This is a placeholder - actual implementation would be more complex
    return model;
  }

  private checkFloatTextureSupport(): boolean {
    if (!this.device) return false;
    
    const gl = this.device.gl;
    const ext = gl.getExtension('OES_texture_float');
    return !!ext;
  }
}