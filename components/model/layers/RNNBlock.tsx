"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function RNNBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
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
              color={LAYER_COLORS.rnn}
              transparent
              opacity={0.8}
              emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.rnn : 'black'}
              emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
            />
          </mesh>
        );
      })}
      
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhongMaterial
          color={LAYER_COLORS.rnn}
          transparent
          opacity={0.8}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.rnn : 'black'}
          emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
        />
      </mesh>
    </LayerBase>
  );
}