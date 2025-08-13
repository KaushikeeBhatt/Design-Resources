import React from 'react';
import { ResourceCard } from './ResourceCard';

interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  featured: boolean;
  free: boolean;
}

interface MemoizedResourceCardProps {
  resource: Resource;
  viewMode: 'grid' | 'list';
}

// Memoized ResourceCard to prevent unnecessary re-renders
export const MemoizedResourceCard = React.memo<MemoizedResourceCardProps>(
  ({ resource, viewMode }) => {
    return (
      <ResourceCard
        resource={resource}
        viewMode={viewMode}
      />
    );
  },
  // Custom comparison function for better performance
  (prevProps, nextProps) => {
    return (
      prevProps.resource.id === nextProps.resource.id &&
      prevProps.viewMode === nextProps.viewMode
    );
  }
);
