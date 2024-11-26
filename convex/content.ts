import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const uploadContent = action({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args): Promise<Doc<"contents"> | null> => {
    "use node";

    try {
      // Insert the content into the database
      const contentId = await ctx.runMutation(api.contentMutations.insertContent, {
        content: args.content,
      });

      // Generate the summary by calling the external API
      const summary = await ctx.runAction(api.summarize.summarizeContent, {
        content: args.content,
      });

      // Update the content with the generated summary
      await ctx.runMutation(api.contentMutations.updateContentSummary, {
        contentId,
        summary,
      });

      // Optionally fetch the updated content using the query
      const updatedContent = await ctx.runQuery(
        api.contentQueries.listContents,
        {}
      );

      return updatedContent;
    } catch (error) {
      if (error instanceof NetworkError) {
        throw new Error('Connection failed. Please check your internet connection.');
      } else if (error instanceof RateLimitError) {
        throw new Error('Too many requests. Please try again in a few minutes.');
      } else if (error instanceof ValidationError) {
        throw new Error('Invalid content format. Please check your input.');
      }
      throw new Error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
});