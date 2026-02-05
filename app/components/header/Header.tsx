"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdMenu } from "@react-icons/all-files/md/MdMenu";
import "./Header.scss";

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [isModalOpening, setIsModalOpening] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const updateBodyMargin = () => {
            const header = document.querySelector('header');
            if (header) {
                const headerHeight = header.offsetHeight;
                document.body.style.marginTop = `${headerHeight}px`;
                const heroSection = document.querySelector('.hero') as HTMLElement;
                if (heroSection) {
                    heroSection.style.height = `calc(100vh - ${headerHeight}px)`;
                }
                const modal = document.querySelector('.modal') as HTMLElement;
                if (modal) {
                    modal.style.top = `${headerHeight + 10}px`;
                }
            }
        };
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
            if (isMobileMenuOpen && !isModalClosing) {
                closeMobileMenu();
            }
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
        updateBodyMargin();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateBodyMargin);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateBodyMargin);
        };
    }, [lastScrollY, isMobileMenuOpen, isModalClosing]);
    const closeMobileMenu = () => {
        setIsModalClosing(true);
        setIsModalOpening(false);
        setTimeout(() => {
            setIsMobileMenuOpen(false);
            setIsModalClosing(false);
        }, 300);
    };
    const handleLinkClick = (targetSection: string) => {
        if (targetSection !== activeSection) {
            setIsVisible(false);
        }
        closeMobileMenu();
    };
    const toggleMobileMenu = () => {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            setIsMobileMenuOpen(true);
            setTimeout(() => {
                setIsModalOpening(true);
            }, 10);
        }
    };
    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            router.push('/');
        }
    };
    return (
        <header className={isVisible ? 'visible' : 'hidden'}>
            <div className="brand">
                <a href="/" className="link" onClick={handleLogoClick}>
                    <h1>
                        <span className="logo">MD</span>
                        <span className="name">Mathilde Dubois</span>
                    </h1>
                    <p>Dessinatrice<br/>projeteuse</p>
                </a>
            </div>
            <button className="menu" onClick={toggleMobileMenu} aria-label="Toggle menu">
                <MdMenu className="icon" />
            </button>
            <nav className="nav">
                <ul>
                    <li><Link href="/#services" onClick={() => handleLinkClick('services')}>Services</Link></li>
                    <li><Link href="/#portfolio" onClick={() => handleLinkClick('portfolio')}>Réalisations</Link></li>
                    <li><Link href="/#about" onClick={() => handleLinkClick('about')}>À propos</Link></li>
                    <li><Link href="/#contact" onClick={() => handleLinkClick('contact')}>Contact</Link></li>
                </ul>
            </nav>
            {isMobileMenuOpen && (
                <div className={`modal ${isModalClosing ? 'closing' : ''} ${isModalOpening ? 'open' : ''}`}>
                    <ul>
                        <li><Link href="/#services" onClick={() => handleLinkClick('services')}>Services</Link></li>
                        <li><Link href="/#portfolio" onClick={() => handleLinkClick('portfolio')}>Réalisations</Link></li>
                        <li><Link href="/#about" onClick={() => handleLinkClick('about')}>À propos</Link></li>
                        <li><Link href="/#contact" onClick={() => handleLinkClick('contact')}>Contact</Link></li>
                    </ul>
                </div>
            )}
        </header>
    )
}