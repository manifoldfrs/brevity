import { renderHook, act } from '@testing-library/react-hooks';
import { useContentData } from '../../src/hooks/useContentData';
import { useQuery } from 'convex/react';

jest.mock('convex/react');

describe('useContentData Hook', () => {
  test('fetches and returns content data', () => {
    const mockData = [{ summary: 'Hook test summary' }];
    (useQuery as jest.Mock).mockReturnValue(mockData);

    const { result } = renderHook(() => useContentData());
    expect(result.current).toEqual(mockData);
  });

  test('handles loading state', () => {
    (useQuery as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useContentData());
    expect(result.current).toBeUndefined();
  });
});