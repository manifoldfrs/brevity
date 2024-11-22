import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContentUpload } from '../src/components/ContentUpload';

test('Displays warning when content is too short', async () => {
  const { getByText, getByPlaceholderText } = render(<ContentUpload onUpload={jest.fn()} />);
  fireEvent.change(getByPlaceholderText(/paste your content here/i), { target: { value: 'short' } });
  fireEvent.click(getByText(/summarize/i));
  expect(getByText(/content too short/i)).toBeInTheDocument();
});
