"use client";

import { useMemo } from 'react';

type UseSceneEffectsProps = {
  powerMode: boolean;
};

export function useSceneEffects({ powerMode }: UseSceneEffectsProps) {
  const lights = useMemo(() => (
    <>
      <ambientLight intensity={powerMode ? 1 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={powerMode ? 3 : 1} />
      
      {powerMode && (
        <pointLight 
          position={[
            Math.sin(Date.now() * 0.001) * 15,
            Math.cos(Date.now() * 0.001) * 15,
            5
          ]} 
          intensity={2}
          color="#00ffff"
        />
      )}
    </>
  ), [powerMode]);

  return { lights };
}