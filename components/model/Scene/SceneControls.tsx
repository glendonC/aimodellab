"use client";

import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { LayerType } from '../types';

type SceneControlsProps = {
  controlsRef: React.RefObject<any>;
  focusedLayer: LayerType | null;
  autoRotate: boolean;
  powerMode: boolean;
};

export function SceneControls({
  controlsRef,
  focusedLayer,
  autoRotate,
  powerMode
}: SceneControlsProps) {
  return (
    <>
      {powerMode && (
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      )}
      
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={!focusedLayer}
        autoRotate={!focusedLayer && autoRotate}
        autoRotateSpeed={powerMode ? 1 : 0}
        maxDistance={30}
        minDistance={5}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        enabled={!focusedLayer}
      />
    </>
  );
}