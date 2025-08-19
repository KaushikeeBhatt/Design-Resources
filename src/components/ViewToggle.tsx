import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          viewMode === 'grid'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span className="text-sm font-medium">Grid</span>
      </button>
      
      <button
        onClick={() => onViewModeChange('list')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          viewMode === 'list'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <List className="w-4 h-4" />
        <span className="text-sm font-medium">List</span>
      </button>
    </div>
  );
}