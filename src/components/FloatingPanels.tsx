import React from 'react';

interface PanelProps {
  width: number;
  height: number;
  top: string;
  left: string;
  delay: number;
}

const Panel: React.FC<PanelProps> = ({ width, height, top, left, delay }) => (
  <div
    className="panel"
    style={{
      width: `${width}px`,
      height: `${height}px`,
      top,
      left,
      animationDelay: `${delay}s`
    }}
  />
);

export const FloatingPanels: React.FC = () => {
  return (
    <div className="floating-panels">
      <Panel width={200} height={300} top="10%" left="20%" delay={0} />
      <Panel width={150} height={200} top="30%" left="60%" delay={1} />
      <Panel width={250} height={150} top="60%" left="15%" delay={2} />
      <Panel width={180} height={250} top="45%" left="75%" delay={3} />
    </div>
  );
};
