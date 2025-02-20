"use client";

import { ModelArchitecture } from './types';

export function generateResNetArchitecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Input Layer',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Initial convolution
  nodes.push({
    id: 'conv1',
    type: 'cnn',
    name: 'Conv1',
    params: 9408,
    flops: 118013952,
    memoryUsage: 2 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'conv1' });
  prevId = 'conv1';

  // ResNet blocks
  const blocks = ['2', '3', '4', '5'];
  blocks.forEach((block, i) => {
    // Each block has multiple residual units
    for (let unit = 0; unit < 3; unit++) {
      const blockId = `res${block}_${unit}`;
      nodes.push({
        id: blockId,
        type: 'residual',
        name: `ResBlock ${block}.${unit}`,
        params: 1024 * 1024 * (i + 1),
        flops: 5 * 1024 * 1024 * (i + 1),
        memoryUsage: 3 * 1024 * 1024 * (i + 1)
      });
      edges.push({ source: prevId, target: blockId });
      prevId = blockId;
    }
  });

  // Final layers
  nodes.push({
    id: 'pool',
    type: 'mlp',
    name: 'Global Pool',
    params: 2048,
    flops: 2048,
    memoryUsage: 1024 * 512
  });
  edges.push({ source: prevId, target: 'pool' });

  nodes.push({
    id: 'output',
    type: 'output',
    name: 'FC 1000',
    params: 2048000,
    flops: 2048000,
    memoryUsage: 1024 * 1024
  });
  edges.push({ source: 'pool', target: 'output' });

  return { nodes, edges };
}

export function generateTransformerArchitecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Input Embedding',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Encoder layers
  for (let i = 0; i < 6; i++) {
    const attentionId = `enc_attn_${i}`;
    const ffnId = `enc_ffn_${i}`;
    const normId = `enc_norm_${i}`;

    nodes.push({
      id: attentionId,
      type: 'attention',
      name: `Encoder Self-Attention ${i}`,
      params: 4 * 1024 * 1024,
      flops: 16 * 1024 * 1024,
      memoryUsage: 8 * 1024 * 1024
    });

    nodes.push({
      id: ffnId,
      type: 'mlp',
      name: `Encoder FFN ${i}`,
      params: 8 * 1024 * 1024,
      flops: 32 * 1024 * 1024,
      memoryUsage: 16 * 1024 * 1024
    });

    nodes.push({
      id: normId,
      type: 'normalization',
      name: `Layer Norm ${i}`,
      params: 1024,
      flops: 2048,
      memoryUsage: 1024 * 64
    });

    edges.push({ source: prevId, target: attentionId });
    edges.push({ source: attentionId, target: ffnId });
    edges.push({ source: ffnId, target: normId });
    prevId = normId;
  }

  // Output projection
  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Output Projection',
    params: 1024 * 1024,
    flops: 2 * 1024 * 1024,
    memoryUsage: 1024 * 1024
  });
  edges.push({ source: prevId, target: 'output' });

  return { nodes, edges };
}

export function generateViTArchitecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Patch Embedding',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Patch embedding
  nodes.push({
    id: 'patch_embed',
    type: 'cnn',
    name: 'Patch Embedding',
    params: 590592,
    flops: 47185920,
    memoryUsage: 2 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'patch_embed' });
  prevId = 'patch_embed';

  // Transformer blocks
  for (let i = 0; i < 12; i++) {
    const attentionId = `transformer_${i}`;
    const mlpId = `mlp_${i}`;

    nodes.push({
      id: attentionId,
      type: 'transformer',
      name: `Transformer Block ${i}`,
      params: 7 * 1024 * 1024,
      flops: 28 * 1024 * 1024,
      memoryUsage: 14 * 1024 * 1024
    });

    nodes.push({
      id: mlpId,
      type: 'mlp',
      name: `MLP Block ${i}`,
      params: 4 * 1024 * 1024,
      flops: 16 * 1024 * 1024,
      memoryUsage: 8 * 1024 * 1024
    });

    edges.push({ source: prevId, target: attentionId });
    edges.push({ source: attentionId, target: mlpId });
    prevId = mlpId;
  }

  // Classification head
  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Classification Head',
    params: 768000,
    flops: 768000,
    memoryUsage: 1024 * 768
  });
  edges.push({ source: prevId, target: 'output' });

  return { nodes, edges };
}

