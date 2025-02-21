import React, { useRef } from 'react';
import { cn } from '../lib/utils';

export default function ModelViewer({ 
  model,
  powerMode,
  // ... other props
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Add the same display name function
  const getDisplayName = (modelId: string = '') => {
    const id = modelId.toLowerCase();
    if (id.includes('resnet')) return 'ResNet-50';
    if (id.includes('yolo')) return 'YOLOv8';
    if (id.includes('stable')) return 'Stable Diffusion';
    if (id.includes('llama')) return 'LLaMA 2';
    if (id.includes('gpt')) return 'GPT-2';
    if (id.includes('bart')) return 'BART';
    if (id.includes('whisper')) return 'Whisper';
    if (id.includes('vit')) return 'ViT';
    if (id.includes('biobert')) return 'BioBERT';
    if (id.includes('dino')) return 'DINOv2';
    return 'ResNet-50';
  };

  const modelName = getDisplayName(model?.id);

  return (
    <div className="relative w-full h-full">
      {/* Add model name badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={cn(
          "px-3 py-1.5 rounded-full font-medium text-sm",
          powerMode 
            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
            : "bg-gray-100 text-gray-600"
        )}>
          {modelName}
        </div>
      </div>

      {/* Existing canvas and controls */}
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* ... rest of the component */}
    </div>
  );
} 