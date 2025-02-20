"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { LAYER_COLORS } from './constants';
import { LayerType } from './types';
import { DataFlowLine } from './DataFlowLine';
import { InputLayer } from './layers/InputLayer';
import { CNNBlock } from './layers/CNNBlock';
import { TransformerBlock } from './layers/TransformerBlock';
import { RNNBlock } from './layers/RNNBlock';
import { OutputLayer } from './layers/OutputLayer';
import { MLPBlock } from './layers/MLPBlock';
import { GraphBlock } from './layers/GraphBlock';
import { ResidualBlock } from './layers/ResidualBlock';
import { NormalizationBlock } from './layers/NormalizationBlock';
import { AttentionBlock } from './layers/AttentionBlock';
import { AnalysisResult } from '@/lib/model/types';
import { EmbeddingBlock } from './layers/EmbeddingBlock';
import { PoolingBlock } from './layers/PoolingBlock';
import { DropoutBlock } from './layers/DropoutBlock';
import { FlattenBlock } from './layers/FlattenBlock';

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
  const initialCameraPosition = useMemo(() => new THREE.Vector3(0, 2, 50), []);
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const transitionStartTime = useRef<number | null>(null);
  const transitionDuration = 1000; // 1 second transition
  const startPosition = useRef(new THREE.Vector3());
  const targetPosition = useRef(new THREE.Vector3());
  
  useEffect(() => {
    camera.position.copy(initialCameraPosition);
  }, [camera, initialCameraPosition]);

  // Generate layout based on analysis result or use default layout
  const sections = useMemo(() => generateLayout(analysisResult), [analysisResult]);

  // Generate connections
  const connections = useMemo(() => generateConnections(sections, analysisResult), [sections, analysisResult]);

  const Components = {
    input: InputLayer,
    cnn: CNNBlock,
    transformer: TransformerBlock,
    rnn: RNNBlock,
    output: OutputLayer,
    mlp: MLPBlock,
    graph: GraphBlock,
    residual: ResidualBlock,
    normalization: NormalizationBlock,
    attention: AttentionBlock,
    embedding: EmbeddingBlock,
    pooling: PoolingBlock,
    dropout: DropoutBlock,
    flatten: FlattenBlock
  } as const;

  // Update the type to match the components
  type LayerType = keyof typeof Components;

  const handleLayerClick = (type: LayerType) => {
    if (focusedLayer === type) {
      // Return to overview
      setFocusedLayer(null);
      transitionStartTime.current = Date.now();
      startPosition.current.copy(camera.position);
      targetPosition.current.copy(initialCameraPosition);
      cameraTarget.current.set(0, 0, 0);
    } else {
      // Focus on layer
      setFocusedLayer(type);
      const section = sections.find(s => s.type === type);
      if (section) {
        transitionStartTime.current = Date.now();
        startPosition.current.copy(camera.position);
        
        // Calculate target position based on layer position
        const layerPos = new THREE.Vector3(...section.position);
        const offset = new THREE.Vector3(0, 0, 6); // Viewing distance
        targetPosition.current.copy(layerPos).add(offset);
        cameraTarget.current.copy(layerPos);
      }
    }
    setHighlightedSection(type);
  };

  // Smooth camera animation
  useFrame(() => {
    if (transitionStartTime.current !== null) {
      const elapsed = Date.now() - transitionStartTime.current;
      const progress = Math.min(elapsed / transitionDuration, 1);
      
      // Smooth easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      
      if (progress < 1) {
        // Interpolate position
        camera.position.lerpVectors(
          startPosition.current,
          targetPosition.current,
          eased
        );
        
        // Interpolate look-at target
        if (controlsRef.current) {
          const currentTarget = controlsRef.current.target;
          currentTarget.lerp(cameraTarget.current, eased);
          controlsRef.current.update();
        }
      } else {
        transitionStartTime.current = null;
      }
    }
    
    // Subtle camera movement in power mode
    if (powerMode && !focusedLayer && !transitionStartTime.current) {
      camera.position.y += Math.sin(Date.now() * 0.001) * 0.01;
      camera.position.x += Math.cos(Date.now() * 0.001) * 0.01;
    }
  });

  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        position={[0, 2, 50]}
        fov={35}
      />
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
        const Component = Components[type];
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
        maxDistance={80}
        minDistance={10}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        enabled={!focusedLayer && !transitionStartTime.current}
      />
    </>
  );
}

