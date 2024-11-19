import React, { useState } from 'react';

interface ContentUploadProps {
  onUpload: (content: string) => Promise<void>;
}

interface ErrorState {
  message: string;
  type: 'error' | 'warning';
}

export const ContentUpload: React.FC<ContentUploadProps> = ({ onUpload }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (content.trim().length < 10) {
        setError({ message: 'Content too short', type: 'warning' });
        return;
      }
      await onUpload(content);
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? { message: err.message, type: 'error' } : { message: 'Failed to summarize content', type: 'error' });
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
      {error && <p className={`error-message ${error.type}`}>{error.message}</p>}
    </form>
  );
};
