import { useState, useEffect } from 'react';
import { getBookmarkStats, addBookmarkChangeListener } from '../utils/bookmarkManager';

export function useBookmarkStats() {
  const [stats, setStats] = useState(getBookmarkStats());

  useEffect(() => {
    const handleBookmarksChange = () => {
      setStats(getBookmarkStats());
    };

    const unsubscribe = addBookmarkChangeListener(handleBookmarksChange);

    // Initial sync
    handleBookmarksChange();

    return () => {
      unsubscribe();
    };
  }, []);

  return stats;
}
