import React from 'react';
import { Palette, Menu, X, Bookmark } from 'lucide-react';
import { BookmarkPanel } from './BookmarkPanel';
import { getBookmarkStats, addBookmarkChangeListener } from '../utils/bookmarkManager';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBookmarkPanelOpen, setIsBookmarkPanelOpen] = React.useState(false);
  const [stats, setStats] = React.useState({ totalBookmarks: 0 });

  // Update stats when component mounts and listen for bookmark changes
  React.useEffect(() => {
    setStats(getBookmarkStats());
    
    // Listen for bookmark changes and update stats in real-time
    const unsubscribe = addBookmarkChangeListener(() => {
      setStats(getBookmarkStats());
    });
    
    // Cleanup listener on unmount
    return unsubscribe;
  }, []);

  const handleBookmarkPanelToggle = () => {
    setStats(getBookmarkStats()); // Refresh stats
    setIsBookmarkPanelOpen(!isBookmarkPanelOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">Design Hub</h1>
              <p className="text-sm text-gray-600 font-medium">Premium Resources & Tools</p>
            </div>
          </div>

          {/* Bookmark Button - Always Visible */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBookmarkPanelToggle}
              className="relative flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md transform hover:scale-105"
              title="View Bookmarks"
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                <span className="hidden sm:inline">Bookmarks</span>
              </div>
              {stats.totalBookmarks > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                  {stats.totalBookmarks}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          {/* <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button> */}
        </div>

      </div>
      
      {/* Bookmark Panel */}
      <BookmarkPanel 
        isOpen={isBookmarkPanelOpen} 
        onClose={() => setIsBookmarkPanelOpen(false)} 
      />
    </header>
  );
}