import { action } from "./_generated/server";
import { v } from "convex/values";
import fetch from "node-fetch";

// Enable Node.js environment
export const summarizeContent = action({
  args: {
    content: v.string(),
  },
  // Use Node.js environment to interact with LLM libraries
  handler: async (_ctx, args) => {
    "use node";

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: args.content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Summary data:", data);

      if (!data.summary) {
        throw new Error("No summary returned from API");
      }

      return data.summary;
    } catch (error: unknown) {
      console.error("Error in summarizeContent:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return `Error generating summary: ${errorMessage}`;
    }
  },
});