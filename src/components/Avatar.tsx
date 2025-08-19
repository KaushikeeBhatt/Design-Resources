import React from 'react';

interface AvatarProps {
  name: string | null;
  size: number;
}

export default function Avatar({ name, size }: AvatarProps) {
  const getInitials = (name: string | null) => {
    if (!name || name.trim() === '') return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="relative mx-auto" style={{ width: size }}>
      <div
        className="avatar no-image rounded-full bg-gray-200 flex items-center justify-center shadow-md border-4 border-white"
        style={{ height: size, width: size }}
      >
        <span className="text-gray-500" style={{ fontSize: size / 2.5 }}>
          {getInitials(name)}
        </span>
      </div>
    </div>
  );
}
