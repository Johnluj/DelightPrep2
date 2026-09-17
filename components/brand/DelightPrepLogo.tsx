import React from 'react';

interface DelightPrepLogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const DelightPrepLogo: React.FC<DelightPrepLogoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
}) => {
  const iconSizeMap = {
    sm: 32,
    md: 42,
    lg: 56,
    xl: 72,
  };

  const currentIconSize = iconSizeMap[size];

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#0A192F]';
  const taglineColor = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';
  const sublineColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="brand-delightprep-logo">
      {/* Brand Icon SVG */}
      <svg
        width={currentIconSize}
        height={currentIconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="dGradSmall" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="65%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0B1329" />
          </linearGradient>
          <linearGradient id="bookLeft" x1="28" y1="58" x2="50" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="bookRight" x1="50" y1="58" x2="72" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Upward Growth Arrow (Top Right) */}
        <path d="M 72 16 L 87 6 L 83 22 Z" fill="#10B981" />

        {/* Bold D Contour */}
        <path
          d="M 18 10 
             H 54 
             C 74 10, 86 22, 86 48 
             C 86 74, 74 86, 54 86 
             H 18 
             Z"
          fill="url(#dGradSmall)"
        />

        {/* Inner D Counter */}
        <path
          d="M 33 24 
             H 50 
             C 63 24, 71 33, 71 48 
             C 71 63, 63 72, 50 72 
             H 33 
             Z"
          fill={theme === 'dark' ? '#0F172A' : '#FFFFFF'}
        />

        {/* Academic Mortarboard Cap */}
        <path d="M 50 28 L 65 37 L 50 45 L 35 37 Z" fill="#1E3A8A" />
        <path d="M 42 41 V 48 C 42 52, 58 52, 58 48 V 41 Z" fill="#1E293B" />
        {/* Tassel */}
        <path d="M 62 38 L 64 47" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="64" cy="48" r="1.5" fill="#10B981" />

        {/* Open Book Pages */}
        {/* Left Page (Electric Blue) */}
        <path
          d="M 50 63 C 42 59, 34 61, 28 64 V 73 C 34 70, 42 68, 50 72 Z"
          fill="url(#bookLeft)"
        />
        {/* Right Page (Emerald Green) */}
        <path
          d="M 50 63 C 58 59, 66 61, 72 64 V 73 C 66 70, 58 68, 50 72 Z"
          fill="url(#bookRight)"
        />
      </svg>

      {/* Typography Wordmark */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline">
            <span className={`font-black tracking-tight ${textColor} ${
              size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'
            }`}>
              Delight
            </span>
            <span className={`font-black tracking-tight text-blue-600 ${
              size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'
            }`}>
              Prep
            </span>
          </div>

          {variant === 'full' && (
            <>
              <span className={`text-[10px] md:text-xs font-semibold tracking-normal mt-0.5 ${taglineColor}`}>
                Smart Preparation for Better Results.
              </span>
              {size !== 'sm' && (
                <div className="flex items-center gap-2 mt-1 opacity-80">
                  <div className="h-[1px] w-5 bg-slate-300 dark:bg-slate-700" />
                  <span className={`text-[8px] md:text-[9px] font-bold tracking-widest uppercase ${sublineColor}`}>
                    A PRODUCT OF DELIGHT TECH NETWORK
                  </span>
                  <div className="h-[1px] w-5 bg-slate-300 dark:bg-slate-700" />
                </div>
              )}
            </>
          )}

          {variant === 'compact' && (
            <span className={`text-[9px] font-medium tracking-wide mt-0.5 ${taglineColor}`}>
              Nigeria's Modern Exam Platform
            </span>
          )}
        </div>
      )}
    </div>
  );
};
