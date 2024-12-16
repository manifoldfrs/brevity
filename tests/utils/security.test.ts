   import { sanitizeInput } from '../../src/utils/security';

   describe('sanitizeInput', () => {
     test('removes HTML tags', () => {
       const input = '<script>alert("xss")</script>';
       const output = sanitizeInput(input);
       expect(output).toBe('alert("xss")');
     });

     test('removes javascript: URLs', () => {
       const input = 'javascript:alert("xss")';
       const output = sanitizeInput(input);
       expect(output).toBe('alert("xss")');
     });
   });