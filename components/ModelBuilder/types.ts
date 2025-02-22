export type LayerConfig = {
  shape?: number[];
  units?: number;
  activation?: string;
  rate?: number;
  returnSequences?: boolean;
  inputDim?: number;
  outputDim?: number;
  numHeads?: number;
  ffDim?: number;
  dropout?: number;
  vocabSize?: number;
  embedDim?: number;
  keyDim?: number;
};

export type Layer = {
  id: string;
  type: string;
  config: LayerConfig;
}; 