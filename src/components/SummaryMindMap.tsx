import React from 'react';
import MindMap, { Node } from 'react-mindmap';

interface SummaryMindMapProps {
  nodes: Node[];
  onNodeClick: (nodeId: string) => void;
}

export const SummaryMindMap: React.FC<SummaryMindMapProps> = ({ nodes, onNodeClick }) => {
  return (
    <MindMap
      nodes={nodes}
      onNodeClick={onNodeClick}
      options={{
        autoExpand: true,
        nodeProps: { style: { fill: '#4ECDC4' } },
      }}
    />
  );
};
