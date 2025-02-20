"use client";

import * as THREE from 'three';
import { LAYER_COLORS } from '../constants';
import { AnalysisResult } from '@/lib/model/types';

export function generateLayout(analysisResult: AnalysisResult | null | undefined) {
  const radius = 8;
  const defaultLayout = [
    { id: 'input', type: 'input', position: [-radius * 1.5, radius * 0.5, 0] },
    { id: 'cnn', type: 'cnn', position: [-radius, radius * 0.8, 0] },
    { id: 'mlp', type: 'mlp', position: [-radius * 0.5, radius, 0] },
    { id: 'transformer', type: 'transformer', position: [0, radius, 0] },
    { id: 'attention', type: 'attention', position: [radius * 0.5, radius, 0] },
    { id: 'rnn', type: 'rnn', position: [radius, radius * 0.8, 0] },
    { id: 'graph', type: 'graph', position: [radius * 1.5, radius * 0.5, 0] },
    { id: 'residual', type: 'residual', position: [radius * 1.5, -radius * 0.5, 0] },
    { id: 'normalization', type: 'normalization', position: [radius, -radius * 0.8, 0] },
    { id: 'output', type: 'output', position: [0, -radius, 0] }
  ];

  if (!analysisResult?.graph?.nodes) {
    return defaultLayout;
  }

  const depths = new Map<string, number>();
  const visited = new Set<string>();
  
  function calculateDepth(nodeId: string, depth: number = 0) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    depths.set(nodeId, Math.max(depth, depths.get(nodeId) || 0));
    
    analysisResult.graph.edges
      .filter(e => e.from === nodeId)
      .forEach(edge => {
        calculateDepth(edge.to, depth + 1);
      });
  }
  
  analysisResult.graph.nodes
    .filter(n => n.type === 'input')
    .forEach(n => calculateDepth(n.id));
  
  const maxDepth = Math.max(...Array.from(depths.values()));
  
  return analysisResult.graph.nodes.map(node => {
    const depth = depths.get(node.id) || 0;
    const angle = (depth / maxDepth) * Math.PI - Math.PI / 2;
    
    return {
      id: node.id,
      type: node.type,
      position: [
        radius * Math.cos(angle),
        radius * Math.sin(angle),
        0
      ]
    };
  });
}

export function generateConnections(sections: any[], analysisResult: AnalysisResult | null | undefined) {
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