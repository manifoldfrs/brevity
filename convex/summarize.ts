import { action } from "./_generated/server";
import { v } from "convex/values";

// Enable Node.js environment
export const summarizeContent = action({
  args: {
    content: v.string(),
  },
  // Use Node.js environment to interact with LLM libraries
  handler: async (ctx, args) => {
    "use node";

    // Import your LLM client or use an API endpoint
    const { generateSummary } = require("../backend/llm");

    // Generate the summary
    const summary = await generateSummary(args.content);

    // Return the summary
    return summary;
  },
});