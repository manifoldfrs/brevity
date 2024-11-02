import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { query } from "./_generated/server";

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

    try {
      // Generate the summary
      const summary = await ctx.scheduler.runAfter(0, api.summarize.summarizeContent, {
        content: args.content
      });

      // Update the content with the generated summary
      await ctx.db.patch(contentId, { summary });
    } catch (error) {
      console.error("Failed to generate summary:", error);
      // Update with error message if summary generation fails
      await ctx.db.patch(contentId, {
        summary: "Failed to generate summary. Please try again."
      });
    }

    return contentId;
  },
});

export const listContents = query({
  args: {},
  handler: async (ctx) => {
    const contents = await ctx.db
      .query("contents")
      .order("desc")
      .take(10);
    return contents;
  },
});