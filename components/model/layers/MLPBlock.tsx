"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function MLPBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* Create a grid of neurons */}
      {Array.from({ length: 4 }).map((_, row) => (
        <group key={row} position={[0, row * 0.6 - 0.9, 0]}>
          {Array.from({ length: 3 }).map((_, col) => (
            <mesh key={`${row}-${col}`} position={[col * 0.6 - 0.6, 0, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshPhongMaterial
                color={LAYER_COLORS.mlp}
                transparent
                opacity={0.8}
                emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.mlp : 'black'}
                emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}
    </LayerBase>
  );
}