import React from 'react';
import { X, Filter } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  count: number;
}

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function FilterSidebar({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  isVisible, 
  onClose 
}: FilterSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isVisible && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-2rem)] w-72 sm:w-80 lg:w-64 bg-white border-r border-gray-200 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Fixed Header */}
        <div className="p-4 sm:p-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Scrollable Categories */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                onCategoryChange('all');
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              All Categories
            </button>
            
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.count} resources</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}