"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function GlobalAveragePooling1D(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* Input representation */}
      <group position={[-0.8, 0, 0]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.4 - 0.6, 0]}>
            <boxGeometry args={[0.4, 0.2, 0.2]} />
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

      {/* Pooling visualization */}
      <group position={[0, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
          <meshPhongMaterial
            color={LAYER_COLORS.pooling}
            transparent
            opacity={0.6}
            emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.pooling : 'black'}
            emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
          />
        </mesh>
      </group>

      {/* Output representation */}
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshPhongMaterial
          color={LAYER_COLORS.pooling}
          transparent
          opacity={0.8}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.pooling : 'black'}
          emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
        />
      </mesh>

      {/* Connection lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[-0.4, i * 0.4 - 0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8]} />
          <meshPhongMaterial
            color={LAYER_COLORS.pooling}
            transparent
            opacity={0.4}
            emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.pooling : 'black'}
            emissiveIntensity={props.powerMode ? 1 : props.isHighlighted ? 0.5 : 0}
          />
        </mesh>
      ))}

      <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8]} />
        <meshPhongMaterial
          color={LAYER_COLORS.pooling}
          transparent
          opacity={0.4}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.pooling : 'black'}
          emissiveIntensity={props.powerMode ? 1 : props.isHighlighted ? 0.5 : 0}
        />
      </mesh>
    </LayerBase>
  );
}