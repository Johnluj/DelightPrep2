import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  inverted = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* DelightPrep Custom D-Icon */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 512 512" fill="none" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="dGradLogo" x1="60" y1="60" x2="450" y2="450" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="60%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="bookBlueLogo" x1="160" y1="310" x2="256" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="bookGreenLogo" x1="256" y1="310" x2="350" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Top Right Emerald Flight Arrow */}
          <path d="M 375 75 L 450 30 L 425 105 Z" fill="#10B981" />

          {/* Main Bold "D" Shape */}
          <path d="M 90 40 L 280 40 C 380 40, 440 100, 440 210 C 440 320, 380 380, 280 380 L 90 380 Z" fill="url(#dGradLogo)" />

          {/* Inner Cutout of the "D" */}
          <path d="M 170 120 L 260 120 C 320 120, 360 155, 360 210 C 360 265, 320 300, 260 300 L 170 300 Z" fill={inverted ? "#0F172A" : "#FFFFFF"} />

          {/* Graduation Cap Mortarboard inside the D */}
          <path d="M 256 140 L 325 175 L 256 210 L 187 175 Z" fill={inverted ? "#FFFFFF" : "#0F172A"} />
          <path d="M 215 190 L 215 225 C 215 242, 297 242, 297 225 L 297 190 Z" fill={inverted ? "#E2E8F0" : "#334155"} />
          {/* Tassel */}
          <path d="M 312 182 L 318 220" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          <circle cx="318" cy="223" r="5" fill="#10B981" />

          {/* Open Book Pages below cap */}
          <path d="M 256 275 C 220 255, 180 265, 150 275 L 150 315 C 180 305, 220 295, 256 315 Z" fill="url(#bookBlueLogo)" />
          <path d="M 256 275 C 292 255, 332 265, 362 275 L 362 315 C 332 305, 292 295, 256 315 Z" fill="url(#bookGreenLogo)" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline leading-none tracking-tight font-extrabold font-sans">
          <span className={`transition-colors ${inverted ? 'text-white' : 'text-slate-900'} ${textSizes[size]}`}>
            Delight
          </span>
          <span className={`text-blue-600 ${textSizes[size]}`}>
            Prep
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] tracking-wide font-medium mt-0.5 ${inverted ? 'text-slate-300' : 'text-slate-500'}`}>
            Smart Preparation for Better Results.
          </span>
        )}
      </div>
    </div>
  );
};
