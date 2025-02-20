"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function DropoutBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* Main sphere */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial
          color={LAYER_COLORS.dropout}
          transparent
          opacity={0.6}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.dropout : 'black'}
          emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
        />
      </mesh>

      {/* Dropout nodes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 6;
        const radius = 1.2;
        const opacity = i % 2 === 0 ? 0.8 : 0.2; // Some nodes appear "dropped out"
        
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0
            ]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshPhongMaterial
              color={LAYER_COLORS.dropout}
              transparent
              opacity={opacity}
              emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.dropout : 'black'}
              emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
            />
          </mesh>
        );
      })}
    </LayerBase>
  );
}