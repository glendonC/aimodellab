import { HfInference } from '@huggingface/inference';

export type HFModel = {
  id: string;
  name: string;
  description: string;
  type: 'vision' | 'text' | 'audio' | 'multimodal';
  task: string;
  architecture: string;
  size: string;
  downloads: number;
  likes: number;
  tags: string[];
};

export type ModelArchitecture = {
  nodes: Array<{
    id: string;
    type: string;
    name: string;
    params: number;
    flops: number;
    memoryUsage: number;
  }>;
  edges: Array<{
    source: string;
    target: string;
  }>;
};

export const FEATURED_MODELS: HFModel[] = [
  {
    id: 'microsoft/resnet-50',
    name: 'ResNet-50',
    description: 'State-of-the-art image classification model',
    type: 'vision',
    task: 'image-classification',
    architecture: 'ResNet',
    size: '98 MB',
    downloads: 2500000,
    likes: 1200,
    tags: ['computer-vision', 'classification', 'pytorch']
  },
  {
    id: 'facebook/bart-large-cnn',
    name: 'BART Large CNN',
    description: 'Powerful text summarization model',
    type: 'text',
    task: 'summarization',
    architecture: 'Transformer',
    size: '1.6 GB',
    downloads: 1800000,
    likes: 950,
    tags: ['nlp', 'summarization', 'pytorch']
  },
  {
    id: 'google/vit-base-patch16-224',
    name: 'ViT Base',
    description: 'Vision Transformer for image understanding',
    type: 'vision',
    task: 'image-classification',
    architecture: 'Transformer',
    size: '346 MB',
    downloads: 3200000,
    likes: 1500,
    tags: ['computer-vision', 'transformers', 'pytorch']
  }
];

export async function searchModels(query: string): Promise<HFModel[]> {
  try {
    const response = await fetch(
      `https://huggingface.co/api/models?search=${encodeURIComponent(query)}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      return [];
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse response:', e);
      return [];
    }

    if (!Array.isArray(data)) {
      console.error('Unexpected response format:', data);
      return [];
    }

    return data.map((model: any) => ({
      id: model.modelId || model.id,
      name: (model.modelId || model.id)?.split('/').pop() || 'Unknown Model',
      description: model.description || 'No description available',
      type: determineModelType(model.pipeline_tag),
      task: model.pipeline_tag || 'unknown',
      architecture: model.config?.architectures?.[0] || 'unknown',
      size: formatSize(model.downloads?.binary?.size || 0),
      downloads: model.downloads?.total || 0,
      likes: model.likes || 0,
      tags: [
        model.pipeline_tag,
        ...(model.tags || []),
        model.library_name
      ].filter(Boolean)
    }));
  } catch (error) {
    console.error('Failed to search models:', error);
    return [];
  }
}

function determineModelType(pipelineTag: string): HFModel['type'] {
  if (!pipelineTag) return 'vision';
  
  const visionTasks = ['image-classification', 'object-detection', 'image-segmentation'];
  const textTasks = ['text-classification', 'text-generation', 'translation'];
  const audioTasks = ['audio-classification', 'speech-recognition'];
  
  if (visionTasks.includes(pipelineTag)) return 'vision';
  if (textTasks.includes(pipelineTag)) return 'text';
  if (audioTasks.includes(pipelineTag)) return 'audio';
  return 'multimodal';
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export async function getModelInfo(modelId: string): Promise<HFModel> {
  try {
    const response = await fetch(`https://huggingface.co/api/models/${modelId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Model not found');
    }

    const model = await response.json();
    return {
      id: model.modelId || model.id,
      name: (model.modelId || model.id)?.split('/').pop() || 'Unknown Model',
      description: model.description || 'No description available',
      type: determineModelType(model.pipeline_tag),
      task: model.pipeline_tag || 'unknown',
      architecture: model.config?.architectures?.[0] || 'unknown',
      size: formatSize(model.downloads?.binary?.size || 0),
      downloads: model.downloads?.total || 0,
      likes: model.likes || 0,
      tags: [
        model.pipeline_tag,
        ...(model.tags || []),
        model.library_name
      ].filter(Boolean)
    };
  } catch (error) {
    console.error('Failed to get model info:', error);
    throw error;
  }
}

export async function getModelArchitecture(modelId: string): Promise<ModelArchitecture> {
  const model = FEATURED_MODELS.find(m => m.id === modelId);
  if (!model) {
    throw new Error('Model not found');
  }

  if (model.id === 'microsoft/resnet-50') {
    return generateResNetArchitecture();
  } else if (model.id === 'facebook/bart-large-cnn') {
    return generateTransformerArchitecture();
  } else if (model.id === 'google/vit-base-patch16-224') {
    return generateViTArchitecture();
  }

  return generateDefaultArchitecture();
}

// Import architecture generation functions
import {
  generateResNetArchitecture,
  generateTransformerArchitecture,
  generateViTArchitecture,
  generateDefaultArchitecture
} from './model-architectures';