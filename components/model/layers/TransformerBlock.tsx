"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function TransformerBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial
          color={LAYER_COLORS.transformer}
          transparent
          opacity={0.8}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.transformer : 'black'}
          emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
        />
      </mesh>
      
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 6;
        const radius = 1.2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0
            ]}
          >
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshPhongMaterial
              color={LAYER_COLORS.transformer}
              emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.transformer : 'black'}
              emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
            />
          </mesh>
        );
      })}
    </LayerBase>
  );
}