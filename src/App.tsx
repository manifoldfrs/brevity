import React from 'react';
import { FloatingPanels } from './components/FloatingPanels';
import { ContentUpload } from './components/ContentUpload';
import { ContentDisplay } from './components/ContentDisplay';
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";

export const App: React.FC = () => {
  const uploadContent = useAction(api.content.uploadContent);

  const handleUpload = async (content: string) => {
    try {
      await uploadContent({ content });
      console.log('Content uploaded successfully');
    } catch (error) {
      console.error('Error uploading content:', error);
      throw error;
    }
  };

  return (
    <div className="discovery-container">
      <FloatingPanels />
      <ContentUpload onUpload={handleUpload} />
      <ContentDisplay />
    </div>
  );
};
