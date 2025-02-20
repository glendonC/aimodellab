"use client";

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

type DataFlowLineProps = {
  points: THREE.Vector3[];
  color: string;
  powerMode: boolean;
  isHighlighted: boolean;
  dataFlow?: number;
  isGpuAccelerated?: boolean;
};

export function DataFlowLine({ 
  points, 
  color, 
  powerMode, 
  isHighlighted,
  dataFlow = 0,
  isGpuAccelerated 
}: DataFlowLineProps) {
  const lineRef = useRef();
  const particlesRef = useRef();
  const [lineWidth, setLineWidth] = useState(2);
  const particleCount = powerMode ? (isGpuAccelerated ? 15 : 8) : 5;
  
  const curve = useMemo(() => {
    const curvePoints = points.map(p => new THREE.Vector3(p.x, p.y, p.z));
    return new THREE.CatmullRomCurve3(curvePoints);
  }, [points]);

  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < particleCount; i++) {
      positions.push(curve.getPoint(i / particleCount));
    }
    return positions;
  }, [curve, particleCount]);

  useFrame((state) => {
    if (lineRef.current) {
      // Enhanced line effects
      if (dataFlow > 0) {
        const pulseSpeed = isGpuAccelerated ? 8 : 4;
        const pulseIntensity = isGpuAccelerated ? 0.8 : 0.4;
        lineRef.current.material.opacity = (Math.sin(state.clock.elapsedTime * pulseSpeed) * pulseIntensity + 0.6) * dataFlow;
        setLineWidth(isGpuAccelerated ? 4 : 2);

        // Particle animation
        if (particlesRef.current) {
          particlesRef.current.children.forEach((particle, i) => {
            const speed = isGpuAccelerated ? 2 : (powerMode ? 1 : 0.5);
            const time = ((state.clock.elapsedTime * speed) + (i / particleCount)) % 1;
            const position = curve.getPoint(time);
            particle.position.copy(position);

            const scale = isGpuAccelerated
              ? 1 + Math.sin(state.clock.elapsedTime * 8 + i) * 0.3
              : 1 + Math.sin(state.clock.elapsedTime * 4 + i) * 0.2;
            particle.scale.setScalar(scale * dataFlow);

            if (particle.material) {
              particle.material.opacity = (isGpuAccelerated
                ? 0.8 + Math.sin(state.clock.elapsedTime * 12 + i) * 0.2
                : 0.5 + Math.sin(state.clock.elapsedTime * 6 + i) * 0.3) * dataFlow;
            }
          });
        }
      } else {
        lineRef.current.material.opacity = 0.2;
        setLineWidth(1);
      }
    }
  });

  const particleColor = isGpuAccelerated ? '#00ff00' : color;

  return (
    <group>
      <Line
        ref={lineRef}
        points={points}
        color={isGpuAccelerated ? '#00ff00' : color}
        lineWidth={lineWidth}
        transparent
        opacity={dataFlow > 0 ? 0.8 : 0.2}
        dashed={false}
      />

      {dataFlow > 0 && (
        <group ref={particlesRef}>
          {particlePositions.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[isGpuAccelerated ? 0.12 : 0.08, 8, 8]} />
              <meshPhongMaterial
                color={particleColor}
                transparent
                opacity={0.6 * dataFlow}
                emissive={particleColor}
                emissiveIntensity={isGpuAccelerated ? 2 : 1}
              />
            </mesh>
          ))}
        </group>
      )}

      {isGpuAccelerated && powerMode && dataFlow > 0 && (
        <Line
          points={points}
          color="#00ff00"
          lineWidth={lineWidth * 2}
          transparent
          opacity={0.2 * dataFlow}
          dashed={true}
          dashScale={4}
          dashSize={0.5}
          gapSize={0.3}
        />
      )}
    </group>
  );
}