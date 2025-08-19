import { useState, useEffect, useCallback } from 'react';
import {
  isResourceBookmarked,
  toggleBookmarkWithNotification,
  addBookmarkChangeListener,
} from '../utils/bookmarkManager';

export function useBookmarks(resourceId: string) {
  const [isBookmarked, setIsBookmarked] = useState(() => isResourceBookmarked(resourceId));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleBookmarkChange = () => {
      setIsBookmarked(isResourceBookmarked(resourceId));
    };

    const unsubscribe = addBookmarkChangeListener(handleBookmarkChange);

    // Re-check bookmark status when the component mounts or resourceId changes
    handleBookmarkChange();

    return () => {
      unsubscribe();
    };
  }, [resourceId]);

  const toggleBookmark = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    await toggleBookmarkWithNotification(resourceId);
    setIsLoading(false);
  }, [resourceId, isLoading]);

  return { isBookmarked, toggleBookmark, isLoading };
}
