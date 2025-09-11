"use client";

import { useState, useEffect } from 'react';
import './Preloader.scss';

interface PreloaderProps {
    children?: React.ReactNode;
}
export default function Preloader({ children }: PreloaderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [slideUp, setSlideUp] = useState(false);
    const [showContent, setShowContent] = useState(false);
    
    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');
        
        if (!hasVisited) {
            setIsLoading(true);
            sessionStorage.setItem('hasVisited', 'true');
            
            const logoTimer = setTimeout(() => {
                setShowLogo(true);
            }, 200);
            const contentTimer = setTimeout(() => {
                setShowContent(true);
            }, 1200);
            const slideTimer = setTimeout(() => {
                setSlideUp(true);
            }, 1200);
            const hideTimer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            
            return () => {
                clearTimeout(logoTimer);
                clearTimeout(contentTimer);
                clearTimeout(slideTimer);
                clearTimeout(hideTimer);
            };
        } else {
            setShowContent(true);
        }
    }, []);
    return (
        <>
            {isLoading && (
                <div className={`preloader ${slideUp ? 'slide-up' : ''}`}>
                    <p className={`logo ${showLogo ? 'show' : ''}`}>MD</p>
                </div>
            )}
            {showContent && children}
        </>
    );
}