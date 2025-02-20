"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function OutputLayer(props: LayerProps) {
  return (
    <LayerBase {...props}>
      <mesh>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshPhongMaterial
          color={LAYER_COLORS.output}
          transparent
          opacity={0.8}
          emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.output : 'black'}
          emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
        />
      </mesh>
    </LayerBase>
  );
}