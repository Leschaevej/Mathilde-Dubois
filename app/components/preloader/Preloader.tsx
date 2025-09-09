'use client';

import { useState, useEffect } from 'react';
import './Preloader.scss';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [showLogo, setShowLogo] = useState(false);
    const [slideUp, setSlideUp] = useState(false);
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
        const hasShownPreloader = sessionStorage.getItem('preloader-shown');
        
        if (!hasShownPreloader) {
            const logoTimer = setTimeout(() => {
                setShowLogo(true);
            }, 200);
            const slideTimer = setTimeout(() => {
                setSlideUp(true);
            }, 1200);
            const hideTimer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('preloader-shown', 'true');
            }, 2000);
            
            return () => {
                clearTimeout(logoTimer);
                clearTimeout(slideTimer);
                clearTimeout(hideTimer);
            };
        } else {
            // Si déjà affiché, ne pas montrer le preloader
            setIsLoading(false);
        }
    }, []);
    
    if (!isLoading) return null;
    return (
        <div className={`preloader ${slideUp ? 'slide-up' : ''}`}>
            <p className={`logo ${showLogo ? 'show' : ''}`}>MD</p>
        </div>
    );
}