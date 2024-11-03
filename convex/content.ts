import { action, ActionCtx } from "./_generated/server";
import { v } from "convex/values";

export const uploadContent = action({
  args: {
    content: v.string(),
  },
  handler: async (ctx: ActionCtx, args: { content: string }) => {
    "use node";

    try {
      // Obtain FunctionReferences for the mutations and action
      const insertContentRef = ctx.functions.get("contentMutations:insertContent");
      const updateContentSummaryRef = ctx.functions.get("contentMutations:updateContentSummary");
      const summarizeContentRef = ctx.functions.get("summarize:summarizeContent");

      // Insert the content into the database
      const contentId = await ctx.runMutation(insertContentRef, {
        content: args.content,
      });

      // Generate the summary by calling the external API
      const summary = await ctx.runAction(summarizeContentRef, {
        content: args.content,
      });

      // Update the content with the generated summary
      await ctx.runMutation(updateContentSummaryRef, {
        contentId,
        summary,
      });

      return contentId;
    } catch (error) {
      console.error("Failed to upload content:", error);
      throw new Error("Failed to upload content");
    }
  },
});