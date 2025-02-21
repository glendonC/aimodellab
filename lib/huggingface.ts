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
  // Vision Models (GPU-Intensive)
  {
    id: 'microsoft/resnet-50',
    name: 'ResNet-50',
    description: 'State-of-the-art image classification model with CUDA optimization',
    type: 'vision',
    task: 'image-classification',
    architecture: 'ResNet',
    size: '98 MB',
    downloads: 2500000,
    likes: 1200,
    tags: ['computer-vision', 'classification', 'cuda-optimized']
  },
  {
    id: 'nvidia/stable-diffusion-v1.5',
    name: 'Stable Diffusion v1.5',
    description: 'Optimized for NVIDIA GPUs with tensor core acceleration',
    type: 'vision',
    task: 'text-to-image',
    architecture: 'Diffusion',
    size: '7.7 GB',
    downloads: 5800000,
    likes: 3200,
    tags: ['generative-ai', 'text-to-image', 'tensor-cores']
  },
  {
    id: 'yolov8',
    name: 'YOLOv8',
    description: 'Real-time object detection with CUDA acceleration',
    type: 'vision',
    task: 'object-detection',
    architecture: 'YOLO',
    size: '108 MB',
    downloads: 4200000,
    likes: 2800,
    tags: ['object-detection', 'real-time', 'tensorrt']
  },
   
  // Large Language Models
  {
    id: 'openai/gpt-2',
    name: 'GPT-2 Small',
    description: 'Compact language model with GPU acceleration',
    type: 'text',
    task: 'text-generation',
    architecture: 'Transformer',
    size: '1.5 GB',
    downloads: 3800000,
    likes: 2100,
    tags: ['nlp', 'text-generation', 'cuda']
  },

  // Specialized Models
  {
    id: 'facebook/bart-large-cnn',
    name: 'BART Large CNN',
    description: 'GPU-accelerated text summarization model',
    type: 'text',
    task: 'summarization',
    architecture: 'Transformer',
    size: '1.6 GB',
    downloads: 1800000,
    likes: 950,
    tags: ['nlp', 'summarization', 'cuda']
  },
  {
    id: 'openai/whisper-base',
    name: 'Whisper Base',
    description: 'Speech recognition optimized for NVIDIA GPUs',
    type: 'audio',
    task: 'speech-recognition',
    architecture: 'Transformer',
    size: '442 MB',
    downloads: 2900000,
    likes: 1600,
    tags: ['speech', 'audio', 'cuda-optimized']
  },
  {
    id: 'google/vit-base-patch16-224',
    name: 'ViT Base',
    description: 'Vision Transformer with tensor core acceleration',
    type: 'vision',
    task: 'image-classification',
    architecture: 'Transformer',
    size: '346 MB',
    downloads: 3200000,
    likes: 1500,
    tags: ['vision', 'transformers', 'tensor-cores']
  },
  {
    id: 'dmis-lab/biobert-base',
    name: 'BioBERT',
    description: 'Biomedical language model with GPU optimization',
    type: 'text',
    task: 'text-classification',
    architecture: 'BERT',
    size: '412 MB',
    downloads: 890000,
    likes: 720,
    tags: ['healthcare', 'nlp', 'cuda']
  },
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
  switch (modelId) {
    case 'microsoft/resnet-50':
      return generateResNetArchitecture();
    case 'facebook/bart-large-cnn':
      return generateTransformerArchitecture();
    case 'google/vit-base-patch16-224':
      return generateViTArchitecture();
    case 'nvidia/stable-diffusion-v1.5':
      return generateStableDiffusionArchitecture();
    case 'meta-llama/llama-2-7b':
      return generateLlama2Architecture();
    case 'yolov8':
      return generateYOLOv8Architecture();
    case 'openai/gpt-2':
      return generateGPT2Architecture();
    case 'openai/whisper-base':
      return generateWhisperArchitecture();
    case 'dmis-lab/biobert-base':
      return generateBioBERTArchitecture();
    case 'facebook/dinov2-base':
      return generateDINOv2Architecture();
    default:
      return generateDefaultArchitecture();
  }
}

// Import architecture generation functions
import {
  generateDefaultArchitecture,
  generateResNetArchitecture,
  generateTransformerArchitecture,
  generateViTArchitecture,
  generateStableDiffusionArchitecture,
  generateLlama2Architecture,
  generateYOLOv8Architecture,
  generateGPT2Architecture,
  generateWhisperArchitecture,
  generateBioBERTArchitecture,
  generateDINOv2Architecture
} from './model-architectures';