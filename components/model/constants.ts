export const LAYER_COLORS = {
  input: '#60a5fa',
  cnn: '#3b82f6',
  transformer: '#9333ea',
  rnn: '#22c55e',
  output: '#f43f5e',
  mlp: '#8b5cf6',
  graph: '#06b6d4',
  residual: '#f59e0b',
  normalization: '#10b981',
  attention: '#ec4899',
  pooling: '#0ea5e9',
  dropout: '#6366f1',
  embedding: '#d946ef',
  flatten: '#14b8a6'
};

export const LAYER_STATS = {
  // Model-specific stats
  resnet: {
    residual: {
      neurons: 16384,
      inferenceTime: 0.8,
      memoryUsage: 3.0,
      type: 'ResBlock',
      activations: 'ReLU',
      connections: 'Skip Connection'
    },
    cnn: {
      neurons: 9408,
      inferenceTime: 1.2,
      memoryUsage: 2.0,
      filters: '64→128→256',
      activations: 'ReLU'
    }
  },

  yolov8: {
    residual: {
      neurons: 32768,
      inferenceTime: 1.2,
      memoryUsage: 3.6,
      type: 'CSPBlock',
      activations: 'SiLU',
      connections: 'Cross-Stage Connection'
    },
    cnn: {
      neurons: 32768,
      inferenceTime: 1.8,
      memoryUsage: 2.0,
      filters: '128→256→512',
      activations: 'SiLU'
    }
  },

  'stable-diffusion': {
    residual: {
      neurons: 24576,
      inferenceTime: 1.5,
      memoryUsage: 4.0,
      type: 'UNet Block',
      activations: 'SiLU',
      connections: 'Time Embedding'
    }
  },

  llama2: {
    attention: {
      neurons: 49152,
      inferenceTime: 2.0,
      memoryUsage: 6.0,
      heads: 32,
      activations: 'RoPE'
    }
  },

  // Generic layer stats (fallback)
  input: {
    neurons: 150528,
    inferenceTime: 0.1,
    memoryUsage: 0.6,
    activations: 'None'
  },
  output: {
    neurons: 1000,
    inferenceTime: 0.2,
    memoryUsage: 0.4,
    activations: 'Softmax'
  },
  rnn: {
    neurons: 8192,
    inferenceTime: 2.0,
    memoryUsage: 3.2,
    hiddenUnits: 512,
    activations: 'Tanh'
  },
  residual: {
    neurons: 16384,
    inferenceTime: 0.8,
    memoryUsage: 3.0,
    type: 'ResBlock',
    activations: 'ReLU',
    connections: 'Skip Connection'
  }
};

export const LAYER_EXPLANATIONS = {
  input: {
    title: "Input Layer",
    description: "This layer processes raw input data (224×224 RGB images) and prepares it for the neural network. It applies normalization to scale pixel values between -1 and 1, making the data more suitable for deep learning.",
    technical: [
      "Input Shape: 224×224×3",
      "Normalization: [-1, 1]",
      "Data Augmentation: Random crop, flip, rotation"
    ]
  },
  cnn: {
    title: "Convolutional Neural Network",
    description: "The CNN block consists of 3 convolutional layers that progressively extract visual features. Each layer increases the number of filters while reducing spatial dimensions, allowing the network to learn hierarchical representations.",
    technical: [
      "3 Conv Layers: 64→128→256 filters",
      "Kernel Size: 3×3, Stride: 2",
      "BatchNorm + ReLU activation"
    ]
  },
  transformer: {
    title: "Transformer Block",
    description: "This block uses self-attention mechanisms to capture global relationships in the feature space. The multi-head attention allows the model to focus on different aspects of the input simultaneously.",
    technical: [
      "6 Attention Heads",
      "Hidden Dim: 512",
      "MLP Ratio: 4",
      "LayerNorm + GELU"
    ]
  },
  rnn: {
    title: "Recurrent Neural Network",
    description: "The RNN block processes sequential features using bidirectional LSTM cells. This allows the model to capture temporal dependencies in both forward and backward directions.",
    technical: [
      "Bidirectional LSTM",
      "256 Hidden Units",
      "Dropout: 0.2",
      "Skip Connections"
    ]
  },
  output: {
    title: "Output Layer",
    description: "The final layer produces class probabilities for 1000 different categories. It uses softmax activation to ensure all probabilities sum to 1, with temperature scaling for better calibration.",
    technical: [
      "1000 Output Classes",
      "Softmax Activation",
      "Temperature: 0.7",
      "Cross-Entropy Loss"
    ]
  },
  mlp: {
    title: "Multi-Layer Perceptron",
    description: "A fully connected neural network that transforms features through multiple dense layers. Each layer applies a linear transformation followed by non-linear activation.",
    technical: [
      "3 Dense Layers: 4096→2048→1024",
      "ReLU Activation",
      "Dropout: 0.5",
      "Xavier Initialization"
    ]
  },
  graph: {
    title: "Graph Neural Network",
    description: "Processes data structured as graphs, where each node aggregates information from its neighbors. Useful for molecular structures, social networks, and other graph-based data.",
    technical: [
      "Mean Aggregation",
      "Edge Features",
      "2-hop Neighborhood",
      "Graph Attention"
    ]
  },
  residual: {
    title: "Residual Block",
    description: "Implements skip connections that allow information to bypass layers directly. This helps mitigate the vanishing gradient problem and enables training of very deep networks.",
    technical: [
      "Identity Mapping",
      "2 Conv Layers",
      "Pre-activation",
      "1×1 Bottleneck"
    ]
  },
  normalization: {
    title: "Normalization Layer",
    description: "Stabilizes training by normalizing feature distributions. Adapts to the statistics of each mini-batch while maintaining a running average for inference.",
    technical: [
      "Batch Normalization",
      "Momentum: 0.99",
      "Epsilon: 1e-5",
      "Affine Transform"
    ]
  },
  attention: {
    title: "Attention Block",
    description: "Computes dynamic weights for feature relationships. Each attention head specializes in different aspects of the input, enabling the model to capture complex dependencies.",
    technical: [
      "4 Attention Heads",
      "Scaled Dot-Product",
      "Key/Query Dim: 64",
      "Softmax Temperature: 1.0"
    ]
  }
};
