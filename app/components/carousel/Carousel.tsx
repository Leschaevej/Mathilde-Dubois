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
    const [displayedIndex, setDisplayedIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevImageIndex, setPrevImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [imageSlideDirection, setImageSlideDirection] = useState<'left' | 'right' | null>(null);
    const [isImageTransitioning, setIsImageTransitioning] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [modalZoom, setModalZoom] = useState(1);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [isDraggingModal, setIsDraggingModal] = useState(false);
    const [modalDragStart, setModalDragStart] = useState({ x: 0, y: 0 });
    const [windowWidth, setWindowWidth] = useState(1024);
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const anglePerProject = 360 / projects.length;
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
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
        const currentProject = projects[currentIndex];
        const images = Array.isArray(currentProject.image) ? currentProject.image : [currentProject.image];
        images.forEach((src) => {
            if (typeof window !== 'undefined') {
                const img = new window.Image();
                img.src = src;
            }
        });
    }, [currentIndex, projects]);
    const onTouchStart = (e: React.TouchEvent) => {
        if (isModalOpen) return;
        const target = e.target as HTMLElement;
        if (target.closest('.info') || target.closest('.controls')) return;
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(true);
        setHasMoved(false);
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (isModalOpen) return;
        if (!isDragging || touchStart === null) return;
        const currentX = e.targetTouches[0].clientX;
        const diff = currentX - touchStart;
        if (Math.abs(diff) > 1) {
            setHasMoved(true);
        }
        const rotationChange = (diff / window.innerWidth) * 180;
        setRotation(rotationChange);
    };
    const onTouchEnd = () => {
        if (isModalOpen) return;
        if (!isDragging) return;
        const rotationDegrees = rotation;
        const projectsToMove = Math.round(rotationDegrees / anglePerProject);
        if (Math.abs(projectsToMove) > 0) {
            const newIndex = (currentIndex - projectsToMove + projects.length) % projects.length;
            setCurrentIndex(newIndex);
            setDisplayedIndex(newIndex);
        }
        setIsDragging(false);
        setHasMoved(false);
        setRotation(0);
        setTouchStart(null);
    };
    const onMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.info') || target.closest('.controls')) return;
        e.preventDefault();
        setTouchStart(e.clientX);
        setIsDragging(true);
        setHasMoved(false);
    };
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || touchStart === null) return;
            const diff = e.clientX - touchStart;
            if (Math.abs(diff) > 1) {
                setHasMoved(true);
            }
            const rotationChange = (diff / window.innerWidth) * 360;
            setRotation(rotationChange);
        };
        const handleMouseUp = () => {
            if (!isDragging) return;
            const rotationDegrees = rotation;
            const projectsToMove = Math.round(rotationDegrees / anglePerProject);
            if (Math.abs(projectsToMove) > 0) {
                const newIndex = (currentIndex - projectsToMove + projects.length) % projects.length;
                setCurrentIndex(newIndex);
                setDisplayedIndex(newIndex);
            }
            setIsDragging(false);
            setHasMoved(false);
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
    const handlePreviousImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isTransitioning || isLoadingImage || isImageTransitioning) {
            return;
        }
        const images = getCurrentProjectImages();
        if (images.length <= 1) return;
        const nextImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        const nextImageSrc = images[nextImageIndex];
        setIsLoadingImage(true);
        const img = new window.Image();
        img.onload = () => {
            setIsImageTransitioning(true);
            setPrevImageIndex(currentImageIndex);
            setImageSlideDirection('right');
            setCurrentImageIndex(nextImageIndex);
            setTimeout(() => {
                setImageSlideDirection(null);
                setIsImageTransitioning(false);
                setIsLoadingImage(false);
            }, 500);
        };
        img.onerror = () => {
            console.error('Erreur de chargement de l\'image:', nextImageSrc);
            setIsLoadingImage(false);
        };
        img.src = nextImageSrc;
    };
    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isTransitioning || isLoadingImage || isImageTransitioning) {
            return;
        }
        const images = getCurrentProjectImages();
        if (images.length <= 1) return;
        const nextImageIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
        const nextImageSrc = images[nextImageIndex];
        setIsLoadingImage(true);
        const img = new window.Image();
        img.onload = () => {
            setIsImageTransitioning(true);
            setPrevImageIndex(currentImageIndex);
            setImageSlideDirection('left');
            setCurrentImageIndex(nextImageIndex);
            setTimeout(() => {
                setImageSlideDirection(null);
                setIsImageTransitioning(false);
                setIsLoadingImage(false);
            }, 500);
        };
        img.onerror = () => {
            console.error('Erreur de chargement de l\'image:', nextImageSrc);
            setIsLoadingImage(false);
        };
        img.src = nextImageSrc;
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
        if (clickedIndex === currentIndex && !isTransitioning && !hasMoved && !isImageTransitioning && !isLoadingImage) {
            setIsModalOpen(true);
        } else if (clickedIndex !== currentIndex && !isTransitioning && !hasMoved) {
            setIsTransitioning(true);
            setCurrentIndex(clickedIndex);
            setTimeout(() => {
                setDisplayedIndex(clickedIndex);
            }, 300);
            setTimeout(() => setIsTransitioning(false), 600);
        }
    };
    const closeModal = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsModalClosing(false);
            setModalZoom(1);
            setModalPosition({ x: 0, y: 0 });
        }, 300);
    };
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        const newZoom = Math.min(Math.max(1, modalZoom + delta), 5);
        setModalZoom(newZoom);
        if (newZoom <= 1) {
            setModalPosition({ x: 0, y: 0 });
        } else if (newZoom < modalZoom) {
            const zoomRatio = newZoom / modalZoom;
            setModalPosition({
                x: modalPosition.x * zoomRatio,
                y: modalPosition.y * zoomRatio
            });
        }
    };
    const handleDoubleClick = () => {
        setModalZoom(1);
        setModalPosition({ x: 0, y: 0 });
    };
    const handleModalMouseDown = (e: React.MouseEvent) => {
        if (modalZoom > 1) {
            e.preventDefault();
            setIsDraggingModal(true);
            setModalDragStart({ x: e.clientX - modalPosition.x, y: e.clientY - modalPosition.y });
        }
    };
    const handleModalMouseMove = (e: React.MouseEvent) => {
        if (isDraggingModal && modalZoom > 1) {
            setModalPosition({
                x: e.clientX - modalDragStart.x,
                y: e.clientY - modalDragStart.y
            });
        }
    };
    const handleModalMouseUp = () => {
        setIsDraggingModal(false);
    };
    const [initialTouchDistance, setInitialTouchDistance] = useState<number | null>(null);
    const [initialZoom, setInitialZoom] = useState(1);
    const [lastTouchTime, setLastTouchTime] = useState(0);
    const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };
    const handleModalTouchStart = (e: React.TouchEvent) => {
        const now = Date.now();
        if (e.touches.length === 2) {
            setIsDraggingModal(false);
            const distance = getTouchDistance(e.touches[0], e.touches[1]);
            setInitialTouchDistance(distance);
            setInitialZoom(modalZoom);
            setLastTouchTime(now);
        } else if (e.touches.length === 1) {
            if (modalZoom > 1 && now - lastTouchTime > 100) {
                setIsDraggingModal(true);
                setModalDragStart({
                    x: e.touches[0].clientX - modalPosition.x,
                    y: e.touches[0].clientY - modalPosition.y
                });
            }
        }
    };
    const handleModalTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && initialTouchDistance !== null) {
            e.preventDefault();
            setIsDraggingModal(false);
            const distance = getTouchDistance(e.touches[0], e.touches[1]);
            const scale = distance / initialTouchDistance;
            const smoothScale = scale < 1
                ? 1 - (1 - scale) * 0.8
                : 1 + (scale - 1) * 1.2;

            const newZoom = Math.min(Math.max(1, initialZoom * smoothScale), 5);
            setModalZoom(newZoom);
            if (newZoom <= 1) {
                setModalPosition({ x: 0, y: 0 });
            } else {
                const zoomRatio = newZoom / modalZoom;
                setModalPosition({
                    x: modalPosition.x * zoomRatio,
                    y: modalPosition.y * zoomRatio
                });
            }
        } else if (e.touches.length === 1 && isDraggingModal && modalZoom > 1) {
            e.preventDefault();
            const newX = e.touches[0].clientX - modalDragStart.x;
            const newY = e.touches[0].clientY - modalDragStart.y;
            const maxMove = 200 * modalZoom;
            setModalPosition({
                x: Math.max(-maxMove, Math.min(maxMove, newX)),
                y: Math.max(-maxMove, Math.min(maxMove, newY))
            });
        }
    };
    const handleModalTouchEnd = (e: React.TouchEvent) => {
        const now = Date.now();
        setLastTouchTime(now);
        if (e.touches.length < 2) {
            setInitialTouchDistance(null);
        }
        if (e.touches.length === 0) {
            setTimeout(() => setIsDraggingModal(false), 50);
        }
    };
    useEffect(() => {
        if (isModalOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            };
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isModalOpen]);
    return (
        <div
            ref={carouselRef}
            className={`carousel ${isVisible ? 'fade-in' : ''}`}
            onTouchStart={!isModalOpen ? onTouchStart : undefined}
            onTouchMove={!isModalOpen ? onTouchMove : undefined}
            onTouchEnd={!isModalOpen ? onTouchEnd : undefined}
            onMouseDown={!isModalOpen ? onMouseDown : undefined}
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
                    const maxDistance = windowWidth > 768
                        ? Math.min(400, Math.max(260, windowWidth * 0.28))
                        : windowWidth * 0.45;
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
                    return (
                        <div
                            key={`${project.id}-${index}`}
                            className={`item position-${Math.round(position)}`}
                            onClick={() => !isDragging && isClickable && handleImageClick(index)}
                            style={{
                                transform: `translateX(${translateX}px) scale(${scale})`,
                                opacity,
                                zIndex,
                                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                pointerEvents: isClickable ? 'auto' : 'none'
                            }}
                        >
                            <>
                                <Image
                                    src={imageSrc}
                                    alt={project.title}
                                    width={1414}
                                    height={1000}
                                    className="image"
                                    draggable={false}
                                    style={{
                                        filter: `blur(${blur}px)`
                                    }}
                                />
                                {index === currentIndex && isImageTransitioning && imageSlideDirection && (
                                    <div className={`image-slide-container slide-${imageSlideDirection}`}>
                                        <div>
                                            {imageSlideDirection === 'left' ? (
                                                <>
                                                    <Image
                                                        src={projectImages[prevImageIndex]}
                                                        alt={project.title}
                                                        width={1414}
                                                        height={1000}
                                                        className="slide-img"
                                                        draggable={false}
                                                        loading="eager"
                                                        priority
                                                    />
                                                    <Image
                                                        src={imageSrc}
                                                        alt={project.title}
                                                        width={1414}
                                                        height={1000}
                                                        className="slide-img"
                                                        draggable={false}
                                                        loading="eager"
                                                        priority
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Image
                                                        src={imageSrc}
                                                        alt={project.title}
                                                        width={1414}
                                                        height={1000}
                                                        className="slide-img"
                                                        draggable={false}
                                                        loading="eager"
                                                        priority
                                                    />
                                                    <Image
                                                        src={projectImages[prevImageIndex]}
                                                        alt={project.title}
                                                        width={1414}
                                                        height={1000}
                                                        className="slide-img"
                                                        draggable={false}
                                                        loading="eager"
                                                        priority
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                            {hasMultipleImages && (
                                <>
                                    <button
                                        onClick={handlePreviousImage}
                                        className="select prev"
                                        aria-label="Image précédente"
                                        style={{
                                            opacity: index === currentIndex && !isTransitioning ? 1 : 0,
                                            pointerEvents: index === currentIndex && !isTransitioning ? 'auto' : 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="select next"
                                        aria-label="Image suivante"
                                        style={{
                                            opacity: index === currentIndex && !isTransitioning ? 1 : 0,
                                            pointerEvents: index === currentIndex && !isTransitioning ? 'auto' : 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        →
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={`info ${isTransitioning || hasMoved ? 'transitioning' : ''}`}>
                <h3>{projects[displayedIndex].title}</h3>
                <p>{projects[displayedIndex].description}</p>
            </div>
            <div className="controls">
                <button onClick={handlePreviousProject} className="btn">←</button>
                <button onClick={handleNextProject} className="btn">→</button>
            </div>

            {isModalOpen && (
                <div
                    className={`modal ${isModalClosing ? 'closing' : ''}`}
                    onClick={closeModal}
                >
                    <button className="close" onClick={closeModal}>×</button>
                    <div
                        className="image-wrapper"
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={handleModalTouchStart}
                        onTouchMove={handleModalTouchMove}
                        onTouchEnd={handleModalTouchEnd}
                    >
                        <Image
                            src={getCurrentProjectImages()[currentImageIndex]}
                            alt={projects[currentIndex].title}
                            width={1920}
                            height={1080}
                            className="image"
                            draggable={false}
                            onWheel={handleWheel}
                            onDoubleClick={handleDoubleClick}
                            onMouseDown={handleModalMouseDown}
                            onMouseMove={handleModalMouseMove}
                            onMouseUp={handleModalMouseUp}
                            style={{
                                transform: `scale(${modalZoom}) translate3d(${modalPosition.x / modalZoom}px, ${modalPosition.y / modalZoom}px, 0)`,
                                transition: isDraggingModal ? 'none' : 'transform 0.1s ease-out',
                                cursor: modalZoom > 1 ? (isDraggingModal ? 'grabbing' : 'grab') : 'default',
                                willChange: 'transform'
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}