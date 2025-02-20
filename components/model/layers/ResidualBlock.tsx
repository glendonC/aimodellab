"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function ResidualBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {/* Main path */}
      <group position={[0, 0, 0]}>
        {Array.from({ length: 2 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.8 - 0.4, 0]}>
            <boxGeometry args={[1, 0.4, 0.4]} />
            <meshPhongMaterial
              color={LAYER_COLORS.residual}
              transparent
              opacity={0.8}
              emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.residual : 'black'}
              emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* Skip connection */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.6, 0.2, 0.2]} />
        <meshPhongMaterial
          color={LAYER_COLORS.residual}
          transparent
          opacity={0.6}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.residual : 'black'}
          emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
        />
      </mesh>
    </LayerBase>
  );
}