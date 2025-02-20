"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LayerType } from '../types';

type UseSceneCameraProps = {
  camera: THREE.Camera;
  controlsRef: React.RefObject<any>;
  focusedLayer: LayerType | null;
  setFocusedLayer: (layer: LayerType | null) => void;
  setHighlightedSection: (section: LayerType | null) => void;
  initialCameraPosition: THREE.Vector3;
  sections: any[];
};

export function useSceneCamera({
  camera,
  controlsRef,
  focusedLayer,
  setFocusedLayer,
  setHighlightedSection,
  initialCameraPosition,
  sections
}: UseSceneCameraProps) {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const transitionStartTime = useRef<number | null>(null);
  const transitionDuration = 1000;
  const startPosition = useRef(new THREE.Vector3());
  const targetPosition = useRef(new THREE.Vector3());

  useFrame(() => {
    if (transitionStartTime.current !== null) {
      const elapsed = Date.now() - transitionStartTime.current;
      const progress = Math.min(elapsed / transitionDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      if (progress < 1) {
        camera.position.lerpVectors(
          startPosition.current,
          targetPosition.current,
          eased
        );
        
        if (controlsRef.current) {
          const currentTarget = controlsRef.current.target;
          currentTarget.lerp(cameraTarget.current, eased);
          controlsRef.current.update();
        }
      } else {
        transitionStartTime.current = null;
      }
    }
  });

  const handleLayerClick = (type: LayerType) => {
    if (focusedLayer === type) {
      setFocusedLayer(null);
      transitionStartTime.current = Date.now();
      startPosition.current.copy(camera.position);
      targetPosition.current.copy(initialCameraPosition);
      cameraTarget.current.set(0, 0, 0);
    } else {
      setFocusedLayer(type);
      const section = sections.find(s => s.type === type);
      if (section) {
        transitionStartTime.current = Date.now();
        startPosition.current.copy(camera.position);
        
        const layerPos = new THREE.Vector3(...section.position);
        const offset = new THREE.Vector3(0, 0, 6);
        targetPosition.current.copy(layerPos).add(offset);
        cameraTarget.current.copy(layerPos);
      }
    }
    setHighlightedSection(type);
  };

  return { handleLayerClick };
}