export function generateYOLOv8Architecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Input Image',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Backbone layers
  const backboneLayers = ['P3', 'P4', 'P5'];
  backboneLayers.forEach((layer, i) => {
    const convId = `backbone_${layer}`;
    nodes.push({
      id: convId,
      type: 'cnn', // Using CNN for backbone
      name: `Backbone ${layer}`,
      params: 256 * 256 * (i + 1),
      flops: 1024 * 1024 * (i + 1),
      memoryUsage: 2 * 1024 * 1024
    });
    edges.push({ source: prevId, target: convId });
    prevId = convId;
  });

  // FPN layers with residual connections
  backboneLayers.forEach((layer, i) => {
    const fpnId = `fpn_${layer}`;
    nodes.push({
      id: fpnId,
      type: 'residual', // Using residual for FPN
      name: `FPN ${layer}`,
      params: 256 * 256,
      flops: 512 * 512,
      memoryUsage: 1024 * 1024
    });
    edges.push({ source: `backbone_${layer}`, target: fpnId });
  });

  // Detection heads
  ['small', 'medium', 'large'].forEach((size, i) => {
    const headId = `head_${size}`;
    const detectionId = `detection_${size}`;

    nodes.push({
      id: headId,
      type: 'graph', // Using graph for detection heads
      name: `${size} Detection Head`,
      params: 256 * (80 + 4),
      flops: 512 * 512,
      memoryUsage: 1024 * 1024
    });
    edges.push({ source: `fpn_${backboneLayers[i]}`, target: headId });
  });

  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Detection Output',
    params: 1000,
    flops: 1000,
    memoryUsage: 512 * 1024
  });
  edges.push({ source: 'head_large', target: 'output' });

  return { nodes, edges };
}

// Stable Diffusion
export function generateStableDiffusionArchitecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Text + Noise Input',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Text encoder (CLIP)
  nodes.push({
    id: 'text_encoder',
    type: 'transformer',
    name: 'CLIP Text Encoder',
    params: 123 * 1024 * 1024,
    flops: 246 * 1024 * 1024,
    memoryUsage: 512 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'text_encoder' });

  // UNet blocks with attention
  const blockNames = ['Down_1', 'Down_2', 'Mid', 'Up_1', 'Up_2'];
  blockNames.forEach((block, i) => {
    const blockId = `unet_${block.toLowerCase()}`;
    const attnId = `attn_${block.toLowerCase()}`;

    nodes.push({
      id: blockId,
      type: 'residual',
      name: `UNet ${block}`,
      params: 512 * 512,
      flops: 1024 * 1024,
      memoryUsage: 2 * 1024 * 1024
    });

    nodes.push({
      id: attnId,
      type: 'attention',
      name: `Cross Attention ${block}`,
      params: 512 * 512,
      flops: 1024 * 1024,
      memoryUsage: 2 * 1024 * 1024
    });

    edges.push({ source: i === 0 ? 'text_encoder' : prevId, target: blockId });
    edges.push({ source: blockId, target: attnId });
    prevId = attnId;
  });

  // VAE decoder
  nodes.push({
    id: 'vae_decoder',
    type: 'cnn',
    name: 'VAE Decoder',
    params: 256 * 1024,
    flops: 512 * 1024,
    memoryUsage: 1024 * 1024
  });
  edges.push({ source: prevId, target: 'vae_decoder' });

  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Generated Image',
    params: 3 * 1024 * 1024,
    flops: 6 * 1024 * 1024,
    memoryUsage: 1024 * 1024
  });
  edges.push({ source: 'vae_decoder', target: 'output' });

  return { nodes, edges };
}

// Llama 2
export function generateLlama2Architecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Input Layer',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Token Embedding
  nodes.push({
    id: 'embedding',
    type: 'embedding',
    name: 'Token Embedding',
    params: 32000 * 4096,
    flops: 4096,
    memoryUsage: 4 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'embedding' });
  prevId = 'embedding';

  // Transformer Blocks
  for (let i = 0; i < 32; i++) {
    const attnId = `attn_${i}`;
    const mlpId = `mlp_${i}`;
    const normId = `norm_${i}`;

    nodes.push({
      id: attnId,
      type: 'attention',
      name: `Self-Attention ${i}`,
      params: 4 * 4096 * 4096,
      flops: 16 * 1024 * 1024,
      memoryUsage: 8 * 1024 * 1024
    });

    nodes.push({
      id: mlpId,
      type: 'mlp',
      name: `MLP Block ${i}`,
      params: 4 * 4096 * 11008,
      flops: 8 * 1024 * 1024,
      memoryUsage: 4 * 1024 * 1024
    });

    nodes.push({
      id: normId,
      type: 'normalization',
      name: `RMSNorm ${i}`,
      params: 4096,
      flops: 4096,
      memoryUsage: 1024 * 64
    });

    edges.push({ source: prevId, target: attnId });
    edges.push({ source: attnId, target: mlpId });
    edges.push({ source: mlpId, target: normId });
    prevId = normId;
  }

  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Output Layer',
    params: 4096 * 32000,
    flops: 4096 * 32000,
    memoryUsage: 2 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'output' });

  return { nodes, edges };
}


