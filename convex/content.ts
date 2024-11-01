import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const uploadContent = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Insert the content into the database
    const contentId = await ctx.db.insert("contents", {
      text: args.content,
      createdAt: Date.now(),
      summary: "",
    });

    // Generate the summary by calling the action immediately (0ms delay)
    const summary = await ctx.scheduler.runAfter(0, api.summarize.summarizeContent, {
      content: args.content
    });

    // Update the content with the generated summary
    await ctx.db.patch(contentId, { summary });

    return contentId;
  },
});