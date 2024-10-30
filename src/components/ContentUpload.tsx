import React, { useState } from 'react';

interface ContentUploadProps {
  onUpload: (content: string) => Promise<void>;
}

export const ContentUpload: React.FC<ContentUploadProps> = ({ onUpload }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onUpload(content);
      setContent('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="content-upload">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your content here..."
        className="content-input"
      />
      <button type="submit" disabled={isLoading || !content}>
        {isLoading ? 'Processing...' : 'Summarize'}
      </button>
    </form>
  );
};
