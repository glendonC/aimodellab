"use client";

import * as Comlink from 'comlink';

class SharedMemoryWorker {
  private sharedBuffer: SharedArrayBuffer | null = null;
  private float32Array: Float32Array | null = null;

  initializeSharedMemory(size: number) {
    // Create shared buffer
    this.sharedBuffer = new SharedArrayBuffer(size * Float32Array.BYTES_PER_ELEMENT);
    this.float32Array = new Float32Array(this.sharedBuffer);
    return this.sharedBuffer;
  }

  async processData(startIndex: number, endIndex: number, operation: 'sum' | 'mean' | 'max') {
    if (!this.float32Array) {
      throw new Error('Shared memory not initialized');
    }

    // Process data in shared memory
    const slice = this.float32Array.subarray(startIndex, endIndex);
    
    switch (operation) {
      case 'sum':
        return slice.reduce((a, b) => a + b, 0);
      case 'mean':
        return slice.reduce((a, b) => a + b, 0) / slice.length;
      case 'max':
        return Math.max(...slice);
      default:
        throw new Error('Unknown operation');
    }
  }

  updateData(startIndex: number, data: number[]) {
    if (!this.float32Array) {
      throw new Error('Shared memory not initialized');
    }

    // Update data in shared memory
    this.float32Array.set(data, startIndex);
  }
}

Comlink.expose(new SharedMemoryWorker());