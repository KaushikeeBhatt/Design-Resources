// Utility functions to manage bookmarks and likes in localStorage

export interface BookmarkData {
    resourceId: string;
    timestamp: number;
  }
  
  export interface LikeData {
    resourceId: string;
    timestamp: number;
  }
  
  // Get all bookmarked resource IDs
  export function getAllBookmarks(): BookmarkData[] {
    const bookmarks: BookmarkData[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bookmark-') && localStorage.getItem(key) === 'true') {
        const resourceId = key.replace('bookmark-', '');
        bookmarks.push({
          resourceId,
          timestamp: Date.now() // We don't store timestamp currently, but could be added
        });
      }
    }
    
    return bookmarks;
  }
  
  // Get all liked resource IDs
  export function getAllLikes(): LikeData[] {
    const likes: LikeData[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('like-') && localStorage.getItem(key) === 'true') {
        const resourceId = key.replace('like-', '');
        likes.push({
          resourceId,
          timestamp: Date.now()
        });
      }
    }
    
    return likes;
  }
  
  // Check if a resource is bookmarked
  export function isResourceBookmarked(resourceId: string): boolean {
    return localStorage.getItem(`bookmark-${resourceId}`) === 'true';
  }
  
  // Check if a resource is liked
  export function isResourceLiked(resourceId: string): boolean {
    return localStorage.getItem(`like-${resourceId}`) === 'true';
  }
  
  // Toggle bookmark status
  export function toggleBookmark(resourceId: string): boolean {
    const currentStatus = isResourceBookmarked(resourceId);
    const newStatus = !currentStatus;
    localStorage.setItem(`bookmark-${resourceId}`, newStatus.toString());
    return newStatus;
  }
  
  // Toggle like status
  export function toggleLike(resourceId: string): boolean {
    const currentStatus = isResourceLiked(resourceId);
    const newStatus = !currentStatus;
    localStorage.setItem(`like-${resourceId}`, newStatus.toString());
    return newStatus;
  }
  
  // Clear all bookmarks
  export function clearAllBookmarks(): void {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bookmark-')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
  
  // Clear all likes
  export function clearAllLikes(): void {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('like-')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
  
  // Export bookmarks as JSON (for backup)
  export function exportBookmarks(): string {
    const bookmarks = getAllBookmarks();
    return JSON.stringify(bookmarks, null, 2);
  }
  
  // Export likes as JSON (for backup)
  export function exportLikes(): string {
    const likes = getAllLikes();
    return JSON.stringify(likes, null, 2);
  }
  
  // Get statistics
  export function getBookmarkStats() {
    return {
      totalBookmarks: getAllBookmarks().length,
      totalLikes: getAllLikes().length
    };
  }
  
  // Event system for bookmark changes
  type BookmarkChangeListener = () => void;
  const bookmarkChangeListeners: BookmarkChangeListener[] = [];

  export function addBookmarkChangeListener(listener: BookmarkChangeListener) {
    bookmarkChangeListeners.push(listener);
    return () => {
      const index = bookmarkChangeListeners.indexOf(listener);
      if (index > -1) {
        bookmarkChangeListeners.splice(index, 1);
      }
    };
  }

  function notifyBookmarkChange() {
    bookmarkChangeListeners.forEach(listener => listener());
  }

  // Updated toggle functions that notify listeners
  export function toggleBookmarkWithNotification(resourceId: string): boolean {
    const result = toggleBookmark(resourceId);
    notifyBookmarkChange();
    return result;
  }

  export function toggleLikeWithNotification(resourceId: string): boolean {
    const result = toggleLike(resourceId);
    notifyBookmarkChange();
    return result;
  }

  export function clearAllBookmarksWithNotification(): void {
    clearAllBookmarks();
    notifyBookmarkChange();
  }

  export function clearAllLikesWithNotification(): void {
    clearAllLikes();
    notifyBookmarkChange();
  }