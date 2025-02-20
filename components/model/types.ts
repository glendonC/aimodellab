export type LayerType = 
  | 'input' 
  | 'cnn' 
  | 'transformer' 
  | 'rnn' 
  | 'output'
  | 'mlp'
  | 'graph'
  | 'residual'
  | 'normalization'
  | 'attention'
  | 'pooling'
  | 'dropout'
  | 'embedding'
  | 'flatten';

export type LayerStats = {
  neurons: number;
  inferenceTime: number;
  memoryUsage: number;
  activations: string;
  filters?: string;
  heads?: number;
  hiddenUnits?: number;
  layers?: string;
  aggregation?: string;
  connections?: string;
  type?: string;
  momentum?: number;
};

export type LayerExplanation = {
  title: string;
  description: string;
  technical: string[];
};

export type LayerProps = {
  position: [number, number, number];
  isHighlighted: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  powerMode: boolean;
  onClick: () => void;
  isFocused?: boolean;
  nodeData?: any;
};