export function generateGPT2Architecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Input Layer',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Token Embedding
  nodes.push({
    id: 'embedding',
    type: 'embedding',
    name: 'Token Embedding',
    params: 50257 * 768, // Vocab size * embedding dim
    flops: 768,
    memoryUsage: 2 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'embedding' });
  prevId = 'embedding';

  // 12 Transformer blocks
  for (let i = 0; i < 12; i++) {
    const attnId = `attn_${i}`;
    const normId1 = `norm1_${i}`;
    const mlpId = `mlp_${i}`;
    const normId2 = `norm2_${i}`;

    nodes.push({
      id: attnId,
      type: 'attention',
      name: `Self-Attention ${i}`,
      params: 3 * 768 * 768, // 3 = Q,K,V matrices
      flops: 12 * 1024 * 1024,
      memoryUsage: 6 * 1024 * 1024
    });

    nodes.push({
      id: normId1,
      type: 'normalization',
      name: `Layer Norm 1 (${i})`,
      params: 2 * 768,
      flops: 768,
      memoryUsage: 1024 * 32
    });

    nodes.push({
      id: mlpId,
      type: 'mlp',
      name: `MLP Block ${i}`,
      params: 768 * 3072 + 3072 * 768,
      flops: 8 * 1024 * 1024,
      memoryUsage: 4 * 1024 * 1024
    });

    nodes.push({
      id: normId2,
      type: 'normalization',
      name: `Layer Norm 2 (${i})`,
      params: 2 * 768,
      flops: 768,
      memoryUsage: 1024 * 32
    });

    edges.push({ source: prevId, target: attnId });
    edges.push({ source: attnId, target: normId1 });
    edges.push({ source: normId1, target: mlpId });
    edges.push({ source: mlpId, target: normId2 });
    prevId = normId2;
  }

  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Output Layer',
    params: 768 * 50257,
    flops: 768 * 50257,
    memoryUsage: 2 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'output' });

  return { nodes, edges };
}

export function generateWhisperArchitecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Audio Input',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Conv Frontend
  for (let i = 0; i < 2; i++) {
    const convId = `conv_${i}`;
    nodes.push({
      id: convId,
      type: 'cnn',
      name: `Conv Block ${i}`,
      params: 512 * 512 * 3 * 3,
      flops: 512 * 512 * 3 * 3 * 80,
      memoryUsage: 2 * 1024 * 1024
    });
    edges.push({ source: prevId, target: convId });
    prevId = convId;
  }

  // Encoder blocks (6 for base model)
  for (let i = 0; i < 6; i++) {
    const attnId = `enc_attn_${i}`;
    const mlpId = `enc_mlp_${i}`;
    const normId = `enc_norm_${i}`;

    nodes.push({
      id: attnId,
      type: 'attention',
      name: `Encoder Attention ${i}`,
      params: 3 * 512 * 512,
      flops: 8 * 1024 * 1024,
      memoryUsage: 4 * 1024 * 1024
    });

    nodes.push({
      id: mlpId,
      type: 'mlp',
      name: `Encoder MLP ${i}`,
      params: 512 * 2048 + 2048 * 512,
      flops: 4 * 1024 * 1024,
      memoryUsage: 2 * 1024 * 1024
    });

    nodes.push({
      id: normId,
      type: 'normalization',
      name: `Encoder Norm ${i}`,
      params: 2 * 512,
      flops: 512,
      memoryUsage: 1024 * 32
    });

    edges.push({ source: prevId, target: attnId });
    edges.push({ source: attnId, target: mlpId });
    edges.push({ source: mlpId, target: normId });
    prevId = normId;
  }

  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Output Layer',
    params: 512 * 51865, // vocab size
    flops: 512 * 51865,
    memoryUsage: 2 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'output' });

  return { nodes, edges };
}

