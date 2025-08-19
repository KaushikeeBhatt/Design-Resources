import React, { useState, useEffect, useCallback } from 'react';
import { Bookmark, X , Trash2, ExternalLink, Star } from 'lucide-react';
import { getAllBookmarks, clearAllBookmarksWithNotification, exportBookmarks, getBookmarkStats, toggleBookmarkWithNotification } from '../utils/bookmarkManager';
import { resources } from '../data/resources';

interface BookmarkPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const BackgroundSVG = () => (
  <svg 
    width="100%" 
    height="100%" 
    id="svg"
    viewBox="0 0 1440 690" 
    xmlns="http://www.w3.org/2000/svg" 
    className="absolute inset-0 w-full h-full transition duration-300 ease-in-out delay-150"
    style={{ zIndex: -1 }}
  >
    <defs>
      <linearGradient id="gradient" x1="85%" y1="14%" x2="15%" y2="86%">
        <stop offset="5%" stopColor="#8ed1fc"></stop>
        <stop offset="95%" stopColor="#f78da7"></stop>
      </linearGradient>
    </defs>
    <path 
      d="M 0,700 L 0,131 C 62.02503681885125,119.64350147275404 124.0500736377025,108.28700294550808 181,122 C 237.9499263622975,135.71299705449192 289.82474226804123,174.49548969072166 341,212 C 392.17525773195877,249.50451030927834 442.6509572901325,285.73103829160533 508,292 C 573.3490427098675,298.26896170839467 653.5714285714284,274.58035714285705 730,291 C 806.4285714285716,307.41964285714295 879.0633284241534,363.9475331369662 931,390 C 982.9366715758466,416.0524668630338 1014.1752577319587,411.6295103092784 1067,454 C 1119.8247422680413,496.3704896907216 1194.2356406480117,585.5344256259204 1260,627 C 1325.7643593519883,668.4655743740796 1382.8821796759942,662.2327871870398 1440,656 L 1440,700 L 0,700 Z" 
      stroke="none" 
      strokeWidth="0" 
      fill="url(#gradient)" 
      fillOpacity="0.4" 
      className="transition-all duration-300 ease-in-out delay-150 path-0"
    />
    <path 
      d="M 0,700 L 0,306 C 75.96023564064802,291.32851620029453 151.92047128129605,276.6570324005891 206,295 C 260.07952871870395,313.3429675994109 292.27835051546384,364.7003865979382 351,381 C 409.72164948453616,397.2996134020618 494.9661266568485,378.54142120765835 566,407 C 637.0338733431515,435.45857879234165 693.8571428571428,511.13392857142856 741,531 C 788.1428571428572,550.8660714285714 825.6053019145803,514.9228645066274 882,552 C 938.3946980854197,589.0771354933726 1013.7216494845361,699.1746134020617 1082,736 C 1150.278350515464,772.8253865979383 1211.5081001472754,736.3786818851253 1270,740 C 1328.4918998527246,743.6213181148747 1384.2459499263623,787.3106590574373 1440,831 L 1440,700 L 0,700 Z" 
      stroke="none" 
      strokeWidth="0" 
      fill="url(#gradient)" 
      fillOpacity="0.53" 
      className="transition-all duration-300 ease-in-out delay-150 path-1"
    />
    <path 
      d="M 0,700 L 0,481 C 74.4944771723122,471.86054860088365 148.9889543446244,462.7210972017673 204,467 C 259.0110456553756,471.2789027982327 294.5386597938145,488.97615979381453 355,530 C 415.4613402061855,571.0238402061855 500.8564064801178,635.3742636229749 571,644 C 641.1435935198822,652.6257363770251 696.0357142857143,605.5267857142858 745,641 C 793.9642857142857,676.4732142857142 837.000736377025,794.5185935198821 886,841 C 934.999263622975,887.4814064801179 989.9613402061855,862.3988402061855 1047,855 C 1104.0386597938145,847.6011597938145 1163.1539027982328,857.8860456553756 1229,886 C 1294.8460972017672,914.1139543446244 1367.4230486008837,960.0569771723121 1440,1006 L 1440,700 L 0,700 Z" 
      stroke="none" 
      strokeWidth="0" 
      fill="url(#gradient)" 
      fillOpacity="1" 
      className="transition-all duration-300 ease-in-out delay-150 path-2"
    />
  </svg>
);

export function BookmarkPanel({ isOpen, onClose }: BookmarkPanelProps) {
  const [stats, setStats] = useState({ totalBookmarks: 0 });
  const [bookmarkedResources, setBookmarkedResources] = useState<typeof resources>([]);

  // Refresh data when panel opens or when localStorage changes
  const refreshData = useCallback(() => {
    const bookmarks = getAllBookmarks().map(bookmark => 
      resources.find(resource => resource.id === bookmark.resourceId)
    ).filter((resource): resource is NonNullable<typeof resource> => resource !== undefined);
    
    setBookmarkedResources(bookmarks);
    setStats(getBookmarkStats());
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshData();
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when panel is closed
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, refreshData]);

  // Handle removing individual items
  const handleRemoveBookmark = useCallback((resourceId: string) => {
    toggleBookmarkWithNotification(resourceId);
    refreshData();
  }, [refreshData]);

  const handleExport = () => {
    const data = exportBookmarks();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all bookmarks?')) {
      clearAllBookmarksWithNotification();
      refreshData();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 z-50"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 9999,
        width: '100vw',
        height: '100vh'
      }}
    >
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="flex items-center justify-between p-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bookmark className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 leading-tight">My Bookmarks</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mt-1">
                  <Bookmark className="w-4 h-4" />
                  <span>{stats.totalBookmarks} bookmarks saved</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/20 rounded-xl transition-all duration-200 text-gray-700 hover:text-gray-900 backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-sm hover:shadow-md transform hover:scale-105"
              title="Close bookmarks"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-700 font-medium">
              {bookmarkedResources.length} resources in your collection
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 font-medium border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {bookmarkedResources.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative w-32 h-32 mx-auto mb-8 bg-white rounded-3xl flex items-center justify-center shadow-xl overflow-hidden">
                <BackgroundSVG />
                <div className="relative z-10">
                  <Bookmark className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No bookmarks yet
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Start bookmarking your favorite design resources to build your personal collection.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Browse Resources
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookmarkedResources.map((resource) => (
                <div key={resource?.id} className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <BackgroundSVG />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {resource?.featured && (
                          <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-yellow-200 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            Featured
                          </div>
                        )}
                        {resource?.free && (
                          <div className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-200 shadow-sm">
                            Free
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveBookmark(resource?.id)}
                        className="p-2 rounded-xl hover:bg-red-100 text-red-500 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 transform hover:scale-105 border border-transparent hover:border-red-200 shadow-sm hover:shadow-md"
                        title="Remove bookmark"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {resource?.name}
                    </h3>
                    
                    <p className="text-gray-600 text-base mb-5 line-clamp-3 leading-relaxed">
                      {resource?.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resource?.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200 shadow-sm">
                          {tag}
                        </span>
                      ))}
                      {resource?.tags.length > 3 && (
                        <span className="text-gray-500 text-sm font-medium self-center">+{resource?.tags.length - 3} more</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4 text-blue-600 fill-current" />
                        <span className="text-sm text-gray-600 font-medium">Bookmarked</span>
                      </div>
                      <a
                        href={resource?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
