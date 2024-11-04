import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const ContentDisplay: React.FC = () => {
  const contents = useQuery(api.contentQueries.listContents);

  if (contents === undefined || contents === null) {
    return <div className="content-display">Loading...</div>;
  }

  return (
    <div className="content-display">
      <div key={contents._id} className="content-card">
        <div className="timestamp">
          {new Date(contents.createdAt).toLocaleString()}
        </div>
        <div className="summary-section">
          <h3>Summary</h3>
          <p>{contents.summary || "Generating summary..."}</p>
        </div>
      </div>
    </div>
  );
};
