"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function CNNBlock(props: LayerProps) {
  return (
    <LayerBase {...props}>
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i} position={[i * 0.7 - 0.7, 0, 0]}>
          {Array.from({ length: 3 }).map((_, j) => (
            <mesh key={`${i}-${j}`} position={[0, j * 0.7 - 0.7, 0]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshPhongMaterial
                color={LAYER_COLORS.cnn}
                transparent
                opacity={0.8}
                emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.cnn : 'black'}
                emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}
    </LayerBase>
  );
}