   import React from 'react';
   import { render, screen, waitFor } from '@testing-library/react';
   import { ContentDisplay } from '../../src/components/ContentDisplay';
   import { useQuery } from 'convex/react';

   jest.mock('convex/react');

   describe('ContentDisplay with Delays', () => {
     test('displays loading skeleton during delay', async () => {
       let resolveData: (value: unknown) => void;
       const dataPromise = new Promise((resolve) => {
         resolveData = resolve;
       });

       (useQuery as jest.Mock).mockReturnValueOnce(undefined).mockReturnValueOnce(dataPromise);

       render(<ContentDisplay />);
       expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();

       // Simulate data loading after delay
       resolveData([{ summary: 'Delayed content' }]);

       await waitFor(() => {
         expect(screen.getByText('Delayed content')).toBeInTheDocument();
       });
     });
   });