"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function EmbeddingBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* Token representation */}
      <mesh position={[-0.6, 0, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshPhongMaterial
          color={LAYER_COLORS.embedding}
          transparent
          opacity={0.8}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.embedding : 'black'}
          emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
        />
      </mesh>

      {/* Embedding vector representation */}
      <mesh position={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
        <meshPhongMaterial
          color={LAYER_COLORS.embedding}
          transparent
          opacity={0.8}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.embedding : 'black'}
          emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
        />
      </mesh>

      {/* Connection line */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshPhongMaterial
          color={LAYER_COLORS.embedding}
          transparent
          opacity={0.4}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.embedding : 'black'}
          emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
        />
      </mesh>
    </LayerBase>
  );
}