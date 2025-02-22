// constants.ts
export const MODEL_BENCHMARKS = {
  'resnet-50': {
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
      utilization: 35.0,
      tensorCoreUsage: "65.2%",
      memoryBandwidth: "0.9 TB/s",
      speedup: "5x"
    }
  },
  'stable-diffusion': {
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
      utilization: 35.0,
      tensorCoreUsage: "92.5%",
      memoryBandwidth: "1.8 TB/s",
      speedup: "5x"
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
      utilization: 35.0,
      tensorCoreUsage: "78.5%",
      memoryBandwidth: "1.2 TB/s",
      speedup: "5x"
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
      utilization: 35.0,
      tensorCoreUsage: "79.8%",
      memoryBandwidth: "1.1 TB/s",
      speedup: "4.52x"
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
      utilization: 35.0,
      tensorCoreUsage: "76.4%",
      memoryBandwidth: "1.0 TB/s",
      speedup: "3.63x"
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
      utilization: 35.0,
      tensorCoreUsage: "85.1%",
      memoryBandwidth: "1.4 TB/s",
      speedup: "1.76x"
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
      utilization: 35.0,
      tensorCoreUsage: "82.7%",
      memoryBandwidth: "1.3 TB/s",
      speedup: "2.56x"
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
      utilization: 35.0,
      tensorCoreUsage: "81.2%",
      memoryBandwidth: "1.2 TB/s",
      speedup: "3.13x"
    }
  }
};
