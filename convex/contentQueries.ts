import { query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const listContents = query({
  args: {},
  handler: async (ctx): Promise<Doc<"contents"> | null> => {
    const content = await ctx.db
      .query("contents")
      .order("desc")
      .first();

    return content;
  },
});
