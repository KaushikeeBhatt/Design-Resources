// Utility functions to manage bookmarks and likes in Supabase and localStorage

import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';

// --- Local Cache for Bookmarks ---
// We use a Set for efficient add/delete/has operations.
let bookmarkedResourceIds = new Set<string>();

// --- Supabase Integration ---

/**
 * Fetches all bookmarks for the current user from Supabase and populates the local cache.
 * This should be called once after the user logs in.
 */
export async function syncBookmarks() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    bookmarkedResourceIds.clear();
    notifyBookmarkChange();
    return;
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .select('resource_id')
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Error fetching bookmarks:', error);
    bookmarkedResourceIds.clear(); // Clear cache on error
  } else {
    const ids = data.map(b => String(b.resource_id));
    bookmarkedResourceIds = new Set(ids);
  }
  
  // Notify components that bookmarks have been updated
  notifyBookmarkChange();
}

// --- Functions using the local cache ---

export interface BookmarkData {
  resourceId: string;
  timestamp: number; // This is not stored in DB, can be removed or kept for UI purposes
}

export interface LikeData {
  resourceId: string;
  timestamp: number;
}

/**
 * Gets all bookmarked resource data from the local cache.
 */
export function getAllBookmarks(): BookmarkData[] {
  return Array.from(bookmarkedResourceIds).map(resourceId => ({
    resourceId,
    timestamp: Date.now(), // Timestamp is not stored in DB, providing current time
  }));
}

// Get all liked resource IDs (remains unchanged, uses localStorage)
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

/**
 * Checks if a resource is bookmarked by looking at the local cache.
 * @param resourceId The ID of the resource to check.
 */
export function isResourceBookmarked(resourceId: string): boolean {
  return bookmarkedResourceIds.has(resourceId);
}

// Check if a resource is liked (remains unchanged, uses localStorage)
export function isResourceLiked(resourceId: string): boolean {
  return localStorage.getItem(`like-${resourceId}`) === 'true';
}

/**
 * Toggles the bookmark status for a resource in Supabase and updates the local cache.
 * @param resourceId The ID of the resource to bookmark/unbookmark.
 * @returns The new bookmark status (true if bookmarked, false otherwise).
 */
export async function toggleBookmark(resourceId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User must be logged in to bookmark items.');
    return isResourceBookmarked(resourceId); // Return current state without changing
  }

  const resourceIdAsNumber = parseInt(resourceId, 10);
  if (isNaN(resourceIdAsNumber)) {
      console.error('Invalid resourceId:', resourceId);
      return false;
  }

  const currentlyBookmarked = isResourceBookmarked(resourceId);
  
  if (currentlyBookmarked) {
    // --- Unbookmark ---
    bookmarkedResourceIds.delete(resourceId); // Optimistic update
    notifyBookmarkChange();
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .match({ user_id: user.id, resource_id: resourceIdAsNumber });

    if (error) {
      console.error('Error unbookmarking resource:', error);
      bookmarkedResourceIds.add(resourceId); // Revert on error
      notifyBookmarkChange();
      return true; 
    }
  } else {
    // --- Bookmark ---
    bookmarkedResourceIds.add(resourceId); // Optimistic update
    notifyBookmarkChange();
    const { error } = await supabase
      .from('bookmarks')
      .insert({ user_id: user.id, resource_id: resourceIdAsNumber });

    if (error) {
      console.error('Error bookmarking resource:', error);
      bookmarkedResourceIds.delete(resourceId); // Revert on error
      notifyBookmarkChange();
      return false; 
    }
  }

  return !currentlyBookmarked;
}

// Toggle like status (remains unchanged, uses localStorage)
export function toggleLike(resourceId: string): boolean {
  const currentStatus = isResourceLiked(resourceId);
  const newStatus = !currentStatus;
  localStorage.setItem(`like-${resourceId}`, newStatus.toString());
  return newStatus;
}

// This function is no longer needed for Supabase-backed bookmarks
export function clearAllBookmarks(): void {
  // In a real app, you might want a Supabase-backed version of this.
  // For now, it only clears the local cache.
  bookmarkedResourceIds.clear();
  notifyBookmarkChange();
}

// Clear all likes (remains unchanged, uses localStorage)
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

// Export bookmarks as JSON (now from local cache)
export function exportBookmarks(): string {
  const bookmarks = getAllBookmarks();
  return JSON.stringify(bookmarks, null, 2);
}

// Export likes as JSON (remains unchanged, uses localStorage)
export function exportLikes(): string {
  const likes = getAllLikes();
  return JSON.stringify(likes, null, 2);
}

// Get statistics (bookmarks from cache, likes from localStorage)
export function getBookmarkStats() {
  return {
    totalBookmarks: bookmarkedResourceIds.size,
    totalLikes: getAllLikes().length
  };
}

// Event system for bookmark changes (remains unchanged)
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
export async function toggleBookmarkWithNotification(resourceId: string): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    toast.error('Please sign in to save bookmarks.');
    return false;
  }

  const result = await toggleBookmark(resourceId);
  // toggleBookmark already calls notifyBookmarkChange, so no need to call it again here.
  return result;
}

export function toggleLikeWithNotification(resourceId: string): boolean {
  const result = toggleLike(resourceId);
  notifyBookmarkChange();
  return result;
}

export function clearAllBookmarksWithNotification(): void {
  clearAllBookmarks();
  // clearAllBookmarks already calls notifyBookmarkChange.
}

export function clearAllLikesWithNotification(): void {
  clearAllLikes();
  notifyBookmarkChange();
}