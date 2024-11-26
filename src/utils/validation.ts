export const validateContent = (content: string): string[] => {
  const errors: string[] = [];

  if (content.length < 10) {
    errors.push('Content must be at least 10 characters long');
  }

  if (content.length > 50000) {
    errors.push('Content exceeds maximum length of 50,000 characters');
  }

  if (!/\S/.test(content)) {
    errors.push('Content cannot be empty or only whitespace');
  }

  return errors;
};