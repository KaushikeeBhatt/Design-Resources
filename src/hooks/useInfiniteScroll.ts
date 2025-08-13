import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps<T> {
  items: T[];
  itemsPerPage?: number;
  threshold?: number;
}

interface UseInfiniteScrollReturn<T> {
  visibleItems: T[];
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
  reset: () => void;
}

export const useInfiniteScroll = <T>({
  items,
  itemsPerPage = 12,
  threshold = 300
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> => {
  const [visibleCount, setVisibleCount] = useState(Math.min(4, itemsPerPage)); // Start with even smaller batch
  const [isLoading, setIsLoading] = useState(false);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      // Reduced delay for faster loading, only for subsequent loads
      const delay = visibleCount === itemsPerPage ? 0 : 150; // No delay for first load
      setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + itemsPerPage, items.length));
        setIsLoading(false);
      }, delay);
    }
  }, [hasMore, isLoading, itemsPerPage, items.length, visibleCount]);

  const reset = useCallback(() => {
    setVisibleCount(itemsPerPage);
    setIsLoading(false);
  }, [itemsPerPage]);

  // Reset when items change (e.g., when filtering)
  useEffect(() => {
    reset();
  }, [items, reset]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (hasMore && !isLoading) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - threshold) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, loadMore, threshold]);

  return {
    visibleItems,
    hasMore,
    isLoading,
    loadMore,
    reset
  };
};
