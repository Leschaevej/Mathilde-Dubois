"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './Carousel.scss';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
}
interface CarouselProps {
    projects: Project[];
}
export default function Carousel({ projects }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }
        return () => observer.disconnect();
    }, []);
    const handleTransition = (newIndex: number) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 300);
    };
    const handlePrevious = () => {
        const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
        handleTransition(newIndex);
    };
    const handleNext = () => {
        const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
        handleTransition(newIndex);
    };
    const handleImageClick = (index: number) => {
        if (index !== currentIndex) {
            handleTransition(index);
        }
    };
    const getVisibleProjects = () => {
        const total = projects.length;
        const visible = [];
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + total) % total;
            visible.push({
                project: projects[index],
                originalIndex: index,
                position: i
            });
        }
        return visible;
    };
    return (
        <div ref={carouselRef} className={`carousel ${isVisible ? 'fade-in' : ''}`}>
            <div className="container">
                {getVisibleProjects().map(({ project, originalIndex, position }) => (
                    <div
                        key={`${project.id}-${currentIndex}`}
                        className={`item position-${position}`}
                        onClick={() => handleImageClick(originalIndex)}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={800}
                            height={450}
                            className="image"
                        />
                    </div>
                ))}
            </div>
            <div className={`info ${isTransitioning ? 'transitioning' : ''}`}>
                <h3>{projects[currentIndex].title}</h3>
                <p>{projects[currentIndex].description}</p>
            </div>
            <div className="controls">
                <button onClick={handlePrevious} className="btn">←</button>
                <button onClick={handleNext} className="btn">→</button>
            </div>
        </div>
    );
}