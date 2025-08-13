export function Background() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1440 590" 
        xmlns="http://www.w3.org/2000/svg" 
        className="transition duration-300 ease-in-out delay-150"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient1" x1="48%" y1="0%" x2="52%" y2="100%">
            <stop offset="5%" stopColor="#f78da7"></stop>
            <stop offset="95%" stopColor="#8ED1FC"></stop>
          </linearGradient>
          <linearGradient id="gradient2" x1="48%" y1="0%" x2="52%" y2="100%">
            <stop offset="5%" stopColor="#f78da7"></stop>
            <stop offset="95%" stopColor="#8ED1FC"></stop>
          </linearGradient>
        </defs>
        <path 
          d="M 0,600 L 0,0 C 78.5263157894737,65.53110047846891 157.0526315789474,131.06220095693783 260,166 C 362.9473684210526,200.93779904306217 490.3157894736843,205.28229665071768 597,181 C 703.6842105263157,156.71770334928232 789.6842105263158,103.8086124401914 874,88 C 958.3157894736842,72.1913875598086 1040.9473684210527,93.48325358851675 1135,85 C 1229.0526315789473,76.51674641148325 1334.5263157894738,38.25837320574163 1440,0 L 1440,600 L 0,600 Z" 
          stroke="none" 
          strokeWidth="0" 
          fill="url(#gradient1)" 
          fillOpacity="0.53" 
          className="transition-all duration-300 ease-in-out delay-150 path-0"
        ></path>
        <path 
          d="M 0,600 L 0,0 C 105.83732057416267,122.20095693779905 211.67464114832535,244.4019138755981 306,293 C 400.32535885167465,341.5980861244019 483.1387559808612,316.59330143540666 578,324 C 672.8612440191388,331.40669856459334 779.7703349282297,371.22488038277515 869,402 C 958.2296650717703,432.77511961722485 1029.7799043062203,454.50717703349284 1122,386 C 1214.2200956937797,317.49282296650716 1327.1100478468898,158.74641148325358 1440,0 L 1440,600 L 0,600 Z" 
          stroke="none" 
          strokeWidth="0" 
          fill="url(#gradient2)" 
          fillOpacity="1" 
          className="transition-all duration-300 ease-in-out delay-150 path-1"
        ></path>
      </svg>
    </div>
  );
}
