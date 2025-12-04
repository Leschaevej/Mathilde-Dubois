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
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const anglePerProject = 360 / projects.length;
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
    const handleTransition = (newIndex: number, immediate = false) => {
        if (isTransitioning && !immediate) return;
        setIsTransitioning(true);
        setCurrentIndex(newIndex);
        setTimeout(() => {
            setIsTransitioning(false);
        }, 600);
    };
    const onTouchStart = (e: React.TouchEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.info') || target.closest('.controls')) return;
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(true);
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || touchStart === null) return;
        const currentX = e.targetTouches[0].clientX;
        const diff = currentX - touchStart;
        const rotationChange = (diff / window.innerWidth) * 180;
        setRotation(rotationChange);
    };
    const onTouchEnd = () => {
        if (!isDragging) return;
        const rotationDegrees = rotation;
        const projectsToMove = Math.round(rotationDegrees / anglePerProject);
        if (Math.abs(projectsToMove) > 0) {
            const newIndex = (currentIndex - projectsToMove + projects.length) % projects.length;
            handleTransition(newIndex);
        }
        setIsDragging(false);
        setRotation(0);
        setTouchStart(null);
    };
    const onMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.info') || target.closest('.controls')) return;
        e.preventDefault();
        setTouchStart(e.clientX);
        setIsDragging(true);
    };
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || touchStart === null) return;
            const diff = e.clientX - touchStart;
            const rotationChange = (diff / window.innerWidth) * 360;
            setRotation(rotationChange);
        };
        const handleMouseUp = () => {
            if (!isDragging) return;
            const rotationDegrees = rotation;
            const projectsToMove = Math.round(rotationDegrees / anglePerProject);
            if (Math.abs(projectsToMove) > 0) {
                const newIndex = (currentIndex - projectsToMove + projects.length) % projects.length;
                handleTransition(newIndex);
            }
            setIsDragging(false);
            setRotation(0);
            setTouchStart(null);
        };
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, touchStart, rotation, anglePerProject, currentIndex, projects.length]);
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
        handleImageClick(newIndex);
    };
    const handleNextProject = () => {
        const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
        handleImageClick(newIndex);
    };
    const handleImageClick = (clickedIndex: number) => {
        if (clickedIndex !== currentIndex && !isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(clickedIndex);
            setTimeout(() => setIsTransitioning(false), 600);
        }
    };
    return (
        <div
            ref={carouselRef}
            className={`carousel ${isVisible ? 'fade-in' : ''}`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
        >
            <div
                ref={containerRef}
                className={`container ${isDragging ? 'dragging' : ''} ${isTransitioning ? 'transitioning' : ''}`}
            >
                {projects.map((project, index) => {
                    const images = Array.isArray(project.image) ? project.image : [project.image];
                    const imageIndex = index === currentIndex ? currentImageIndex : 0;
                    const imageSrc = images[imageIndex] || images[0];
                    const rawDiff = index - currentIndex;
                    let indexDiff = ((rawDiff + projects.length) % projects.length);
                    if (indexDiff > projects.length / 2) indexDiff -= projects.length;
                    let position = indexDiff + (rotation / anglePerProject);
                    position = ((position % projects.length) + projects.length) % projects.length;
                    if (position > projects.length / 2) position -= projects.length;
                    if (position < -projects.length / 2) position += projects.length;
                    const absPosition = Math.abs(position);
                    if (!isDragging && absPosition > 2.5) return null;
                    if (isDragging && absPosition > 10) return null;
                    const isClickable = absPosition <= 1.2;
                    const maxDistance = window.innerWidth > 768
                        ? Math.min(400, Math.max(260, window.innerWidth * 0.28))
                        : window.innerWidth * 0.45;
                    const translateX = position * maxDistance;
                    const scale = Math.max(0.01, 1 - absPosition * 0.3);
                    let opacity = 1;
                    if (absPosition > 0.3) {
                        opacity = Math.max(0, 1 - (absPosition - 0.3) * 0.8);
                    }
                    if (absPosition > 1.5) opacity = 0;
                    let blur = 0;
                    if (absPosition > 0.5) {
                        const blurProgress = Math.min((absPosition - 0.5) / 0.5, 1);
                        blur = blurProgress * 2;
                    }
                    let zIndex = 1;
                    if (absPosition < 0.5) zIndex = 3;
                    else if (absPosition < 1) zIndex = position > 0 ? 2 : 1;
                    else zIndex = indexDiff < 0 ? 0 : 1;
                    const projectImages = Array.isArray(project.image) ? project.image : [project.image];
                    const hasMultipleImages = projectImages.length > 1;
                    const arrowsOpacity = hasMultipleImages && absPosition < 0.3 ? 1 : 0;
                    return (
                        <div
                            key={`${project.id}-${index}`}
                            className={`item position-${Math.round(position)}`}
                            onClick={() => !isDragging && isClickable && handleImageClick(index)}
                            style={{
                                transform: `translateX(${translateX}px) scale(${scale})`,
                                opacity,
                                zIndex,
                                transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                pointerEvents: isClickable ? 'auto' : 'none'
                            }}
                        >
                            <Image
                                src={imageSrc}
                                alt={project.title}
                                width={1414}
                                height={1000}
                                className="image"
                                draggable={false}
                                style={{ filter: `blur(${blur}px)` }}
                            />
                            {hasMultipleImages && (
                                <>
                                    <button
                                        onClick={handlePreviousImage}
                                        className="select prev"
                                        aria-label="Image précédente"
                                        style={{ opacity: arrowsOpacity }}
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="select next"
                                        aria-label="Image suivante"
                                        style={{ opacity: arrowsOpacity }}
                                    >
                                        →
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={`info ${isTransitioning || isDragging ? 'transitioning' : ''}`}>
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