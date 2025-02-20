"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function PoolingBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* Grid of cubes representing pooling operation */}
      {Array.from({ length: 2 }).map((_, i) => (
        <group key={i} position={[i * 0.8 - 0.4, 0, 0]}>
          {Array.from({ length: 2 }).map((_, j) => (
            <mesh key={`${i}-${j}`} position={[0, j * 0.8 - 0.4, 0]}>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshPhongMaterial
                color={LAYER_COLORS.pooling}
                transparent
                opacity={0.8}
                emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.pooling : 'black'}
                emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Pooling window indicator */}
      <mesh position={[0, 0, 0.4]}>
        <ringGeometry args={[0.8, 0.9, 32]} />
        <meshPhongMaterial
          color={LAYER_COLORS.pooling}
          transparent
          opacity={0.4}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.pooling : 'black'}
          emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
        />
      </mesh>
    </LayerBase>
  );
}