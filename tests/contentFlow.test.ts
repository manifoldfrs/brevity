import { render, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../../src/App';
import { mockConvexClient } from '../mocks/convex';

describe('Content Flow Integration', () => {
  beforeEach(() => {
    mockConvexClient.reset();
  });

  test('full content upload and summary flow', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const input = getByPlaceholderText(/paste your content/i);
    fireEvent.change(input, { target: { value: 'Test content' } });

    const submitButton = getByText(/summarize/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText(/summary/i)).toBeInTheDocument();
    });
  });
});