function generateLayout(analysisResult: AnalysisResult | null | undefined) {
  const radius = 8;
  const defaultLayout = [
    { id: 'input', type: 'input' as LayerType, position: [-radius * 1.5, radius * 0.5, 0] },
    { id: 'cnn', type: 'cnn' as LayerType, position: [-radius, radius * 0.8, 0] },
    { id: 'mlp', type: 'mlp' as LayerType, position: [-radius * 0.5, radius, 0] },
    { id: 'transformer', type: 'transformer' as LayerType, position: [0, radius, 0] },
    { id: 'attention', type: 'attention' as LayerType, position: [radius * 0.5, radius, 0] },
    { id: 'rnn', type: 'rnn' as LayerType, position: [radius, radius * 0.8, 0] },
    { id: 'graph', type: 'graph' as LayerType, position: [radius * 1.5, radius * 0.5, 0] },
    { id: 'residual', type: 'residual' as LayerType, position: [radius * 1.5, -radius * 0.5, 0] },
    { id: 'normalization', type: 'normalization' as LayerType, position: [radius, -radius * 0.8, 0] },
    { id: 'output', type: 'output' as LayerType, position: [0, -radius, 0] }
  ];

  if (!analysisResult?.graph?.nodes) {
    return defaultLayout;
  }

  const depths = new Map<string, number>();
  const depthGroups = new Map<number, string[]>();
  const visited = new Set<string>();
  
  function calculateDepth(nodeId: string, depth: number = 0) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    depths.set(nodeId, depth);
    if (!depthGroups.has(depth)) {
      depthGroups.set(depth, []);
    }
    depthGroups.get(depth)?.push(nodeId);
    
    analysisResult.graph.edges
      .filter(e => e.from === nodeId)
      .forEach(edge => calculateDepth(edge.to, depth + 1));
  }
  
  analysisResult.graph.nodes
    .filter(n => n.type === 'input')
    .forEach(n => calculateDepth(n.id));

  const maxDepth = Math.max(...Array.from(depths.values()));
  
  // Adjust radius based on number of nodes
  const totalNodes = analysisResult.graph.nodes.length;
  const adjustedRadius = radius * (1 + Math.log10(totalNodes / 10 + 1));

  return analysisResult.graph.nodes.map(node => {
    const depth = depths.get(node.id) || 0;
    const depthNodes = depthGroups.get(depth) || [];
    const nodeIndex = depthNodes.indexOf(node.id);
    const nodesInLayer = depthNodes.length;
    
    // Spread nodes more when there are many in a layer
    const spreadFactor = Math.max(1, Math.log2(nodesInLayer + 1));
    
    // Calculate angles with wider spread for layers with many nodes
    const baseAngle = (depth / maxDepth) * Math.PI * 1.5 - Math.PI * 0.75;
    const angleOffset = ((nodeIndex - (nodesInLayer - 1) / 2) * spreadFactor) * (Math.PI / 12);
    const angle = baseAngle + angleOffset;
    
    return {
      id: node.id,
      type: node.type as LayerType,
      position: [
        adjustedRadius * Math.cos(angle),
        adjustedRadius * Math.sin(angle),
        adjustedRadius * 0.3 * Math.sin(angleOffset) // Increased Z-spread
      ]
    };
  });
}

function generateConnections(sections: any[], analysisResult: AnalysisResult | null | undefined) {
  // Default connections
  const defaultPaths = [
    { start: 'input', end: 'cnn' },
    { start: 'cnn', end: 'mlp' },
    { start: 'mlp', end: 'transformer' },
    { start: 'transformer', end: 'attention' },
    { start: 'attention', end: 'rnn' },
    { start: 'rnn', end: 'graph' },
    { start: 'graph', end: 'residual' },
    { start: 'residual', end: 'normalization' },
    { start: 'normalization', end: 'output' }
  ];

  if (!analysisResult?.graph?.edges) {
    return defaultPaths.map(({ start, end }) => {
      const startSection = sections.find(s => s.id === start);
      const endSection = sections.find(s => s.id === end);
      
      if (!startSection || !endSection) return null;

      return {
        points: createCurvedPath(startSection.position, endSection.position, 2),
        color: LAYER_COLORS[endSection.type],
        startSection: startSection.type,
        endSection: endSection.type
      };
    }).filter(Boolean);
  }

  return analysisResult.graph.edges.map(edge => {
    const startNode = analysisResult.graph.nodes.find(n => n.id === edge.from);
    const endNode = analysisResult.graph.nodes.find(n => n.id === edge.to);
    
    if (!startNode || !endNode) return null;
    
    const startSection = sections.find(s => s.id === edge.from);
    const endSection = sections.find(s => s.id === edge.to);
    
    if (!startSection || !endSection) return null;

    return {
      points: createCurvedPath(startSection.position, endSection.position, 2),
      color: LAYER_COLORS[endNode.type],
      startSection: startNode.type,
      endSection: endNode.type
    };
  }).filter(Boolean);
}

function createCurvedPath(start: number[], end: number[], height: number = 2) {
  const points = [];
  const midPoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 + height,
    (start[2] + end[2]) / 2
  ];
  
  for (let t = 0; t <= 1; t += 0.05) {
    const x = Math.pow(1 - t, 2) * start[0] + 2 * (1 - t) * t * midPoint[0] + Math.pow(t, 2) * end[0];
    const y = Math.pow(1 - t, 2) * start[1] + 2 * (1 - t) * t * midPoint[1] + Math.pow(t, 2) * end[1];
    const z = Math.pow(1 - t, 2) * start[2] + 2 * (1 - t) * t * midPoint[2] + Math.pow(t, 2) * end[2];
    
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}