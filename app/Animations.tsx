'use client';

import { useEffect } from 'react';

export default function Animations() {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }, []);
    useEffect(() => {
        const observerOptions = { threshold: 0.20 };
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        };
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        const elementsToAnimate = document.querySelectorAll('h2:not(.hero h2), .role .card, .services .card, .carousel, .about .box, .about img, .about .quote, .contact .left p, .contact .right > div:first-child, .form .group, .form .submit, .contact .item, .wrapper');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
        return () => observer.disconnect();
    }, []);
    return null;
}