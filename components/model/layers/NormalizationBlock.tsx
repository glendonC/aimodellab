"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function NormalizationBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* Normalization rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i} position={[0, i * 0.8 - 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.6 - i * 0.1, 0.1, 16, 32]} />
            <meshPhongMaterial
              color={LAYER_COLORS.normalization}
              transparent
              opacity={0.8 - i * 0.2}
              emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.normalization : 'black'}
              emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
            />
          </mesh>
        </group>
      ))}
    </LayerBase>
  );
}