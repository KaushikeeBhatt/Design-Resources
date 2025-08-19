import { ExternalLink, Star, Bookmark } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';

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

interface ResourceCardProps {
  resource: Resource;
  viewMode: 'grid' | 'list';
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

export function ResourceCard({ resource, viewMode }: ResourceCardProps) {
  const { isBookmarked, toggleBookmark, isLoading } = useBookmarks(resource.id);

  if (viewMode === 'list') {
    
    return (
      <div className="relative bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
        <BackgroundSVG />
        <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight">
                {resource.name}
              </h3>
              <div className="flex items-center gap-2">
                {resource.featured && (
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-yellow-200 shadow-sm">
                    <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
                    Featured
                  </div>
                )}
                {resource.free && (
                  <div className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-green-200 shadow-sm">
                    Free
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-base mb-5 line-clamp-2 sm:line-clamp-3 leading-relaxed flex-grow">
              {resource.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {resource.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-sm font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200 shadow-sm"
                >
                  {tag}
                </span>
              ))}
              {resource.tags.length > 3 && (
                <span className="text-gray-500 text-sm font-medium self-center">+{resource.tags.length - 3}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={toggleBookmark}
              disabled={isLoading} // Disable button when loading
              className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                isBookmarked 
                  ? 'bg-blue-100 text-blue-600 shadow-md border border-blue-200' 
                  : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600 border border-gray-200 shadow-sm'
              } ${
                isLoading ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              Visit
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col justify-between h-full">
      <BackgroundSVG />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {resource.featured && (
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-yellow-200 shadow-sm">
                  <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
                  Featured
                </div>
              )}
              {resource.free && (
                <div className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-green-200 shadow-sm">
                  Free
                </div>
              )}
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
              {resource.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={toggleBookmark}
              disabled={isLoading} // Disable button when loading
              className={`p-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                isBookmarked 
                  ? 'bg-blue-100 text-blue-600 shadow-md border border-blue-200' 
                  : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600 border border-gray-200'
              } ${
                isLoading ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-base mb-5 line-clamp-3 leading-relaxed flex-grow">
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {resource.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-sm font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200 shadow-sm"
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 2 && (
            <span className="text-gray-500 text-sm font-medium self-center">+{resource.tags.length - 2}</span>
          )}
        </div>
        
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-full justify-center text-white px-6 py-4 rounded-xl transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl mt-auto"
          style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
        >
          Visit Resource
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}