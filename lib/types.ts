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