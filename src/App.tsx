import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, Star, Filter, Grid, Palette, Code, Zap, Sparkles, ArrowRight, Layers, ChevronDown, X } from 'lucide-react';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { MemoizedResourceCard } from './components/MemoizedResourceCard';
import { SearchBar } from './components/SearchBar';
import { FilterSidebar } from './components/FilterSidebar';
import { ViewToggle } from './components/ViewToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Background } from './components/Background';
import FloatingShapes from './components/FloatingShapes';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { categories } from './data/categories';
import { resources } from './data/resources';
import TypingText  from './TypingText';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileCategoryDropdown, setShowMobileCategoryDropdown] = useState(false);
  const [showTabletFilterBar, setShowTabletFilterBar] = useState(false);

  // Memoized search handler to prevent unnecessary re-renders
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Memoized category change handler with auto-scroll
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    // Auto-scroll to resources section when category changes
    const resourcesSection = document.getElementById('resources-section');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Optimized filtering with useMemo to prevent unnecessary recalculations
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Calculate dynamic category counts based on actual resources
  const categoriesWithDynamicCounts = useMemo(() => {
    return categories.map(category => {
      if (category.id === 'all') {
        return {
          ...category,
          count: resources.length
        };
      }
      
      const categoryResourceCount = resources.filter(resource => resource.category === category.id).length;
      return {
        ...category,
        count: categoryResourceCount
      };
    });
  }, [resources]);

  // Optimized infinite scroll hook with smaller initial batch
  const {
    visibleItems: visibleResources,
    hasMore,
    isLoading,
    loadMore
  } = useInfiniteScroll({
    items: filteredResources,
    itemsPerPage: 8, // Reduced initial batch for faster render
    threshold: 400
  });

  const featuredCategories = categoriesWithDynamicCounts.slice(0, 8);

  const handleMobileDropdownClose = useCallback(() => {
    setShowMobileCategoryDropdown(false);
  }, []);

  // Check if screen size is in tablet range (780px-1022px)
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setShowTabletFilterBar(width >= 780 && width <= 1022);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen">
      <Background />
      <FloatingShapes />
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      
      {/* Floating Mobile Category Switcher - only for <768px */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="relative">
          <button
            onClick={() => setShowMobileCategoryDropdown(!showMobileCategoryDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg text-gray-900 font-medium"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="text-sm">
                {selectedCategory === 'all' ? 'All Resources' : 
                 categoriesWithDynamicCounts.find(c => c.id === selectedCategory)?.name || 'Category'}
              </span>
              <span className="text-xs text-gray-500">
                ({filteredResources.length})
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showMobileCategoryDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showMobileCategoryDropdown && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/20 z-30"
                onClick={() => setShowMobileCategoryDropdown(false)}
              />
              
              {/* Dropdown */}
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto z-50">
                {categoriesWithDynamicCounts.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowMobileCategoryDropdown(false);
                      const resourcesSection = document.getElementById('resources-section');
                      if (resourcesSection) {
                        resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                    } ${category.id === categoriesWithDynamicCounts[0].id ? 'rounded-t-xl' : ''} ${
                      category.id === categoriesWithDynamicCounts[categoriesWithDynamicCounts.length - 1].id ? 'rounded-b-xl' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${selectedCategory === category.id ? 'bg-blue-600' : 'bg-gray-300'}`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Filter Bar for 780px-1022px screens */}
      {showTabletFilterBar && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <div className="relative">
            <button
              onClick={() => setShowMobileCategoryDropdown(!showMobileCategoryDropdown)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg text-gray-900 font-medium"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600" />
                <span className="text-sm">
                  {selectedCategory === 'all' ? 'All Resources' : 
                   categoriesWithDynamicCounts.find(c => c.id === selectedCategory)?.name || 'Category'}
                </span>
                <span className="text-xs text-gray-500">
                  ({filteredResources.length})
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showMobileCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showMobileCategoryDropdown && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/20 z-30"
                  onClick={() => setShowMobileCategoryDropdown(false)}
                />
                
                {/* Dropdown */}
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto z-50">
                  {categoriesWithDynamicCounts.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowMobileCategoryDropdown(false);
                        const resourcesSection = document.getElementById('resources-section');
                        if (resourcesSection) {
                          resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                      } ${category.id === categoriesWithDynamicCounts[0].id ? 'rounded-t-xl' : ''} ${
                        category.id === categoriesWithDynamicCounts[categoriesWithDynamicCounts.length - 1].id ? 'rounded-b-xl' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${selectedCategory === category.id ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-black/10 backdrop-blur-sm rounded-full border border-black/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-black/90">New: 500+ Premium Resources Added</span>
            </div>
            <h1 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Design Without Limits
            </span>

            <br />
            <TypingText 
              texts={[
                "Unleash your creativity.",
                "Build without limits.",
                "Design for the future."
              ]} 
              speed={60} 
              eraseSpeed={40} 
              delay={2000} 
            />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-black/80 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover 555+ premium design resources, tools, and inspiration.
            <br className="hidden sm:block" />
            Find exactly what you need from our curated collection of design resources
          </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">10,000+ Resources</h3>
              <p className="text-black/70">Premium design assets updated daily</p>
            </div>

            <div className="group bg-white/38 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">All Categories</h3>
              <p className="text-black/70">UI kits, icons, fonts, templates & more</p>
            </div>

            <div className="group bg-white/86 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Always Fresh</h3>
              <p className="text-black/70">New resources added </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        <div className="bg-white/30 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find exactly what you need from our curated collection of design resources
            </p>
          </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={() => handleCategoryChange('all')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-black hover:bg-white/20 transition-all duration-300"
              >
                <Grid className="w-5 h-5" />
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources-section" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Show FilterSidebar only on desktop (lg+) */}
              <div className="hidden lg:block xl:w-80 lg:w-72">
                <FilterSidebar
                  categories={categoriesWithDynamicCounts}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  isVisible={showFilters}
                  onClose={() => setShowFilters(false)}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">
                      {selectedCategory === 'all' ? 'All Resources' : 
                       categoriesWithDynamicCounts.find(c => c.id === selectedCategory)?.name || 'Resources'}
                    </h2>
                    <p className="text-black/70">
                      {filteredResources.length} resources found
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Show filter toggle for mobile and iPad - covers all tablet dimensions */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="xl:hidden flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors shadow-sm"
                    >
                      <Filter className="w-4 h-4" />
                      <span className="text-sm font-medium">Filters</span>
                    </button>
                    <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                  </div>
                </div>

                {/* Mobile and iPad Filter Overlay - covers all dimensions below 1280px */}
                {showFilters && (
                  <div className="xl:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop - optimized for touch devices */}
                    <div 
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowFilters(false)}
                      style={{ touchAction: 'manipulation' }}
                    />
                    
                    {/* Filter Panel - responsive width for all devices */}
                    <div className="relative bg-white w-80 sm:w-80 md:w-96 lg:w-96 max-w-[85vw] h-full overflow-y-auto shadow-2xl">
                      <div className="p-6 pb-safe">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-gray-900">Filter Resources</h3>
                          <button
                            onClick={() => setShowFilters(false)}
                            className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                            style={{ touchAction: 'manipulation' }}
                            aria-label="Close filters"
                          >
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                        
                        {/* FilterSidebar component - same for all devices */}
                        <FilterSidebar
                          categories={categoriesWithDynamicCounts}
                          selectedCategory={selectedCategory}
                          onCategoryChange={(category) => {
                            handleCategoryChange(category);
                            setShowFilters(false);
                          }}
                          isVisible={true}
                          onClose={() => setShowFilters(false)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {filteredResources.length === 0 ? (
                  <div className="text-center py-16">
                  <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 text-gray-700 transition-colors font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                  </div>
                ) : (
                  <>
                    <div className={`grid gap-6 pb-20 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                        : 'grid-cols-1'
                    }`}>
                      {visibleResources.map((resource) => (
                        <MemoizedResourceCard
                          key={resource.id}
                          resource={resource}
                          viewMode={viewMode}
                        />
                      ))}
                    </div>

                    {isLoading && (
                      <div className="flex justify-center py-8">
                        <LoadingSpinner />
                      </div>
                    )}

                    {hasMore && !isLoading && (
                      <div className="text-center mt-8">
                        <button
                          onClick={loadMore}
                          className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
                        >
                          Load More Resources
                        </button>
                      </div>
                    )}

                    {!hasMore && visibleResources.length > 0 && (
                      <div className="text-center mt-8 py-4">
                        <p className="text-white/60">You've reached the end of the resources</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white/35 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
      
      {/* Top row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        
        {/* Logo + Description */}
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Palette className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-black">DesignHub</span>
          </div>
          <p className="text-black/70">
            Your ultimate destination for premium design resources, tools, and inspiration. 
            Create without limits.
          </p>
        </div>

        {/* Resources on right */}
        <div className="md:text-right padding-10">
          <h4 className="text-black font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-black/70">
            <li>
              <button 
                onClick={() => {
                  handleCategoryChange('ui-kits');
                  const resourcesSection = document.getElementById('resources-section');
                  if (resourcesSection) {
                    resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="hover:text-black transition-colors cursor-pointer text-left"
              >
                UI Kits
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  handleCategoryChange('icons');
                  const resourcesSection = document.getElementById('resources-section');
                  if (resourcesSection) {
                    resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="hover:text-black transition-colors cursor-pointer text-left"
              >
                Icons
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  handleCategoryChange('fonts');
                  const resourcesSection = document.getElementById('resources-section');
                  if (resourcesSection) {
                    resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="hover:text-black transition-colors cursor-pointer text-left"
              >
                Fonts
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  handleCategoryChange('design-tools');
                  const resourcesSection = document.getElementById('resources-section');
                  if (resourcesSection) {
                    resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="hover:text-black transition-colors cursor-pointer text-left"
              >
                Design Tools
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="border-t border-white/10 mt-8 pt-8 text-center">
        <p className="text-black/60 text-sm">
          &copy; 2025 DesignHub. Made by <span className="font-semibold">Kaushikee Bhatt</span> &hearts; for designers worldwide.
        </p>
      </div>

    </div>
  </div>
</footer>

    </div>
  );
}

export default App;
