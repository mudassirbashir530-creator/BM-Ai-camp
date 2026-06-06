import React, { useState } from 'react';

interface InstituteLogoProps {
  className?: string;
  theme?: 'white' | 'blue';
}

export default function InstituteLogo({ className = '', theme = 'white' }: InstituteLogoProps) {
  const [imgError, setImgError] = useState(false);

  // The original image is expected to be dark blue.
  // If we need it white (for dark backgrounds like navy), we use CSS filters.
  // Only apply the white filter if the image has not errored out.
  const filterClass = (theme === 'white' && !imgError) ? 'brightness-0 invert' : '';

  if (imgError) {
    const fillColor = theme === 'white' ? '#FFFFFF' : '#0E1C35'; // navy
    
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 400 120" 
        className={`object-contain ${className}`}
      >
        <text 
          x="50%" y="45%" 
          dominantBaseline="middle" textAnchor="middle" 
          fontFamily="system-ui, sans-serif" fontWeight="900" 
          fontSize="54" fill={fillColor} letterSpacing="-1"
        >
          BRIGHT MIND
        </text>
        <text 
          x="50%" y="80%" 
          dominantBaseline="middle" textAnchor="middle" 
          fontFamily="system-ui, sans-serif" fontWeight="700" 
          fontSize="18" fill={fillColor} letterSpacing="2.5"
        >
          INSTITUTE OF EDUCATION
        </text>
      </svg>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="Brightmind Institute of Education" 
      className={`object-contain ${filterClass} ${className}`}
      onError={() => {
        setImgError(true);
      }}
    />
  );
}
