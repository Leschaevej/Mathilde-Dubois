'use client'

import dynamic from 'next/dynamic'
import './Map.scss'

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="loading">
      Chargement de la carte...
    </div>
  )
})

interface MapProps {
  address?: string
  coordinates?: [number, number]
}

const Map: React.FC<MapProps> = ({ 
  address, 
  coordinates 
}) => {
  return (
    <MapComponent address={address} coordinates={coordinates} />
  )
}

export default Map