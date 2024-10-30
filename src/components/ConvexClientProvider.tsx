import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

interface ConvexClientProviderProps {
  children: ReactNode;
}

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};