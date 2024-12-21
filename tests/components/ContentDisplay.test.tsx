   import React from 'react';
   import { render, screen, waitFor } from '@testing-library/react';
   import { ContentDisplay } from '../../src/components/ContentDisplay';
   import { useQuery } from 'convex/react';
   import { api } from '../../convex/_generated/api';

   jest.mock('convex/react');

   describe('ContentDisplay Component', () => {
     beforeEach(() => {
       jest.resetAllMocks();
     });

     test('displays loading state initially', () => {
       (useQuery as jest.Mock).mockReturnValue(undefined);
       render(<ContentDisplay />);
       expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
     });

     test('displays error state when an error occurs', () => {
       const error = new Error('Failed to fetch data');
       (useQuery as jest.Mock).mockReturnValue({ error });
       render(<ContentDisplay onError={jest.fn()} />);
       expect(screen.getByRole('alert')).toHaveTextContent('Error Loading Content');
     });

     test('displays empty state when there is no content', () => {
       (useQuery as jest.Mock).mockReturnValue([]);
       render(<ContentDisplay />);
       expect(screen.getByRole('status')).toHaveTextContent('No Content Available');
     });

     test('renders content correctly when data is available', async () => {
       const mockContent = [{ summary: 'Test summary' }];
       (useQuery as jest.Mock).mockReturnValue(mockContent);
       render(<ContentDisplay />);
       await waitFor(() => {
         expect(screen.getByLabelText('Content summary mind map')).toBeInTheDocument();
       });
     });
   });