export function generateBioBERTArchitecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Input Layer',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Token & Position Embedding
  nodes.push({
    id: 'embedding',
    type: 'embedding',
    name: 'Token + Position Embedding',
    params: 28996 * 768 + 512 * 768, // vocab_size * hidden_dim + max_pos * hidden_dim
    flops: 768 * 2,
    memoryUsage: 3 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'embedding' });
  prevId = 'embedding';

  // 12 Transformer Encoder blocks
  for (let i = 0; i < 12; i++) {
    const attnId = `attn_${i}`;
    const normId1 = `norm1_${i}`;
    const mlpId = `mlp_${i}`;
    const normId2 = `norm2_${i}`;

    nodes.push({
      id: attnId,
      type: 'attention',
      name: `Multi-Head Attention ${i}`,
      params: 768 * 768 * 4, // 4 = Q,K,V,O matrices
      flops: 12 * 1024 * 1024,
      memoryUsage: 6 * 1024 * 1024
    });

    nodes.push({
      id: normId1,
      type: 'normalization',
      name: `Layer Norm 1 (${i})`,
      params: 2 * 768,
      flops: 768,
      memoryUsage: 1024 * 32
    });

    nodes.push({
      id: mlpId,
      type: 'mlp',
      name: `Feed Forward ${i}`,
      params: 768 * 3072 + 3072 * 768,
      flops: 8 * 1024 * 1024,
      memoryUsage: 4 * 1024 * 1024
    });

    nodes.push({
      id: normId2,
      type: 'normalization',
      name: `Layer Norm 2 (${i})`,
      params: 2 * 768,
      flops: 768,
      memoryUsage: 1024 * 32
    });

    edges.push({ source: prevId, target: attnId });
    edges.push({ source: attnId, target: normId1 });
    edges.push({ source: normId1, target: mlpId });
    edges.push({ source: mlpId, target: normId2 });
    prevId = normId2;
  }

  // Pooler and Output
  nodes.push({
    id: 'pooler',
    type: 'mlp',
    name: 'Pooler',
    params: 768 * 768,
    flops: 768 * 768,
    memoryUsage: 1024 * 1024
  });
  edges.push({ source: prevId, target: 'pooler' });

  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Output Layer',
    params: 768 * 2, // binary classification
    flops: 768 * 2,
    memoryUsage: 1024 * 64
  });
  edges.push({ source: 'pooler', target: 'output' });

  return { nodes, edges };
}

export function generateDINOv2Architecture(): ModelArchitecture {
  const nodes = [
    {
      id: 'input',
      type: 'input',
      name: 'Input Layer',
      params: 0,
      flops: 0,
      memoryUsage: 1024 * 1024
    }
  ];

  const edges = [];
  let prevId = 'input';

  // Patch Embedding
  nodes.push({
    id: 'patch_embed',
    type: 'cnn',
    name: 'Patch Embedding',
    params: 384 * (14 * 14 * 3), // hidden_dim * patch_size^2 * channels
    flops: 384 * 196 * 3,
    memoryUsage: 2 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'patch_embed' });
  prevId = 'patch_embed';

  // 12 Transformer blocks
  for (let i = 0; i < 12; i++) {
    const attnId = `attn_${i}`;
    const normId1 = `norm1_${i}`;
    const mlpId = `mlp_${i}`;
    const normId2 = `norm2_${i}`;

    nodes.push({
      id: attnId,
      type: 'attention',
      name: `Self-Attention ${i}`,
      params: 384 * 384 * 4,
      flops: 8 * 1024 * 1024,
      memoryUsage: 4 * 1024 * 1024
    });

    nodes.push({
      id: normId1,
      type: 'normalization',
      name: `Layer Norm 1 (${i})`,
      params: 2 * 384,
      flops: 384,
      memoryUsage: 1024 * 32
    });

    nodes.push({
      id: mlpId,
      type: 'mlp',
      name: `MLP Block ${i}`,
      params: 384 * 1536 + 1536 * 384,
      flops: 6 * 1024 * 1024,
      memoryUsage: 3 * 1024 * 1024
    });

    nodes.push({
      id: normId2,
      type: 'normalization',
      name: `Layer Norm 2 (${i})`,
      params: 2 * 384,
      flops: 384,
      memoryUsage: 1024 * 32
    });

    edges.push({ source: prevId, target: attnId });
    edges.push({ source: attnId, target: normId1 });
    edges.push({ source: normId1, target: mlpId });
    edges.push({ source: mlpId, target: normId2 });
    prevId = normId2;
  }

  // Projection head
  nodes.push({
    id: 'projection',
    type: 'mlp',
    name: 'Projection Head',
    params: 384 * 2048,
    flops: 384 * 2048,
    memoryUsage: 2 * 1024 * 1024
  });
  edges.push({ source: prevId, target: 'projection' });

  nodes.push({
    id: 'output',
    type: 'output',
    name: 'Output Embeddings',
    params: 2048 * 256,
    flops: 2048 * 256,
    memoryUsage: 1024 * 1024
  });
  edges.push({ source: 'projection', target: 'output' });

  return { nodes, edges };
}

export function generateDefaultArchitecture(): ModelArchitecture {
  return generateResNetArchitecture();
}