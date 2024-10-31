import React, { useEffect, useState } from 'react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const ContentDisplay: React.FC = () => {
  const contents = useQuery(api.content.listContents) || [];

  return (
    <div className="content-display">
      {contents.map((item) => (
        <div key={item._id}>
          <h3>Original Content</h3>
          <p>{item.text}</p>
          <h3>Summary</h3>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  );
};
