"use client";

import { InputLayer } from '../layers/InputLayer';
import { CNNBlock } from '../layers/CNNBlock';
import { TransformerBlock } from '../layers/TransformerBlock';
import { RNNBlock } from '../layers/RNNBlock';
import { OutputLayer } from '../layers/OutputLayer';
import { MLPBlock } from '../layers/MLPBlock';
import { GraphBlock } from '../layers/GraphBlock';
import { ResidualBlock } from '../layers/ResidualBlock';
import { NormalizationBlock } from '../layers/NormalizationBlock';
import { AttentionBlock } from '../layers/AttentionBlock';
import { PoolingBlock } from '../layers/PoolingBlock';
import { DropoutBlock } from '../layers/DropoutBlock';
import { EmbeddingBlock } from '../layers/EmbeddingBlock';
import { FlattenBlock } from '../layers/FlattenBlock';
import { GlobalAveragePooling1D } from '../layers/GlobalAveragePooling1D';

export const LayerComponents = {
  input: InputLayer,
  cnn: CNNBlock,
  transformer: TransformerBlock,
  rnn: RNNBlock,
  output: OutputLayer,
  mlp: MLPBlock,
  graph: GraphBlock,
  residual: ResidualBlock,
  normalization: NormalizationBlock,
  attention: AttentionBlock,
  pooling: PoolingBlock,
  dropout: DropoutBlock,
  embedding: EmbeddingBlock,
  flatten: FlattenBlock,
  globalavgpool1d: GlobalAveragePooling1D
};