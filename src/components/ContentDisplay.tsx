import React, { useState, useEffect, useCallback, memo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SummaryMindMap } from './SummaryMindMap';
import { KeyPointCarousel } from './KeyPointCarousel';
import { Node, Edge } from 'react-flow-renderer';
import { LoadingSkeleton } from './LoadingSkeleton';
import { PerformanceMonitor } from '../utils/monitoring';
import { APIError } from '../utils/errors';

interface ContentDisplayProps {
  className?: string;
  onError?: (error: Error) => void;
}

const performanceMonitor = new PerformanceMonitor();

export const ContentDisplay: React.FC<ContentDisplayProps> = memo(({ className = '', onError }) => {
  const contents = useQuery(api.contentQueries.listContents);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        await performanceMonitor.trackMetric('content-load', async () => {
          if (contents !== undefined) {
            setIsLoading(false);
          }
        });
      } catch (err) {
        const error = err instanceof Error ? err : new APIError('Failed to load content', 500);
        setError(error);
        onError?.(error);
      }
    };

    loadContent();
  }, [contents, onError]);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  if (error) {
    return (
      <div
        className="error-state"
        role="alert"
        aria-live="polite"
      >
        <h2>Error Loading Content</h2>
        <p>{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          aria-label="Retry loading content"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton rows={3} height="150px" />;
  }

  if (!contents?.length) {
    return (
      <div
        className="empty-state"
        role="status"
        aria-label="No content available"
      >
        <h2>No Content Available</h2>
        <p>Upload some content to get started</p>
      </div>
    );
  }

  const elements = parseSummaryToElements(contents.summary);
  const keyPoints = getKeyPointsForNode(selectedNodeId);

  return (
    <div
      className={`content-display ${className}`.trim()}
      role="main"
      aria-live="polite"
    >
      <SummaryMindMap
        elements={elements}
        onNodeClick={handleNodeClick}
        aria-label="Content summary mind map"
      />
      {selectedNodeId && keyPoints && (
        <div
          className="carousel-container"
          aria-label="Key points carousel"
        >
          <KeyPointCarousel keyPoints={keyPoints} />
        </div>
      )}
    </div>
  );
});

ContentDisplay.displayName = 'ContentDisplay';

const parseSummaryToElements = (summary: string): (Node | Edge)[] => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  try {
    const sentences = summary.split('.').filter(s => s.trim().length > 0);

    nodes.push({
      id: 'root',
      data: { label: 'Summary' },
      position: { x: 250, y: 0 },
    });

    sentences.forEach((sentence, index) => {
      const nodeId = `node-${index}`;
      nodes.push({
        id: nodeId,
        data: { label: sentence.trim() },
        position: {
          x: 250 + Math.cos(index * (2 * Math.PI / sentences.length)) * 200,
          y: 100 + Math.sin(index * (2 * Math.PI / sentences.length)) * 200,
        },
      });

      edges.push({
        id: `edge-${index}`,
        source: 'root',
        target: nodeId,
        animated: true,
      });
    });
  } catch (error) {
    console.error('Error parsing summary:', error);
  }

  return [...nodes, ...edges];
};

const getKeyPointsForNode = (nodeId: string | null): string[] => {
  if (!nodeId) return [];

  try {
    // Implement your data retrieval logic here
    // This is a placeholder implementation
    return [
      'Key insight from the selected section',
      'Important detail or finding',
      'Relevant context or background',
    ];
  } catch (error) {
    console.error('Error getting key points:', error);
    return [];
  }
};
