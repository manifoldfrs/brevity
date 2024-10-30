import React from 'react';
import { FloatingPanels } from './components/FloatingPanels';
import { ContentUpload } from './components/ContentUpload';

export const App: React.FC = () => {
  const handleUpload = async (content: string) => {
    try {
      // TODO: Implement Convex mutation here
      console.log('Content received:', content);
    } catch (error) {
      console.error('Error uploading content:', error);
    }
  };

  return (
    <div className="discovery-container">
      <FloatingPanels />
      <ContentUpload onUpload={handleUpload} />
    </div>
  );
};
