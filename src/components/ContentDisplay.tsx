import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const ContentDisplay: React.FC = () => {
  const contents = useQuery(api.content.listContents);

  if (contents === undefined) {
    return <div className="content-display">Loading...</div>;
  }

  return (
    <div className="content-display">
      {contents.map((item) => (
        <div key={item._id} className="content-card">
          <div className="timestamp">
            {new Date(item.createdAt).toLocaleString()}
          </div>
          <div className="summary-section">
            <h3>Summary</h3>
            <p>{item.summary || "Generating summary..."}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
