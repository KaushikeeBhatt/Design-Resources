import React, { useState, useEffect } from 'react';
import { Palette, Menu, X, Bookmark, Search, LogOut, User } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { BookmarkPanel } from './BookmarkPanel';
import { useBookmarkStats } from '../hooks/useBookmarkStats';
import { useClickOutside } from '../hooks/useClickOutside';
import Avatar from './Avatar';

interface UserProfile {
  username: string | null;
  full_name: string | null;
  website: string | null;
  avatar_url: string | null;
}

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: () => void;
  session: Session | null;
  setView: (view: 'dashboard' | 'account' | 'auth') => void;
  profile: UserProfile | null;
  suggestions?: string[];
}

export function Header({ searchQuery = '', onSearchChange, onSearchSubmit, session, setView, profile, suggestions = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBookmarkPanelOpen, setIsBookmarkPanelOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const stats = useBookmarkStats();
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(searchContainerRef, () => setShowSuggestions(false));

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearchChange && localSearchQuery !== searchQuery) {
        onSearchChange(localSearchQuery);
      }
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchQuery, onSearchChange]);

  React.useEffect(() => {
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabase.storage.from('avatars').createSignedUrl(path, 60); // 60 seconds validity
        if (error) {
          throw error;
        }
        if (data) {
          setAvatarUrl(data.signedUrl);
        }
      } catch (error) {
        console.error('Error creating signed URL:', error);
      }
    };

    if (profile?.avatar_url) {
      downloadImage(profile.avatar_url);
    }
  }, [profile]);

  const handleBookmarkPanelToggle = () => {
    setIsBookmarkPanelOpen(!isBookmarkPanelOpen);
  };

  const handleSearchSubmit = () => {
    if (onSearchSubmit) {
      onSearchSubmit();
    }
    setIsMobileSearchOpen(false);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('dashboard');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <button onClick={() => setView('dashboard')} className="flex items-center gap-3 sm:gap-4 text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Palette className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Design Hub</h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Premium Resources & Tools</p>
            </div>
          </button>

          {onSearchChange && (
            <div className="flex-1 flex justify-center px-4">
              <div className="w-full max-w-md" ref={searchContainerRef}>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={localSearchQuery}
                    onChange={(e) => {
                      setLocalSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-10 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-sm text-sm"
                  />
                  {localSearchQuery && (
                    <button
                      onClick={() => {
                        setLocalSearchQuery('');
                        if (onSearchChange) onSearchChange('');
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute mt-2 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 z-10">
                      <ul>
                        {suggestions.map((suggestion, index) => (
                          <li 
                            key={index}
                            onClick={() => {
                              setLocalSearchQuery(suggestion);
                              if(onSearchChange) onSearchChange(suggestion);
                              handleSearchSubmit();
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-4">
            {onSearchChange && (
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={handleBookmarkPanelToggle}
              className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md transform hover:scale-105"
              title="View Bookmarks"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm sm:text-base">Bookmarks</span>
              </div>
              {stats.totalBookmarks > 0 && (
                <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold shadow-lg">
                  {stats.totalBookmarks}
                </span>
              )}
            </button>

            {session ? (
              <>
                <button
                  onClick={() => setView('account')}
                  className="rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  title="Account"
                >
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="User avatar" 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white shadow-md">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setView('auth')}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 text-gray-700 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md transform hover:scale-105"
                title="Login"
              >
                <span className="text-sm sm:text-base">Login</span>
              </button>
            )}
          </div>
        </div>

        {onSearchChange && isMobileSearchOpen && (
          <div className="md:hidden pb-4 border-t border-white/20 mt-2 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources, tools, and inspiration..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-10 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-sm"
                autoFocus
              />
              {localSearchQuery && (
                <button
                  onClick={() => setLocalSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <BookmarkPanel 
        isOpen={isBookmarkPanelOpen} 
        onClose={() => setIsBookmarkPanelOpen(false)} 
      />
    </header>
  );
}