import React, { useState } from 'react';

interface MotorcycleImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  priority?: boolean;
}

export const MotorcycleImage: React.FC<MotorcycleImageProps> = ({
  src,
  alt,
  className = '',
  category = 'Throttle Culture',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#151515] ${className}`}>
      {/* Background placeholder styling */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#121212] to-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ${
          isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Subtle geometric motorcycle blueprint grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF5A1F_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Brand badge icon */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[#2B2B2B] bg-[#181818] flex items-center justify-center mb-2 shadow-inner">
            <svg
              className="w-6 h-6 text-[#FF5A1F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#FF5A1F] uppercase font-semibold">
            {category}
          </span>
          <p className="text-xs text-[#A0A0A0] mt-1 max-w-[220px] line-clamp-1">
            {alt}
          </p>
        </div>
      </div>

      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}
    </div>
  );
};
