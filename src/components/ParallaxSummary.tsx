import React from 'react';

export const ParallaxSummary: React.FC = () => {
  return (
    <div className="parallax-container">
      <section className="parallax-section" data-speed="2">
        <h2>Introduction</h2>
        <p>First key point...</p>
      </section>
      <section className="parallax-section" data-speed="3">
        <h2>Main Idea</h2>
        <p>Second key point...</p>
      </section>
      {/* More sections */}
    </div>
  );
};
