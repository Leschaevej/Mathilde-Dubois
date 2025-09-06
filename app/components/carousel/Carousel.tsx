'use client';

import { useState } from 'react';
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
    const getProjectPosition = (projectIndex: number) => {
        return projectIndex - currentIndex;
    };
    return (
        <div className="carousel">
            <div className="container">
                {projects.map((project, projectIndex) => {
                const position = getProjectPosition(projectIndex);
                return (
                    <div
                    key={project.id}
                    className={`item position-${position}`}
                    onClick={() => handleImageClick(projectIndex)}
                    >
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={450}
                        className="image"
                    />
                    </div>
                );
                })}
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