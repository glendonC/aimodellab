"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { LayerType } from '../types';
import { AnalysisResult } from '@/lib/model/types';
import { useSceneCamera } from './useSceneCamera';
import { useSceneEffects } from './useSceneEffects';
import { generateLayout, generateConnections } from './layoutUtils';
import { SceneContent } from './SceneContent';
import { SceneControls } from './SceneControls';

type SceneProps = {
  highlightedSection: LayerType | null;
  setHighlightedSection: (section: LayerType | null) => void;
  powerMode: boolean;
  controlsRef: React.RefObject<any>;
  autoRotate: boolean;
  analysisResult?: AnalysisResult | null;
};

export function Scene({ 
  highlightedSection, 
  setHighlightedSection, 
  powerMode,
  controlsRef,
  autoRotate,
  analysisResult
}: SceneProps) {
  const { camera } = useThree();
  const [focusedLayer, setFocusedLayer] = useState<LayerType | null>(null);
  const initialCameraPosition = useMemo(() => new THREE.Vector3(0, 2, 20), []);
  
  useEffect(() => {
    camera.position.copy(initialCameraPosition);
  }, [camera, initialCameraPosition]);

  const sections = useMemo(() => generateLayout(analysisResult), [analysisResult]);
  const connections = useMemo(() => generateConnections(sections, analysisResult), [sections, analysisResult]);

  const { handleLayerClick } = useSceneCamera({
    camera,
    controlsRef,
    focusedLayer,
    setFocusedLayer,
    setHighlightedSection,
    initialCameraPosition,
    sections
  });

  const { lights } = useSceneEffects({ powerMode });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 20]} fov={60} />
      
      {lights}
      
      <SceneContent
        sections={sections}
        connections={connections}
        highlightedSection={highlightedSection}
        powerMode={powerMode}
        focusedLayer={focusedLayer}
        setHighlightedSection={setHighlightedSection}
        handleLayerClick={handleLayerClick}
        analysisResult={analysisResult}
      />

      <SceneControls
        controlsRef={controlsRef}
        focusedLayer={focusedLayer}
        autoRotate={autoRotate}
        powerMode={powerMode}
      />
    </>
  );
}