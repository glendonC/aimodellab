"use client";

import { useState, useCallback } from 'react';
import * as Comlink from 'comlink';

type SharedMemoryWorker = {
  initializeSharedMemory: (size: number) => SharedArrayBuffer;
  processData: (startIndex: number, endIndex: number, operation: 'sum' | 'mean' | 'max') => Promise<number>;
  updateData: (startIndex: number, data: number[]) => void;
};

export function useSharedMemory() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [worker, setWorker] = useState<Comlink.Remote<SharedMemoryWorker> | null>(null);
  const [sharedBuffer, setSharedBuffer] = useState<SharedArrayBuffer | null>(null);

  const initialize = useCallback(async (size: number) => {
    try {
      // Create worker
      const newWorker = new Worker(new URL('../workers/shared-memory.worker.ts', import.meta.url));
      const workerApi = Comlink.wrap<SharedMemoryWorker>(newWorker);
      
      // Initialize shared memory
      const buffer = await workerApi.initializeSharedMemory(size);
      
      setWorker(workerApi);
      setSharedBuffer(buffer);
      setIsInitialized(true);
      
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize shared memory';
      setError(message);
      return false;
    }
  }, []);

  const processSharedData = useCallback(async (
    startIndex: number,
    endIndex: number,
    operation: 'sum' | 'mean' | 'max'
  ) => {
    if (!worker || !isInitialized) {
      throw new Error('Shared memory not initialized');
    }

    try {
      return await worker.processData(startIndex, endIndex, operation);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process data';
      setError(message);
      throw new Error(message);
    }
  }, [worker, isInitialized]);

  const updateSharedData = useCallback(async (startIndex: number, data: number[]) => {
    if (!worker || !isInitialized) {
      throw new Error('Shared memory not initialized');
    }

    try {
      await worker.updateData(startIndex, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update data';
      setError(message);
      throw new Error(message);
    }
  }, [worker, isInitialized]);

  const cleanup = useCallback(() => {
    if (worker) {
      worker[Comlink.releaseProxy]();
      setWorker(null);
      setSharedBuffer(null);
      setIsInitialized(false);
    }
  }, [worker]);

  return {
    initialize,
    processSharedData,
    updateSharedData,
    cleanup,
    isInitialized,
    sharedBuffer,
    error
  };
}