'use client';

import { useState, useEffect } from 'react';

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

export default function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [showContent, setShowContent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasShownPreloader = sessionStorage.getItem('preloader-shown');
    
    if (hasShownPreloader) {
      setShowContent(true);
    } else {
      // Afficher le contenu juste avant que le preloader commence à remonter (1200ms)
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showContent) return null;
  
  return <>{children}</>;
}