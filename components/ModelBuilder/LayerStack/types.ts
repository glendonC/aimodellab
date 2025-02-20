"use client";

import { LayerType } from '../../model/types';

export const LAYER_RULES: Record<LayerType, LayerType[]> = {
  input: ['cnn', 'mlp', 'transformer', 'rnn', 'embedding'],
  cnn: ['cnn', 'pooling', 'flatten'],
  pooling: ['cnn', 'pooling', 'flatten'],
  flatten: ['mlp', 'dropout'],
  mlp: ['mlp', 'dropout', 'output'],
  transformer: ['transformer', 'attention', 'dropout', 'output'],
  attention: ['transformer', 'mlp', 'dropout', 'output'],
  rnn: ['rnn', 'dropout', 'output'],
  dropout: ['mlp', 'transformer', 'rnn', 'output'],
  embedding: ['transformer', 'rnn'],
  output: [],
  graph: ['mlp', 'dropout', 'output'],
  residual: ['mlp', 'dropout', 'output'],
  normalization: ['mlp', 'dropout', 'output']
};