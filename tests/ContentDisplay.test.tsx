import { render, screen, waitFor } from '@testing-library/react';
import { ContentDisplay } from '../../src/components/ContentDisplay';
import { useQuery } from 'convex/react';

jest.mock('convex/react');

describe('ContentDisplay', () => {
  it('shows loading state initially', () => {
    (useQuery as jest.Mock).mockReturnValue(undefined);
    render(<ContentDisplay />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error state when query fails', () => {
    (useQuery as jest.Mock).mockReturnValue(new Error('Failed to fetch'));
    render(<ContentDisplay />);
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });
});