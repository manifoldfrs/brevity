import React from 'react';
import MindMap from 'react-mindmap';

interface SummaryMindMapProps {
  summary: string;
}

export const SummaryMindMap: React.FC<SummaryMindMapProps> = ({ summary }) => {
  const nodes = parseSummaryToMindMap(summary);

  return (
    <MindMap
      nodes={nodes}
      options={{
        autoExpand: true,
        nodeProps: { style: { fill: '#4ECDC4' } },
      }}
    />
  );
};

// Helper function to parse summary into mind map nodes
const parseSummaryToMindMap = (summary: string) => {
  // Implement parsing logic here
  return [
    { id: 'root', label: 'Summary', parentId: null },
    // ...other nodes
  ];
};
