export interface ModelMetrics {
  cpu: {
    inferenceSpeed: number;  // FPS
    latency: number;        // ms
    memoryUsage: number;    // GB
    utilization: number;    // %
  };
  gpu: {
    inferenceSpeed: number;
    latency: number;
    memoryUsage: number;
    utilization: number;
  };
}

export const MODEL_METRICS: Record<string, ModelMetrics> = {
  'resnet50': {
    cpu: {
      inferenceSpeed: 29.07,
      latency: 34.39,
      memoryUsage: 0.207,
      utilization: 95.0
    },
    gpu: {
      inferenceSpeed: 115.46,
      latency: 8.66,
      memoryUsage: 0.207,
      utilization: 35.0
    }
  },
  'stable_diffusion': {
    cpu: {
      inferenceSpeed: 0.012,
      latency: 81975.65,
      memoryUsage: 6.52,
      utilization: 95.0
    },
    gpu: {
      inferenceSpeed: 0.246,
      latency: 4055.52,
      memoryUsage: 6.52,
      utilization: 35.0
    }
  },
  'yolov8': {
    cpu: {
      inferenceSpeed: 30.58,
      latency: 32.69,
      memoryUsage: 5.51,
      utilization: 95.0
    },
    gpu: {
      inferenceSpeed: 111.17,
      latency: 8.99,
      memoryUsage: 5.51,
      utilization: 35.0
    }
  },
  'whisper': {
    cpu: {
      inferenceSpeed: 10.18,
      latency: 98.16,
      memoryUsage: 0.67,
      utilization: 95.0
    },
    gpu: {
      inferenceSpeed: 46.06,
      latency: 21.70,
      memoryUsage: 0.67,
      utilization: 35.0
    }
  },
  'vit': {
    cpu: {
      inferenceSpeed: 18.27,
      latency: 54.72,
      memoryUsage: 0.67,
      utilization: 95.0
    },
    gpu: {
      inferenceSpeed: 66.30,
      latency: 15.08,
      memoryUsage: 0.67,
      utilization: 35.0
    }
  },
  'gpt2': {
    cpu: {
      inferenceSpeed: 39.11,
      latency: 25.56,
      memoryUsage: 0.54,
      utilization: 95.0
    },
    gpu: {
      inferenceSpeed: 68.82,
      latency: 14.52,
      memoryUsage: 0.54,
      utilization: 35.0
    }
  },
  'bart': {
    cpu: {
      inferenceSpeed: 8.84,
      latency: 113.03,
      memoryUsage: 1.67,
      utilization: 95.0
    },
    gpu: {
      inferenceSpeed: 22.63,
      latency: 44.17,
      memoryUsage: 1.67,
      utilization: 35.0
    }
  },
  'biobert': {
    cpu: {
      inferenceSpeed: 18.57,
      latency: 53.83,
      memoryUsage: 1.67,
      utilization: 95.0
    },
    gpu: {
      inferenceSpeed: 58.17,
      latency: 17.18,
      memoryUsage: 1.67,
      utilization: 35.0
    }
  }
}; 