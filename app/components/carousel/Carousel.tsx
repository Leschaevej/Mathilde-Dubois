"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './Carousel.scss';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string | string[];
}
interface CarouselProps {
    projects: Project[];
}
export default function Carousel({ projects }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [currentIndex]);
    const handleTransition = (newIndex: number) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 300);
    };
    const getCurrentProjectImages = () => {
        const currentProject = projects[currentIndex];
        return Array.isArray(currentProject.image) ? currentProject.image : [currentProject.image];
    };

    const handlePreviousImage = () => {
        const images = getCurrentProjectImages();
        if (images.length > 1) {
            setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
        }
    };
    
    const handleNextImage = () => {
        const images = getCurrentProjectImages();
        if (images.length > 1) {
            setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
        }
    };

    const handlePreviousProject = () => {
        const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
        handleTransition(newIndex);
    };
    
    const handleNextProject = () => {
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
                {getVisibleProjects().map(({ project, originalIndex, position }) => {
                    const images = Array.isArray(project.image) ? project.image : [project.image];
                    const imageIndex = originalIndex === currentIndex ? currentImageIndex : 0;
                    const imageSrc = images[imageIndex] || images[0];
                    
                    return (
                        <div
                            key={`${project.id}-${currentIndex}`}
                            className={`item position-${position}`}
                            onClick={() => handleImageClick(originalIndex)}
                        >
                            <Image
                                src={imageSrc}
                                alt={project.title}
                                width={800}
                                height={450}
                                className="image"
                            />
                        </div>
                    );
                })}
                {getCurrentProjectImages().length > 1 && (
                    <>
                        <button onClick={handlePreviousImage} className="select prev" aria-label="Image précédente">
                            ←
                        </button>
                        <button onClick={handleNextImage} className="select next" aria-label="Image suivante">
                            →
                        </button>
                    </>
                )}
            </div>
            <div className={`info ${isTransitioning ? 'transitioning' : ''}`}>
                <h3>{projects[currentIndex].title}</h3>
                <p>{projects[currentIndex].description}</p>
            </div>
            <div className="controls">
                <button onClick={handlePreviousProject} className="btn">←</button>
                <button onClick={handleNextProject} className="btn">→</button>
            </div>
        </div>
    );
}