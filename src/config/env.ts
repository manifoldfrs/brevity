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