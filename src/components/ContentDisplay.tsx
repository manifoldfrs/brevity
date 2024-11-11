import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SummaryMindMap } from './SummaryMindMap';
import { KeyPointCarousel } from './KeyPointCarousel';

export const ContentDisplay: React.FC = () => {
  const contents = useQuery(api.contentQueries.listContents);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  if (!contents) return <div className="content-display">Loading...</div>;

  const nodes = parseSummaryToNodes(contents.summary);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const keyPoints = getKeyPointsForNode(selectedNodeId);

  return (
    <div className="content-display">
      <SummaryMindMap nodes={nodes} onNodeClick={handleNodeClick} />
      {selectedNodeId && keyPoints && (
        <div className="carousel-container">
          <KeyPointCarousel keyPoints={keyPoints} />
        </div>
      )}
    </div>
  );
};

// Helper functions
const parseSummaryToNodes = (summary: string) => {
  // Parse the summary into nodes for the mind map
  // Implement your parsing logic here
  return [
    { id: 'root', label: 'Summary', parentId: null },
    // ...other nodes
  ];
};

const getKeyPointsForNode = (nodeId: string | null) => {
  // Retrieve key points based on the selected node
  // Implement your data retrieval logic here
  return nodeId ? ['Detail 1', 'Detail 2', 'Detail 3'] : [];
};
