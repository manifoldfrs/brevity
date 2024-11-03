import { query } from "./_generated/server";
import { api } from "./_generated/api";

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
