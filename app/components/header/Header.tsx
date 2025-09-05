"use client";

import { useEffect, useState } from "react";
import "./Header.scss";

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={isVisible ? 'visible' : 'hidden'}>
            <div className="brand">
                <h1>
                    <span className="logo">MD</span>
                    <span className="name">Mathilde Dubois</span>
                </h1>
                <p>Dessinatrice<br/>projeteuse</p>
            </div>
            <nav>
                <ul>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#realisations">Réalisations</a></li>
                    <li><a href="#a-propos">À propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}