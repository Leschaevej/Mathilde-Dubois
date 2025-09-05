"use client";

import { useEffect, useState } from "react";
import "./Header.scss";

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
            const sections = ['services', 'portfolio', 'about', 'contact'];
            let current = '';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom > 100) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);
    const handleLinkClick = (targetSection: string) => {
        if (targetSection !== activeSection) {
            setIsVisible(false);
        }
    };

    return (
        <header className={isVisible ? 'visible' : 'hidden'}>
            <div className="brand">
                <a href="#" className="link">
                    <h1>
                        <span className="logo">MD</span>
                        <span className="name">Mathilde Dubois</span>
                    </h1>
                    <p>Dessinatrice<br/>projeteuse</p>
                </a>
            </div>
            <nav>
                <ul>
                    <li><a href="#services" onClick={() => handleLinkClick('services')}>Services</a></li>
                    <li><a href="#portfolio" onClick={() => handleLinkClick('portfolio')}>Réalisations</a></li>
                    <li><a href="#about" onClick={() => handleLinkClick('about')}>À propos</a></li>
                    <li><a href="#contact" onClick={() => handleLinkClick('contact')}>Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}