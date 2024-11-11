import React from 'react';

interface SummaryScrollerProps {
  content: string;
  summarySentences: string[];
}

export const SummaryScroller: React.FC<SummaryScrollerProps> = ({ content, summarySentences }) => {
  const highlightedContent = content.split('. ').map((sentence, index) => {
    const isHighlighted = summarySentences.includes(sentence.trim());
    return (
      <span key={index} className={isHighlighted ? 'highlight' : ''}>
        {sentence}.
      </span>
    );
  });

  return <div className="summary-scroller">{highlightedContent}</div>;
};
