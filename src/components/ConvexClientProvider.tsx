import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  throw new Error("VITE_CONVEX_URL is not defined");
}

const convex = new ConvexReactClient(convexUrl);

interface ConvexClientProviderProps {
  children: ReactNode;
}

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};