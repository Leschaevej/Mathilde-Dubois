"use client";
import { useState, useEffect } from 'react';
import './Preloader.scss';

const animationDuration = 1000;
const slideDelay = 1500;
export default function Preloader() {
    const [showLogo, setShowLogo] = useState(false);
    const [slideUp, setSlideUp] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem('preloader-seen') === 'true') {
            setHidden(true);
        }
        setChecked(true);
    }, []);
    useEffect(() => {
        if (!checked || hidden) return;
        const logoTimer = setTimeout(() => {
            setShowLogo(true);
        }, 500);
        const slideTimer = setTimeout(() => {
            setSlideUp(true);
            setTimeout(() => {
                setHidden(true);
                sessionStorage.setItem('preloader-seen', 'true');
            }, slideDelay);
        }, animationDuration + slideDelay);
        return () => {
            clearTimeout(logoTimer);
            clearTimeout(slideTimer);
        };
    }, [checked, hidden]);
    if (hidden) return null;
    return (
        <div className={`preloader ${slideUp ? 'out' : ''}`}>
            <p className={`logo ${showLogo ? 'show' : ''}`}>MD</p>
        </div>
    );
}