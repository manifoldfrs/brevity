import { Id } from './_generated/dataModel';
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertContent = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args): Promise<Id<'contents'>> => {
    const contentId = await ctx.db.insert("contents", {
      text: args.content,
      createdAt: Date.now(),
      summary: "",
    });
    return contentId;
  },
});

export const updateContentSummary = mutation({
  args: {
    contentId: v.id("contents"),
    summary: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.contentId, { summary: args.summary });
  },
});
