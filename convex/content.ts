import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const uploadContent = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const contentId = await ctx.db.insert("contents", {
      text: args.content,
      createdAt: Date.now(),
      summary: "",
    });
    return contentId;
  },
});