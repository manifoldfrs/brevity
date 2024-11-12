import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  OnLoadParams,
} from 'react-flow-renderer';

interface SummaryMindMapProps {
  elements: (Node | Edge)[];
  onNodeClick: (nodeId: string) => void;
}

export const SummaryMindMap: React.FC<SummaryMindMapProps> = ({ elements, onNodeClick }) => {
  const onElementClick = (_: any, element: any) => {
    if (element.id) {
      onNodeClick(element.id);
    }
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
      >
        <MiniMap />
        <Controls />
        <Background color="#AAA" gap={16} />
      </ReactFlow>
    </div>
  );
};
