'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import "./Map.scss";

const CustomIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDlDNSAxNC4yNSAxMiAyMiAxMiAyMkMxMiAyMiAxOSAxNC4yNSAxOSA5QzE5IDUuMTMgMTUuODcgMiAxMiAyWk0xMiAxMS41QzEwLjYyIDExLjUgOS41IDEwLjM4IDkuNSA5QzkuNSA7LjYyIDEwLjYyIDYuNSAxMiA2LjVDMTMuMzggNi41IDE0LjUgNy42MiAxNC41IDlDMTQuNSAxMC4zOCAxMy4zOCAxMS41IDEyIDExLjVaIiBmaWxsPSIjRDJCMDkzIi8+Cjwvc3ZnPgo=',
    iconSize: [36, 36],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
})
interface MapComponentProps {
    address?: string
    coordinates?: [number, number]
}
const MapComponent: React.FC<MapComponentProps> = ({ 
    address = "505 Avenue Imer, Saint-Aygulf", 
    coordinates = [43.38737, 6.71481] 
}) => {
    return (
        <div className="wrapper">
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
export default MapComponent