import { Palette, Type, Star, Shapes, Layers, Camera, Video, Music, Smartphone, Layout, Code, Zap, Brush, Monitor, Lightbulb, Compass as Compress, Chrome, Bot, MoreHorizontal, Hash } from 'lucide-react';

const baseCategoriesData = [
  {
    id: 'all',
    name: 'All Categories',
    description: 'Browse all design resources',
    icon: Layers,
    color: 'purple',
    count: 265 // Sum of all resources
  },
  {
    id: 'ui-graphics',
    name: 'UI Graphics',
    description: 'Modern UI components and design elements',
    icon: Palette,
    color: 'blue',
    count: 69
  },
  {
    id: 'fonts',
    name: 'Fonts',
    description: 'Typography resources and font libraries',
    icon: Type,
    color: 'purple',
    count: 67
  },
  {
    id: 'colors',
    name: 'Colors',
    description: 'Color palettes and design tools',
    icon: Palette,
    color: 'pink',
    count: 61
  },
  {
    id: 'icons',
    name: 'Icons',
    description: 'Icon sets and vector graphics',
    icon: Star,
    color: 'yellow',
    count: 68
  },
  {
    id: 'logos',
    name: 'Logos',
    description: 'Logo resources and brand assets',
    icon: Shapes,
    color: 'green',
    count: 65
  },
  {
    id: 'stock-photos',
    name: 'Stock Photos',
    description: 'Free and premium photography',
    icon: Camera,
    color: 'indigo'
  },
  {
    id: 'stock-videos',
    name: 'Stock Videos',
    description: 'Video footage and motion graphics',
    icon: Video,
    color: 'red'
  },
  {
    id: 'stock-music',
    name: 'Stock Music',
    description: 'Audio resources and sound effects',
    icon: Music,
    color: 'orange'
  },
  {
    id: 'vectors',
    name: 'Vectors & Clip Art',
    description: 'Vector graphics and illustrations',
    icon: Shapes,
    color: 'teal'
  },
  {
    id: 'mockups',
    name: 'Mockups',
    description: 'Device and product mockups',
    icon: Smartphone,
    color: 'cyan'
  },
  {
    id: 'templates',
    name: 'HTML & CSS Templates',
    description: 'Website templates and themes',
    icon: Layout,
    color: 'lime'
  },
  {
    id: 'css-frameworks',
    name: 'CSS Frameworks',
    description: 'UI frameworks and component libraries',
    icon: Code,
    color: 'emerald'
  },
  {
    id: 'animations',
    name: 'CSS Animations',
    description: 'Animation libraries and effects',
    icon: Zap,
    color: 'violet'
  },
  {
    id: 'ui-components',
    name: 'UI Components',
    description: 'Reusable interface components',
    icon: Layout,
    color: 'rose'
  },
  {
    id: 'design-tools',
    name: 'Online Design Tools',
    description: 'Web-based design applications',
    icon: Brush,
    color: 'amber'
  },
  {
    id: 'design-software',
    name: 'Design Software',
    description: 'Downloadable design applications',
    icon: Monitor,
    color: 'slate'
  },
  {
    id: 'inspiration',
    name: 'Design Inspiration',
    description: 'Galleries and showcase websites',
    icon: Lightbulb,
    color: 'orange'
  },
  {
    id: 'image-tools',
    name: 'Image Tools',
    description: 'Image editing and optimization tools',
    icon: Compress,
    color: 'blue'
  },
  {
    id: 'extensions',
    name: 'Browser Extensions',
    description: 'Useful browser extensions for designers',
    icon: Chrome,
    color: 'green'
  },
  {
    id: 'ai-tools',
    name: 'AI Design Tools',
    description: 'AI-powered design generators',
    icon: Bot,
    color: 'purple'
  },
  {
    id: 'icon-fonts',
    name: 'Icon Fonts',
    description: 'Icon font libraries and sets',
    icon: Hash,
    color: 'indigo'
  },
  {
    id: 'css-animations',
    name: 'CSS Animations',
    description: 'CSS animation libraries and effects',
    icon: Zap,
    color: 'purple'
  },
  {
    id: 'js-animations',
    name: 'JavaScript Animations',
    description: 'JavaScript animation libraries',
    icon: Code,
    color: 'yellow'
  },
  {
    id: 'audio',
    name: 'Audio Resources',
    description: 'Stock music and sound effects',
    icon: Music,
    color: 'pink'
  },
  {
    id: 'react-ui',
    name: 'React UI Libraries',
    description: 'React component libraries',
    icon: Layers,
    color: 'blue'
  },
  {
    id: 'vue-ui',
    name: 'Vue UI Libraries',
    description: 'Vue.js component libraries',
    icon: Layers,
    color: 'green'
  },
  {
    id: 'angular-ui',
    name: 'Angular UI Libraries',
    description: 'Angular component libraries',
    icon: Layers,
    color: 'red'
  },
  {
    id: 'svelte-ui',
    name: 'Svelte UI Libraries',
    description: 'Svelte component libraries',
    icon: Layers,
    color: 'orange'
  },
  {
    id: 'react-native-ui',
    name: 'React Native UI',
    description: 'React Native component libraries',
    icon: Smartphone,
    color: 'cyan'
  },
  {
    id: 'favicons',
    name: 'Favicons',
    description: 'Favicon generators and resources',
    icon: Star,
    color: 'amber'
  },
  {
    id: 'others',
    name: 'Others',
    description: 'Miscellaneous design resources',
    icon: MoreHorizontal,
    color: 'gray'
  },
  {
    id: 'charts',
    name: 'Charts & Data Visualization',
    description: 'Chart libraries and data visualization tools',
    icon: Layers,
    color: 'emerald'
  }
];

// Ensure all categories have a count property
const categoriesWithCounts = baseCategoriesData.map(category => ({
  ...category,
  count: category.count || 0
}));

// Export categories with their fixed counts
export const categories = categoriesWithCounts;