import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SummaryMindMap } from './SummaryMindMap';
import { KeyPointCarousel } from './KeyPointCarousel';
import { Node, Edge } from 'react-flow-renderer';

export const ContentDisplay: React.FC = () => {
  const contents = useQuery(api.contentQueries.listContents);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  if (!contents) return <div className="content-display">Loading...</div>;

  const elements = parseSummaryToElements(contents.summary);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const keyPoints = getKeyPointsForNode(selectedNodeId);

  return (
    <div className="content-display">
      <SummaryMindMap elements={elements} onNodeClick={handleNodeClick} />
      {selectedNodeId && keyPoints && (
        <div className="carousel-container">
          <KeyPointCarousel keyPoints={keyPoints} />
        </div>
      )}
    </div>
  );
};

// Helper functions
const parseSummaryToElements = (summary: string): (Node | Edge)[] => {
  // Implement parsing logic to convert summary into nodes and edges
  // For example, split the summary into sentences or key points
  const nodes: Node[] = [
    {
      id: 'root',
      data: { label: 'Summary' },
      position: { x: 250, y: 0 },
    },
    // ...additional nodes
  ];

  const edges: Edge[] = [
    { id: 'e1-2', source: 'root', target: '1', animated: true },
    // ...additional edges
  ];

  return [...nodes, ...edges];
};

const getKeyPointsForNode = (nodeId: string | null): string[] => {
  // Retrieve key points based on the selected node
  // Implement your data retrieval logic here
  return nodeId ? ['Detail 1', 'Detail 2', 'Detail 3'] : [];
};
