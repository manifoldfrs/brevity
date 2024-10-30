import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export const ConvexTest = () => {
  const uploadContent = useMutation(api.content.uploadContent);
  const [isLoading, setIsLoading] = useState(false);
  const testMessage = "Test content " + new Date().toISOString();

  const handleTestUpload = async () => {
    console.log("Button clicked");
    setIsLoading(true);
    try {
      console.log("Attempting to upload:", testMessage);
      const id = await uploadContent({ content: testMessage });
      console.log('Content uploaded with ID:', id);
    } catch (error) {
      console.error('Upload failed:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
    } finally {
      setIsLoading(false);
      console.log("Upload attempt completed");
    }
  };

  console.log("ConvexTest component rendered");

  return (
    <div className="convex-test" style={{ position: 'relative', zIndex: 100 }}>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("Direct click test");
          handleTestUpload();
        }}
        disabled={isLoading}
        style={{
          cursor: 'pointer',
          position: 'relative',
          zIndex: 100,
          background: '#FF6B6B',
          padding: '10px 20px',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {isLoading ? 'Uploading...' : 'Test Convex Upload'}
      </button>
    </div>
  );
};
