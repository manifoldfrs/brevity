export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .trim();
};

export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};