import React from 'react';

interface FooterProps {
  onCategoryClick: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCategoryClick }) => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Design Resources</h3>
            <p className="text-gray-400">A curated collection of design resources to supercharge your workflow.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><button onClick={() => onCategoryClick('all')} className="text-gray-400 hover:text-white">All</button></li>
              <li><button onClick={() => onCategoryClick('icons')} className="text-gray-400 hover:text-white">Icons</button></li>
              <li><button onClick={() => onCategoryClick('ui-kits')} className="text-gray-400 hover:text-white">UI Kits</button></li>
              <li><button onClick={() => onCategoryClick('fonts')} className="text-gray-400 hover:text-white">Fonts</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Design Resources. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
