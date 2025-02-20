"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function FlattenBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* 3D input representation */}
      <group position={[-0.6, 0, 0]}>
        {Array.from({ length: 2 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.4 - 0.2, 0]}>
            <boxGeometry args={[0.4, 0.3, 0.4]} />
            <meshPhongMaterial
              color={LAYER_COLORS.flatten}
              transparent
              opacity={0.8}
              emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.flatten : 'black'}
              emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* Flattened output representation */}
      <group position={[0.6, 0, 0]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.3 - 0.45, 0]}>
            <boxGeometry args={[0.4, 0.2, 0.2]} />
            <meshPhongMaterial
              color={LAYER_COLORS.flatten}
              transparent
              opacity={0.8}
              emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.flatten : 'black'}
              emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* Flattening arrows */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.4 - 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
          <meshPhongMaterial
            color={LAYER_COLORS.flatten}
            transparent
            opacity={0.4}
            emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.flatten : 'black'}
            emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
          />
        </mesh>
      ))}
    </LayerBase>
  );
}