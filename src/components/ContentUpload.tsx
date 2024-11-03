import React, { useState } from 'react';

interface ContentUploadProps {
  onUpload: (content: string) => Promise<void>;
}

export const ContentUpload: React.FC<ContentUploadProps> = ({ onUpload }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onUpload(content);
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to summarize content');
      console.error('Upload error:', err);
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
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
