import { validateContent } from '../../src/utils/validation';

describe('validateContent', () => {
  test('should return errors for empty content', () => {
    const errors = validateContent('');
    expect(errors).toContain('Content cannot be empty or only whitespace');
  });

  test('should return errors for content exceeding max length', () => {
    const longContent = 'a'.repeat(50001);
    const errors = validateContent(longContent);
    expect(errors).toContain('Content exceeds maximum length');
  });
});