import { Palette, Type, Star, Shapes, Layers, Camera, Video, Music, Smartphone, Layout, Code, Zap, Brush, Monitor, Lightbulb, Compass as Compress, Chrome, Bot, MoreHorizontal, Hash } from 'lucide-react';

const baseCategoriesData = [
  {
    id: 'all',
    name: 'All Categories',
    description: 'Browse all design resources',
    icon: Layers,
    color: 'purple',
    count: 699 // Updated total count
  },
  {
    id: 'ui-graphics',
    name: 'UI Graphics',
    description: 'Modern UI components and design elements',
    icon: Palette,
    color: 'blue',
    count: 45
  },
  {
    id: 'fonts',
    name: 'Fonts',
    description: 'Typography resources and font libraries',
    icon: Type,
    color: 'purple',
    count: 35
  },
  {
    id: 'colors',
    name: 'Colors',
    description: 'Color palettes and design tools',
    icon: Palette,
    color: 'pink',
    count: 42
  },
  {
    id: 'icons',
    name: 'Icons',
    description: 'Icon sets and vector graphics',
    icon: Star,
    color: 'yellow',
    count: 38
  },
  {
    id: 'logos',
    name: 'Logos',
    description: 'Logo resources and brand assets',
    icon: Shapes,
    color: 'green',
    count: 25
  },
  {
    id: 'stock-photos',
    name: 'Stock Photos',
    description: 'Free and premium photography',
    icon: Camera,
    color: 'indigo',
    count: 28
  },
  {
    id: 'stock-videos',
    name: 'Stock Videos',
    description: 'Video footage and motion graphics',
    icon: Video,
    color: 'red',
    count: 15
  },
  {
    id: 'stock-music-sound-effects',
    name: 'Stock Music & Sound Effects',
    description: 'Audio resources and sound effects',
    icon: Music,
    color: 'orange',
    count: 8
  },
  {
    id: 'vectors',
    name: 'Vectors & Clip Art',
    description: 'Vector graphics and illustrations',
    icon: Shapes,
    color: 'teal',
    count: 32
  },
  {
    id: 'mockups',
    name: 'Mockups',
    description: 'Device and product mockups',
    icon: Smartphone,
    color: 'cyan',
    count: 18
  },
  {
    id: 'templates',
    name: 'HTML & CSS Templates',
    description: 'Website templates and themes',
    icon: Layout,
    color: 'lime',
    count: 22
  },
  {
    id: 'css-frameworks',
    name: 'CSS Frameworks',
    description: 'UI frameworks and component libraries',
    icon: Code,
    color: 'emerald',
    count: 25
  },
  {
    id: 'animations',
    name: 'CSS Animations',
    description: 'Animation libraries and effects',
    icon: Zap,
    color: 'violet',
    count: 12
  },
  {
    id: 'ui-components',
    name: 'UI Components',
    description: 'Reusable interface components',
    icon: Layout,
    color: 'rose',
    count: 15
  },
  {
    id: 'design-tools',
    name: 'Online Design Tools',
    description: 'Web-based design applications',
    icon: Brush,
    color: 'amber',
    count: 28
  },
  {
    id: 'design-software',
    name: 'Design Software',
    description: 'Downloadable design applications',
    icon: Monitor,
    color: 'slate',
    count: 8
  },
  {
    id: 'design-inspiration',
    name: 'Design Inspiration',
    description: 'Galleries and showcase websites',
    icon: Lightbulb,
    color: 'orange',
    count: 12
  },
  {
    id: 'image-tools',
    name: 'Image Tools',
    description: 'Image editing and optimization tools',
    icon: Compress,
    color: 'blue',
    count: 35
  },

  {
    id: 'chrome-extensions',
    name: 'Chrome Extensions',
    description: 'Chrome browser extensions for developers',
    icon: Chrome,
    color: 'blue',
    count: 45
  },
  {
    id: 'firefox-extensions',
    name: 'Firefox Extensions',
    description: 'Firefox browser extensions for developers',
    icon: Chrome,
    color: 'orange',
    count: 12
  },
  {
    id: 'ai-tools',
    name: 'AI Design Tools',
    description: 'AI-powered design generators',
    icon: Bot,
    color: 'purple',
    count: 15
  },
  {
    id: 'icon-fonts',
    name: 'Icon Fonts',
    description: 'Icon font libraries and sets',
    icon: Hash,
    color: 'indigo',
    count: 8
  },
  {
    id: 'css-animations',
    name: 'CSS Animations',
    description: 'CSS animation libraries and effects',
    icon: Zap,
    color: 'purple',
    count: 12
  },
  {
    id: 'js-animations',
    name: 'JavaScript Animations',
    description: 'JavaScript animation libraries',
    icon: Code,
    color: 'yellow',
    count: 8
  },
  {
    id: 'audio',
    name: 'Audio Resources',
    description: 'Stock music and sound effects',
    icon: Music,
    color: 'pink',
    count: 8
  },
  {
    id: 'react-ui',
    name: 'React UI Libraries',
    description: 'React component libraries',
    icon: Layers,
    color: 'blue',
    count: 12
  },
  {
    id: 'vue-ui-libraries',
    name: 'Browser Extensions',
    description: 'Vue.js component libraries',
    icon: Layers,
    color: 'green',
    count: 8
  },
  {
    id: 'angular-ui-libraries',
    name: 'Angular UI Libraries',
    description: 'Angular component libraries',
    icon: Layers,
    color: 'red',
    count: 6
  },
  {
    id: 'svelte-ui-libraries',
    name: 'Svelte UI Libraries',
    description: 'Svelte component libraries',
    icon: Layers,
    color: 'orange',
    count: 4
  },
  {
    id: 'react-native-ui-libraries',
    name: 'React Native UI',
    description: 'React Native component libraries',
    icon: Smartphone,
    color: 'cyan',
    count: 5
  },
  {
    id: 'favicons',
    name: 'Favicons',
    description: 'Favicon generators and resources',
    icon: Star,
    color: 'amber',
    count: 8
  },
  {
    id: 'charts',
    name: 'Charts & Data Visualization',
    description: 'Chart libraries and data visualization tools',
    icon: Layers,
    color: 'emerald',
    count: 15
  },
  {
    id: 'others',
    name: 'Others',
    description: 'Miscellaneous design resources',
    icon: MoreHorizontal,
    color: 'gray',
    count: 85
  }
];

// Ensure all categories have a count property
const categoriesWithCounts = baseCategoriesData.map(category => ({
  ...category,
  count: category.count || 0
}));

// Export categories with their fixed counts
export const categories = categoriesWithCounts;