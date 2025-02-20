"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LayerProps } from '../types';

export function LayerBase({ 
  children, 
  position, 
  isHighlighted, 
  onPointerOver, 
  onPointerOut, 
  powerMode, 
  onClick,
  isFocused,
  isProcessing,
  isGpuAccelerated,
  userData
}: LayerProps & { 
  children: React.ReactNode;
  isFocused?: boolean;
  isProcessing?: boolean;
  isGpuAccelerated?: boolean;
  userData?: any;
}) {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      // DRAMATICALLY enhanced processing effects
      if (isProcessing) {
        // Intense pulsing glow effect
        const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
        groupRef.current.scale.setScalar(pulseScale * scale);

        // Dramatic rotation
        groupRef.current.rotation.y += 0.05;

        // Update all child materials for intense processing effect
        groupRef.current.traverse((child) => {
          if (child.isMesh) {
            // Dramatically enhanced glow
            child.material.emissiveIntensity = 3 + Math.sin(state.clock.elapsedTime * 15) * 1;
            child.material.opacity = 0.9 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
          }
        });

        // Add energy particles
        if (Math.random() > 0.7) {
          const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 8, 8),
            new THREE.MeshPhongMaterial({
              color: isGpuAccelerated ? '#00ff00' : '#ffffff',
              transparent: true,
              opacity: 0.9,
              emissive: isGpuAccelerated ? '#00ff00' : '#ffffff',
              emissiveIntensity: 2
            })
          );
          
          const angle = Math.random() * Math.PI * 2;
          const radius = 1.2;
          particle.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          );
          
          groupRef.current.add(particle);
          
          // Particle animation
          const startPos = particle.position.clone();
          const endPos = startPos.clone().multiplyScalar(2);
          const startTime = state.clock.elapsedTime;
          
          const animateParticle = () => {
            const elapsed = state.clock.elapsedTime - startTime;
            const progress = Math.min(elapsed / 0.5, 1);
            
            particle.position.lerpVectors(startPos, endPos, progress);
            particle.scale.setScalar(1 - progress);
            
            if (progress < 1) {
              requestAnimationFrame(animateParticle);
            } else {
              groupRef.current?.remove(particle);
            }
          };
          
          requestAnimationFrame(animateParticle);
        }
      }
    }
  });

  const handlePointerOver = (e: THREE.Event) => {
    e.stopPropagation();
    setIsHovered(true);
    onPointerOver?.();
  };

  const handlePointerOut = (e: THREE.Event) => {
    e.stopPropagation();
    setIsHovered(false);
    onPointerOut?.();
  };

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      userData={userData}
    >
      {children}

      {/* Processing highlight ring */}
      {isProcessing && (
        <>
          {/* Inner glow ring */}
          <mesh scale={[1.5, 1.5, 1.5]}>
            <torusGeometry args={[1, 0.1, 16, 32]} />
            <meshPhongMaterial
              color={isGpuAccelerated ? "#00ff00" : "#ffffff"}
              transparent
              opacity={0.8}
              emissive={isGpuAccelerated ? "#00ff00" : "#ffffff"}
              emissiveIntensity={3}
            />
          </mesh>

          {/* Outer energy field */}
          <mesh scale={[2, 2, 2]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial
              color={isGpuAccelerated ? "#00ff00" : "#ffffff"}
              transparent
              opacity={0.3}
              wireframe
              emissive={isGpuAccelerated ? "#00ff00" : "#ffffff"}
              emissiveIntensity={2}
            />
          </mesh>

          {/* Processing wave */}
          <mesh scale={[2.5, 2.5, 2.5]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshPhongMaterial
              color={isGpuAccelerated ? "#00ff00" : "#ffffff"}
              transparent
              opacity={0.15}
              wireframe
              emissive={isGpuAccelerated ? "#00ff00" : "#ffffff"}
              emissiveIntensity={1}
            />
          </mesh>
        </>
      )}
    </group>
  );
}