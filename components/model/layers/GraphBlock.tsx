"use client";

import { LAYER_COLORS } from '../constants';
import { LayerBase } from './LayerBase';
import { LayerProps } from '../types';

export function GraphBlock(props: LayerProps) {
  // Create vertices of an octahedron for graph nodes
  const vertices = [
    [0, 1, 0], [1, 0, 0], [0, 0, 1],
    [-1, 0, 0], [0, 0, -1], [0, -1, 0]
  ];

  return (
    <LayerBase {...props}>
      {/* Nodes */}
      {vertices.map((pos, i) => (
        <mesh key={i} position={pos.map(p => p * 0.8) as [number, number, number]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshPhongMaterial
            color={LAYER_COLORS.graph}
            transparent
            opacity={0.8}
            emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.graph : 'black'}
            emissiveIntensity={props.powerMode ? 1.5 : props.isHighlighted ? 0.8 : 0}
          />
        </mesh>
      ))}

      {/* Edges */}
      {vertices.map((start, i) => 
        vertices.slice(i + 1).map((end, j) => (
          <mesh key={`${i}-${j}`} position={[
            (start[0] + end[0]) * 0.4,
            (start[1] + end[1]) * 0.4,
            (start[2] + end[2]) * 0.4
          ]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8]} />
            <meshPhongMaterial
              color={LAYER_COLORS.graph}
              transparent
              opacity={0.4}
              emissive={props.isHighlighted || props.powerMode ? LAYER_COLORS.graph : 'black'}
              emissiveIntensity={props.powerMode ? 1.2 : props.isHighlighted ? 0.6 : 0}
            />
          </mesh>
        ))
      )}
    </LayerBase>
  );
}