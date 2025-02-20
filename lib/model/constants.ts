export const NVIDIA_BENCHMARKS = {
  resnet50: {
    a100: {
      batchSize1: {
        fps: 615,
        latency: 1.6,    // ms
        memory: 98,      // MB
        powerDraw: 250   // Watts
      },
      batchSize32: {
        fps: 2480,
        latency: 12.9,
        memory: 1205,
        powerDraw: 315
      }
    }
  },
  // ... rest of the benchmarks
} as const;

export const CPU_BENCHMARKS = {
  'xeon-8380': {
    resnet50: {
      batchSize1: {
        fps: 52,
        latency: 19.2,
        memory: 147
      }
    },
    // ... rest of the benchmarks
  }
} as const; 