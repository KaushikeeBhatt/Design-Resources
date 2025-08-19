export function CardBackground() {
  const uniqueId = Math.random().toString(36).substring(7);
  const gradientId = `gradient-${uniqueId}`;

  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden bg-white rounded-2xl">
      <svg
        width="100%"
        height="50%"
        viewBox="0 0 1440 690"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={gradientId} x1="15%" y1="14%" x2="85%" y2="86%">
            <stop offset="5%" stopColor="#8ed1fc" />
            <stop offset="95%" stopColor="#f78da7" />
          </linearGradient>
        </defs>

        <path
          d="M 0,700 L 0,131 C 62.025..., 1440,656 L 1440,700 L 0,700 Z"
          stroke="none"
          strokeWidth="0"
          fill={`url(#${gradientId})`}
          fillOpacity="0.4"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
        />
        <path
          d="M 0,700 L 0,306 C 75.960..., 1440,831 L 1440,700 L 0,700 Z"
          stroke="none"
          strokeWidth="0"
          fill={`url(#${gradientId})`}
          fillOpacity="0.53"
          className="transition-all duration-300 ease-in-out delay-150 path-1"
        />
        <path
          d="M 0,700 L 0,481 C 74.494..., 1440,1006 L 1440,700 L 0,700 Z"
          stroke="none"
          strokeWidth="0"
          fill={`url(#${gradientId})`}
          fillOpacity="1"
          className="transition-all duration-300 ease-in-out delay-150 path-2"
        />
      </svg>
    </div>
  );
}
