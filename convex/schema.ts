import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contents: defineTable({
    text: v.string(),
    createdAt: v.number(),
    summary: v.optional(v.string()),
  }),
});
