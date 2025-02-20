"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function AttentionBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* Central attention sphere */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhongMaterial
          color={LAYER_COLORS.attention}
          transparent
          opacity={0.8}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.attention : 'black'}
          emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
        />
      </mesh>

      {/* Attention heads */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 4;
        const radius = 1;
        return (
          <group key={i} position={[
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          ]}>
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshPhongMaterial
                color={LAYER_COLORS.attention}
                transparent
                opacity={0.6}
                emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.attention : 'black'}
                emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
              />
            </mesh>
            {/* Connection line to center */}
            <mesh position={[Math.cos(angle) * -0.5, Math.sin(angle) * -0.5, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 1]} rotation={[0, 0, -angle]} />
              <meshPhongMaterial
                color={LAYER_COLORS.attention}
                transparent
                opacity={0.4}
                emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.attention : 'black'}
                emissiveIntensity={props.powerMode ? 1 : props.isHighlighted ? 0.5 : 0}
              />
            </mesh>
          </group>
        );
      })}
    </LayerBase>
  );
}