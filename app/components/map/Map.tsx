"use client";

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import './Map.scss'

interface MapProps {
    address?: string
    coordinates?: [number, number]
}

const Map: React.FC<MapProps> = ({
    address = "Saint-Aigulf",
    coordinates = [43.381, 6.721]
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || mapLoaded || !mapRef.current) return;

        const initMap = async () => {
            const L = (await import('leaflet')).default;

            const CustomIcon = L.icon({
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDlDNSAxNC4yNSAxMiAyMiAxMiAyMkMxMiAyMiAxOSAxNC4yNSAxOSA5QzE5IDUuMTMgMTUuODcgMiAxMiAyWk0xMiAxMS41QzEwLjYyIDExLjUgOS41IDEwLjM4IDkuNSA5QzkuNSA3LjYyIDEwLjYyIDYuNSAxMiA2LjVDMTMuMzggNi41IDE0LjUgNy42MiAxNC41IDlDMTQuNSAxMC4zOCAxMy4zOCAxMS41IDEyIDExLjVaIiBmaWxsPSIjRDJCMDkzIi8+Cjwvc3ZnPgo=',
                iconSize: [36, 36],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            });

            const map = L.map(mapRef.current!, {
                center: coordinates,
                zoom: 10,
                scrollWheelZoom: true,
                attributionControl: false,
                zoomControl: false,
            });

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: ''
            }).addTo(map);

            const marker = L.marker(coordinates, { icon: CustomIcon }).addTo(map);
            marker.bindPopup(`
                <div class="popup">
                    <strong>Mathilde Dubois</strong><br />
                    <em>Dessinatrice en bâtiment</em><br />
                    ${address}
                </div>
            `);

            setMapLoaded(true);
        };

        initMap();
    }, [isVisible, mapLoaded, coordinates, address]);

    return (
        <div ref={wrapperRef} className={`wrapper ${isVisible ? 'slide-in' : ''}`}>
            <div ref={mapRef} className="box" />
        </div>
    )
}

export default Map
