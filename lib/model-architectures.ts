"use client";

import { ModelArchitecture } from './huggingface';

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

export function generateDefaultArchitecture(): ModelArchitecture {
  return generateResNetArchitecture();
}