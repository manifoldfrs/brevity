import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contents: defineTable({
    text: v.string(),
    createdAt: v.number(),
    summary: v.optional(v.string()),
    wordCount: v.number(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    retryCount: v.optional(v.number()),
  }),
});

const requiredEnvVars = ['VITE_CONVEX_URL', 'VITE_API_URL'] as const;

export const validateEnv = () => {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !import.meta.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};
