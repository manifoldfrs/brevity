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

const parseSummaryToElements = (summary: string): (Node | Edge)[] => {
  const sentences = summary.split('.').filter(s => s.trim().length > 0);
  const nodes: Node[] = sentences.map((sentence, index) => ({
    id: `node-${index}`,
    data: { label: sentence.trim() },
    position: { x: (index % 5) * 200, y: Math.floor(index / 5) * 100 },
  }));

  const edges: Edge[] = nodes.slice(1).map((node, index) => ({
    id: `edge-${index}`,
    source: nodes[index].id,
    target: node.id,
    animated: true,
  }));

  return [...nodes, ...edges];
};
