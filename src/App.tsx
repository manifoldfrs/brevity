import React from 'react';
import { FloatingPanels } from './components/FloatingPanels';
import { ContentUpload } from './components/ContentUpload';
import { ConvexTest } from './components/ConvexTest';
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export const App: React.FC = () => {
  const uploadContent = useMutation(api.content.uploadContent);

  const handleUpload = async (content: string) => {
    try {
      await uploadContent({ content });
      console.log('Content uploaded successfully');
    } catch (error) {
      console.error('Error uploading content:', error);
    }
  };

  return (
    <div className="discovery-container">
      <FloatingPanels />
      <ContentUpload onUpload={handleUpload} />
      <ConvexTest />
    </div>
  );
};
