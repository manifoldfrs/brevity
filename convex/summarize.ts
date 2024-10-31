import { action } from "./_generated/server";
import { v } from "convex/values";
import fetch from "node-fetch";

// Enable Node.js environment
export const summarizeContent = action({
  args: {
    content: v.string(),
  },
  // Use Node.js environment to interact with LLM libraries
  handler: async (ctx, args) => {
    "use node";

    // Call the FastAPI endpoint
    const response = await fetch("http://localhost:8000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: args.content }),
    });

    const data = await response.json();
    return data.summary;
  },
});