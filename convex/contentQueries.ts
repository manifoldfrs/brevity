import { query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const listContents = query({
  args: {},
  handler: async (ctx) => {
    const cachedResult = await ctx.db
      .system("cacheEntries")
      .withIndex("by_key", q => q.eq("key", "latest_content"))
      .first();

    if (cachedResult && Date.now() - cachedResult.timestamp < 60000) {
      return cachedResult.value;
    }

    const content = await ctx.db
      .query("contents")
      .order("desc")
      .first();

    // Cache for 1 minute
    await ctx.db.insert("cacheEntries", {
      key: "latest_content",
      value: content,
      timestamp: Date.now()
    });

    return content;
  },
});
