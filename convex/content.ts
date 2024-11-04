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
      console.error("Failed to upload content:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to upload content: ${error.message}`);
      }
      throw new Error("Failed to upload content: Unknown error");
    }
  },
});