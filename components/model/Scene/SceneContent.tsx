"use client";

import { DataFlowLine } from '../DataFlowLine';
import { LayerComponents } from './LayerComponents';
import { LayerType } from '../types';
import { AnalysisResult } from '@/lib/model/types';

type SceneContentProps = {
  sections: any[];
  connections: any[];
  highlightedSection: LayerType | null;
  powerMode: boolean;
  focusedLayer: LayerType | null;
  setHighlightedSection: (section: LayerType | null) => void;
  handleLayerClick: (type: LayerType) => void;
  analysisResult?: AnalysisResult | null;
};

export function SceneContent({
  sections,
  connections,
  highlightedSection,
  powerMode,
  focusedLayer,
  setHighlightedSection,
  handleLayerClick,
  analysisResult
}: SceneContentProps) {
  return (
    <>
      {connections.map((connection, idx) => (
        <DataFlowLine
          key={`${connection.startSection}-${connection.endSection}-${idx}`}
          points={connection.points}
          color={connection.color}
          powerMode={powerMode}
          isHighlighted={
            highlightedSection === connection.startSection ||
            highlightedSection === connection.endSection
          }
        />
      ))}
      
      {sections.map(({ type, position, id }) => {
        const Component = LayerComponents[type];
        const nodeData = analysisResult?.graph?.nodes?.find(node => node.id === id);
        
        return (
          <Component
            key={id || type}
            position={position as [number, number, number]}
            isHighlighted={highlightedSection === type}
            onPointerOver={() => !focusedLayer && setHighlightedSection(type)}
            onPointerOut={() => !focusedLayer && setHighlightedSection(null)}
            powerMode={powerMode}
            onClick={() => handleLayerClick(type)}
            isFocused={focusedLayer === type}
            nodeData={nodeData}
          />
        );
      })}
    </>
  );
}