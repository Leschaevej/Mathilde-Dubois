"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import './Map.scss'

const CustomIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDlDNSAxNC4yNSAxMiAyMiAxMiAyMkMxMiAyMiAxOSAxNC4yNSAxOSA5QzE5IDUuMTMgMTUuODcgMiAxMiAyWk0xMiAxMS41QzEwLjYyIDExLjUgOS41IDEwLjM4IDkuNSA5QzkuNSA3LjYyIDEwLjYyIDYuNSAxMiA2LjVDMTMuMzggNi41IDE0LjUgNy42MiAxNC41IDlDMTQuNSAxMC4zOCAxMy4zOCAxMS41IDEyIDExLjVaIiBmaWxsPSIjRDJCMDkzIi8+Cjwvc3ZnPgo=',
    iconSize: [36, 36],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
})
interface MapProps {
    address?: string
    coordinates?: [number, number]
}
const Map: React.FC<MapProps> = ({ 
    address = "Saint-Aigulf", 
    coordinates = [43.381, 6.721] 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
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
    return (
        <div ref={wrapperRef} className={`wrapper ${isVisible ? 'slide-in' : ''}`}>
            <MapContainer 
                center={coordinates} 
                zoom={10} 
                className="box"
                scrollWheelZoom={true}
                attributionControl={false}
                zoomControl={false}
            >
                <TileLayer
                    attribution=''
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <Marker 
                    position={coordinates} 
                    icon={CustomIcon}
                >
                    <Popup>
                        <div className="popup">
                            <strong>Mathilde Dubois</strong><br />
                            <em>Dessinatrice en bâtiment</em><br />
                            {address}
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
export default Map