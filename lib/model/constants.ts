// constants.ts
export const MODEL_BENCHMARKS = {
  'resnet-50': {
    cpu: {
      inferenceSpeed: 30.0,  // FPS
      latency: 1.0,         // ms
      memoryUsage: 535.0,   // GB
      utilization: 45.0,    // %
    },
    gpu: {
      inferenceSpeed: 120.0, // 4x faster
      latency: 0.2,         // 5x lower
      memoryUsage: 535.0,   // Same memory
      utilization: 13.5,    // Better efficiency
      tensorCoreUsage: "65.2%",
      memoryBandwidth: "0.9 TB/s",
      speedup: "6.2x"
    }
  },
  'yolov8': {
    cpu: {
      inferenceSpeed: 12.0,
      latency: 2.8,
      memoryUsage: 642.0,
      utilization: 62.0,
    },
    gpu: {
      inferenceSpeed: 85.0,
      latency: 0.4,
      memoryUsage: 642.0,
      utilization: 18.5,
      tensorCoreUsage: "78.5%",
      memoryBandwidth: "1.2 TB/s",
      speedup: "7.5x"
    }
  },
  'stable-diffusion': {
    cpu: {
      inferenceSpeed: 0.2,
      latency: 15.0,
      memoryUsage: 785.0,
      utilization: 95.0,
    },
    gpu: {
      inferenceSpeed: 2.5,
      latency: 1.2,
      memoryUsage: 785.0,
      utilization: 35.0,
      tensorCoreUsage: "92.5%",
      memoryBandwidth: "1.8 TB/s", 
      speedup: "12.5x"
    }
  },
  'llama2': {
    cpu: {
      inferenceSpeed: 0.5,
      latency: 8.0,
      memoryUsage: 892.0,
      utilization: 88.0,
    },
    gpu: {
      inferenceSpeed: 4.9,
      latency: 0.82,
      memoryUsage: 892.0,
      utilization: 28.0,
      tensorCoreUsage: "88.3%",
      memoryBandwidth: "1.6 TB/s",
      speedup: "9.8x"
    }
  },
  'gpt2': {
    cpu: {
      inferenceSpeed: 1.2,
      latency: 6.5,
      memoryUsage: 512.0,
      utilization: 82.0,
    },
    gpu: {
      inferenceSpeed: 8.4,
      latency: 0.95,
      memoryUsage: 512.0,
      utilization: 22.0,
      tensorCoreUsage: "85.1%",
      memoryBandwidth: "1.4 TB/s",
      speedup: "8.9x"
    }
  },
  'bart': {
    cpu: {
      inferenceSpeed: 2.8,
      latency: 4.2,
      memoryUsage: 435.0,
      utilization: 72.0,
    },
    gpu: {
      inferenceSpeed: 15.4,
      latency: 0.75,
      memoryUsage: 435.0,
      utilization: 19.5,
      tensorCoreUsage: "82.7%",
      memoryBandwidth: "1.3 TB/s",
      speedup: "7.8x"
    }
  },
  'whisper': {
    cpu: {
      inferenceSpeed: 0.8,
      latency: 7.5,
      memoryUsage: 389.0,
      utilization: 78.0,
    },
    gpu: {
      inferenceSpeed: 5.6,
      latency: 1.1,
      memoryUsage: 389.0,
      utilization: 24.0,
      tensorCoreUsage: "79.8%",
      memoryBandwidth: "1.1 TB/s",
      speedup: "8.2x"
    }
  },
  'vit': {
    cpu: {
      inferenceSpeed: 18.0,
      latency: 2.1,
      memoryUsage: 346.0,
      utilization: 55.0,
    },
    gpu: {
      inferenceSpeed: 98.0,
      latency: 0.35,
      memoryUsage: 346.0,
      utilization: 16.0,
      tensorCoreUsage: "76.4%",
      memoryBandwidth: "1.0 TB/s",
      speedup: "7.1x"
    }
  },
  'biobert': {
    cpu: {
      inferenceSpeed: 3.5,
      latency: 3.8,
      memoryUsage: 412.0,
      utilization: 68.0,
    },
    gpu: {
      inferenceSpeed: 22.8,
      latency: 0.65,
      memoryUsage: 412.0,
      utilization: 20.5,
      tensorCoreUsage: "81.2%",
      memoryBandwidth: "1.2 TB/s",
      speedup: "7.6x"
    }
  },
  'dinov2': {
    cpu: {
      inferenceSpeed: 15.0,
      latency: 2.4,
      memoryUsage: 384.0,
      utilization: 58.0,
    },
    gpu: {
      inferenceSpeed: 89.0,
      latency: 0.38,
      memoryUsage: 384.0,
      utilization: 17.0,
      tensorCoreUsage: "77.5%",
      memoryBandwidth: "1.1 TB/s",
      speedup: "7.3x"
    }
  }
};

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