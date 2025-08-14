import React from 'react';
import { Palette, Menu, X, Bookmark, Search } from 'lucide-react';
import { BookmarkPanel } from './BookmarkPanel';
import { getBookmarkStats } from '../utils/bookmarkManager';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBookmarkPanelOpen, setIsBookmarkPanelOpen] = React.useState(false);
  const [stats, setStats] = React.useState({ totalBookmarks: 0 });

  // Update stats when component mounts and when bookmark panel opens
  React.useEffect(() => {
    setStats(getBookmarkStats());
  }, []);

  const handleBookmarkPanelToggle = () => {
    setStats(getBookmarkStats()); // Refresh stats
    setIsBookmarkPanelOpen(!isBookmarkPanelOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Palette className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Design Hub</h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Premium Resources & Tools</p>
            </div>
          </div>

          {/* Search Bar - Hidden on very small screens, shown on sm+ */}
          {onSearchChange && (
            <div className="hidden sm:flex flex-1 max-w-md mx-4 lg:mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-sm text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right side buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Button */}
            {onSearchChange && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Bookmark Button */}
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
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {onSearchChange && isMenuOpen && (
          <div className="sm:hidden pb-4 border-t border-white/20 mt-2 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources, tools, and inspiration..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Bookmark Panel */}
      <BookmarkPanel 
        isOpen={isBookmarkPanelOpen} 
        onClose={() => setIsBookmarkPanelOpen(false)} 
      />
    </header>
  );
}